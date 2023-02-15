// Functional:
import Link from 'next/link'

// Auth:
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../Pocketbasefunctions/getUserFromCookie';
import { getUserFromId } from '../Pocketbasefunctions/getUserFromId';

// Components:
import Navbar from '../Components/Navbar'

// Layout for internal application (auth-protected)
export default async function DashboardLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies());

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
      <Navbar profile={profile} username={username} currentUser={id} base64={userModel?.base64}/>
      <nav>
        <Link href="/app/feed"></Link>
        <Link href={`/app/profile/${username}`}/>
      </nav>
      {children}
    </>
  );
}