// React Components
import Climb from './Climb';

// Functions
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../functions/getUserFromCookie';
import { getUserFromId } from '../../functions/getUserFromId';

import { pb } from '../../functions/pocketbase'

function getProfile() {
    const auth = getUserFromCookie(cookies());
    return auth;
}

async function getClimbs() {

    // Get all climb data
    try {
        const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
            {cache: 'no-store'}
        );
        const data = await res.json();
        // const res = await pb.collection('boulders').getList(1, 30);
        // const data = res as unknown as JSON;
        // const data = await res.json();
        // console.log(typeof data)

        // Append the imageURL and username from the PB user collection
        for (let i = 0; i < data.items.length; i++) {
            let user = await getUserFromId(data.items[i].uid);
            if(user) {
                let username = user.username;
                data.items[i]['username'] = username;

                if(user.avatar) {
                    var imageURL = `https://api.docuclimb.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
                }
                else{
                    var imageURL = '/avatar.svg';
                }
                data.items[i]['imageUrl'] = imageURL;
            }
        }

        return data?.items as any[];
      } catch (error) {
        console.log('Error:', error);
      }
}

export default async function Boulders() {

    // Get all climbs
    const climbs = await getClimbs();

    // Get the current user profile
    const auth = getProfile();
    const { id } = auth || {};

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