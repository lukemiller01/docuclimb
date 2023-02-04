// React Components
import Navbar from '@/app/navbar';
import Climb from './Climb';

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
                {climbs?.reverse().map((climb, index) => {
                    return <Climb key={climb.id} climb={climb} index={index}/>;
                })}
            </div>

        </div>
    )
}