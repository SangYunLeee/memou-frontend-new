import { NodeEntry } from "slate";
import { CustomText } from "@/interfaces/slate";

export const linkDecorator = ([node, path]: NodeEntry<CustomText>) => {
  const nodeText = node.text;
  if (!nodeText) return [];

  const urls = findUrlsInText(nodeText);
  return urls.map(([url, index]) => {
    return {
      anchor: {
        path,
        offset: index,
      },
      focus: {
        path,
        offset: index + url.length,
      },
      decoration: "link",
    };
  });
};

const findUrlsInText = (text: string): [string, number][] => {
  const urlRegex =
    // eslint-disable-next-line no-useless-escape
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

  const matches = text.match(urlRegex);

  return matches ? matches.map((m) => [m.trim(), text.indexOf(m.trim())]) : [];
};
