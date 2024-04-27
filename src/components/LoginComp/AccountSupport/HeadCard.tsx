import Image from 'next/image'
import React from 'react'

const HeadCard = () => {


    const SidebarItems = [
        {
            imageSrc: "",
            altText: 'Getting Started Icon',
            label: 'Getting Started'
        },
        {
            imageSrc: "",
            altText: 'Get Support',
            label: 'Get Support'
        },
        {
            imageSrc: "",
            altText: 'Billing & Teams',
            label: 'Billing & Teams'
        },
        {
            imageSrc: "",
            altText: 'Trouble Shooting',
            label: 'Trouble Shooting'
        }
    ];
    return (
        <div className='w-full relative'>
            <div className='flex flex-col justify-center items-center gap-3 border border-black py-24 bg-gradient-to-b from-black to-blue-900'>
                <span className='text-white text-3xl font-semibold font-["Work Sans"]'>Support Center</span>
                <span className='text-white text-lg font-semibold font-["Work Sans"] mb-5'>Hello, How Can I Help You Today?</span>
                <div className='relative flex items-center'>

                    <div className='relative'>
                        <span className='absolute inset-y-0 left-0 flex pl-3'>
                            <Image src={""} alt="Search Icon" width={16} height={16} />
                        </span>
                        <input
                            type='text'
                            className='pl-10 pr-14 py-4 border border-gray-300 rounded-sm w-full md:w-96'
                            placeholder='Ask a question'
                        />
                        <button
                            className='absolute inset-y-0 right-0 px-4 py-3 m-2 bg-blue-500 text-white rounded-sm'

                        >
                            Search
                        </button>
                    </div>
                </div>
                <span className='text-white text-sm'>Choose a category to quickly find what you need.</span>
            </div>
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2  rounded-md flex flex-row bg-blue-400">
                {SidebarItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center gap-2 p-2 cursor-pointer">
                            <Image src={item.imageSrc} alt={item.altText} width={30} height={30} />
                            <span className='text-white font-semibold'>{item.label}</span>
                        </div>
                        {index !== SidebarItems.length - 1 && <hr className="h-12 w-0.5 mx-2 bg-gray-100 self-center" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default HeadCard