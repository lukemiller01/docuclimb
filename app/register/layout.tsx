import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../Pocketbasefunctions/getUserFromCookie';

export default function RegisterLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies());

  if (user) {
    redirect("/app/feed");
  }

  return (
    <>
      <nav>
        <Link href="/register"></Link>
      </nav>
      {children}
    </>
  );
}