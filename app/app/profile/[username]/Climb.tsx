'use client'
// Icons
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
// import profile from '../../public/square.jpg'

import { useState } from 'react'

// Functional
import Link from "next/link";
import Image from 'next/image';

// Components
import CreateModal from '../../../Components/CreateModal';

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

export default function Climb({climb, index}: any) {
    const { id, grade, color, image, date } = climb || {};
    const url = `https://api.docuclimb.com/api/files/boulders/${id}/${image}`

    return (
        <>
            <div className="flex items-center flex-col bg-white rounded-2xl">
                <div className=" w-11/12 flex justify-between items-center py-2">
                    <p className='text-xs'>{date.substring(0, 10)}</p>
                </div>
                <Image src={url} alt="Climb" width={400} height={1200} className="h-auto w-auto" priority={index === 0}></Image>
                <div className=" w-11/12 flex justify-between items-center py-2">
                    <h2 className={`${colorVariants[color.toLowerCase() as keyof ColorArray]} text-4xl font-bold text-shadow mx-auto`}>{grade}</h2>
                </div>
            </div>
        </>
    )
}