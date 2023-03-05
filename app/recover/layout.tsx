import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../Pocketbasefunctions/getUserFromCookie';
import { ReadonlyRequestCookies } from 'next/dist/server/app-render';

export default function RecoverLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies() as ReadonlyRequestCookies);

  if (user) {
    redirect("/app/feed");
  }

  return (
    <>
      <nav>
        <Link href="/recover"></Link>
      </nav>
      {children}
    </>
  );
}