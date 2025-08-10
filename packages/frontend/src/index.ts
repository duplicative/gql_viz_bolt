import type { Caido } from "@caido/sdk-frontend";
import "./style.css";
import { GraphQLVisualizerApp } from "./app";

const createPage = (sdk: Caido, app: GraphQLVisualizerApp) => {
  const appContainer = document.createElement("div");
  appContainer.id = "app-container";

  appContainer.innerHTML = `
    <header class="app-header">
      <h1>GraphQL Query Visualizer</h1>
      <p>Visualize and edit your GraphQL queries with an interactive tree diagram</p>
    </header>

    <main class="app-main">
      <div class="panel-container">
        <!-- Left Panel -->
        <div class="left-panel">
          <div class="panel-header">
            <h2>GraphQL Query</h2>
            <button id="visualize-btn" class="visualize-btn">Visualize</button>
          </div>
          <div class="query-input-container">
            <textarea
              id="query-input"
              class="query-input"
              placeholder="Paste your GraphQL query or HTTP request body JSON here..."
              spellcheck="false"
            ></textarea>
            <div id="error-message" class="error-message hidden"></div>
            <div id="status-indicator" class="status-indicator">
              <span class="status-dot"></span>
              <span class="status-text">Ready</span>
            </div>
          </div>
        </div>

        <!-- Resizable Divider -->
        <div class="divider" id="divider"></div>

        <!-- Right Panel -->
        <div class="right-panel">
          <div class="panel-header">
            <h2>Query Structure</h2>
            <div class="diagram-controls">
              <button id="reset-zoom" class="control-btn" title="Reset Zoom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="21 21l-4.35-4.35"/>
                </svg>
              </button>
              <button id="zoom-in" class="control-btn" title="Zoom In">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="21 21l-4.35-4.35"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                </svg>
              </button>
              <button id="zoom-out" class="control-btn" title="Zoom Out">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="21 21l-4.35-4.35"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="visualization-container">
            <div id="visualization" class="visualization">
              <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                </svg>
                <p>Enter a GraphQL query to see its structure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;

  const card = sdk.ui.card({
    body: appContainer,
  });

  sdk.navigation.addPage("/graphql-visualizer", {
    body: card,
    onEnter: () => {
      // Re-initialize the app every time the page is entered
      // This is necessary because the DOM elements are recreated
      new GraphQLVisualizerApp(sdk);
    }
  });

  sdk.sidebar.registerItem("GraphQL Visualizer", "/graphql-visualizer", {
    icon: "fas fa-sitemap",
  });
};

export function init(sdk: Caido) {
  let app: GraphQLVisualizerApp | null = null;

  createPage(sdk, app as any);

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
}
