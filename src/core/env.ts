import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const EnvSchema = z.object({
  SERVER_ID: z.string(),
  APPLICATION_ID: z.string(),
  DISCORD_BOT_TOKEN: z.string(),
  NTFY_URL: z.string(),
});

export const ENV = EnvSchema.parse(process.env);
