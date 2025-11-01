import { cleanAndLowerCase, splitMessageToKeyValue } from "@lib/parser";
import { dockployMessageStrategy } from "@lib/strategy";
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

  formatMessage(data: NtfyInferModel) {
    let message: any = "";
    dockployMessageStrategy.isSuccess(
      title,
      () => (message = this.embedContent(data, "success"))
    );
    dockployMessageStrategy.isFailed(
      title,
      () => (message = this.embedContent(data, "failed"))
    );
  }

  embedContent(data: NtfyInferModel, type: EmbedTypeMessage) {
    //https://discordjs.guide/legacy/popular-topics/embeds
    const contentMessage = this.mapMessage(data.message);
    return contentMessage;
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
