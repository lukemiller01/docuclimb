// React Components
import Climb from './Climb';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../functions/getUserFromCookie';

async function getClimbs() {
    const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
        {cache: 'no-store'}
    );

    const data = await res.json();
    return data?.items as any[];
}

async function getAvatar() {
    const user = await getUserFromCookie(cookies());
    return user;
}

export default async function Boulders() {

    // Get the feed
    const climbs = await getClimbs();

    // Get the climbs
    const user = await getAvatar();
    const { id, avatar, username } = user || {};
    const profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${avatar}`

    return (
        <div>
            <div className="mx-auto justify-center grid gap-12 py-12 px-4 bg-light-grey">
                {climbs?.reverse().map((climb, index) => {
                    return <Climb key={climb.id} climb={climb} profile={profile} username={username} index={index}/>;
                })}
            </div>

        </div>
    )
}