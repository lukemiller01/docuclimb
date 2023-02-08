import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../functions/getUserFromCookie';

import Navbar from '../Components/Navbar'

export default function DashboardLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies());

  if (!user) {
    redirect("/login");
  }

  const { id, avatar, username } = user || {};
  const profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${avatar}`

  return (
    <>
      <Navbar profile={profile} username={username} currentUser={id}/>
      <nav>
        <Link href="/app/feed"></Link>
        <Link href="/app/profile"></Link>
      </nav>
      {children}
    </>
  );
}