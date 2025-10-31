import { ENV } from "@core/env";
import { TOKENS } from "@core/token";
import { Client } from "discord.js";
import { EventSource } from "eventsource";
import { container } from "tsyringe";
import { base64Encode, trimTrailingEquals } from "../lib/encoder";
import { wait } from "../lib/utils";
import { DiscordNtfy } from "./discordNtfy";

export class SubscribeNtfy {
  private url: string;
  private topic: string;
  private client: Client;
  private eventSource: EventSource;
  private discordNtfy: DiscordNtfy;

  constructor() {
    this.client = container.resolve<Client>(TOKENS.discord.client);
    this.url = ENV.NTFY_URL;
    this.topic = ENV.NTFY_TOPIC;
    this.discordNtfy = new DiscordNtfy();
  }

  connectNtfy() {
    const NTFY_SSE = this.authenticate();
    console.log(NTFY_SSE);

    console.log(`🔗 Connexion au flux SSE ntfy : ${this.url}`);
    this.eventSource = new EventSource(NTFY_SSE);
    this.eventSource.addEventListener("open", () => {
      console.log("✅ Connecté au flux ntfy !");
    });
  }

  authenticate() {
    const username = ENV.NTFY_USERNAME;
    const password = ENV.NTFY_PASSWORD;
    const authHeader64 = `Basic ${base64Encode(`${username}:${password}`)}`;
    const authToken = trimTrailingEquals(base64Encode(authHeader64));
    return `${this.url}/${this.topic}/sse?auth=${authToken}`;
  }

  onMessage() {
    try {
      this.eventSource.addEventListener("message", (event) => {
        console.log(`📩 Nouveau message ntfy !`);
        console.log(event.data);
        this.discordNtfy.sendBuildSuccessToChannel();
      });
    } catch (error) {
      console.error(`Error ntfy listener:  ${error.message}`);
    }
  }

  async subscribe() {
    this.connectNtfy();
    this.onMessage();
    this.onError();
  }

  onError() {
    try {
      this.eventSource.addEventListener("error", async (event) => {
        console.error(`Error ntfy listener:  ${event.message}`);
        await wait(3000);
        this.connectNtfy();
      });
    } catch (error) {
      console.error(`Error ntfy listener:  ${error.message}`);
    }
  }
}
