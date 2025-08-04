import CreateTeamForm from '@/components/pages/team/CreateTeamForm'
import React from 'react'

const CreateTeam = () => {
  return (
      <section className="flex w-full h-full flex-col space-y-8 max-w-lg items-center my-auto justify-center py-5">
      <h1 className="text-3xl text-stone-900 font-semibold ">Create Team</h1>
      <CreateTeamForm/>
    </section>
  )
}

export default CreateTeam