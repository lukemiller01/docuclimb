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
    featureUpdates: boolean
}

async function getUserFromUsername(username: string) {

    try {
        const user = await pb.collection('users').getFirstListItem(`username="${username}"`);
        return user as unknown as User;
    } catch (error) {
        console.log('Error:', error);
    }
}

export { getUserFromUsername };