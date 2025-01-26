import { auth } from '@clerk/nextjs/server'

export default async function Auth() {
  const { userId } = await auth()
    if(userId){

    }

  return 
}