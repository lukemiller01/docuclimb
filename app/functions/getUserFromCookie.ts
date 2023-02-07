// import { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import { pb } from './pocketbase'

interface User {
    id: string
    created: Date
    updated: Date
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
    avatar: File
    first: string
}

function getUserFromCookie(cookies: any): User | null {
  const authCookie = cookies.get("pb_auth");

  if (!authCookie) return null;

  pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
  const user = pb.authStore.model;

  return user as unknown as User;
}

export { getUserFromCookie };