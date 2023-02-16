// Functional
import React from 'react'

// Auth
import { cookies } from 'next/headers';
import { getUserFromUsername } from '@/app/Pocketbasefunctions/getUserFromUsername';
import { getUserFromCookie } from '@/app/Pocketbasefunctions/getUserFromCookie';

// Components
import Climb from './Climb';
import ProfileHeader from '@/app/Components/Profile/ProfileHeader';
import NoClimbsYet from '@/app/Components/Profile/NoClimbsYet';
import AddAClimb from '@/app/Components/Profile/AddAClimb';

// Gets the climbs for the current profile
async function getClimbs(id: any): Promise<any[]> {
  const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
    {cache: 'no-store'}
  );

  const data = await res.json();

  // Filter out the climbs that don't belong to the user
  var filteredData = data.items.filter((a:any) => a.uid === id );
  data.items = filteredData;

  return data?.items as any[];
}

// Gets the user who the page belongs to
async function getUser(username: string) {
  const user = await getUserFromUsername(username);
  return user;
}

// Gets the currently signed in user
function getProfile() {
  const user = getUserFromCookie(cookies());
  return user;
}

export default async function Profile({ params }:any) {
    // const usernameURL = params.username
    const usernameURL = 'lukemiller'

    // Get user's info
    const user = await getUser(usernameURL);
    const { avatar, base64 } = user || {};
    if(avatar) {
      var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${user?.id}/${avatar}`
    }
    else{
      var profile = '/avatar.svg'
    }

    // Get user's feed
    const climbs = await getClimbs(user?.id);

    // Get currently signed in user
    const auth = getProfile();

  return (
    <div className='bg-light-grey h-full'>
      <ProfileHeader username={usernameURL} profile={profile} first={user?.first} numClimbs={climbs.length} currentUser={auth?.username} description={user?.description} base64={base64}/>
      {climbs?.length === 0?
      auth?.username === usernameURL? <AddAClimb currentUser={auth?.id}/> : <NoClimbsYet/>
      :<div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid gap-y-4 gap-x-4 grid-cols-2 xl:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-6">
          {climbs?.reverse().map((climb, index) => {
              return (<Climb key={climb.id} climb={climb} index={index} currentUser={auth?.username}/>);
          })}
        </div>
      </div>
      }
    </div>
  )
}