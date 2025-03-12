import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./constants";
export const getCurrent = async () => {
    try {
    const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

    const session = await cookies().get(AUTH_COOKIE);
    console.log("Session Retrieved:", session);
    if (!session) {
        console.log("No session found, returning null, redirecting to sign-in");
        return null;
    }
    client.setSession(session.value);
    const account = new Account(client);
   
   const user =  await account.get();
   console.log(user)
   return user
}
     catch (error) {
        console.error(error);
        return null;
        
    }
}