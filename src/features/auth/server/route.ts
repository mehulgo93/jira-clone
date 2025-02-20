import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()
.post(
    "/login",
    zValidator("json", z.object({
    email: z.string().email(),
    password: z.string().min(8),
})), (c) =>  {
    return c.json({ success: true });
})

export default app;


//using as many as custom params using zvalidator in order to validate the request body