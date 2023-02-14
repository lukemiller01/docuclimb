// Functional
import React from 'react'
import { cookies } from 'next/headers';
import { getUserFromCookie } from '../../../../functions/getUserFromCookie';

// Components
import ModifyProfile from '@/app/Components/EditProfile/ModifyProfile'
import ResetCredentials from '@/app/Components/EditProfile/ResetCredentials';
import DeleteAccount from '@/app/Components/EditProfile/DeleteAccount';

export default function Edit() {

  const token = cookies().get('pb_auth');

  const user = getUserFromCookie(cookies());
  const { id, username, email, first, description, avatar } = user || {};
  if(avatar) {
      var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${avatar}`
    }
  else{
  var profile = '/avatar.svg'
  }

  return (
      <>
        <ModifyProfile id={id} username={username} email={email} first={first} description={description} profile={profile} token={token}/>
        <ResetCredentials email={email}/>
        <DeleteAccount id={id}/>
      </>
    )
}