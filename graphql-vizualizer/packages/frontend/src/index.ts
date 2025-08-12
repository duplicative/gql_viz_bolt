import { Classic } from "@caido/primevue";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

import { SDKPlugin } from "./plugins/sdk";
import "./styles/index.css";
import type { FrontendSDK } from "./types";
import App from "./views/App.vue";
import { GraphQLVisualizerApp } from "./app";

// This is the entry point for the frontend plugin
export const init = (sdk: FrontendSDK) => {
  const app = createApp(App);

  // Load the PrimeVue component library
  app.use(PrimeVue, {
    unstyled: true,
    pt: Classic,
  });

  // Provide the FrontendSDK
  app.use(SDKPlugin, sdk);

  // Create the root element for the app
  const root = document.createElement("div");
  Object.assign(root.style, {
    height: "100%",
    width: "100%",
  });

  // Set the ID of the root element
  // Replace this with the value of the prefixWrap plugin in caido.config.ts
  // This is necessary to prevent styling conflicts between plugins
  root.id = `plugin--frontend-vue`;

  // Mount the app to the root element
  app.mount(root);

  const card = sdk.ui.card({
    body: root,
  });

  sdk.navigation.addPage("/graphql-visualizer", {
    body: card,
  });

  sdk.sidebar.registerItem("GraphQL Visualizer", "/graphql-visualizer", {
    icon: "fas fa-sitemap",
  });

  sdk.commands.register("graphql-visualizer.visualize", {
    name: "Visualize GraphQL Query",
    run: (context) => {
      if (context.type === "RequestRowContext" && context.requests.length > 0) {
        const request = context.requests[0];

        // This is a bit of a hack, as the SDK doesn't directly expose the request body yet.
        // We assume the raw property contains the full request, and we can parse the body from it.
        const rawRequest = (request as any).raw as string;
        const bodyMatch = rawRequest.match(/(\r\n\r\n|\n\n)(.*)/s);
        if (bodyMatch && bodyMatch[2]) {
            const body = bodyMatch[2];
            sdk.navigation.goTo("/graphql-visualizer");

            setTimeout(() => {
                const appInstance = new GraphQLVisualizerApp(sdk);
                appInstance.setQuery(body);
            }, 100);
        } else {
            sdk.window.showToast("No body found in the selected request.", { variant: "warning" });
        }

      } else {
        sdk.window.showToast("Please select a request to visualize.", { variant: "info" });
      }
    },
  });

  sdk.menu.registerItem({
    type: "RequestRow",
    commandId: "graphql-visualizer.visualize",
    leadingIcon: "fas fa-sitemap",
  });
};
