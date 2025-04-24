import ClassView from '@/components/classes/ClassView'
import React from 'react'

async function Page( { params }: { params: Promise<{ classId: string }>}) {

    const {classId} = await params
  return (
    <ClassView
    classId={classId}
    />
  )
}

export default Page