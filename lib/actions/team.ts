'use server'

import { z } from 'zod'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import prisma from '@/lib/db/prisma'
import { NewMemberSchema } from '@/lib/schemas'

type NewMemberInputs = z.infer<typeof NewMemberSchema>

export async function createNewMemberAction(data: NewMemberInputs) {
  const { userId } = auth()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  // TODO: Check if the user is an admin

  const result = NewMemberSchema.safeParse(data)

  if (result.error) {
    return { error: 'Form validation error.' }
  }

  let memberId: string

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email
      }
    })

    if (!user) {
      return {
        error:
          'User not found! Make sure the provider has signed up on the website.'
      }
    }

    memberId = user.id
  } catch (error) {
    return {
      error: 'Error finding the user!'
    }
  }

  try {
    const provider = await prisma.provider.findUnique({
      where: {
        userId: memberId
      }
    })

    if (provider) {
      return {
        error: 'A team member with this email already exists!'
      }
    }
  } catch (error) {
    return {
      error: 'Error checking if the user is a provider!'
    }
  }

  // TODO: check if a user with the calUsername already exists
  // try {
  //   const endpoint = `https://api.cal.com/v1/memberships`
  //   const response = await axios({
  //     method: 'GET',
  //     url: endpoint,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     params: {
  //       apiKey: process.env.CAL_API_KEY,
  //       teamId: Number(process.env.CAL_TEAM_ID)
  //     }
  //   })

  //   if (response.status !== 200) {
  //     return {
  //       error: 'Error fetching team member from Cal.com'
  //     }
  //   }

  //   const data = response.data

  //   console.log(data)
  // } catch (error) {
  //   console.log(error)
  //   return {
  //     error: 'Error checking if the user is a provider!'
  //   }
  // }

  try {
    await prisma.provider.create({
      data: {
        userId: memberId,
        jobTitle: result.data.jobTitle,
        imageUrl: result.data.imageUrl,
        description: result.data.description,
        calUsername: result.data.calUsername
      }
    })
  } catch (error) {
    return {
      error: 'Error creating the team member!'
    }
  }

  try {
    await prisma.user.update({
      where: {
        id: memberId
      },
      data: {
        role: 'PROVIDER'
      }
    })
  } catch (error) {
    return {
      error: 'Error updating the user role!'
    }
  }

  revalidatePath(`/admin/team`)
  redirect('/admin/team')
}
