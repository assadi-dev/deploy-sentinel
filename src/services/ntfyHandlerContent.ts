import { EMBED_COLORS } from "@core/embed";
import { EMBED_DICTIONARY, EMBED_MESSAGE_TEMPLATE } from "@lib/discord";
import { cleanAndLowerCase, splitMessageToKeyValue } from "@lib/parser";
import { dockployMessageStrategy, truncateStringStrategy } from "@lib/strategy";
import {
  EmbedContent,
  EmbedData,
  FormatMessageReturn,
} from "@models/discordMessageModel";
import { EmbedTypeMessage } from "@models/discordActionModel";
import {
  NtfyDetailKeys,
  NtfyInferModel,
  ntfySchemaModel,
} from "@models/ntfyModel";
import { title } from "process";

export class NtfyHandlerContent {
  parseToNtfyData(inputs: unknown): NtfyInferModel {
    const validate = ntfySchemaModel.safeParse(inputs);
    if (validate.error) throw validate.error;
    return validate.data;
  }

  formatMessage(data: NtfyInferModel): FormatMessageReturn {
    let message: EmbedContent;
    dockployMessageStrategy.isSuccess(data, (res) => {
      if (!res) return;
      message = this.embedContent(res, "success");
      return message;
    });
    dockployMessageStrategy.isFailed(data, (res) => {
      if (!res) return;
      message = this.embedContent(res, "failed");
      return message;
    });
    return message;
  }

  private embedContent(
    data: NtfyInferModel,
    type: EmbedTypeMessage
  ): EmbedContent {
    //https://discordjs.guide/legacy/popular-topics/embeds
    const ntfyMessage = this.mapMessage(data.message);
    const content = EMBED_DICTIONARY().content[type];
    const embed = EMBED_MESSAGE_TEMPLATE()[type];

    const errorLog = ntfyMessage.get("error");
    dockployMessageStrategy.hasError(errorLog, (errorMsg) =>
      this.setErrorField(embed, errorMsg)
    );
    return { content, embeds: [embed] };
  }

  private setErrorField = (embed: EmbedData, errorMessage: string) => {
    const errorLog: string =
      truncateStringStrategy.discordLimit(errorMessage) || "";

    embed.fields = [
      {
        name: "🧾 Log d’erreur (extrait)",
        value: `\`\`\`shell\n${errorLog}\n\`\`\``,
      },
    ];
  };

  mapMessage(message: string) {
    const map = new Map<NtfyDetailKeys, any>();

    const splitMessage = message.replace(":\n", ":").split("\n");
    map.set("error", null);
    splitMessage.forEach((item) => {
      const splitItem = splitMessageToKeyValue(item);
      map.set(
        cleanAndLowerCase(splitItem[0]).trim() as NtfyDetailKeys,
        splitItem[1].trim()
      );
    });

    return map;
  }
}
