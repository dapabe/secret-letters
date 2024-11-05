import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui, { type Theme } from "daisyui";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["fantasy"] satisfies Theme[],
  }
} satisfies Config & {daisyui: typeof daisyui.config};
