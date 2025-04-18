import BackButton from '@/components/back-button'
import NewMemberForm from '@/components/new-member-form'

export default async function NewTeamMember() {
  return (
    <section>
      <BackButton href='/admin/team' text='Back' />

      <div className='mt-4 max-w-2xl'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          New team member
        </h2>

        <NewMemberForm />
      </div>
    </section>
  )
}
