import "server-only";

import {
type Account as AccountType, 
Client, 
type Databases as DatabasesType,
Models, 
type Storage as StorageType,
type Users as UsersType,
Account,
Storage,
Databases,
} from "node-appwrite";

import {getCookie} from "hono/cookie";
import { AUTH_COOKIE } from "@/features/auth/constants";
import {createMiddleware} from "hono/factory";

type AdditionalContext = {
    Variables: {
        account: AccountType,
        databases: DatabasesType,
        storage: StorageType,
        users: UsersType,
        user: Models.User<Models.Preferences>,
    }
}
export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);
    console.log("Session Retrieved:", session);

    if (!session) {
        console.log("No session found, returning unauthorized.");
        return c.json({ error: "Unauthorized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);
    const user = await account.get();
    console.log("User Retrieved:", user);

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
});

