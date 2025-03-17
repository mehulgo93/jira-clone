import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createWorkspaceSchema } from "../schemas";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
.post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const {name} = c.req.valid("form");
        const workspace = await databases.createDocument(DATABASE_ID, WORKSPACES_ID, ID.unique(), {
            name,
            userId: user.$id,
        });

        return c.json({data: workspace});
        
        
    }
)

export default app;
