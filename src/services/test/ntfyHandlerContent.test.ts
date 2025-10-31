import { describe, it, expect } from "vitest";
import { NTFY_MESSAGE_MOCK } from "@mocks/ntfyMessage";
import { NtfyHandlerContent } from "@services/ntfyHandlerContent";

const makeValidPayload = () => NTFY_MESSAGE_MOCK.success;

describe("ntfyHandlerContent.parseToNtfyData", () => {
  const handler = new NtfyHandlerContent();

  it("retourne l’objet parsé quand la payload est valide", () => {
    const input = makeValidPayload();
    const res = handler.parseToNtfyData(input);
    expect(res).toEqual(input);
    expect(res.title).toBeDefined();
    expect(res.message).toBeDefined();
    expect(res.acttions).toBeDefined();
    expect(Array.isArray(res.acttions)).toBe(true);
    expect(res.acttions[0].url).toBeDefined();
  });
});
