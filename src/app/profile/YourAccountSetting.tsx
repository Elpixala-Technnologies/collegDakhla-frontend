import React from 'react';
// import { Label } from '@mui/icons-material'
// import { Switch } from '@mui/material'
import Image from 'next/image';
import { EditIcon } from '@/Asset';

const AccountSetting = () => {
  return (
    <>
      <div className="w-full h-full px-6 py-8 rounded-md border border-black border-opacity-50 flex-col justify-center items-start gap-10 inline-flex bg-white">
        <div className="text-black text-xl font-semibold font-['Work Sans'] mb-5">Account Settings</div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='text-lg font-medium'>Email Address</span>
              <span className='text-sm font-light'>The email address associated with your account</span>
            </div>
            <div className='flex sm:flex-row flex-col gap-10'>
              <div className='flex flex-col items-end'>
                <span className="text-sm">dwuvbubv388@gmail.com</span>
                <span className='text-red-500 text-xs'>Unverified</span>
              </div>
              <button className="border border-black border-opacity-50 rounded-md ml-28 sm:ml-0 p-2 pb-1 my-2 w-20 sm:w-auto flex items-center justify-center">
                <span className='font-medium text-sm'>Edit</span>
                <span className='ml-2 h-4'>
                  <Image src={EditIcon} alt="Edit Icon" width={20} height={10} />
                </span>
              </button>
            </div>
          </div>
          <div className=" border border-black border-opacity-50"></div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='text-lg font-medium'>Phone Number</span>
              <span className='text-sm font-light'>The phone number associated with your account</span>
            </div>
            <div className='flex sm:flex-row flex-col gap-10'>
              <div className='flex flex-col items-end'>
                <span className="text-sm">dwuvbubv388@gmail.com</span>
                <span className='text-red-500 text-xs'>Unverified</span>
              </div>
              <button className="border border-black border-opacity-50 rounded-md ml-28 sm:ml-0 p-2 pb-1 my-2 w-20 sm:w-auto flex items-center justify-center">
                <span className='font-medium text-sm'>Edit</span>
                <span className='ml-2 h-4'>
                  <Image src={EditIcon} alt="Edit Icon" width={20} height={10} />
                </span>
              </button>
            </div>
          </div>
          <div className=" border border-black border-opacity-50"></div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='text-lg font-medium'>Password</span>
              <span className='text-sm font-light'>Set a unique password to protect your account</span>
            </div>
              <button className="border border-black border-opacity-50 rounded-md ml-28 sm:ml-0 p-2 pb-1 my-2 w-20 sm:w-auto flex items-center justify-center">
                <span className='font-normal sm:font-medium  text-sm sm:text-base'>Change password</span>
              </button>
          </div>
          <div className="font-medium border border-black border-opacity-50"></div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='text-lg font-medium'>2 Step Verification</span>
              <span className='text-sm font-light'>Make your account extra secure, along with your password</span>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400"></div>
            </label>
          </div>
          <div className="font-medium border border-black border-opacity-50"></div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <span className='text-lg font-medium'>Deactivate the Account</span>
              <span className='text-sm font-light'>Set a unique password to protect your account</span>
            </div>
            <button className="border border-opacity-50 rounded-md p-2  my-2 bg-red-400 text-white">
              Deactivate
            </button>
          </div>
          <div className="font-medium border border-black border-opacity-50"></div>
        </div>
      </div>
    </>
  )
}

export default AccountSetting

