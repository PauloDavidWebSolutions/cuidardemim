'use server'

import { z } from 'zod'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { NewServiceWithLengthSchema } from '@/lib/schemas'
import { createService, createUniqueSlugFromName } from '@/lib/db/services'

type NewServiceInputs = z.infer<typeof NewServiceWithLengthSchema>

export async function createNewServiceAction(data: NewServiceInputs) {
  const { userId } = auth()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // TODO: Check if the user is an admin

  const result = NewServiceWithLengthSchema.safeParse(data)

  if (result.error) {
    return { error: 'Form validation error.' }
  }

  let calEventId: number
  let calEventSlug: string

  try {
    const { name, length, description } = result.data
    const slug = createUniqueSlugFromName(name)

    const endpoint = `https://api.cal.com/v1/event-types`
    const response = await axios({
      method: 'POST',
      url: endpoint,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        apiKey: process.env.CAL_API_KEY  // Make sure this is correct
      },
      data: {
        title: name,  // Title of the event
        slug: slug,  // Unique slug for the event
        length: length,
        description: description,  // Event duration in minutes
        metadata: {}  // Pass empty object if no metadata
      }
    })

    // console.log("Response from cal.com:", response.data);

    if (response.status !== 200) {
      throw new Error('Error creating service')
    }

    const data = response.data
    const event = data.event_type

    calEventId = event.id
    calEventSlug = event.slug
  } catch (error: any) {
    console.error(error)
    return {
      error: 'Error creating service'
    }
  }

  try {
    const service = await createService({
      ...result.data,
      calEventId,
      calEventSlug
    })
    if (!service) throw new Error()
  } catch (error: any) {
    return {
      error: 'Error creating service'
    }
  }

  revalidatePath(`/admin/services`)
  redirect('/admin/services')
}
