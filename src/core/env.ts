import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const EnvSchema = z.object({
  SERVER_ID: z.string(),
  APPLICATION_ID: z.string(),
  DISCORD_BOT_TOKEN: z.string(),
});

export const ENV = EnvSchema.parse(process.env);

ENV.DISCORD_BOT_TOKEN;
