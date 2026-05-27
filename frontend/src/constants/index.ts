export const THEMES: string[] = [
  "light",
  "dark",
];

export const HELP_CENTER_EMAIL: string = (import.meta.env as any).VITE_HELP_CENTER_EMAIL || "pansiluco@gmail.com";

export interface IEmoji {
  char: string;
  name: string;
}

export const EMOJIS: IEmoji[] = [
  { char: "😀", name: "smile" }, { char: "😂", name: "joy" }, { char: "😍", name: "heart_eyes" },
  { char: "👍", name: "thumbsup" }, { char: "🙌", name: "raised_hands" }, { char: "🔥", name: "fire" },
  { char: "❤️", name: "heart" }, { char: "✨", name: "sparkles" }, { char: "🎉", name: "tada" },
  { char: "😎", name: "sunglasses" }, { char: "🤔", name: "thinking" }, { char: "😢", name: "cry" },
  { char: "😮", name: "open_mouth" }, { char: "👏", name: "clap" }, { char: "🚀", name: "rocket" },
  { char: "💯", name: "100" }, { char: "🙏", name: "pray" }, { char: "✅", name: "check" },
];
