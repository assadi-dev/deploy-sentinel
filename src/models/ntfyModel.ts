import z from "zod";

export const ntfyTagSchemaModel = z.array(z.string());

export const ntfyActionsSchemaModel = z.object({
  id: z.string(),
  action: z.string(),
  label: z.string(),
  clear: z.boolean(),
  url: z.string(),
});

export const ntfySchemaModel = z.object({
  id: z.string(),
  time: z.number(),
  expires: z.number(),
  event: z.string(),
  topic: z.string(),
  title: z.string(),
  message: z.string(),
  priority: z.number(),
  tags: ntfyTagSchemaModel,
  acttions: z.array(ntfyActionsSchemaModel),
});

export type NtfyInferModel = z.infer<typeof ntfySchemaModel>;
