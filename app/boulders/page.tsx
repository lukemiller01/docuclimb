import Link from "next/link";
import Image from 'next/image';
import Navbar from '@/app/navbar';

async function getClimbs() {
    const res = await fetch('https://docuclimb.onrender.com/api/collections/boulders/records?page=1&perPage=30',
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
            <div className="mx-auto justify-center grid gap-12">
                {climbs?.map((climb) => {
                    return <Climb key={climb.id} climb={climb}/>;
                })}
            </div>

        </div>
    )
}

function Climb({climb }: any) {
    const { id, grade, image, date } = climb || {};
    const url = `https://docuclimb.onrender.com/api/files/boulders/${id}/${image}`

    return (
        // <Link href={`/boulders/${id}`}>
        <Link href={`/boulders/${id}`}>
            <div className="flex items-center flex-col gap-4 px-4">
                <Image src={url} alt="Climb" width={500} height={0} className="flex border rounded-2xl"></Image>
                <div className=" w-11/12 flex justify-between">
                    <h2>{grade}</h2>
                    <p>{date}</p>
                </div>
            </div>
        </Link>
    )
}