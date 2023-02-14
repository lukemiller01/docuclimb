'use client'

// Functional
import Image from 'next/image';

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
    const { id, grade, color, image, date, base64 } = climb || {};
    const url = `https://api.docuclimb.com/api/files/boulders/${id}/${image}`

    return (
        <>
            <div className="flex flex-col bg-white rounded-2xl px-2">
                <div className="flex items-start py-2">
                    <p className='text-xs'>{date.substring(0, 10)}</p>
                </div>
                <Image src={url} alt="Climb" width={200} height={290} className="h-auto w-auto" priority={index === 0} placeholder="blur" blurDataURL={`${base64}`}></Image>
                <div className="flex justify-between items-center py-2">
                    <h2 className={`${colorVariants[color.toLowerCase() as keyof ColorArray]} text-4xl font-bold text-shadow mx-auto`}>{grade}</h2>
                </div>
            </div>
        </>
    )
}