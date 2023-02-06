import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../functions/getUserFromCookie';
// import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

export default async function BouldersLayout({children} : {children: React.ReactNode}) {

  const user = await getUserFromCookie(cookies());
  // console.log(user); // user is available

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <nav>
        <Link href="/login"></Link>
        <Link href="/boulders"></Link>
      </nav>
      {children}
    </>
  );
}