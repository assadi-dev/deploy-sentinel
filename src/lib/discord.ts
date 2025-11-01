import { EMBED_COLORS } from "@core/embed";
import { ENV } from "@core/env";

const EMBED_DICTIONARY = () => {
  const packageVersion = "v2.3";

  return {
    content: {
      success: `✅ **[${ENV.APPLICATION_NAME}] Build réussi sur la branche principale**`,
      failed: `🚨 **[${ENV.APPLICATION_NAME}] Build échoué sur la branche principale**`,
      info: `ℹ️ [${ENV.APPLICATION_NAME}] Information importante`,
    },
    author: {
      name: `${ENV.APPLICATION_NAME} developer`,
      url: ENV.APPLICATION_WEBSITE,
      icon_url: ENV.BOT_APPLICATION_IMAGE,
    },
    description: {
      success: `Le déploiement du **${ENV.APPLICATION_NAME}** s’est terminé sans erreur.\nLe système est désormais **en production** et pleinement opérationnel. 🚀\n\n Le site est désormais en ligne !\n👉 [**Visiter le site**](https://mdt.dynasty8flashback.fr/)`,
      failed: `Le déploiement du **${ENV.APPLICATION_NAME}** n’a pas pu être complété.\nLes ingénieurs du service technique sont déjà sur le coup 🧑‍💻.\n\n`,
    },
    footer: {
      text: ` Système automatisé — Build monitor ${packageVersion}`,
      icon_url: ENV.BOT_APPLICATION_IMAGE,
    },
    image: {
      url: ENV.APPLICATION_IMAGE,
    },
    thumbnail: {
      url: ENV.APPLICATION_IMAGE,
    },
  };
};

export const EMBED_MESSAGE_TEMPLATE = {
  success: {
    color: EMBED_COLORS.success,
    title: "🟢 Build Success — Déploiement complet",
    url: "https://discord.js.org",
    description: EMBED_DICTIONARY.description.success,
    author: EMBED_DICTIONARY.author,
    thumbnail: {
      url: "https://i.imgur.com/AfFp7pu.png",
    },
    fields: [],
    image: EMBED_DICTIONARY.image,
    timestamp: new Date().toISOString(),
    footer: EMBED_DICTIONARY.footer,
  },
  failed: {
    color: EMBED_COLORS.danger,
    title: "❌ Build Failed — Pipeline interrompue",
    url: "https://discord.js.org",
    description: EMBED_DICTIONARY.description.failed,
    author: EMBED_DICTIONARY.author,
    thumbnail: {
      url: "https://i.imgur.com/AfFp7pu.png",
    },
    fields: [],
    image: EMBED_DICTIONARY.image,
    timestamp: new Date().toISOString(),
    footer: EMBED_DICTIONARY.footer,
  },
  info: {},
};
