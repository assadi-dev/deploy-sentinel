import { describe, it, expect, expectTypeOf, vi, beforeEach } from "vitest";
import { NTFY_MESSAGE_MOCK } from "@mocks/ntfyMessage";
import { NtfyHandlerContent } from "@services/ntfyHandlerContent";
import { ZodError } from "zod";
import { EmbedData, FormatMessageReturn } from "@models/discordMessageModel";
import { dockployMessageStrategy, truncateStringStrategy } from "@lib/strategy";

const makeSuccessPayload = () => NTFY_MESSAGE_MOCK.success;
const makeFailedPayload = () => NTFY_MESSAGE_MOCK.failed;

describe("ntfyHandlerContent.parseToNtfyData", () => {
  const handler = new NtfyHandlerContent();

  it("retourne l’objet parsé quand la payload est valide", () => {
    const input = makeSuccessPayload();
    const res = handler.parseToNtfyData(input);
    expect(res).toEqual(input);
    expect(res.title).toBeDefined();
    expect(res.message).toBeDefined();
    expect(res.actions).toBeDefined();
    expect(Array.isArray(res.actions)).toBe(true);
    expect(res.actions.length).greaterThan(0);
    expect(res.actions[0].url).toBeDefined();
  });

  it("Vérifie si dans le tableau actions si l'un des objets contient un url valide", () => {
    const input = makeSuccessPayload();
    const res = handler.parseToNtfyData(input);
    const actions = res.actions;
    expect(Array.isArray(actions)).toBe(true);
    expect(actions.length).greaterThan(0);
    expect(actions.some((item) => item.url.startsWith("http"))).toBe(true);
  });

  it("échoue si un champ requis manque (ex: message)", () => {
    const { message, ...withoutTitle } = makeSuccessPayload();
    expect(() => handler.parseToNtfyData(withoutTitle as any)).toThrow(
      ZodError
    );
    try {
      handler.parseToNtfyData(withoutTitle as any);
    } catch (e) {
      const ze = e as ZodError;
      expect(ze.issues.some((i) => i.path.join(".") === "message")).toBe(true);
    }
  });

  it("échoue si un objet d’`actions` est invalide (ex: url non-string)", () => {
    const bad = makeSuccessPayload();
    // @ts-expect-error: on invalide volontairement la shape
    bad.actions[0].url = 12345;
    expect(() => handler.parseToNtfyData(bad)).toThrow(ZodError);

    try {
      handler.parseToNtfyData(bad);
    } catch (e) {
      const ze = e as ZodError;

      const hasNestedUrlIssue = ze.issues.some(
        (i) =>
          i.path.length >= 3 && i.path[0] === "actions" && i.path[2] === "url"
      );
      expect(hasNestedUrlIssue).toBe(true);
    }
  });

  it("échoue si `time` ou `expires` ne sont pas des nombres", () => {
    const bad = { ...makeSuccessPayload(), time: "1700000000" as any };
    expect(() => handler.parseToNtfyData(bad)).toThrow(ZodError);
  });
});

describe("ntfyHandlerContent.mapMessage", () => {
  const handler = new NtfyHandlerContent();
  it(`Formate le message reçus par ntfy en clé valeur`, () => {
    const { message } = makeSuccessPayload();
    const res = handler.mapMessage(message);
    expect(res.get("application")).not.toBeNull();
    expect(res.get("project")).not.toBeNull();
    expect(res.get("type")).not.toBeNull();
    expect(res.get("date")).not.toBeNull();
    expect(res.get("error")).toBeDefined();
  });

  it(`Formate le message reçus par ntfy en clé valeur (avec la propriété error)`, () => {
    const { message } = makeFailedPayload();
    const res = handler.mapMessage(message);
    expect(res.get("error")).toBeDefined();
    expect(res.get("error")).not.toBeNull();
  });
});

describe(`ntfyHandlerContent.formatMessage`, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const handler = new NtfyHandlerContent();

  it("Devrait appeler isSuccess et embedContent", () => {
    const data = makeSuccessPayload();
    const isSuccessSpy = vi.spyOn(dockployMessageStrategy, "isSuccess");
    const embedContentSpy = vi.spyOn(handler as any, "embedContent");
    const result = handler.formatMessage(data);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
    expect(isSuccessSpy).toHaveBeenCalledTimes(1);
    expect(embedContentSpy).toHaveBeenCalledTimes(1);
  });
  it("Devrait appeler isFailed et embedContent", () => {
    const data = makeFailedPayload();
    const isFailedSpy = vi.spyOn(dockployMessageStrategy, "isFailed");
    const embedContentSpy = vi.spyOn(handler as any, "embedContent");
    const result = handler.formatMessage(data);
    expect(isFailedSpy).toHaveBeenCalledTimes(1);
    expect(embedContentSpy).toHaveBeenCalledTimes(1);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
  });

  it(`Generation Embed message en cas de success`, () => {
    const data = makeSuccessPayload();
    const result = handler.formatMessage(data);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
    const { content, embeds } = result;
    expect(content).not.toBeNull();
    expect(content).toContain("Build réussi");
    expectTypeOf(embeds).toEqualTypeOf<EmbedData[]>();
    expect(embeds.length).toBeGreaterThan(0);
    expectTypeOf(embeds[0]).toEqualTypeOf<EmbedData>();
  });
  it(`Generation Embed message en cas d’échec de build`, () => {
    const data = makeFailedPayload();
    const result = handler.formatMessage(data);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
    const { content } = result;
    expect(content).toContain("Build échoué");
  });

  it(`Devrait appeler setErrorField() et hasError() has lors de la generation du embed message en cas d’échec de build`, () => {
    const data = makeFailedPayload();
    const isFailedSpy = vi.spyOn(dockployMessageStrategy, "isFailed");
    const embedContentSpy = vi.spyOn(handler as any, "embedContent");
    const hasError = vi.spyOn(dockployMessageStrategy, "hasError");
    const result = handler.formatMessage(data);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
    expect(isFailedSpy).toHaveBeenCalledTimes(1);
    expect(embedContentSpy).toHaveBeenCalledTimes(1);
    expect(hasError).toHaveBeenCalledTimes(1);
  });

  it(`Devrait avoir au moins un element du tableau field avec comme name "🧾 Log d’erreur (extrait)"  lors de la generation du embed message en cas d’échec de build`, () => {
    const data = makeFailedPayload();
    const result = handler.formatMessage(data);
    expectTypeOf(result).toEqualTypeOf<FormatMessageReturn>();
    const { embeds } = result;
    const embed = embeds[0];
    expectTypeOf(embed).toEqualTypeOf<EmbedData>();
    const fields = embed.fields;
    expect(fields.length).toBeGreaterThan(0);
    expect(
      fields.some((item) => item.name === "🧾 Log d’erreur (extrait)")
    ).toBe(true);
  });
});
