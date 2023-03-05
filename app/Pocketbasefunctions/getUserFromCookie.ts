import { ReadonlyRequestCookies } from 'next/dist/server/app-render'
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
  description: string
  featureUpdates: boolean
  base64: string
}

function getUserFromCookie(cookies: ReadonlyRequestCookies): User | null {

  const authCookie = cookies.get("pb_auth");

  if (!authCookie) return null;

  pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
  const user = pb.authStore.model;

  return user as unknown as User;
}

export { getUserFromCookie };