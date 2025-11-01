import { EMBED_COLORS } from "@core/embed";
import { cleanAndLowerCase, splitMessageToKeyValue } from "@lib/parser";
import {
  NtfyDetailKeys,
  NtfyInferModel,
  ntfySchemaModel,
} from "@models/ntfyModel";

export class NtfyHandlerContent {
  parseToNtfyData(inputs: unknown): NtfyInferModel {
    const validate = ntfySchemaModel.safeParse(inputs);
    if (validate.error) throw validate.error;
    return validate.data;
  }

  formatMessage(data: NtfyInferModel) {
    if (data.title.toLowerCase().includes("success")) {
      const contentMessage = this.mapMessage(data.message);
      return this.embedContent(data, EMBED_COLORS);
    }
  }

  embedContent(data: NtfyInferModel, color: string) {
    //https://discordjs.guide/legacy/popular-topics/embeds
  }

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
