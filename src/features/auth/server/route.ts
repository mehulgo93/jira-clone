import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { AUTH_COOKIE } from "../constants";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middlware";
const app = new Hono()
.post(
    "/login",
    zValidator("json", loginSchema),
    async(c) =>  {
        const {email, password} = c.req.valid("json");
        const {account} = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        
        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({success: true, user: session.$id})
    }
)
.post(
    "/register",
    zValidator("json", registerSchema),
    async (c) =>  {
        const {name, email, password} = c.req.valid("json");
        const {account} = await createAdminClient();
        const user = await account.create(ID.unique(), email, password, name);
        const session = await account.createEmailPasswordSession(email, password);
        
        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
        });

        return c.json({success: true, user: user.$id})
    }
)

.post(
    "/logout", sessionMiddleware,
     (c) =>  {
        const account = c.get("account");
        deleteCookie(c, AUTH_COOKIE);
        return c.json({success: true})
    }
)

export default app;


//using as many as custom params using zvalidator in order to validate the request body
// using a middleware before the route handler to validate the request body
// using a route handler to handle the request
// using a response to send the response to the client
// using a middleware to handle the error
// using a middleware to handle the request
// using a middleware to handle the response
// using a middleware to handle the error   

// using appwrite is a way to create a user and a session and it is ideal for storing user data in the database
// using a cookie to store the session id and it is ideal for storing user data in the database
// using appwrite with Hono is really easy and seamless and it is really ideal if you want to make a production ready application.
// using a middleware to handle the error, so in case if the user doesn't have a session id, then the user will be redirected to the login page.
