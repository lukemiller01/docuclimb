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

async function getUserFromUsername(username: string) {
    
    const user = await pb.collection('users').getFirstListItem(`username="${username}"`);

    return user as unknown as User;
}

export { getUserFromUsername };