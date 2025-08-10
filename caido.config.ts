import { defineConfig } from "@caido-community/dev";

export default defineConfig({
  id: "graphql-visualizer",
  name: "GraphQL Visualizer",
  description: "A plugin to visualize GraphQL queries.",
  version: "0.1.0",
  author: {
    name: "Jules",
    email: "jules@example.com",
    url: "https://example.com",
  },
  plugins: [
    {
      kind: "frontend",
      id: "graphql-visualizer-frontend",
      name: "GraphQL Visualizer Frontend",
      root: "packages/frontend",
    },
  ],
});
