import Link from 'next/link'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '../functions/getUserFromCookie';

export default function LoginLayout({children} : {children: React.ReactNode}) {

  const user = getUserFromCookie(cookies());

  if (user) {
    redirect("/app/feed");
  }

  return (
    <>
      <nav>
        <Link href="/login"></Link>
      </nav>
      {children}
    </>
  );
}