import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
.post(
    "/login",
    zValidator("json", loginSchema),
    (c) =>  {
        const {email, password} = c.req.valid("json");
        console.log(name, email, password);
        return c.json({ email, password });
    }
)
.post(
    "/register",
    zValidator("json", registerSchema),
    async (c) =>  {
        const {name, email, password} = c.req.valid("json");
        console.log(email, password);
        return c.json({ name, email, password });
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