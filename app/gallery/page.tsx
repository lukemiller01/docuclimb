import Link from "next/link";
import Image from 'next/image';

async function getClimbs() {
    const res = await fetch('https://docuclimb.onrender.com/api/collections/boulders/records?page=1&perPage=30');

    const data = await res.json();
    return data?.items as any[];
}

export default async function Gallery() {

    const climbs = await getClimbs();

    return (
        <div>
            <h1>Climbs</h1>
            <div>
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
        <Link href={`/climb/${id}`}>
            <div>
                <h2>{grade}</h2>
                <Image src={url} alt="Climb" width={100} height={100}></Image>
                <p>{date}</p>
            </div>
        </Link>
    )
}