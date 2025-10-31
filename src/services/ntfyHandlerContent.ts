import { NtfyInferModel, ntfySchemaModel } from "@models/ntfyModel";

export class NtfyHandlerContent {
  parseToNtfyData(inputs: unknown): NtfyInferModel {
    const validate = ntfySchemaModel.safeParse(inputs);
    if (validate.error) throw validate.error;
    return validate.data;
  }

  formatSuccessMessage(data: NtfyInferModel) {}

  embedSuccess(data: any) {}

  mapMessage(message: string) {}
}
