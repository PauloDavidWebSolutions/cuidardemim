import BackButton from '@/components/back-button'

export default function NewAppointment() {
  return (
    <section>
      <BackButton href='/admin/appointments' text='Back' />

      <div className='mt-4'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          New appointment
        </h2>
      </div>
    </section>
  )
}
