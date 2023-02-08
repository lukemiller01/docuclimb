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

async function getUserFromId(id: string) {
    
    // const user = await pb.collection('users').getOne(id);
    const user = pb.collection('users').getFirstListItem(`id="${id}"`);

    return user as unknown as User;
}

export { getUserFromId };