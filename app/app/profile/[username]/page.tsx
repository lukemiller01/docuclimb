import React from 'react'
import Climb from './Climb';
import ProfileHeader from '@/app/Components/ProfileHeader';
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../../functions/getUserFromCookie';

async function getClimbs() {
  const res = await fetch('https://api.docuclimb.com/api/collections/boulders/records?page=1&perPage=30',
      {cache: 'no-store'}
  );

  const data = await res.json();
  return data?.items as any[];
}

async function getUser() {
  const user = await getUserFromCookie(cookies());
  return user;
}

export default async function Profile({ params }:any) {
    // const username = params.username

    // Get user's feed
    const climbs = await getClimbs();

    // Get user's info
    const user = await getUser();
    const { id, avatar, first, username } = user || {};
    const profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${avatar}`

  return (
    <div className='bg-light-grey'>
      <ProfileHeader username={username} profile={profile} first={first}/>
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