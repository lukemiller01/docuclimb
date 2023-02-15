// Functional
import React from 'react'
import { cookies } from 'next/headers';
import { getUserFromCookie } from '@/app/Pocketbasefunctions/getUserFromCookie';
import { getUserFromId } from '@/app/Pocketbasefunctions/getUserFromId';

// Components
import ModifyProfile from '@/app/Components/EditProfile/ModifyProfile'
import ResetCredentials from '@/app/Components/EditProfile/ResetCredentials';
import DeleteAccount from '@/app/Components/EditProfile/DeleteAccount';

// Allows user to change their account
export default async function Edit() {

  const token = cookies().get('pb_auth');

  const user = getUserFromCookie(cookies());
  const { id, username, email }:any = user || {};

  const userModel = await getUserFromId(id);

  if(userModel?.avatar) {
    var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${userModel?.avatar}`
  }
  else{
  var profile = '/avatar.svg'
  }

  // ModifyProfile: Change username/firstname/description
  // ResetCredentials: sends transactional email to change email/password
  // DeleteAccount: button to delete the account
  return (
      <>
        <ModifyProfile id={id} username={username} first={userModel?.first} description={userModel?.description} profile={profile} token={token}/>
        <ResetCredentials email={email}/>
        <DeleteAccount id={id}/>
      </>
    )
}