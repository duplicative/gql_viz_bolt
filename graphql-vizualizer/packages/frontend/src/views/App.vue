<script setup lang="ts">
import { onMounted } from "vue";
import { GraphQLVisualizerApp } from "../app";
import { useSDK } from "../plugins/sdk";

const sdk = useSDK();

onMounted(() => {
  new GraphQLVisualizerApp(sdk);
});
</script>

<template>
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
</template>
