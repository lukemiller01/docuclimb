// Functional:
import Link from 'next/link'

// Auth:
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../Pocketbasefunctions/getUserFromCookie';
import { getUserFromId } from '../Pocketbasefunctions/getUserFromId';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

// Components:
import Navbar from '../Components/Navbar'

// Layout for internal application (auth-protected)
export default async function DashboardLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies() as ReadonlyRequestCookies);

  if (!user) {
    redirect("/login");
  }

  const { id, username } = user || {};
  
  const userModel = await getUserFromId(id);

  if(userModel?.avatar) {
    var profile = `https://api.docuclimb.com/api/files/_pb_users_auth_/${id}/${userModel?.avatar}`
  }
  else{
    var profile = '/avatar.svg'
  }

  return (
    <>
      <Navbar profile={profile} username={username} currentUser={id} base64={userModel?.base64 ? userModel?.base64 : '0'}/>
      <nav>
        <Link href="/app/feed"></Link>
        <Link href={`/app/profile/${username}`}/>
      </nav>
      {children}
    </>
  );
}