import "@rushstack/eslint-patch/modern-module-resolution";
import next from "eslint-config-next";

export default [
  {
    ignores: ["**/node_modules/**", ".next/**"]
  },
  ...next()
];
