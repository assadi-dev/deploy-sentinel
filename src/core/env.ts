import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const EnvSchema = z.object({
  SERVER_ID: z.string(),
  BOT_APPLICATION_IMAGE: z.string(),
  APPLICATION_NAME: z.string(),
  APPLICATION_IMAGE: z.url(),
  APPLICATION_EMBED_THUMBNAIL: z.url(),
  APPLICATION_WEBSITE: z.url(),
  DOCKPLOY_APPLICATION_ID: z.string(),
  DISCORD_BOT_TOKEN: z.string(),
  DISCORD_CHANNEL_ID: z.string(),
  NTFY_URL: z.string(),
  NTFY_TOPIC: z.string(),
  NTFY_USERNAME: z.string(),
  NTFY_PASSWORD: z.string(),
});

export const ENV = EnvSchema.parse(process.env);
