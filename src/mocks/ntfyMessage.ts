import { NtfyInferModel } from "@models/ntfyModel";

export const NTFY_MESSAGE_MOCK = {
  success: {
    id: "jTg1JSFmtGNO",
    time: 1761933465,
    expires: 1761976665,
    event: "message",
    topic: "deployment",
    title: "Build Success",
    message:
      "🛠Project: Notifications\n⚙️Application: ntfy\n❔Type: compose\n🕒Date: 10/31/2025, 5:57:45 PM",
    priority: 5,
    tags: ["white_check_mark"],
    actions: [
      {
        id: "qWo1AZR1PG",
        action: "view",
        label: "Build details",
        clear: true,
        url: "http://212.227.194.86:3000/dashboard/project/MjfFDljPAfpHaF7N-EXZP/environment/fPz2TzdwjlUsf1AKX2nHS/services/compose/s9GV8aBIVe2IbkWAVOZVx?tab=deployments",
      },
    ],
  },
  failed: {
    id: "WyjD2wGuSDO8",
    time: 1761939007,
    expires: 1761982207,
    event: "message",
    topic: "deployment",
    title: "Build Failed",
    message:
      "🛠️Project: Notifications\n⚙️Application: ntfy\n❔Type: compose\n🕒Date: 10/31/2025, 7:30:08 PM\n⚠️Error:\nvalidating /etc/dokploy/compose/notifications-ntfy-cjwo1g/code/docker-compose.yml: services.ntfy additional properties 'tunnel' not allowed",
    priority: 5,
    tags: ["warning"],
    actions: [
      {
        id: "7e7mF6TJMf",
        action: "view",
        label: "Build details",
        clear: true,
        url: "http://212.227.194.86:3000/dashboard/project/MjfFDljPAfpHaF7N-EXZP/environment/fPz2TzdwjlUsf1AKX2nHS/services/compose/s9GV8aBIVe2IbkWAVOZVx?tab=deployments",
      },
    ],
  },
} satisfies {
  success: NtfyInferModel;
  failed: NtfyInferModel;
};
