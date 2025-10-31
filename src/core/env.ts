import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const EnvSchema = z.object({
  SERVER_ID: z.string(),
  APPLICATION_ID: z.string(),
  DISCORD_BOT_TOKEN: z.string(),
  DISCORD_CHANNEL_ID: z.string(),
  NTFY_URL: z.string(),
  NTFY_TOPIC: z.string(),
  NTFY_USERNAME: z.string(),
  NTFY_PASSWORD: z.string(),
});

export const ENV = EnvSchema.parse(process.env);
