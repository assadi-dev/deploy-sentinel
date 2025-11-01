import z from "zod";

export const ntfyTagSchemaModel = z.array(z.string());

export const ntfyActionsSchemaModel = z.object({
  id: z.string(),
  action: z.string(),
  label: z.string(),
  clear: z.boolean(),
  url: z.url(),
});

export const ntfySchemaModel = z.object({
  id: z.string(),
  time: z.number().int().nonnegative(),
  expires: z.number().int().nonnegative(),
  event: z.string(),
  topic: z.string(),
  title: z.string(),
  message: z.string(),
  priority: z.number().int().min(1).max(5),
  tags: ntfyTagSchemaModel,
  actions: z.array(ntfyActionsSchemaModel).nonempty(),
});

export type NtfyInferModel = z.infer<typeof ntfySchemaModel>;

export type NtfyDetail = {
  project: string;
  application: string;
  type: string;
  date: string;
  error: string | null;
};

export enum NtfyDetailEnum {
  project = "project",
  application = "application",
  type = "type",
  date = "date",
  error = "error",
}

export type NtfyDetailKeys = keyof typeof NtfyDetailEnum;
