import './style.css';
import { GraphQLQueryVisualizerApp } from './app';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    new GraphQLQueryVisualizerApp();
  } catch (error) {
    console.error('Failed to initialize GraphQL Query Visualizer:', error);
  }
});

// Handle hot module replacement for development
if (import.meta.hot) {
  import.meta.hot.accept();
}