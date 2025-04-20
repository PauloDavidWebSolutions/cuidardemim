import { Webhook } from 'svix'
import { User } from '@prisma/client'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { UpdateUser, createUser } from '@/lib/db/users'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')


  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      phone_numbers
    } = evt.data

    if (!id || !email_addresses || !email_addresses.length) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }

    const email = email_addresses[0].email_address
    const phone = phone_numbers?.[0]?.phone_number ?? null


    const user = {
      clerkUserId: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      phone: phone,
      ...(image_url ? { imageUrl: image_url } : {})
    }

    try {
      await createUser(user as User)
      revalidatePath(`/admin`)
    } catch (error) {
      return new Response('Error occurred', {
        status: 400
      })
    }
  }

  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data

    if (!id) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }

    const data = {
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {})
    }

    try {
      await UpdateUser(id, data)
      revalidatePath(`/admin`)
    } catch (error) {
      return new Response('Error occurred', {
        status: 400
      })
    }
  }

  return new Response('', { status: 200 })
}
