import prisma from '@/lib/db/prisma'

export async function getAppointments(limit?: number) {
  return await prisma.appointment.findMany({
    where: {
      startDateTime: {
        gte: new Date()
      }
    },
    orderBy: { startDateTime: 'asc' },
    ...(limit ? { take: limit } : {}),
    include: {
      user: true,
      service: true,
      provider: {
        include: {
          user: true
        }
      }
    }
  })
}

export async function getAppointmentById(id: string) {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      user: true,
      service: true,
      provider: true
    }
  })
}

export async function createAppointment(data: {
  userId: string
  providerId: string
  serviceId: string
  startTime: Date
  endTime: Date
  bookingId: number
}) {
  return await prisma.appointment.create({
    data: {
      startDateTime: data.startTime,
      endDateTime: data.endTime,
      calBookingId: data.bookingId,
      userId: data.userId,
      providerId: data.providerId,
      serviceId: data.serviceId
    }
  })
}

export function formatDateTime(
  datetime: Date | string,
  format: 'date' | 'time' | 'datetime'
) {
  if (typeof datetime === 'string') {
    datetime = new Date(datetime)
  }

  const formatter = new Intl.DateTimeFormat('en-CA', {
    ...(format !== 'time'
      ? { weekday: 'short', month: 'short', day: 'numeric' }
      : {}),
    ...(format !== 'date'
      ? { hour: 'numeric', minute: '2-digit', hour12: false }
      : {}),
    timeZone: 'America/Toronto'
  })

  return formatter.format(datetime)
}
