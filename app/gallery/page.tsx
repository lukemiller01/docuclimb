import Link from "next/link";
import Image from 'next/image';

async function getClimbs() {
    // ! Change b/w dev<->prod
    // const res = await fetch('http://127.0.0.1:8090/api/collections/boulders/records?page=1&perPage=30');
    const res = await fetch('--http=0.0.0.0:8080/api/collections/boulders/records?page=1&perPage=30');

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
    const url = `http://127.0.0.1:8090/api/files/boulders/${id}/${image}`

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