import BackButton from '@/components/back-button'

export default function NewCustomer() {
  return (
    <section>
      <BackButton href='/admin/customers' text='Back' />

      <div className='mt-4'>
        <h2 className='text-2xl font-semibold tracking-tight'>New customer</h2>
      </div>
    </section>
  )
}
