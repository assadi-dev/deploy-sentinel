import { describe, it, expect } from "vitest";
import { NTFY_MESSAGE_MOCK } from "@mocks/ntfyMessage";
import { NtfyHandlerContent } from "@services/ntfyHandlerContent";
import { ZodError } from "zod";

const makeValidPayload = () => NTFY_MESSAGE_MOCK.success;

describe("ntfyHandlerContent.parseToNtfyData", () => {
  const handler = new NtfyHandlerContent();

  it("retourne l’objet parsé quand la payload est valide", () => {
    const input = makeValidPayload();
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
    const input = makeValidPayload();
    const res = handler.parseToNtfyData(input);
    const actions = res.actions;
    expect(Array.isArray(actions)).toBe(true);
    expect(actions.length).greaterThan(0);
    expect(actions.some((item) => item.url.startsWith("http"))).toBe(true);
  });

  it("échoue si un champ requis manque (ex: message)", () => {
    const { message, ...withoutTitle } = makeValidPayload();
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
    const bad = makeValidPayload();
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
    const bad = { ...makeValidPayload(), time: "1700000000" as any };
    expect(() => handler.parseToNtfyData(bad)).toThrow(ZodError);
  });
});
