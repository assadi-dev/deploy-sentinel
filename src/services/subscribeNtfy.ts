import { ENV } from "@core/env";
import { TOKENS } from "@core/token";
import { Client } from "discord.js";
import { EventSource } from "eventsource";
import { container } from "tsyringe";

export class SubscribeNtfy {
  private ntfyUrl: string;
  private client: Client;
  private eventSource: EventSource;

  constructor() {
    this.client = container.resolve<Client>(TOKENS.discord.client);
    this.ntfyUrl = ENV.NTFY_URL;
  }

  connectNtfy() {
    const NTFY_SSE = `${this.ntfyUrl}/sse`;
    console.log(`🔗 Connexion au flux SSE ntfy : ${NTFY_SSE}`);
    this.eventSource = new EventSource(NTFY_SSE);
    this.eventSource.onopen = () => {
      console.log("✅ Connecté au flux ntfy !");
    };
  }

  const;

  subscribe() {
    this.connectNtfy();
  }
}
