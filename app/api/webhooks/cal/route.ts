import { z } from 'zod'
import { getUserByEmail } from '@/lib/db/users'
import { getServiceBySlug } from '@/lib/db/services'
import { getProviderByCalUsername } from '@/lib/db/team'
import { createAppointment } from '@/lib/db/appointments'

const payloadSchema = z.object({
  triggerEvent: z.string(),
  payload: z.object({
    type: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    bookingId: z.number(),
    organizer: z.object({
      username: z.string()
    }),
    responses: z.object({
      email: z.object({
        value: z.string()
      })
    })
  })
})

export async function POST(req: Request) {
  const body = await req.json()

  try {
    payloadSchema.parse(body)
  } catch (error) {
    return new Response('Error occurred - Missing data!', { status: 400 })
  }

  const trigger = body.triggerEvent
  const payload = body.payload

  if (trigger === 'BOOKING_CREATED') {
    const { type, startTime, endTime, bookingId, organizer, responses } =
      payload

    try {
      const { user } = await getUserByEmail(responses.email.value)
      if (!user) throw new Error('User not found')

      const { provider } = await getProviderByCalUsername(organizer.username)
      if (!provider) throw new Error('Provider not found')

      const { service } = await getServiceBySlug(type)
      if (!service) throw new Error('Service not found')

      await createAppointment({
        userId: user?.clerkUserId!,
        providerId: provider?.id!,
        serviceId: service?.id!,
        startTime,
        endTime,
        bookingId
      })
    } catch (error: any) {
      return new Response(error.message || 'Something went wrong!', {
        status: 400
      })
    }
  }

  if (trigger === 'BOOKING_RESCHEDULED') {
    // Do something
  }

  if (trigger === 'BOOKING_CANCELED') {
    // Do something
  }

  return new Response('', { status: 200 })
}
