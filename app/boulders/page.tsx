import Link from "next/link";
import Image from 'next/image';
import Navbar from '@/app/navbar';

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

async function getClimbs() {
    const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
        {cache: 'no-store'}
    );

    const data = await res.json();
    return data?.items as any[];
}

export default async function Boulders() {

    const climbs = await getClimbs();

    return (
        <div>
            <Navbar/>
            <div className="mx-auto justify-center grid gap-12 py-12 px-4 bg-light-grey">
                {climbs?.reverse().map((climb) => {
                    return <Climb key={climb.id} climb={climb}/>;
                })}
            </div>

        </div>
    )
}

function Climb({climb }: any) {
    const { id, grade, color, image, date } = climb || {};
    const url = `https://api.docuclimb.com/api/files/boulders/${id}/${image}`

    return (
        // <Link href={`/boulders/${id}`}>
            <div className="flex items-center flex-col bg-white rounded-2xl">
                <Image src={url} alt="Climb" width={400} height={0} className="flex rounded-t-2xl"></Image>
                <div className=" w-11/12 flex justify-between items-center py-4">
                    <h2 className={`${colorVariants[color.toLowerCase() as keyof ColorArray]} text-4xl text-shadow`}>{grade}</h2>
                    <p>{date.substring(0, 10)}</p>
                </div>
            </div>
        // </Link>
    )
}