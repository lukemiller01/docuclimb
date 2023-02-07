import React from 'react'
import Climb from './Climb';
import ProfileHeader from '@/app/Components/ProfileHeader';
import { getUserFromUsername } from '@/app/functions/getUserFromUsername';

async function getClimbs(id: any) {
  const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
      {cache: 'no-store'}
  );

  const data = await res.json();

  // Filter the climbs that don't belong to the user
  var filteredData = data.items.filter((a:any) => a.uid === id );
  data.items = filteredData;

  return data?.items as any[];
}

async function getUser(username: string) {
  const user = await getUserFromUsername(username);
  return user;
}

// TODO: Restrict access to edit account if the user viewing the page does not match the URL's profile

export default async function Profile({ params }:any) {
    const username = params.username

    // Get user's info
    const user = await getUser(username);
    const { id, avatar, first } = user || {};
    const profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${avatar}`

    // Get user's feed
    const climbs = await getClimbs(user.id);

  return (
    <div className='bg-light-grey'>
      <ProfileHeader username={username} profile={profile} first={first} numClimbs={climbs.length}/>
      <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid gap-y-4 gap-x-4 grid-cols-2 xl:gap-x-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-y-10 sm:gap-x-6">
          {climbs?.reverse().map((climb, index) => {
              return <Climb key={climb.id} climb={climb} index={index}/>;
          })}
        </div>
      </div>
    </div>
  )
}