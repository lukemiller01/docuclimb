// React Components
import Climb from './Climb';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../functions/getUserFromCookie';
import { getUserFromId } from '../../functions/getUserFromId';

function getProfile() {
    const user = getUserFromCookie(cookies());
    return user;
}

async function getClimbs() {

    // Get all climb data
    const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
        {cache: 'no-store'}
    );
    const data = await res.json();

    // Append the imageURL and username from the PB user collection
    for (let i = 0; i < data.items.length; i++) {
        let user = await getUserFromId(data.items[i].uid);
        let imageURL = `https://api.docuclimb.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`
        let username = user.username;
        data.items[i]['imageUrl'] = imageURL
        data.items[i]['username'] = username
    }

    return data?.items as any[];
}

export default async function Boulders() {

    // Get all climbs
    const climbs = await getClimbs();

    // Get the current user profile
    const user = await getProfile();
    const { id } = user || {};

    return (
        <div className="mx-auto justify-center grid gap-12 py-12 px-4 bg-light-grey">
            {climbs?.reverse().map((climb, index) => {
                return (
                    <Climb key={climb.id} climb={climb} index={index} currentUser={id}/>
                );
            })}
        </div>
        )
}