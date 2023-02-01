import Image from 'next/image';

async function getClimb(climbId: string) {
    const res = await fetch(
        `https://docuclimb.onrender.com/api/collections/boulders/records/${climbId}`,
        {
            next: {revalidate: 10},
        }
    );
    const data = await res.json();
    return data;
}

export default async function Boulder({ params } : any) {
    const climb = await getClimb(params.id)
    const url = `https://docuclimb.onrender.com/api/files/boulders/${climb.id}/${climb.image}`;

    return (
        <div>
            <h1>Climb/{climb.id}</h1>
            <h2>{climb.grade}</h2>
            <Image src={url} alt="Climb" width={100} height={100}></Image>
            <p>{climb.date}</p>
        </div>
    )
}