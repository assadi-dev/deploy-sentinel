import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SubscribeNtfy } from "@services/subscribeNtfy";
import { DiscordNtfy } from "@services/discordNtfy";
import { EventSource } from "eventsource";

// Mock des dépendances
/* vi.mock("@services/discordNtfy", () => ({
  DiscordNtfy: vi.fn(),
})); */
vi.mock("eventsource", () => ({
  EventSource: vi.fn(),
}));
vi.mock("tsyringe", () => ({
  container: {
    resolve: vi.fn(() => ({
      channels: {
        fetch: vi.fn(),
      },
    })),
  },
}));

vi.mock("@core/env", () => ({
  ENV: {
    NTFY_URL: "http://localhost:7274",
    NTFY_TOPIC: "test",
    NTFY_USERNAME: "test",
    NTFY_PASSWORD: "test",
    DISCORD_CHANNEL_ID: "test",
  },
}));

describe("SubscribeNtfy.onMessage", () => {
  let subscribeNtfy: SubscribeNtfy;
  let mockEventSource: any;
  let mockDiscordNtfy: any;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Réinitialiser les mocks
    vi.clearAllMocks();

    // Spy sur console.log et console.error
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock de EventSource
    mockEventSource = {
      addEventListener: vi.fn(),
      close: vi.fn(),
    };
    vi.mocked(EventSource).mockImplementation(() => mockEventSource);

    // Mock de DiscordNtfy
    mockDiscordNtfy = {
      sendBuildSuccessToChannel: vi.fn(),
    };
    //vi.mocked(DiscordNtfy).mockImplementation(() => mockDiscordNtfy);

    subscribeNtfy = new SubscribeNtfy();

    subscribeNtfy["eventSource"] = mockEventSource;
    subscribeNtfy["discordNtfy"] = mockDiscordNtfy;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("devrait ajouter un event listener pour les messages", () => {
    subscribeNtfy.onMessage();

    expect(mockEventSource.addEventListener).toHaveBeenCalledWith(
      "message",
      expect.any(Function)
    );
  });

  it("devrait logger le message reçu et appeler sendBuildSuccessToChannel", () => {
    subscribeNtfy.onMessage();

    const messageCallback = mockEventSource.addEventListener.mock.calls.find(
      (call: any) => call[0] === "message"
    )[1];

    const mockEvent = {
      data: JSON.stringify({
        id: "test123",
        title: "Build Success",
        message: "Test message",
      }),
    };

    messageCallback(mockEvent);

    expect(consoleLogSpy).toHaveBeenCalledWith("📩 Nouveau message ntfy !");
    expect(consoleLogSpy).toHaveBeenCalledWith(mockEvent.data);

    expect(mockDiscordNtfy.sendBuildSuccessToChannel).toHaveBeenCalledTimes(1);
  });

  it("devrait gérer les erreurs lors de l'ajout de l'event listener", () => {
    mockEventSource.addEventListener.mockImplementationOnce(() => {
      throw new Error("EventSource error");
    });

    subscribeNtfy.onMessage();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error ntfy listener:  EventSource error"
    );
  });

  it("devrait appeler sendBuildSuccessToChannel même si event.data est vide", () => {
    subscribeNtfy.onMessage();

    const messageCallback = mockEventSource.addEventListener.mock.calls.find(
      (call: any) => call[0] === "message"
    )[1];

    const mockEvent = {
      data: "",
    };

    messageCallback(mockEvent);

    expect(consoleLogSpy).toHaveBeenCalledWith("📩 Nouveau message ntfy !");
    expect(consoleLogSpy).toHaveBeenCalledWith("");
    expect(mockDiscordNtfy.sendBuildSuccessToChannel).toHaveBeenCalledTimes(1);
  });

  it("devrait gérer plusieurs messages successifs", () => {
    subscribeNtfy.onMessage();

    const messageCallback = mockEventSource.addEventListener.mock.calls.find(
      (call: any) => call[0] === "message"
    )[1];

    const mockEvent1 = { data: "message 1" };
    const mockEvent2 = { data: "message 2" };
    const mockEvent3 = { data: "message 3" };

    messageCallback(mockEvent1);
    messageCallback(mockEvent2);
    messageCallback(mockEvent3);

    expect(mockDiscordNtfy.sendBuildSuccessToChannel).toHaveBeenCalledTimes(3);
    expect(consoleLogSpy).toHaveBeenCalledTimes(6); // 2 logs par message (titre + data)
  });
});
