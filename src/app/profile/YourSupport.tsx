import Image from 'next/image';
import React from 'react'
import { SortWhite } from '@/Asset';
import Accordian from "../../components/accordian/accordian";

const YourSupport = () => {
  const tickets = [
    {
      id: 5548407,
      title: 'Gateway Problem',
      createdDate: '2024-04-01',
      lastDate: '2024-04-10',
      status: 'Open',
    },
    {
      id: 5548408,
      title: 'Gateway Problem2',
      createdDate: '2024-04-05',
      lastDate: '2024-04-15',
      status: 'Closed',
    },
    {
      id: 5548408,
      title: 'Gateway Problem2',
      createdDate: '2024-04-05',
      lastDate: '2024-04-15',
      status: 'Pending',
    },
    {
      id: 5548408,
      title: 'Gateway Problem2',
      createdDate: '2024-04-05',
      lastDate: '2024-04-15',
      status: 'Closed',
    },

  ];
  const faqs = [
    {
      title: 'FAQ 1: How to apply for IIT Madras Placement?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'FAQ 2: What is the eligibility criteria for placements?',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'FAQ 3: How are placements conducted at IIT Madras?',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
   
  ];

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Closed':
        return 'bg-red-500';
      case 'Pending':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };
  return (

    <div className='flex flex-col gap-2 w-full'>
      <div className="w-full h-full  rounded-md border border-black border-opacity-50 flex-col justify-center items-startinline-flex">
        <div className='flex flex-row justify-between p-4 bg-blue-300'>
          <input type="text" placeholder="Search ticket ID" className="w-1/3 h-10 border border-black border-opacity-50 rounded-md px-4" />
          <div className='flex flex-row gap-2'>
            <div
              className="flex items-center px-8 py-2  gap-2 rounded-lg cursor-pointer"
              onClick={() => { }}
            >
              <span>Sort</span>
              <div>
                <Image
                  src={SortWhite}
                  width={70}
                  height={70}
                  alt="sort"
                />
              </div>
            </div>
            <button className="w-full h-10 border border-white border-opacity-50 rounded-md px-2 text-sm">Raise a New Ticket</button>
          </div>
        </div>
        <div className='flex flex-row justify-between p-4 px-10'>
          <span className='font-semibold'>ID</span>
          <span className='font-semibold'>Title</span>
          <span className='font-semibold'>Created Date</span>
          <span className='font-semibold'>Last Date</span>
          <span className='font-semibold'>Status</span>
        </div>
        <hr />

        {tickets.map((ticket, index) => (
          <React.Fragment key={ticket.id}>
            <div className='flex flex-row justify-between p-4'>
              <span>{ticket.id}</span>
              <span>{ticket.title}</span>
              <span>{ticket.createdDate}</span>
              <span>{ticket.lastDate}</span>
              <button className={`px-3 py-1 rounded ${getStatusColor(ticket.status)} text-white`}>
                {ticket.status}
              </button>
            </div>
            {index !== tickets.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      <div className='w-full h-full gap-2 rounded-md border border-black border-opacity-50 flex-col justify-center inline-flex'>
      <span className='text-2xl p-4 font-semibold text-blue-400'>FAQs about IIT Madras Placement</span>
      <hr />
      <div className='px-4 py-4 flex-1 flex flex-col gap-6 text-black'>
        {/* Map through the 'faqs' array to render each accordion item */}
        {faqs.map((faq, index) => (
          <Accordian key={index} title={faq.title}  opened >
            <div className='p-2'>{faq.content}</div>
          </Accordian>
        ))}
      </div>
    </div>


    </div>
  );
}

export default YourSupport