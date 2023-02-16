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

async function getUserFromId(id: string) {
    
    try {
        const user = await pb.collection('users').getFirstListItem(`id="${id}"`);
        return user as unknown as User;
    } catch (error) {
        console.log(error);
    }
}

export { getUserFromId };