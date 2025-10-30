import { TOKENS } from "@core/token";
import { Client } from "discord.js";
import { container } from "tsyringe";
import { client } from "../client";

export const registerDependencies = () => {
  container.registerInstance<Client>(TOKENS.discord.client, client);
};
