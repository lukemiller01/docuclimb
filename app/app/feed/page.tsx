export const dynamic = 'force-dynamic';
// https://beta.nextjs.org/docs/api-reference/segment-config

// React Components
import Climb from './Climb';

// Functions
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../Pocketbasefunctions/getUserFromCookie';
import { getUserFromId } from '../../Pocketbasefunctions/getUserFromId';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

// Definition for feed data (Array of Climbs)
interface Climb {
    id: string,
    grade: string,
    color: string,
    image: string,
    base64: string,
    date: string,
    username: string,
    imageUrl: string,
    uid: string,
    environment: boolean,
}

// Gets currently signed-in users by cookie
function getProfile() {
    const auth = getUserFromCookie(cookies() as ReadonlyRequestCookies);
    return auth;
}

// Fetch climb data from Pocketbase
async function getClimbs() {
    try {
        const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
            {cache: 'no-store'}
        ); // Get data from Pocketbase
        const data = await res.json(); // Convert response to JSON
        for (let i = 0; i < data.items.length; i++) {
            // For every climb, add an avatar & username to include in post because this data is not stored in the boulder model
            let user = await getUserFromId(data.items[i].uid);
            if(user) { // Assert user is not empty
                let username = user.username;
                data.items[i]['username'] = username;

                // If the user chose not to upload an image, use a stock image
                if(user.avatar) {
                    var imageURL = `https://api.docuclimb.com/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
                }
                else{
                    var imageURL = '/avatar.svg';
                }
                data.items[i]['imageUrl'] = imageURL;
            }
        }

        return data?.items as Array<Climb>; // Return as an array of Climbs
      } catch (error) {
        console.log('Error:', error);
      }
}

// Get climbs and adds to feed
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
                    <Climb key={climb.id} climb={climb} index={index} currentUser={id? id : '0'}/>
                );
            })}
        </div>
    )
}