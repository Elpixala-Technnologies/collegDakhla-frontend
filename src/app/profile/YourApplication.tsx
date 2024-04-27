import Image from 'next/image'
import React from 'react'
import Card from '../../components/Application/Card'

const YourApplication = () => {
  return (
    <div className='shadow-lg p-2 rounded-lg border flex flex-col mx-2 sm:mt-0 mt-2  bg-gray-100 gap-2 pb-8 w-full'>
      <span className='p-2 mx-2 my-2 text-3xl font-semibold'>Your Applied Colleges:</span>
      <Card />
      <Card/>
      <Card/>
    </div>
  )
}

export default YourApplication