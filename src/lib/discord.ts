import { EMBED_COLORS } from "@core/embed";
import { ENV } from "@core/env";
import { PACKAGE_VERSION } from "@core/package";
import { EmbedType } from "discord.js";

export const EMBED_DICTIONARY = () => {
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
      text: ` Système automatisé — Build monitor ${PACKAGE_VERSION}`,
      icon_url: ENV.BOT_APPLICATION_IMAGE,
    },
    image: {
      url: ENV.APPLICATION_IMAGE,
    },
    thumbnail: {
      url: ENV.BOT_APPLICATION_IMAGE,
    },
  };
};

export const EMBED_MESSAGE_TEMPLATE = () => {
  const { description, author, image, thumbnail, footer } = EMBED_DICTIONARY();

  return {
    success: {
      color: EMBED_COLORS.success,
      title: "🟢 Build Success — Déploiement complet",
      url: "https://discord.js.org",
      description: description.success,
      author: author,
      thumbnail: thumbnail,
      fields: [],
      image: image,
      timestamp: new Date().toISOString(),
      footer: footer,
    },
    failed: {
      color: EMBED_COLORS.danger,
      title: "❌ Build Failed — Pipeline interrompue",
      url: "https://discord.js.org",
      description: description.failed,
      author: author,
      thumbnail: thumbnail,
      fields: [],
      image: image,
      timestamp: new Date().toISOString(),
      footer: footer,
    },
    info: null,
  } satisfies {
    success: EmbedType;
    failed: EmbedType;
    info?: EmbedType | null;
  };
};
