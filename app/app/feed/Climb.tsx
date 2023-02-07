'use client'
// Icons
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
// import profile from '../../public/square.jpg'

import { useState } from 'react'

// Functional
import Link from "next/link";
import Image from 'next/image';

// Components
import CreateModal from '../../Components/CreateModal';

interface ColorArray {
    red: string;
    orange: string;
    yellow: string;
    green: string;
    blue: string;
    purple: string;
    pink: string;
    white: string;
    black: string;
}

const colorVariants: ColorArray = {
    red: 'text-climb-red',
    orange: 'text-climb-orange',
    yellow: 'text-climb-yellow',
    green: 'text-climb-green',
    blue: 'text-climb-blue',
    purple: 'text-climb-purple',
    pink: 'text-climb-pink',
    white: 'text-white',
    black: 'text-black',
}

export default function Climb({climb, index, profile, username}: any) {
    const { id, grade, color, image, date } = climb || {};
    const url = `https://api.docuclimb.com/api/files/boulders/${id}/${image}`

    //  Open modal
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <CreateModal isOpen={isOpen} closeModal={closeModal} actionType={'Edit'} id={id} climb={climb} url={url}/>
            <div className="flex items-center flex-col bg-white rounded-2xl">
                <div className=" w-11/12 flex justify-between items-center py-2">
                    <Link href={`/app/profile/${username}`} className='flex flex-row items-center gap-2'>
                        <Image className="h-8 w-8 rounded-full" src={profile} alt='profile' width={50} height={50}/>
                        <div>
                            <p className='text-sm'>{username}</p>
                            <p className='text-xs'>{date.substring(0, 10)}</p>
                        </div>
                    </Link>
                    <EllipsisHorizontalIcon className="h-8 w-8 cursor-pointer" onClick={() => openModal()}/>
                </div>
                <Image src={url} alt="Climb" width={400} height={1200} className="h-auto w-auto" priority={index === 0}></Image>
                <div className=" w-11/12 flex justify-between items-center py-2">
                    <h2 className={`${colorVariants[color.toLowerCase() as keyof ColorArray]} text-4xl font-bold text-shadow mx-auto`}>{grade}</h2>
                </div>
            </div>
        </>
    )
}