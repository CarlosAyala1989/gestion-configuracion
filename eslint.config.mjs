import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "storage/**",
      "tmp/**",
      "tsconfig.tsbuildinfo"
    ]
  }
];

export default eslintConfig;
