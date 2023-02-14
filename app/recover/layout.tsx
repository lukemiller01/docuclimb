import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../functions/getUserFromCookie';

export default function RecoverLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies());

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