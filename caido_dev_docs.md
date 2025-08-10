<page>
  <title>Configuring your Package | Developer</title>
  <url>https://developer.caido.io/guides/config.html</url>
  <content>Caido packages are configured using the `caido.config.ts` file. This file is located in the root of your plugin's directory. This file is used by the `caido-dev` CLI to build your plugin into a `plugin_package.zip` file.

If you've created a new package with `pnpm create @caido-community/plugin`, the `caido.config.ts` file will be created for you.

Here's what a typical `caido.config.ts` file looks like:

ts

    import { defineConfig } from "@caido-community/dev";
    
    export default defineConfig({
      id: "my-plugin",
      name: "My Plugin",
      description: "A plugin for Caido",
      version: "0.0.0",
      author: {
        name: "Caido Labs Inc.",
        email: "dev@caido.io",
        url: "https://caido.io"
      },
      plugins: [
        {
          kind: "frontend",
          id: "my-frontend",
          name: "My Frontend",
          root: "packages/my-frontend",
          backend: {
            id: "my-backend"
          }
        },
        {
          kind: "backend",
          id: "my-backend",
          name: "My Backend",
          root: "packages/my-backend",
        }
      ]
    });

You can find more information about the `caido.config.ts` file in the [Config Reference](https://developer.caido.io/reference/config.html) page.

Updating Package Details [​](#updating-package-details)
-------------------------------------------------------

Most plugins will only need to update the `id`, `name`, `description`, `author`, and `version` fields.

### ID [​](#id)

The `id` field is a unique identifier used to identify your plugin in Caido. This must be a string that is unique across all plugins.

### Name [​](#name)

The `name` field is the name of your plugin. This is the name that will be displayed when a user installs your plugin.

Keep your names concise, and avoid using the term "Caido" in the name. (e.g. "Auth Tester" instead of "Caido Auth Tester")

### Description [​](#description)

The `description` field is a short description of your plugin. This will be displayed when a user installs your plugin.

The `author` field is an object comprised of a `name`, `email`, and `url`.

*   `name` is the name of the author.
*   `email` is a contact email address for the author.
*   `url` is a URL that links to the author's website.

### Version [​](#version)

The `version` field is a string that represents the version of your plugin using [Semantic Versioning](https://semver.org/).

When creating a new release of your plugin, you should increment this version number.

Updating Plugin Details [​](#updating-plugin-details)
-----------------------------------------------------

Packages are comprised of one or more plugins that may need to be configured differently. You can find more information about plugins in the [Plugin Architecture](https://developer.caido.io/concepts/essentials/package.html) page.

These options usually don't need to be updated, but you can if needed.

### Frontend Plugins [​](#frontend-plugins)

For frontend plugins, `caido-dev` uses [Vite](https://vitejs.dev/) to build your plugin. This means you can specify additional Vite options in your `caido.config.ts` file.

If you created your package with `pnpm create @caido-community/plugin`, the `caido.config.ts` file will be created with a default set of Vite options. We suggest you start with these options, and then update them if needed.

### Backend Plugins [​](#backend-plugins)

For backend plugins, `caido-dev` uses [tsup](https://tsup.egoist.dev/) to build your plugin. The `tsup` options are not currently configurable.</content>
</page>

<page>
  <title>Creating a Page | Developer</title>
  <url>https://developer.caido.io/guides/components/page.html</url>
  <content>Plugin pages provide a graphical user interface in the Caido application. There are multiple SDK objects and methods available to assist you in customization.

navigation [​](#navigation)
---------------------------

Used to create pages in the application and navigate to them.

### Adding a Page [​](#adding-a-page)

ts

    sdk.navigation.addPage("/my-plugin-page", {
        body: card;
        topbar: bar;
    });

This creates a page of which the contents are the [card](#creating-a-card) you will learn how to create below.

The `topbar` property is optional and appears to the right of the Caido logo in the top-left corner.

WARNING

The inclusion of a topbar will remove the Browser button, >\_Commands button, Forwarding/Queuing button, Project Dropdown Menu and Account Menu from the top-right corner of the Caido UI in your plugin page.

### Navigating to a Page [​](#navigating-to-a-page)

ts

    sdk.navigation.goTo("/my-plugin-page");

Used to add an entry to the left-hand navigation menu in the Caido user-interface to navigate between pages.

ts

    sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
      icon: "fas fa-rocket",
    });

The `icon` property is optional and adds a [FontAwesome](https://fontawesome.com/icons) icon at the leading side of the button.

INFO

*   The `group` property is optional and dictates which category the entry will be under in the left-hand side menu.
*   The `isExternal` property is optional and takes a boolean value of _true_ if the path points to an external URL.

ui [​](#ui)
-----------

Used to create visual elements. Content options for each element are also provided. These elements provide a way to sectionalize the user-interface of your plugin.

### Creating a Button [​](#creating-a-button)

ts

    const deleteButton = sdk.ui.button({
      variant: "primary",
      label: "Delete",
      trailingIcon: "fas fa-trash-can",
      size: "small",
    });

All button properties are optional and include:

*   `variant` - Specifies the button type and can have a value of `"primary"`, `"secondary"` or `"tertiary"`.
*   `label` - Specifies the inner string within the button.
*   `leadingIcon` - Adds an icon at the leading side of the button.
*   `trailingIcon` - Addsan icon at the trailing side of the button.
*   `size` - Specifies the button size and can have a value of `"small"`, `"medium"` or `"large"`.

### Creating a Card [​](#creating-a-card)

ts

    const card = sdk.ui.card({
      header: headerContainer,
      body: bodyText,
      footer: footerText,
    });

A **card** is a layout component. Similar to an HTML file, Cards consist of `header`, `body` and `footer` properties.

All properties are optional. The value of each property is a defined HTML element.

TIP

To use multiple HTML elements, combine them using `<div></div>` tags:

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "starterkit-plugin-backend";
    
    export type CaidoSDK = Caido<API>;
    
    const createPage = (sdk: CaidoSDK) => {
      const headerText = document.createElement("h1");
      headerText.textContent = "Hello world!";
    
      const subText = document.createElement("p");
      subText.textContent = "Lorem ipsum.";
    
      const bodyText = document.createElement("p");
      bodyText.textContent = "Paragraph.";
    
      const footerText = document.createElement("p");
      footerText.textContent = "Footer text.";
    
      const headerContainer = document.createElement("div");
      headerContainer.appendChild(headerText);
      headerContainer.appendChild(subText);
    
      const bar = document.createElement("p");
      bar.textContent = "Topbar.";
    
      const card = sdk.ui.card({
        header: headerContainer,
        body: bodyText,
        footer: footerText,
      });
    
      sdk.navigation.addPage("/my-plugin-page", {
        body: card,
        topbar: bar,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      // Register commands
      // Commands are registered with a unique identifier and a handler function
      // The run function is called when the command is executed
      // These commands can be registered in various places like command palette, context menu, etc.
    
      // Register page
      createPage(sdk);
    
      // Register sidebar
      sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
        icon: "fas fa-rocket",
      });
    };

The `init` function contains the `createPage(sdk)` function to register the page and the `.registerItem` method to make it available in the sidebar when the plugin initializes.

### Creating a Well [​](#creating-a-well)

ts

    const well = sdk.ui.well({
      header: title,
      body: paragraph,
      footer: advisory,
    });

A **well** is a layout component. Wells are similar to cards in that they consist of `header`, `body` and `footer` properties.

All properties are optional. The value of each property is a defined HTML element.

### Creating a Request Editor [​](#creating-a-request-editor)

ts

    const reqEditor = sdk.ui.httpRequestEditor();
    const reqEditorPane = reqEditor.getElement();

### Creating a Response Editor [​](#creating-a-response-editor)

ts

    const respEditor = sdk.ui.httpResponseEditor();
    const respEditorPane = respEditor.getElement();

TIP

For an example of a page with request and response editors, expand the following:

Example

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "starterkit-plugin-backend";
    
    export type CaidoSDK = Caido<API>;
    
    const createPage = (sdk: CaidoSDK) => {
      const headerText = document.createElement("h1");
      headerText.textContent = "Hello world!";
    
      const subText = document.createElement("p");
      subText.textContent = "Lorem ipsum.";
    
      const bodyText = document.createElement("p");
      bodyText.textContent = "Paragraph.";
    
      const reqEditor = sdk.ui.httpRequestEditor();
      const reqEditorPane = reqEditor.getElement();
      const respEditor = sdk.ui.httpResponseEditor();
      const respEditorPane = respEditor.getElement();
    
      const footerText = document.createElement("p");
      footerText.textContent = "Footer text.";
    
      const headerContainer = document.createElement("div");
      headerContainer.appendChild(headerText);
      headerContainer.appendChild(subText);
    
      const bodyContainer = document.createElement("div");
      bodyContainer.appendChild(bodyText);
    
      const editorsContainer = document.createElement("div");
      editorsContainer.classList.add("editors-container");
    
      reqEditorPane.classList.add("editor-pane");
      respEditorPane.classList.add("editor-pane");
    
      editorsContainer.appendChild(reqEditorPane);
      editorsContainer.appendChild(respEditorPane);
    
      bodyContainer.appendChild(editorsContainer);
    
      const bar = document.createElement("p");
      bar.textContent = "Topbar.";
    
      const card = sdk.ui.card({
        header: headerContainer,
        body: bodyContainer,
        footer: footerText,
      });
    
      sdk.navigation.addPage("/my-plugin-page", {
        body: card,
        topbar: bar,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      createPage(sdk);
      sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
        icon: "fas fa-rocket",
      });
    };

TIP

To view the CSS rules of the editors shown below, expand the following:

Example

css

    .editors-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 100%;
    }
    
    .editor-pane {
      flex: 1;
      min-width: 300px;
      min-height: 500px;
      margin: 0 10px;
    }
    
    .editor-pane h2 {
      margin: 0;
      padding: 10px;
      border-radius: 4px;
    }

window [​](#window)
-------------------

Used to interact with text within the application environment, allowing text selection, replacement, read permission designations, focusing and editor related messaging.

### Interacting with Text Within Editors [​](#interacting-with-text-within-editors)

ts

    let currentSelection = sdk.window.getActiveEditor()?.getSelectedText();

This takes the value of the current highlight-selected text and stores it in a variable.

ts

    sdk.window
      .getActiveEditor()
      ?.replaceSelectedText("Text that will replace the selection.");

This takes the value of the current highlight-selected text and replaces it with the arguement value.

### Displaying a Toast Message [​](#displaying-a-toast-message)

ts

    sdk.window.showToast("Message to display.", {
      variant: "info",
      duration: 3000,
    });

This displays a banner containing the specified message.

All message properties are optional and include:

*   `variant` - Specifies the message type and can have a value of `"success"`, `"error"`, `"warning"` or `"info"`.
*   `duration` - Specifies the amount of time a message will be displayed in milliseconds.

TIP

For an example of how to trigger Toast messages on button clicks, expand the following:

Example

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "starterkit-plugin-backend";
    
    export type CaidoSDK = Caido<API>;
    
    const createPage = (sdk: CaidoSDK) => {
      const messageButton = sdk.ui.button({
        variant: "primary",
        label: "Message Button",
      });
    
      messageButton.addEventListener("click", async () => {
        sdk.window.showToast("Message to display.", {
          variant: "info",
          duration: 3000,
        });
      });
    
      const headerText = document.createElement("h1");
      headerText.textContent = "Hello world!";
    
      const subText = document.createElement("p");
      subText.textContent = "Lorem ipsum.";
    
      const bodyText = document.createElement("p");
      bodyText.textContent = "Paragraph.";
    
      const footerText = document.createElement("p");
      footerText.textContent = "Footer text.";
    
      const headerContainer = document.createElement("div");
      headerContainer.appendChild(headerText);
      headerContainer.appendChild(subText);
      headerContainer.appendChild(messageButton);
    
      const bar = document.createElement("p");
      bar.textContent = "Topbar.";
    
      const card = sdk.ui.card({
        header: headerContainer,
        body: bodyText,
        footer: footerText,
      });
    
      sdk.navigation.addPage("/my-plugin-page", {
        body: card,
        topbar: bar,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      // Register commands
      // Commands are registered with a unique identifier and a handler function
      // The run function is called when the command is executed
      // These commands can be registered in various places like command palette, context menu, etc.
    
      // Register page
      createPage(sdk);
    
      // Register sidebar
      sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
        icon: "fas fa-rocket",
      });
    };</content>
</page>

<page>
  <title>Using AI to Assist in Plugin Development</title>
  <url>https://developer.caido.io/guides/vibe_coding.html</url>
  <content>DISCLAIMER

While AI assistants can be helpful in development, they may sometimes provide incorrect or incomplete information. Always verify AI-generated code and suggestions against the official documentation and test thoroughly.

Cursor [​](#cursor)
-------------------

If you are using [Cursor](https://www.cursor.com/en) as your IDE, you can load the Caido documentation websites into your workspace so that Cursor becomes aware of the Caido SDK:

1.  Open Cursor and click `View` in the menu bar and select `Command Palette` (_or use `CTRL + Shift + P`_) and search for:

2.  Select the option and enter the documentation URL:

    https://developer.caido.io/

3.  Provide a reference name and click `Confirm`.

4.  Cursor will index the website allowing you to reference the documentation in prompts by using `@<reference name>`.

TIPS

*   Add `https://github.com/caido/sdk-js` to Cursor as well so it has the SDK alongside the developer documentation examples.
    
*   Also add `https://docs.caido.io/` to Cursor so you can reference interfaces for context.
    
*   You can also customize prompt responses by navigating to `Settings`, `Rules`, and writing your preferences in the `User Rules` input field.
    

Custom GPT [​](#custom-gpt)
---------------------------

[This custom GPT is trained on Caido documentation, SDKs, and additional sources to answer your prompts with higher accuracy.](https://chatgpt.com/g/g-68095eb17eb08191ba19fd85f0a516ec-caido-developer-assistant)</content>
</page>

<page>
  <title>Creating a Command | Developer</title>
  <url>https://developer.caido.io/guides/components/command.html</url>
  <content>Commands are used to register actions to expose functionality, bind actions to the user-interface and implement business logic.

### Registering a Command [​](#registering-a-command)

ts

    sdk.commands.register("hello", {
      name: "Print to console.",
      run: () => console.log("Hello world!"),
      group: "Custom Commands",
    });

This creates a command.

*   "hello" is the `id` that is used to reference the command.
*   "Print to console." is the command `name` that will be displayed in context menus and within the command palette.
*   "Custom Commands" is the category `group` within the command palette that the command will be listed under.

INFO

The optional `when` property defines a conditional that must be met for the command to be available.

_For example, to explicity set the command to be available at all times, `when: () => true` can be used._

### Adding a Command to the Command Palette [​](#adding-a-command-to-the-command-palette)

ts

    sdk.commandPalette.register("hello");

This registers the previously created command to the command palette.</content>
</page>

<page>
  <title>Getting Started | Developer</title>
  <url>https://developer.caido.io/guides/</url>
  <content>Caido allows users to develop custom features in the form of plugins.

Plugin development is done in JavaScript and consists of many parts:

*   A `caido.config.ts`/`manifest.json` file
*   A frontend plugin
*   A backend plugin

These parts are packaged together in a single entity known as a **plugin package**.

For more information on the structure of a plugin package, see [Plugin Architecture](https://developer.caido.io/concepts/essentials/package.html).

Creating a Plugin Package [​](#creating-a-plugin-package)
---------------------------------------------------------

Requirements

Plugins are developed in JavaScript and require the following to be installed on your device:

*   [Node.js](https://nodejs.org/en/) (Version 18+ or 20+)
*   [pnpm](https://pnpm.io/installation)

To get started with plugin development, run the following command:

bash

    pnpm create @caido-community/plugin

Then follow the prompts! This will create a new directory containing a template plugin package.

From inside the package directory, run the following command to install the project dependencies:

Finally, run the following command to build your plugin into a `dist/plugin_package.zip` file:

You can then install this plugin package directly from the Caido application.

Hot Reload [​](#hot-reload)
---------------------------

Instead of uninstalling, rebuilding, and installing your plugin to view the changes you make during development, Caido offers the [Devtools](https://github.com/caido-community/devtools) plugin that will auto-update the plugin whenever code changes are detected.

To use the Devtools plugin:

1.  First navigate to the [Plugins](https://docs.caido.io/guides/plugins.html) interface, select Community Store, and click `+ Install`.
    
2.  Next, run the following command from the root directory of the plugin to both build and watch for file changes:
    

3.  Then, input the development server URL in the Devtools plugin and click the `Connect` button.

What's next? [​](#what-s-next)
------------------------------

Now that you've created your first package, you can start building out your own frontend and backend plugins.

We highly recommend looking at existing plugins in the [Community Store](https://github.com/caido-community) to get an idea of what's possible. All plugins are open-sourced and available for you to review and learn from.

There are also a few guides available on this site to help you get started.</content>
</page>

<page>
  <title>Customizing Context Menus | Developer</title>
  <url>https://developer.caido.io/guides/components/menu.html</url>
  <content>The context menu is the list of actions/options that appears when right-clicking within an application.

menu [​](#menu)
---------------

Used to register right-click context menu actions/options and create a plugin specific settings page, allowing quick access to your plugin functionality.

### Registering an Entry to the Context Menu [​](#registering-an-entry-to-the-context-menu)

ts

    sdk.menu.registerItem({
      type: "Request",
      commandId: "hello",
      leadingIcon: "fas fa-hand",
    });

This registers the previously created [command](https://developer.caido.io/guides/components/command.html) to the context menu.

The `type` property specifies which context menu to add the action/option to:

*   `Request` makes it available when right-clicking in a request pane.
*   `RequestRow` makes it available when right-clicking on a request in a table.
*   `Response` makes it available when right-clicking in a response pane.
*   `Settings` makes it available when right-clicking in the settings menu.

The `commandId` value is the name of the registered command to execute.

The `leadingIcon` property is optional and adds an icon on the leading side of the entry.

INFO

When using the `Settings` value - an additional property of `path` exists which takes a string value of the path to be navigated to.</content>
</page>

<page>
  <title>Storing Frontend Data | Developer</title>
  <url>https://developer.caido.io/guides/components/frontend_storage.html</url>
  <content>Storing Frontend Data [​](#storing-frontend-data)
-------------------------------------------------

By default, the frontend component of a plugin is stateless, meaning data will be lost between Caido sessions. However, if your plugin needs to persist data in the frontend you can utilize the storage system through `sdk.storage`.

The storage system is defined by the [StorageSDK](https://developer.caido.io/reference/sdks/frontend/#sdk) interface and provides these methods:

*   `set()`: Puts new data into the storage.
*   `get()`: Fetches the current data from storage.
*   `onChange()`: Sets up a listener that runs when the storage changes.

User Preferences [​](#user-preferences)
---------------------------------------

To demonstrate its usage, let's create a frontend interface that offers light and dark theme options.

### App.vue [​](#app-vue)

ts

    <script setup lang="ts">
    import Button from "primevue/button";
    import { useSDK } from "@/plugins/sdk";
    import { ref, onMounted, watch } from "vue";
    
    const sdk = useSDK();
    
    const currentTheme = ref<"light" | "dark" | null>(null);
    
    const updateTheme = async (theme: "light" | "dark") => {
      await sdk.storage.set({ theme });
      currentTheme.value = theme;
    };
    
    const applyTheme = (theme: "light" | "dark") => {
      const root = document.getElementById('plugin--frontend-vue');
      if (root) {
        if (theme === "dark") {
          root.style.backgroundColor = "#202227";
        } else {
          root.style.backgroundColor = "#FFFFFF";
        }
      }
    };
    
    const loadSettings = () => {
      const settings = sdk.storage.get() as { theme: "light" | "dark" } | null;
      if (settings?.theme) {
        currentTheme.value = settings.theme;
        applyTheme(settings.theme);
      } else {
        currentTheme.value = "light";
        applyTheme("light");
      }
    };
    
    watch(currentTheme, (newTheme) => {
      if (newTheme) {
        applyTheme(newTheme);
      }
    });
    
    sdk.storage.onChange((newSettings) => {
      const settings = newSettings as { theme: "light" | "dark" } | null;
      if (settings?.theme) {
        currentTheme.value = settings.theme;
      }
    });
    
    onMounted(() => {
      loadSettings();
    });
    </script>
    
    <template>
      <div class="h-full flex justify-center items-center" :style="{ backgroundColor: currentTheme === 'dark' ? '#202227' : '#FFFFFF' }">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <!-- Light theme button -->
            <Button 
              label="Light" 
              @click="updateTheme('light')"
              :disabled="currentTheme === 'light'"
            />
            <!-- Dark theme button -->
            <Button 
              label="Dark" 
              @click="updateTheme('dark')"
              :disabled="currentTheme === 'dark'"
            />
          </div>
        </div>
      </div>
    </template>

### Script Breakdown [​](#script-breakdown)

First, the `<script>` block with TypeScript support is opened and the Caido SDK is imported along with three Vue reactivity utilities:

*   `ref`: Tracks value changes to automatically update the user interface.
*   `onMounted`: Registers a callback function that will be executed after a component has been added to the user interface.
*   `watch`: Monitors for changes to reactive components and executes a callback function when a change occurs.

ts

    <script setup lang="ts">
    import Button from "primevue/button";
    import { useSDK } from "@/plugins/sdk";
    import { ref, onMounted, watch } from "vue";

The Caido SDK is initialized so the plugin can access its functionality.

A variable named `currentTheme` is defined that will dynamically store the theme selection, starting with `null` to account for the first initialization.

ts

    const currentTheme = ref<"light" | "dark" | null>(null);

Next, an asynchronous function named `updateTheme` is defined to save the current theme selection in storage using `sdk.storage.set()`.

ts

    const updateTheme = async (theme: "light" | "dark") => {
      await sdk.storage.set({ theme });
      currentTheme.value = theme;
    };

To apply the theme to the user interface, the `applyTheme` function switches the background color of the user interface.

ts

    const applyTheme = (theme: "light" | "dark") => {
      const root = document.getElementById('plugin--frontend-vue');
      if (root) {
        if (theme === "dark") {
          root.style.backgroundColor = "#202227";
        } else {
          root.style.backgroundColor = "#FFFFFF";
        }
      }
    };

To retrieve the saved theme setting from storage, `sdk.storage.get()` is called by the `loadSettings` function. If a theme exists in storage, it will be applied. If there is no saved theme selection, the theme will default to light.

ts

    const loadSettings = () => {
      const settings = sdk.storage.get() as { theme: "light" | "dark" } | null;
      if (settings?.theme) {
        currentTheme.value = settings.theme;
        applyTheme(settings.theme);
      } else {
        currentTheme.value = "light";
        applyTheme("light");
      }
    };

The `watch` utility is used to monitor for changes to the value of the `currentTheme` variable and calls the `applyTheme` function if the value changes:

ts

    watch(currentTheme, (newTheme) => {
      if (newTheme) {
        applyTheme(newTheme);
      }
    });

With `sdk.storage.onChange()`, if a theme change is made from other user interfaces, they will be applied to this plugin's user interface as well.

ts

    sdk.storage.onChange((newSettings) => {
      const settings = newSettings as { theme: "light" | "dark" } | null;
      if (settings?.theme) {
        currentTheme.value = settings.theme;
      }
    });

When the page is loaded, the `loadSettings()` function will be called.

ts

    onMounted(() => {
      loadSettings();
    });
    </script>

A button for both themes are added to the user interface that will call the `updateTheme` function to update the saved theme in storage when clicked. If the corresponding theme is already saved, its button will be disabled.

vue

    <template>
      <div class="h-full flex justify-center items-center" :style="{ backgroundColor: currentTheme === 'dark' ? '#202227' : '#FFFFFF' }">
        <div class="flex flex-col gap-4">
          <div class="flex gap-2">
            <!-- Light theme button -->
            <Button 
              label="Light" 
              @click="updateTheme('light')"
              :disabled="currentTheme === 'light'"
            />
            <!-- Dark theme button -->
            <Button 
              label="Dark" 
              @click="updateTheme('dark')"
              :disabled="currentTheme === 'dark'"
            />
          </div>
        </div>
      </div>
    </template>

INFO

*   Although frontend storage actually exists in the backend, it is inaccessible by the backend component. To share data with the backend component of a plugin, you will need to [create and call a custom function](https://developer.caido.io/guides/components/rpc.html).
    
*   Stored data needs to be JSON serializable.</content>
</page>

<page>
  <title>Using the Component Library | Developer</title>
  <url>https://developer.caido.io/guides/components/styling.html</url>
  <content>Caido plugins use [PrimeVue](https://tailwind.primevue.org/) as the component library, with custom styling to match the core application’s look and feel.

You can explore our **UI Kit** at [ui-kit.caido.io](https://ui-kit.caido.io/), which showcases the available styled components, their usage examples, and source code snippets.

This guide covers how to integrate these components to ensure a seamless user experience.

Starting from the VueJS Template [​](#starting-from-the-vuejs-template)
-----------------------------------------------------------------------

When running the `pnpm create @caido-community/plugin` command to initialize a new plugin project, you are given the option to use the [Vue.js](https://vuejs.org/) framework.

When using this option, instead of building the plugin page in the frontend `index.ts` file, now the `App.vue` file is responsible for the plugin page's layout, state, and user interactions.

However, the initialization, configuration, SDK setup, routing, and registration are still handled by `index.ts`.

Adding the Toast Component [​](#adding-the-toast-component)
-----------------------------------------------------------

By default, the plugin template includes the core PrimeVue `Button` and `TextInput` components which are made available globally via `app.use(PrimeView)` in the `index.ts` file.

TIP

All of the components and configuration options offered by the PrimeVue package can be viewed by visiting their [official documentation](https://tailwind.primevue.org/vite/). You can also view them in the `~\node_modules\.pnpm\primevue@4.1.0_vue@X.X.XX_typescript@X.X.X_` directory of your project.

WARNING

Caido supports PrimeVue v4.1.0. If a style is not working properly, first try downgrading the `primevue` entry in the frontend `package.json` file. If this does not resolve the issue, please [let us know](https://docs.caido.io/report_bug.html)!

If you want to add additional components, simply import them. For example, if you wanted to display [Toast](https://primevue.org/toast/) messages:

### /packages/frontend/src/views/App.vue [​](#packages-frontend-src-views-app-vue)

ts

    <script setup lang="ts">
    import Button from "primevue/button";
    import InputText from "primevue/inputtext";
    // Import both Toast and its hook function.
    import Toast from "primevue/toast";
    import { useToast } from "primevue/usetoast";
    
    import { ref } from "vue";
    
    // Add the hook to provide the API.
    const toast = useToast();
    
    const counter = ref(0);
    
    const onIncrementClick = () => {
      // Configure the options for the Toast message.
      toast.add({
        severity: "info",
        summary: "Info",
        detail: "Counter incremented!",
        life: 3000
      });
      counter.value++;
    };
    </script>
    
    <template>
      <div class="h-full flex justify-center items-center">
        <Toast /> // Add the component.
        <div class="flex flex-col gap-1">
          <Button label="Increment counter" @click="onIncrementClick" />
          <InputText :model-value="counter" readonly />
        </div>
      </div>
    </template>

### /packages/frontend/src/index.ts [​](#packages-frontend-src-index-ts)

Since Toast is not included in the core components of PrimeVue, you will also need to add to the frontend `index.ts` file:

ts

    import ToastService from "primevue/toastservice";

Finally, register the `ToastService` globally:

The Result [​](#the-result)
---------------------------</content>
</page>

<page>
  <title>Creating and Calling a Custom Function</title>
  <url>https://developer.caido.io/guides/components/rpc.html</url>
  <content>When developing a plugin, there are two components to consider: the **frontend** and the **backend**.

In this guide, we'll cover how to create a custom endpoint in a backend plugin, and call it from a frontend plugin.

INFO

For additional documentation on the differences between a frontend and backend plugin - click [here](https://developer.caido.io/concepts/essentials/package.html).

Registering an Endpoint [​](#registering-an-endpoint)
-----------------------------------------------------

Let's start by creating an endpoint called `multiply` in our backend plugin.

`multiply` will take two numbers, output the result in the backend logs, as well as return the result. This endpoint will used by the frontend later on.

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import { SDK, DefineAPI } from "caido:plugin";
    
    function multiply(sdk: SDK, a: number, b: number) {
        const result = a * b;
        sdk.console.log(`The product of the multiply call is: ${result}`);
        return result;
    }
    
    export type API = DefineAPI<{
        multiply: typeof multiply;
    }>;
    
    export function init(sdk: SDK<API>) {
        sdk.api.register("multiply", multiply);
    }

### Script Breakdown [​](#script-breakdown)

First, the necessary type aliases are imported. `SDK` is the interface used to interact with Caido. `DefineAPI` is used to structure the API: definining what methods or endpoints are available, the parameters those methods accept and what types of values they return.

ts

    import { SDK, DefineAPI } from "caido:plugin";

Next, the function is defined. The function takes three parameters: `sdk`, `a` and `b`. The `sdk` parameter is typed using the `SDK` alias to give the function access to its utilities. The `a` and `b` parameters are expected to be numbers as this function multiplies the two together.

ts

    function multiply(sdk: SDK, a: number, b: number) {
        const result = a * b;
        sdk.console.log(`The product of the multiply call is: ${result}`);
        return result;
    }

Using the `DefineAPI` utility, we are stating what our API offers. In this case, the `multiply` function is available to be called. To ensure the function receives the expected parameter data types, `typeof` is used to link the `multiply` API call to the `multiply` function definition. This definition is stored in the type alias `API` and exported so it can be used in other files.

ts

    export type API = DefineAPI<{
        multiply: typeof multiply;
    }>;

Next, we define a function that will run as soon as Caido loads the plugin. It extends upon the base `SDK` by adding the `<API>`. In order to register the function, we use the `sdk.api.register()` method which takes two parameters: a string name for the function and the function it refers to. We give the name `"multiply"` to the `multiply` function.

ts

    export function init(sdk: SDK<API>) {
        sdk.api.register("multiply", multiply);
    }

Calling the Endpoint [​](#calling-the-endpoint)
-----------------------------------------------

Now that we've created our endpoint in the backend plugin, we can call `multiply` from our frontend plugin.

### /packages/frontend/src/index.ts [​](#packages-frontend-src-index-ts)

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "../../backend/src/index.ts";
    
    export type CaidoSDK = Caido<API>;
    
    const createPage = (sdk: CaidoSDK) => {
    
        const resultText = document.createElement("p");
        resultText.textContent = "Result will appear here.";
    
        const inputA = document.createElement("input");
        inputA.type = "number";
        inputA.value = "0";
        inputA.style.color = "black";
        
        const inputB = document.createElement("input");
        inputB.type = "number";
        inputB.value = "0";
        inputB.style.color = "black";
    
        const calculateButton = sdk.ui.button({
            variant: "primary",
            label: "Calculate",
        });
    
        calculateButton.addEventListener("click", async () => {
            const a = Number(inputA.value);
            const b = Number(inputB.value);
            const result = await sdk.backend.multiply(a, b);
            resultText.textContent = `Result: ${result}`;
        });
    
        const container = document.createElement("div");
        container.appendChild(inputA);
        container.appendChild(inputB);
        container.appendChild(calculateButton);
        container.appendChild(resultText);
    
        const card = sdk.ui.card({
            body: container
        });
    
        sdk.navigation.addPage("/multiply-page", {
            body: card
        });
    }
    
    export function init(sdk: CaidoSDK) {
        createPage(sdk);
        
        sdk.sidebar.registerItem("Multiply", "/multiply-page", {
            icon: "fas fa-calculator"
        });
    }

### Script Breakdown [​](#script-breakdown-1)

Again, we need to import the necessary type aliases: the base `SDK` and the `API` we just defined in the backend.

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "../../backend/src/index.ts";

Next, we add the API to the SDK by creating the `CaidoSDK` type alias.

ts

    export type CaidoSDK = Caido<API>;

The page will include two input fields, one for each expected number parameter and a `<p></p>` tag that will be used to display the result.

TIP

For additional documentation on creating a page - click [here](https://developer.caido.io/guides/components/page.html).

ts

    const createPage = (sdk: CaidoSDK) => {
    
        const resultText = document.createElement("p");
        resultText.textContent = "Result will appear here.";
    
        const inputA = document.createElement("input");
        inputA.type = "number";
        inputA.value = "0";
        inputA.style.color = "black";
        
        const inputB = document.createElement("input");
        inputB.type = "number";
        inputB.value = "0";
        inputB.style.color = "black";

The page also includes a button, that when clicked will take the supplied input and use the values as the parameters for the `multiply` function which is called using `sdk.backend.multiply(a, b);`. To account for processing time, `await` is used.

ts

        const calculateButton = sdk.ui.button({
            variant: "primary",
            label: "Calculate",
        });
    
        calculateButton.addEventListener("click", async () => {
            const a = Number(inputA.value);
            const b = Number(inputB.value);
            const result = await sdk.backend.multiply(a, b);
            resultText.textContent = `Result: ${result}`;
        });

The page elements are all grouped together and stored in the `container` variable which is then used as the `body` property value of the `sdk.ui.card({})` method. The page is then added to Caido using the `sdk.navigation.addPage()` method with the path of `"/multiply-page"`. Its content is the `card` we just defined.

ts

        const container = document.createElement("div");
        container.appendChild(inputA);
        container.appendChild(inputB);
        container.appendChild(calculateButton);
        container.appendChild(resultText);
    
        const card = sdk.ui.card({
            body: container
        });
    
        sdk.navigation.addPage("/multiply-page", {
            body: card
        });
    }

Finally, we define an initialization function for the frontend that will generate this page when Caido loads our plugin. The `sdk.sidebar.registerItem()` method will add a tab for our plugin page to the left-hand side menu of Caido named `Multiply` with a calculator icon.

ts

    export function init(sdk: CaidoSDK) {
        createPage(sdk);
        
        sdk.sidebar.registerItem("Multiply", "/multiply-page", {
            icon: "fas fa-calculator"
        });
    }

The Result [​](#the-result)
---------------------------

The entry to your Caido log file should resemble:

txt

    2024-11-05T13:26:13.528023Z  INFO plugin:5a758b74-e176-473f-a545-bdb452015b9a js|sdk: The product of the multiply call is: 15</content>
</page>

<page>
  <title>Handling Backend Events | Developer</title>
  <url>https://developer.caido.io/guides/components/backend_events.html</url>
  <content>Handling Backend Events [​](#handling-backend-events)
-----------------------------------------------------

In this guide, you will learn how to handle backend events in the frontend of your Caido plugin.

This can be accomplished using the three event handlers provided by the SDK:

onProjectChange [​](#onprojectchange)
-------------------------------------

An event will be triggered when the active [Project](https://docs.caido.io/quickstart/beginner_guide/first_steps_with_caido/project.html) changes.

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    
    export type API = DefineAPI<{}>;
    
    let previousProject: string | null = null;
    
    export function init(sdk: SDK<API>) {
      sdk.events.onProjectChange((sdk, project) => {
        const newProjectName = project?.getName() ?? null;
        sdk.console.log(`Project changed from "${previousProject}" to "${newProjectName}."`);
        previousProject = newProjectName;
      });
    }

The Result [​](#the-result)
---------------------------

txt

    Project changed from "Caido" to "Example".

onInterceptRequest and onInterceptResponse [​](#oninterceptrequest-and-oninterceptresponse)
-------------------------------------------------------------------------------------------

An event will be triggered with `onInterceptRequest` and `onInterceptResponse` when a request or response is proxied through Caido respectively.

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts-1)

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    import type { Request, Response } from "caido:utils";
    
    export type API = DefineAPI<{}>;
    
    export function init(sdk: SDK<API>) {
      sdk.events.onInterceptRequest((sdk, request: Request) => {
        sdk.console.log(`Intercepted ${request.getMethod()} request to ${request.getUrl()}`);
      });
    
      sdk.events.onInterceptResponse((sdk, request: Request, response: Response) => {
        sdk.console.log(`Intercepted response from ${request.getUrl()} with status ${response.getCode()}`);
      });
    }

The Result [​](#the-result-1)
-----------------------------

txt

    Intercepted GET request to https://example.com/path
    Intercepted response from https://example.com/path with status 304</content>
</page>

<page>
  <title>Fetching Proxied Requests | Developer</title>
  <url>https://developer.caido.io/guides/components/querying_requests.html</url>
  <content>In this guide, we'll cover how to fetch proxied requests in a backend plugin.

query() [​](#query)
-------------------

The `query()` method queries proxied requests belonging to the current [Project](https://docs.caido.io/guides/projects.html).

ts

    let query = sdk.requests.query();

This method returns the results as a [RequestsQuery](https://developer.caido.io/reference/sdks/backend/#requestsquery) object.

execute() [​](#execute)
-----------------------

Queries for requests are executed with the `execute()` method.

ts

    const results = await query.execute();

INFO

Caido utilizes cursor-based pagination, meaning that instead of the dataset being divided into fixed subsets across numbered "pages" as seen in offset-based pagination, references to requests rely on their unique "cursors" which identify their position.

By referencing a request's cursor, you can fetch it or mark it as the starting position for operations on the dataset.

This method returns a Promise that resolves to a [RequestsConnection](https://developer.caido.io/reference/sdks/backend/#requestsconnection) object that represents the returned dataset, in this case the requests.

The `RequestsConnection` object has two parent fields: `items` and `pageInfo`.

### items [​](#items)

The `items` field is an array of `RequestsConnectionItem` objects. The fields of the `RequestConnectionItem` object are:

*   `request`: The [Request](https://developer.caido.io/reference/sdks/backend/#request) object itself.
*   `cursor`: The cursor of the associated request.
*   `response`: The paired [Response](https://developer.caido.io/reference/sdks/backend/#response-3) object of the associated request if available.

### pageInfo [​](#pageinfo)

The fields of the `pageInfo` object are:

*   `startCursor` - The cursor of the starting request in the dataset.
*   `endCursor` - The cursor of the ending request in the dataset.
*   `hasPreviousPage` - Returns either `true` or `false` to indicate whether more data before the current set is available.
*   `hasNextPage` - Returns either `true` or `false` to indicate whether more data after the current set is available.

Refining Your Dataset View [​](#refining-your-dataset-view)
-----------------------------------------------------------

However, for Projects with a large number of requests, executing such a broad query would be memory exhaustive and inefficient. To account for this, Caido's SDK also offers a variety of additional methods that can be chained in order to refine the view of the requests dataset.

### Filtering [​](#filtering)

With the `filter()` method, you can target specific requests using [HTTPQL](https://docs.caido.io/reference/httpql.html) query statements as a parameter.

ts

     let query = sdk.requests.query().filter('req.host.eq:"example.com"');

### Sorting [​](#sorting)

The following methods can be used to sort results to determine their ordering:

*   `ascending()` - Sorts results in ascending order.
*   `descending()` - Sorts results in descending order.

Both methods can target either requests or responses by supplying either `"req"` or `"resp"` as their first parameter.

The element that determines the sort order is either a [RequestOrderField](https://developer.caido.io/reference/sdks/backend/#requestorderfield) or a [ResponseOrderField](https://developer.caido.io/reference/sdks/backend/#responseorderfield) depending on the target and is supplied as the second parameter.

ts

    query = query.ascending("req", "id");

#### Cursor [​](#cursor)

The following methods can be used to paginate through the dataset:

*   `after()` - Fetches requests that come after a cursor.
*   `before()` - Fetches requests that come before a cursor.

#### Limiting [​](#limiting)

The following methods can be used to limit the number of requests to process:

*   `first()` - Specifies the number of requests from the beginning of the dataset view.
*   `last()` - Specifies the number of requests from the end of the dataset view.

Both `first()` and `last()` take an integer as their parameter that represents the number of requests to process.

Building and Executing a Query [​](#building-and-executing-a-query)
-------------------------------------------------------------------

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    
    export async function fetchRequests(sdk: SDK) {
      let totalRequestsQueried = 0;
    
      while (true) {
        let cursor = null;
        let query = sdk.requests
          .query()
          .filter('req.host.eq:"example.com"')
          .first(1000);
    
        query = query.ascending("req", "created_at");
    
        if (cursor) {
          query = query.after(cursor);
        }
    
        const requests = await query.execute();
    
        totalRequestsQueried += requests.items.length;
    
        if (requests.pageInfo.hasNextPage) {
          cursor = requests.pageInfo.endCursor;
        } else {
          break;
        }
      }
    
      return totalRequestsQueried;
    }
    
    export type API = DefineAPI<{
      fetchRequests: typeof fetchRequests;
    }>;
    
    export async function init(sdk: SDK<API>) {
      sdk.api.register("fetchRequests", fetchRequests);
    }

### Script Breakdown [​](#script-breakdown)

First, the necessary type aliases are imported. `SDK` is the interface used to interact with Caido. `DefineAPI` is used to structure the API: definining what methods or endpoints are available, the parameters those methods accept and what types of values they return.

ts

    import type { DefineAPI, SDK } from "caido:plugin";

Next, the function is defined. The function takes the `sdk` parameter typed using the `SDK` alias to give the function access to it's utilities. To keep track of the total number of requests queried, the `totalRequestsQueried` variable is created with an initial value of `0`. A `while` loop is created to continuously process the dataset. The `cursor` variable is initially set to `null` since we are starting from the very beginning of the dataset and don't have a previous position to continue from. The dataset is queried for any requests that have been made to `example.com` using the HTTPQL statement `req.host.eq:"example.com"` in the `.filter()` method. With `.first(1000)` the query processes batches of 1,000 requests at a time.

ts

    export async function fetchRequests(sdk: SDK) {
      let totalRequestsQueried = 0;
    
      while (true) {
        let cursor = null;
        let query = sdk.requests
          .query()
          .filter('req.host.eq:"example.com"')
          .first(1000);

Next, the request batches are sorted in ascending order, by their `created_at` time for a chronological view of the dataset. The `if` statement implements pagination by marking a cursor pointing to where the processing left off and instructs the query to start from this position, not the very beginning. With the query constructed, it is executed with the `await` directive to account for the processing time. The returned `RequestsConnection` object is stored in the `requests` variable.

ts

        query = query.ascending("req", "created_at");
    
        if (cursor) {
          query = query.after(cursor);
        }
    
        const requests = await query.execute();

The number of requests that match the query in each processed batch are added to the existing total. The `if` statement checks if there are more pages to process. If there are more pages, `requests.pageInfo.endCursor` saves the cursor pointing to the last request of the current batch in the `cursor` variable. With this updated cursor, processing will always begin where it left off.

ts

        totalRequestsQueried += requests.items.length;
    
        if (requests.pageInfo.hasNextPage) {
          cursor = requests.pageInfo.endCursor;
        } else {
          break;
        }
      }
    
      return totalRequestsQueried;
    }

The `fetchRequests` function is [added to the API](https://developer.caido.io/guides/components/rpc.html) and exported so it can be used in other files. Finally, the base `SDK` is extended bu adding the `<API>`. In order to register the function, we use the `sdk.api.register()` method which takes two parameters: a string name for the function and the function it refers to. We give the name `"fetchRequests"` to the `fetchRequests` function.

ts

    export type API = DefineAPI<{
      fetchRequests: typeof fetchRequests;
    }>;
    
    export async function init(sdk: SDK<API>) {
      sdk.api.register("fetchRequests", fetchRequests);
    }

TIP

To view how the endpoint can be called with a frontend plugin, expand the following:

Full Script

    <script setup lang="ts">
    import Button from "primevue/button";
    import InputText from "primevue/inputtext";
    import DataTable from "primevue/datatable";
    import Column from "primevue/column";
    import { ref } from "vue";
    
    import { useSDK } from "@/plugins/sdk";
    
    // Retrieve the SDK instance to interact with the backend.
    const sdk = useSDK();
    
    const loading = ref(false);
    const result = ref<number | null>(null);
    
    const fetchRequests = async () => {
      loading.value = true;
      try {
        // Call the backend fetchRequests function.
        result.value = await sdk.backend.fetchRequests();
      } catch (e) {
        console.error("Error fetching requests:", e);
        result.value = null;
      } finally {
        loading.value = false;
      }
    };
    </script>
    
    <template>
      <div class="p-4">
        <Button
          label="Fetch Requests"
          :loading="loading"
          @click="fetchRequests"
          class="mb-2"
        />
        <div v-if="result !== null">
          <p>Total requests queried: {{ result }}</p>
        </div>
      </div>
    </template></content>
</page>

<page>
  <title>Sending HTTP Requests | Developer</title>
  <url>https://developer.caido.io/guides/components/request.html</url>
  <content>Requests can be interacted with and sent in both Workflows and plugins.

RequestSpec [​](#requestspec)
-----------------------------

Used to create mutable request objects that have not yet been sent.

In Caido, requests that have been proxied can be interacted with via the an object of the `Request` type. These objects **cannot** be modified.

To create a request object that **can** be modified, the `RequestSpec` object class is used.

Compared to a `Request` object which only has methods to get a request's data, the `RequestSpec` object has different `set` methods available in order to specify certain HTTP request elements.

Although, Caido will automatically create a valid request based on the URL supplied as the constructor argument when creating a new `RequestSpec` object, these can be used to overwrite the properties of the automatically generated request.

*   `removeHeader()` - Removes a header.
*   `setBody()` - Specifies/overwrites the body of a request.
*   `setHeader()` - Specifies a header or overwrites the same header with a different value.
*   `setHost()` - Changes the target domain.
*   `setMethod()` - Specifies/overwrites the HTTP method to be used.
*   `setPath()` - Specifies/overwrites the URL path.
*   `setPort()` - Specifies/overwrites the port.
*   `setQuery()` - Specifies/overwrites the URL query.
*   `setRaw()` - Sets the request to raw bytes.
*   `setTls()` - Specifies/overwrites if HTTPS is to be used or not.

### Creating and Sending a Request [​](#creating-and-sending-a-request)

In the `/packages/backend/src/index.ts` file, you will first need to import the `RequestSpec`, `SDK` and `DefineAPI` type aliases.

ts

    import { RequestSpec, Response } from "caido:utils";
    import { SDK, DefineAPI } from "caido:plugin";

Next, define an asynchronous function that creates a new `RequestSpec` object using the target URL as the constructor. At this point, you can explicitly set request properties by calling the appropriate methods.

ts

    async function sendRequest(sdk: SDK): Promise<void> {
      const spec = new RequestSpec("https://example.com/");
      spec.setMethod("GET");
      spec.setHost("example.com");
      spec.setPort(443);
      spec.setPath("/");
      spec.setQuery("query=test")
      spec.setTls(true);

We must await for the request to be sent and processed before we are able to obtain data from the response. Using template literals, we can print the data to the backend logs.

ts

      let sentRequest = await sdk.requests.send(spec);
    
      if (sentRequest.response) {
        let domain = spec.getHost();
        let port = spec.getPort();
        let path = spec.getPath();
        let query = spec.getQuery();
        let id = sentRequest.response.getId();
        let code = sentRequest.response.getCode();
        sdk.console.log(`REQ ${id}: ${domain}:${port}${path}${query} received a status code of ${code}`);
      }
    }

The entry in the backend log file will resemble:

txt

    2024-10-09T19:10:34.825319Z  INFO plugin:d69424f6-a091-4660-8193-2ec624b54c5e js|sdk: REQ 4110: example.com:443/?query=test received a status code of 200

In order to use this new API call, the API itself must be defined and exported for use in the `/packages/frontend/src/index.ts` file. By using `typeof sendRequest`, you tie the function to a method named `sendRequest`.

ts

    export type API = DefineAPI<{
      sendRequest: typeof sendRequest;
    }>;

Finally, upon plugin initialization, the `sendRequest` function is registered to the backend.

ts

    export function init(sdk: SDK<API>) {
      sdk.api.register("sendRequest", sendRequest);
    }

TIP

To view the entire backend script, expand the following:

Example

ts

    import { RequestSpec } from "caido:utils";
    import { SDK, DefineAPI } from "caido:plugin";
    
    async function sendRequest(sdk: SDK): Promise<void> {
      const spec = new RequestSpec("https://example.com/");
      spec.setMethod("GET");
      spec.setHost("example.com");
      spec.setPort(443);
      spec.setPath("/");
      spec.setQuery("query=test")
      spec.setTls(true);
    
      let sentRequest = await sdk.requests.send(spec);
    
      if (sentRequest.response) {
        let domain = spec.getHost();
        let port = spec.getPort();
        let path = spec.getPath();
        let query = spec.getQuery();
        let id = sentRequest.response.getId();
        let code = sentRequest.response.getCode();
        sdk.console.log(`REQ ${id}: ${domain}:${port}${path}${query} received a status code of ${code}`);
      }
    }
    
    export type API = DefineAPI<{
      sendRequest: typeof sendRequest;
    }>;
    
    export function init(sdk: SDK<API>) {
      sdk.api.register("sendRequest", sendRequest);
    }

By registering a command in the frontend, defining the command to make a backend call to execute the `sendRequest` function and then registering the function on the frontend - it can be called at the click of a button:

TIP

To view the entire frontend script, expand the following:

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "../../backend/src/index";
    
    import "./styles/index.css";
    
    export type CaidoSDK = Caido<API>;
    
    const Commands = {
      sending: "my-plugin-page.req",
    } as const;
    
    const sending = async (sdk: CaidoSDK) => {
      await sdk.backend.sendRequest();
    };
    
    const createPage = (sdk: CaidoSDK) => {
      const requestButton = sdk.ui.button({
        variant: "primary",
        label: "Send Request",
      });
    
      requestButton.addEventListener("click", async () => {
        await sending(sdk);
      });
    
      const headerText = document.createElement("h1");
      headerText.textContent = "Hello world!";
    
      const subText = document.createElement("p");
      subText.textContent = "Lorem ipsum.";
    
      const bodyText = document.createElement("p");
      bodyText.textContent = "Paragraph.";
    
      const footerText = document.createElement("p");
      footerText.textContent = "Footer text.";
    
      const headerContainer = document.createElement("div");
      headerContainer.appendChild(headerText);
      headerContainer.appendChild(subText);
      headerContainer.appendChild(requestButton);
    
      const bodyContainer = document.createElement("div");
      bodyContainer.appendChild(bodyText);
    
      const card = sdk.ui.card({
        header: headerContainer,
        body: bodyContainer,
        footer: footerText,
      });
    
      sdk.navigation.addPage("/my-plugin-page", {
        body: card,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      createPage(sdk);
      sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
        icon: "fas fa-rocket",
      });
    
      sdk.commands.register(Commands.sending, {
        name: "Send Request",
        run: () => sending(sdk),
      });
    };</content>
</page>

<page>
  <title>Sending a Fetch Request | Developer</title>
  <url>https://developer.caido.io/guides/components/fetch.html</url>
  <content>Caido's [HTTP Module](https://developer.caido.io/reference/modules/caido/http.html) provides an implementation of the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). With this module, you can create and send asynchronous HTTP requests and handle their responses.

In this guide, we'll cover how to create a custom endpoint that sends a `fetch` request in a backend plugin, and call it from a frontend plugin.

NOTE

The request and response objects of this module differ from those used in the [Backend SDK](https://developer.caido.io/reference/sdks/backend/) and [Workflow SDK](https://developer.caido.io/reference/sdks/workflow/). Due to this, their properties and methods differ as well. Additionally, they are not routed through the proxy and must adhere to the HTTP specification in order to be interpreted correctly.

fetch() [​](#fetch)
-------------------

The `fetch()` function takes either a URL or a [Request](https://developer.caido.io/reference/modules/caido/http.html#request) object and as it's `input` parameter and an optional [RequestOpts](https://developer.caido.io/reference/modules/caido/http.html#requestopts) parameter that can be included to configure specific elements of the request. The function will return a Promise that resolves to a [Response](https://developer.caido.io/reference/modules/caido/http.html#response) object:

ts

    fetch(input: string | Request, init?: RequestOpts): Promise<Response>

Creating and Sending a Request [​](#creating-and-sending-a-request)
-------------------------------------------------------------------

First, the necessary type aliases are imported. `SDK` is the interface used to interact with Caido. `DefineAPI` is used to structure the API: definining what methods or endpoints are available, the parameters those methods accept and what types of values they return.

ts

    import { SDK, DefineAPI } from "caido:plugin";

To send a request, you will also need to import the `Request` class and the `fetch()` function from the `caido:http` module.

ts

    // Request object under the alias of FetchRequest.
    import { Request as FetchRequest, fetch } from "caido:http";

Next, let's define an asynchronous function, specify request elements, and output the details to the [backend logs](https://docs.caido.io/reference/internal_files.html). In this example we define two URL query parameters, the `Accept` header, and the `User-Agent` header.

ts

    export async function callApi(sdk: SDK) {
      // Create a URL with search parameters.
      const url = "https://example.com?" + new URLSearchParams({
        paramA: "a",
        paramB: "b"
      }).toString();
    
      // Create a new fetch request with various RequestOpts.
      const fetchRequest = new FetchRequest(url, {
        // If no method is explicitly set, defaults to GET.
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
        }
      });
    
      // Log the fetch request details.
      sdk.console.log("\nFetch Request:");
      sdk.console.log(`URL: ${fetchRequest.url}`);
      sdk.console.log(`Method: ${fetchRequest.method}`);
      sdk.console.log("Headers: " + JSON.stringify(Object.fromEntries(fetchRequest.headers.entries())));

We must await for the request to be sent and processed before we are able to obtain data from the response. By accessing the response properties, we can print the data to the backend logs.

ts

      try {
        const response = await fetch(fetchRequest);
        
        // Log the response data.
        sdk.console.log("\nFetch Response:");
        sdk.console.log(`Status: ${response.status}`);
        sdk.console.log(`Status Text: ${response.statusText}`);
        sdk.console.log("Headers: " + JSON.stringify(Object.fromEntries(response.headers.entries())));
        
        return {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        };
      } catch (error: any) {
        sdk.console.error("Error making fetch request: " + error.message);
        return `Error: ${error.message}`;
      }
    }

Using the `DefineAPI` utility, we state that the `callApi` function is available to be called and link the definition using `typeof`. The definition is stored in the type alias `API` and exported so it can be used in other files.

ts

    export type API = DefineAPI<{
      callApi: typeof callApi;
    }>;

Next, we define an initialization function that will add the `API` type alias to the base `SDK` and register the `callApi` function under the name `"callApi"`.

ts

    export function init(sdk: SDK<API>) {
      sdk.api.register("callApi", callApi);
    }

TIP

To view the entire script, expand the following:

Full Script

ts

    import type { SDK, DefineAPI } from "caido:plugin";
    import { Request as FetchRequest, fetch } from "caido:http";
    
    export async function callApi(sdk: SDK) {
      // Create a URL with search parameters.
      const url = "https://example.com?" + new URLSearchParams({
        paramA: "a",
        paramB: "b"
      }).toString();
    
      // Create a new fetch request with various RequestOpts.
      const fetchRequest = new FetchRequest(url, {
        // If no method is explicitly set, defaults to GET.
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
        }
      });
    
      // Log the fetch request details.
      sdk.console.log("\nFetch Request:");
      sdk.console.log(`URL: ${fetchRequest.url}`);
      sdk.console.log(`Method: ${fetchRequest.method}`);
      sdk.console.log("Headers: " + JSON.stringify(Object.fromEntries(fetchRequest.headers.entries())));
    
      try {
        const response = await fetch(fetchRequest);
        
        // Log the response data.
        sdk.console.log("\nFetch Response:");
        sdk.console.log(`Status: ${response.status}`);
        sdk.console.log(`Status Text: ${response.statusText}`);
        sdk.console.log("Headers: " + JSON.stringify(Object.fromEntries(response.headers.entries())));
        
        return {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        };
      } catch (error: any) {
        sdk.console.error("Error making fetch request: " + error.message);
        return `Error: ${error.message}`;
      }
    }
    
    export type API = DefineAPI<{
      callApi: typeof callApi;
    }>;
    
    export function init(sdk: SDK<API>) {
      sdk.api.register("callApi", callApi);
    }

INFO

Within the logs, the message will resemble:

    2025-04-29T16:06:01.503261Z DEBUG actix-rt|system:0|arbiter:23 api|controller: Calling plugin (6aff5b11-5baf-452a-8971-f4c6f1eb7859) function: callApi    
    2025-04-29T16:06:01.503303Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 plugin|executor: Calling method callApi (6aff5b11-5baf-452a-8971-f4c6f1eb7859)    
    2025-04-29T16:06:01.503316Z DEBUG plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|runtime: Triggering API callApi (6aff5b11-5baf-452a-8971-f4c6f1eb7859)    
    2025-04-29T16:06:01.503391Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: 
    Fetch Request:    
    2025-04-29T16:06:01.503406Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: URL: https://example.com?paramA=a&paramB=b    
    2025-04-29T16:06:01.503412Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: Method: GET    
    2025-04-29T16:06:01.503446Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: Headers: {"accept":"application/json","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"}    
    2025-04-29T16:06:02.856522Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: 
    Fetch Response:    
    2025-04-29T16:06:02.856554Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: Status: 200    
    2025-04-29T16:06:02.856562Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: Status Text: OK    
    2025-04-29T16:06:02.856650Z  INFO plugin:6aff5b11-5baf-452a-8971-f4c6f1eb7859 js|sdk: Headers: {"accept-ranges":"bytes","content-type":"text/html","etag":"\"84238dfc8092e5d9c0dac8ef93371a07:1736799080.121134\"","last-modified":"Mon, 13 Jan 2025 20:11:20 GMT","vary":"Accept-Encoding","content-encoding":"gzip","cache-control":"max-age=2775","date":"Tue, 29 Apr 2025 16:06:01 GMT","alt-svc":"h3=\":443\"; ma=93600,h3-29=\":443\"; ma=93600,quic=\":443\"; ma=93600; v=\"43\"","content-length":"648","connection":"keep-alive"}

TIP

To view how the endpoint can be called with a frontend plugin, expand the following:

Full Script

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "../../backend/src/index.ts";
    
    export type CaidoSDK = Caido<API>;
    
    const createPage = (sdk: CaidoSDK) => {
    
        const resultText = document.createElement("p");
        resultText.textContent = "Result will appear here.";
    
        const calculateButton = sdk.ui.button({
            variant: "primary",
            label: "Fetch",
        });
    
        calculateButton.addEventListener("click", async () => {
            const result = await sdk.backend.callApi();
            resultText.textContent = `Result: ${JSON.stringify(result, null, 2)}`;
        });
    
        const container = document.createElement("div");
        container.appendChild(calculateButton);
        container.appendChild(resultText);
    
        const card = sdk.ui.card({
            body: container
        });
    
        sdk.navigation.addPage("/fetch-page", {
            body: card
        });
    }
    
    export function init(sdk: CaidoSDK) {
        createPage(sdk);
        
        sdk.sidebar.registerItem("Fetch", "/fetch-page", {
            icon: "fas fa-paper-plane"
        });
    }</content>
</page>

<page>
  <title>Sending Events from the Backend to Frontend</title>
  <url>https://developer.caido.io/guides/components/events.html</url>
  <content>Sending Events from the Backend to Frontend [​](#sending-events-from-the-backend-to-frontend)
---------------------------------------------------------------------------------------------

In this guide, you will learn how to facilitate event-driven communication between the backend and the frontend components of a plugin.

This can be accomplished using the `onInterceptResponse()` method provided by the Caido SDK.

The event can then be subscribed to on the frontend using `sdk.backend.onEvent()`.

Registering an API Endpoint and Event [​](#registering-an-api-endpoint-and-event)
---------------------------------------------------------------------------------

To demonstrate, we will create a plugin that emits an event containing response data to the frontend.

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import { SDK, DefineAPI, DefineEvents } from "caido:plugin";
    
    type RequestEvent = {
      id: string;
      status: number;
      url: string;
    };
    
    export type BackendEvents = DefineEvents<{
      "request-completed": (data: RequestEvent) => void;
    }>;
    
    export type BackendAPI = DefineAPI<{}>;
    
    export function init(sdk: SDK<BackendAPI, BackendEvents>) {
      sdk.events.onInterceptResponse((sdk, request, response) => {
        sdk.api.send("request-completed", {
          id: response.getId(),
          status: response.getCode(),
          url: `${request.getHost()}:${request.getPort()}${request.getPath()}${request.getQuery()}`
        });
      });
    }

### Script Breakdown [​](#script-breakdown)

First, import the required dependencies. `SDK` is the interface used to interact with Caido. `DefineAPI` is used to structure the API: definining what methods or endpoints are available, the parameters those methods accept and what types of values they return. `DefineEvents` is used to structure events that can be sent between the backend and frontend.

ts

    import { SDK, DefineAPI, DefineEvents } from "caido:plugin";

Next, create a type alias that defines the data and data type of the event message that will be sent to the frontend.

ts

    type RequestEvent = {
      id: string;
      status: number;
      url: string;
    };

Using the `DefineEvents` utility, we state the event named `request-completed` will carry a `data` object using the `RequestEvent` type declarations. This is made available by exporting `BackendEvents`.

ts

    export type BackendEvents = DefineEvents<{
      "request-completed": (data: RequestEvent) => void;
    }>;

Next, we define an empty API type using `DefineAPI` to satisy the `SDK` parameter requirements.

ts

    export type BackendAPI = DefineAPI<{}>;

The `init` function includes the `BackendAPI` and `BackendEvents` as `SDK` types, which tells the SDK what API calls and events are available to use. When a response to a request is received with `onInterceptResponse()`, the callback function will use various `get` methods available to request and response objects to extract the data. Once the data is collected, the event is sent to the frontend using the `sdk.api.send()` method.

ts

    export function init(sdk: SDK<BackendAPI, BackendEvents>) {
      sdk.events.onInterceptResponse((sdk, request, response) => {
        sdk.api.send("request-completed", {
          id: response.getId(),
          status: response.getCode(),
          url: `${request.getHost()}:${request.getPort()}${request.getPath()}${request.getQuery()}`
        });
      });
    }

Receiving the Event [​](#receiving-the-event)
---------------------------------------------

Now that we've created our endpoint in the backend plugin, we can call `sendRequest` which will execute the function and emit the `request-completed` event with the response data.

The API and events are made available to the frontend script by extending the `Caido` inferface with the imports.

ts

    export type CaidoSDK = Caido<BackendAPI, BackendEvents>;

The event is subscribed to using the `sdk.backend.onEvent()` method that listens for the `request-completed` event and uses its `data` to print to a list.

ts

    sdk.backend.onEvent("request-completed", (data) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Request to ${data.url} completed with status ${data.status} (ID: ${data.id})`;
      resultsList.insertBefore(listItem, resultsList.firstChild);
    });

### /frontend/src/index.ts [​](#frontend-src-index-ts)

TIP

To view the entire frontend script, including the UI - expand the following:

Example

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { BackendAPI, BackendEvents } from "../../backend/src";
    
    import "./styles/index.css";
    
    export type CaidoSDK = Caido<BackendAPI, BackendEvents>;
    
    const createPage = (sdk: CaidoSDK) => {
      const resultsList = document.createElement("ul");
      resultsList.style.listStyle = "none";
      resultsList.style.padding = "1rem";
    
      // Subscribe to backend events.
      sdk.backend.onEvent("request-completed", (data) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Request to ${data.url} completed with status ${data.status} (ID: ${data.id})`;
        resultsList.insertBefore(listItem, resultsList.firstChild);
      });
    
      // Create card.
      const card = sdk.ui.card({
        body: resultsList,
      });
    
      // Add page.
      sdk.navigation.addPage("/request-monitor", {
        body: card,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      createPage(sdk);
      
      sdk.sidebar.registerItem("Request Monitor", "/request-monitor", {
        icon: "fas fa-globe",
      });
    };

The Result [​](#the-result)
---------------------------</content>
</page>

<page>
  <title>Spawning a Process | Developer</title>
  <url>https://developer.caido.io/guides/components/spawning_process.html</url>
  <content>You might want to spawn a process to interact with external tools or programs.

To do this, you can use the `spawn` function from the `child_process` module.

INFO

This module is similar to NodeJS's `child_process` module, but with some differences. You can find more information in the [child\_process](https://developer.caido.io/concepts/modules/child_process.html) documentation.

Launching a Process [​](#launching-a-process)
---------------------------------------------

The code below spawns a process that echoes "Hello, world!" to the console.

js

    import { spawn } from "child_process";
    
    const child = spawn("echo", ["Hello, world!"]);

Reading STDOUT and STDERR [​](#reading-stdout-and-stderr)
---------------------------------------------------------

To handle the output and error streams of the child process, you can use the `stdout` and `stderr` properties of the child process.

js

    let output = "";
    child.stdout.on("data", (data) => {
      output += data.toString();
    });
    
    let error = "";
    child.stderr.on("data", (data) => {
      error += data.toString();
    });

Waiting for Exit [​](#waiting-for-exit)
---------------------------------------

To wait for the child process to close and check the exit code, you can use the `close` event of the child process.

js

    const exitCode = await new Promise((resolve, reject) => {
      child.on("close", resolve);
    });
    
    if (exitCode) {
      throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }

Driving a Process to Completion [​](#driving-a-process-to-completion)
---------------------------------------------------------------------

Combining the two methods, we can drive any child process to completion and get its output.

js

    async function driveChild(child) {
      let output = "";
      child.stdout.on("data", (data) => {
        output += data.toString();
      });
    
      let error = "";
      child.stderr.on("data", (data) => {
        error += data.toString();
      });
    
      const exitCode = await new Promise((resolve, reject) => {
        child.on("close", resolve);
      });
    
      if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
      }
    
      return output;
    }
    
    export async function test() {
      const child = spawn("echo", ["Hello, world!"]);
      const result = await driveChild(child);
      return result;
    }

Executing Within a Shell [​](#executing-within-a-shell)
-------------------------------------------------------

You can use the `shell: true` or `shell: '/shell/path'` options to execute the command in a shell.

js

    import { spawn } from "child_process";
    
    export async function test() {
      const child = spawn("echo", ["Hello, world!"], { shell: true });
      const result = await driveChild(child);
      return result;
    }</content>
</page>

<page>
  <title>Storing Data in SQLite | Developer</title>
  <url>https://developer.caido.io/guides/components/sqlite.html</url>
  <content>For storing data generated by your plugin, Caido utilizes SQLite databases.

SQLite is a lightweight database engine made available via a small library. It requires no setup, administration or separate server. Instead, all data is stored in a single file.

Getting a Database [​](#getting-a-database)
-------------------------------------------

The `sdk.meta.db()` utility provides a SQLite database specific to your plugin. You can view the location of the generated file using `sdk.meta.path()`:

ts

    const db = await sdk.meta.db();
    
    const dataPath = sdk.meta.path();
    sdk.console.log(`Database will be stored in: ${dataPath}`);

TIP

To create a database at different location, use `open`:

ts

    import { open } from 'sqlite'
    
    async function newDatabase() {
      const db = await open({ filename: "path/to/database.sqlite" });
      await db.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT);");
      await db.exec("INSERT INTO test (name) VALUES ('foo');");
    }

Creating Tables [​](#creating-tables)
-------------------------------------

You can run direct SQL statements by supplying them as an arguement to the `.exec()` method:

ts

    // Create a new table if it doesn't exist.
    // This will create a table named "test" with two columns: id and name.
    await db.exec(`
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

Inserting Rows [​](#inserting-rows)
-----------------------------------

Instead of using direct statements every time you want to add to a table, you can use `.prepare()` to create predefined statements with placeholders, marked with `(?)` for new entry values.

Then, you can execute these prepared statements with the `.run()` method that takes the placeholder values as arguements:

ts

    const insertStatement = await db.prepare("INSERT INTO test (name) VALUES (?)");
    
    // Execute the insert statement to add "Ninjeeter" as a name entry.
    const result = await insertStatement.run("Ninjeeter");

Using `.lastInsertRowid` will return the ID of the last inserted row:

ts

    console.log(`Inserted row with ID: ${result.lastInsertRowid}`);

Retrieving Data [​](#retrieving-data)
-------------------------------------

To select all the columns in a table and return every row, use the wildcard character `*` and the `.all()` method:

ts

    const selectStatement = await db.prepare("SELECT * FROM test");
    const rows = await selectStatement.all();
    sdk.console.log("Current records: " + JSON.stringify(rows));

You can return specific rows by preparing a statement and using the `.get()` method which takes an arguement that will be used to match the table entry:

ts

    // Prepare a statement to get a single row by ID
    const getByIdStatement = await db.prepare("SELECT * FROM test WHERE id = ?");
    
    // Returns the first matching row or undefined if none found.
    const row = await getByIdStatement.get(1); // Get row with ID 1.
    
    if (row) {
        sdk.console.log(`Found record: ${JSON.stringify(row)}`);
    } else {
        sdk.console.log("No record found with that ID");
    }

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    
    async function initDatabase(sdk: SDK) {
      try {
        const db = await sdk.meta.db();
        
        const dataPath = sdk.meta.path();
        sdk.console.log(`Database will be stored in: ${dataPath}`);
        
        await db.exec(`
          CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
          );
        `);
    
        const insertStatement = await db.prepare("INSERT INTO test (name) VALUES (?)");
        const result = await insertStatement.run("foo");
        sdk.console.log(`Inserted row with ID: ${result.lastInsertRowid}`);
    
        const selectStatement = await db.prepare("SELECT * FROM test");
        const rows = await selectStatement.all();
        sdk.console.log("Current records: " + JSON.stringify(rows));
    
        const getByIdStatement = await db.prepare("SELECT * FROM test WHERE id = ?");
    
        const row = await getByIdStatement.get(1);
    
        if (row) {
            sdk.console.log(`Found record: ${JSON.stringify(row)}`);
        } else {
            sdk.console.log("No record found with that ID");
        }
    
        return db;
      } catch (error) {
        sdk.console.error(`Database initialization failed: ${error}`);
        throw error;
      }
    }
    
    export type API = DefineAPI<{
    }>;
    
    export async function init(sdk: SDK<API>) {
      await initDatabase(sdk);
      sdk.console.log("Database initialized.");
    }

The Result [​](#the-result)
---------------------------

In your backend logs, you will see the following entries:

txt

    Database will be stored in: [~]\Caido\data\plugins\[PLUGIN UUID]
    Inserted row with ID: 1
    Current records: [{"id":1,"name":"Ninjeeter"}]
    Found record: {"id":1,"name":"Ninjeeter"}</content>
</page>

<page>
  <title>Using Findings | Developer</title>
  <url>https://developer.caido.io/guides/components/findings.html</url>
  <content>Any requests or responses can be parsed for notable characteristics based on conditional statements using [Findings](https://docs.caido.io/guides/findings.html). As Caido proxies traffic, if it detects what you are looking for, an alert will be generated to draw your attention.

Creating Findings [​](#creating-findings)
-----------------------------------------

To create a Finding, use `sdk.findings.create()`. The `title`, `reporter` and `request` properties are required:

ts

    await sdk.findings.create({
      title: "Title", // Label your Finding.
      description: "Description", // Add a description (optional).
      reporter: "Reporter", // Specify which plugin discovered the Finding.
      dedupeKey: `${request.getHost()}-${request.getPath()}`, // Prevents multiple alerts for request with matching characteristics (optional).
      request, // The associated request.
    });

TIP

The `dedupeKey` can be any value, including [request](https://developer.caido.io/reference/sdks/backend/#request) or [response](https://developer.caido.io/reference/sdks/backend/#response-3) object properties (_besides the body element_). If the value is detected a second time, the Finding will be considered a duplicate and an alert will not be generated.

ts

    // Dedupe based on a string.
    dedupeKey: "Hello world!"
    // Dedupe based on request path and method.
    dedupeKey: `${request.getPath()}-${request.getMethod()}`
    // Dedupe based on request path, response code and response header.
    dedupeKey: `${request.getPath()}-${response.getCode()}-${response.getHeader("Content-Length")}`

Conditional Findings [​](#conditional-findings)
-----------------------------------------------

You can then set conditions that must be met such as only creating a Finding if the request recieved a 200 response:

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    import type { Request, Response } from "caido:utils";
    
    export type API = DefineAPI<{
      // No API methods needed for this passive functionality.
    }>;
    
    export function init(sdk: SDK<API>) {
      // Listen for intercepted responses.
      sdk.events.onInterceptResponse(
        async (
          sdk: SDK<API>, 
          request: Request, 
          response: Response
        ) => {
        try {
          // Only create Findings for 200 responses.
          if (response.getCode() === 200) {
            const dedupeKey = `${request.getPath()}-${response.getCode()}`;
            
            // Check if Finding already exists.
            const exists = await sdk.findings.exists(dedupeKey);
            if (!exists) {
              await sdk.findings.create({
                title: `Success Response ${response.getCode()}`,
                description: `Request ID: ${request.getId()}\nResponse Code: ${response.getCode()}`,
                reporter: "Response Logger Plugin",
                request: request,
                dedupeKey
              });
    
              // Verify the Finding was created.
              const created = await sdk.findings.exists(dedupeKey);
              if (created) {
                sdk.console.log(`Created and verified finding for request ${request.getId()}.`);
              }
            } else {
              sdk.console.log(`Finding already exists for ${dedupeKey}.`);
            }
          }
        } catch (err) {
          sdk.console.error(`Error handling finding: ${err}`);
        }
      });
    }

The Result [​](#the-result)
---------------------------</content>
</page>

<page>
  <title>Using Invalid UTF-8 | Developer</title>
  <url>https://developer.caido.io/guides/components/utf.html</url>
  <content>INFO

For conceptual information regarding this guide - click [here](https://developer.caido.io/concepts/backend/binary.html).

Using a Mutable Proxied Request [​](#using-a-mutable-proxied-request)
---------------------------------------------------------------------

To use invalid UTF-8 in the path of a request that passes through Caido, follow these steps:

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

First import the `SDK`, the interface used to interact with Caido.

ts

    import { SDK } from "caido:plugin";

Then create a function that takes proxied requests using `onInterceptRequest` and converts them into mutable, un-saved `RequestSpec` objects using the `.toSpec()` method. Next, store the path as a byte array using the spread operator `...`, and append the desired raw byte using `[...spec.getPath({raw: true}), 0x85];`. Update the request with the modified path using `.setPath()` and send the request.

ts

    export function init(sdk: SDK) {
      sdk.events.onInterceptRequest(async (sdk, request) => {
        const spec = request.toSpec();
        let path = [...spec.getPath({raw: true}), 0x85];
        spec.setPath(path);
        await sdk.requests.send(spec);
      });
    }

Using a Newly Created Request [​](#using-a-newly-created-request)
-----------------------------------------------------------------

To use invalid UTF-8 in the path of a `new RequestSpecRaw()` request, follow these steps:

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts-1)

First, import the required dependencies. `SDK` is the interface used to interact with Caido. `DefineAPI` is used to structure the API: definining what methods or endpoints are available, the parameters those methods accept and what types of values they return. `RequestSpecRaw` is an object class that is used to create a request in raw byte format.

ts

    import { RequestSpecRaw } from "caido:utils";
    import { SDK, DefineAPI } from "caido:plugin";

Next, define a function that will convert the path string into an array of bytes.

ts

    function stringToUint8Array(str: string): Uint8Array {
      const arr = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i);
      }
      return arr;
    }

Create an instance of the `RequestSpecRaw` class, by supplying the target URL as the constructor.

ts

    async function testSendRequest(sdk: SDK): Promise<void> {
      console.log("Testing send request");
      const req = new RequestSpecRaw("http://localhost:5555");

Call the `stringToUint8Array` function on the request data to convert it into a byte array. Send the request and if a response is received, print it in plaintext.

ts

      const rawRequest = "GET /admin\x85 HTTP/1.1\r\nHost: localhost:5555\r\n\r\n";
      req.setRaw(stringToUint8Array(rawRequest));
    
      const res = await sdk.requests.send(req);
      console.log(res?.response.getRaw().toText());
    }

Since we are using a button on the frontend to issue this request, define the `testSendRequest` function as an API call and register it to the backend.

ts

    export type API = DefineAPI<{
      testSendRequest: typeof testSendRequest;
    }>;
    
    export function init(sdk: SDK<API>) {
      sdk.api.register("testSendRequest", testSendRequest);
    }

TIP

To view the entire frontend script, expand the following:

ts

    import type { Caido } from "@caido/sdk-frontend";
    import type { API } from "../../backend/src/index";
    
    import "./styles/index.css";
    
    export type CaidoSDK = Caido<API>;
    
    const Commands = {
      sending: "my-plugin-page.req",
    } as const;
    
    const sending = async (sdk: CaidoSDK) => {
      await sdk.backend.testSendRequest();
    };
    
    const createPage = (sdk: CaidoSDK) => {
      const requestButton = sdk.ui.button({
        variant: "primary",
        label: "Send Request",
      });
    
      requestButton.addEventListener("click", async () => {
        await sending(sdk);
      });
    
      const bodyContainer = document.createElement("div");
      bodyContainer.appendChild(requestButton);
    
      const card = sdk.ui.card({
        body: bodyContainer,
    
      });
    
      sdk.navigation.addPage("/my-plugin-page", {
        body: card,
      });
    };
    
    export const init = (sdk: CaidoSDK) => {
      createPage(sdk);
      sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
        icon: "fas fa-rocket",
      });
    
      sdk.commands.register(Commands.sending, {
        name: "Send Request",
        run: () => sending(sdk),
      });
    };</content>
</page>

<page>
  <title>Adding Files | Developer</title>
  <url>https://developer.caido.io/guides/components/files.html</url>
  <content>To include additional files in your Caido plugins, you can add the `assets` property key to either the frontend or backend component objects in the `caido.config.ts` file. The key value is an array that stores the locations of any files accessible to the plugin.

In this guide we'll cover how to add a file to a plugin named `myfile.txt`.

In the root directory of your plugin package, create a new directory named `assets`. Within this directory, create the `myfile.txt` file, write content to it, and save it. The file can now be referenced with:

ts

    assets : ["./assets/myfile.txt"]

TIPS

Glob syntax (`*`) is supported to reference multiple files:

*   `/path/*.txt`: Will include all `.txt` files in the path directory.
*   `/**/file.txt`: Will include any `file.txt` within any directory.

Files and directories are included differently:

*   For a file, it will copy it at the root of the output assets directory.
*   For a directory, it will copy it recursively in the output assets directory.

INFO

The `assets` key can also be added to a plugin's `manifest.json` file. However, multiple locations can not be defined with this method.

Adding Files to the Frontend Component [​](#adding-files-to-the-frontend-component)
-----------------------------------------------------------------------------------

Open the `caido.config.ts` file and add the property to the `frontend` component object:

### /packages/frontend/src/index.ts [​](#packages-frontend-src-index-ts)

To read the file, the `sdk.assets.get()` method can be called.

ts

    const file = await sdk.assets.get("myfile.txt");

TIP

To view the entire frontend script, expand the following:

Full Script

ts

    import "./styles/index.css";
    
    import type { FrontendSDK } from "./types";
    
    // Note that the init function is async to account for fetching the files.
    export const init = async (sdk: FrontendSDK) => {
    
      const root = document.createElement("div");
      Object.assign(root.style, {
        height: "100%",
        width: "100%",
      });
    
      root.id = `plugin--frontend-vanilla`;
    
      const parent = document.createElement("div");
      parent.classList.add("h-full", "flex", "justify-center", "items-center");
    
      const container = document.createElement("div");
      container.classList.add("flex", "flex-col", "gap-1", "p-4");
    
      const file = await sdk.assets.get("myfile.txt");
      // For large files or to process in chunks, use file.asReadableStream() instead.
      const content = await file.asString();
      container.textContent = content;
    
      parent.appendChild(container);
    
      root.appendChild(parent);
    
      sdk.navigation.addPage("/view-file-plugin", {
        body: root,
      });
    
      sdk.sidebar.registerItem("View File Plugin", "/view-file-plugin");
    };

Adding Files to the Backend Component [​](#adding-files-to-the-backend-component)
---------------------------------------------------------------------------------

Open the `caido.config.ts` file and add the property to the `backend` component object:

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

By [creating a custom backend function](https://developer.caido.io/guides/components/rpc.html) to read the file, we can later call it from the frontend:

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    import { readFile } from 'fs/promises';
    import path from "path";
    
    const readMyFile = async (sdk: SDK) => {
      try {
        const filePath = path.join(sdk.meta.assetsPath(), "myfile.txt");
        const contents = await readFile(filePath, { encoding: 'utf8' });
        sdk.console.log(contents);
        return contents;
      } catch (err: any) {
        sdk.console.error(err.message);
        throw err;
      }
    };
    
    export type API = DefineAPI<{
      readMyFile: typeof readMyFile;
    }>;
    
    export function init(sdk: SDK<API>) {
      sdk.api.register("readMyFile", readMyFile);
    }

TIP

To view the entire frontend script, expand the following:

Full Script

ts

    import "./styles/index.css";
    
    import type { FrontendSDK } from "./types";
    
    export const init = async (sdk: FrontendSDK) => {
      const root = document.createElement("div");
      Object.assign(root.style, {
        height: "100%",
        width: "100%",
      });
    
      root.id = `plugin--frontend-vanilla`;
    
      const parent = document.createElement("div");
      parent.classList.add("h-full", "flex", "justify-center", "items-center");
    
      const container = document.createElement("div");
      container.classList.add("flex", "flex-col", "gap-1", "p-4");
    
      try {
        // Call the backend readMyFile() function to read myfile.txt.
        const content = await sdk.backend.readMyFile();
        container.textContent = content;
      } catch (error: any) {
        container.textContent = `Error reading file: ${error.message}`;
      }
    
      parent.appendChild(container);
    
      root.appendChild(parent);
    
      sdk.navigation.addPage("/view-file-plugin", {
        body: root,
      });
    
      sdk.sidebar.registerItem("View File Plugin", "/view-file-plugin");
    };

The Result [​](#the-result)
---------------------------</content>
</page>

<page>
  <title>Using Environment Variables | Developer</title>
  <url>https://developer.caido.io/guides/components/env.html</url>
  <content>You may want to allow users to use environment variables set via the `Environment` page in your Caido plugin.

Getting the Value: Frontend Call to Backend Function [​](#getting-the-value-frontend-call-to-backend-function)
--------------------------------------------------------------------------------------------------------------

To securely access environment variables in Caido, the `sdk.env.getVar()` method can be used:

### /packages/backend/src/index.ts [​](#packages-backend-src-index-ts)

ts

    import type { DefineAPI, SDK } from "caido:plugin";
    
    export type API = DefineAPI<{
      getSession: () => Promise<string | undefined>;
    }>;
    
    export function init(sdk: SDK<API>) {
      // Register an API endpoint that frontend can call.
      sdk.api.register("getSession", async () => {
        return sdk.env.getVar("User A");
      });
    }

### /packages/frontend/src/index.ts [​](#packages-frontend-src-index-ts)

ts

    const button = document.createElement("button");
    button.textContent = "Check for Env Variable";
    button.classList.add("bg-blue-500", "text-white", "p-2", "rounded");
    button.addEventListener("click", async () => {
      const apiKey = await sdk.backend.getSession();
      // Display the message as text.
      statusText.textContent = apiKey ? "SESSION FOUND" : "NO SESSION SET";
    });

Getting the Value: Frontend Call [​](#getting-the-value-frontend-call)
----------------------------------------------------------------------

The method is also available to the frontend directly.

### /packages/frontend/src/index.ts [​](#packages-frontend-src-index-ts-1)

ts

    const button = document.createElement("button");
    button.textContent = "Check for Env Variable";
    button.classList.add("bg-blue-500", "text-white", "p-2", "rounded");
    button.addEventListener("click", () => {
      const value = sdk.env.getVar("User A");
      statusText.textContent = value ? "SESSION FOUND" : "NO SESSION SET";
      });

The Result [​](#the-result)
---------------------------</content>
</page>

<page>
  <title>Setting Up Your Repository | Developer</title>
  <url>https://developer.caido.io/guides/distribution/repository.html</url>
  <content>Caido uses [GitHub](https://github.com/) to download and distribute plugin packages. To share your plugin with the community, you’ll first need to set up a Github repository that meets Caido’s requirements.

1\. Create Your Project [​](#_1-create-your-project)
----------------------------------------------------

Let's create a new project. Run the following command in your terminal and follow the instructions:

bash

    pnpm create @caido-community/plugin

This command will help you generate the basic structure and files needed for your plugin project.

If you’re new to Caido or want more detailed instructions, visit the [Getting Started](https://developer.caido.io/guides/) section for additional guidance on using this setup process .

2\. Create a Repository [​](#_2-create-a-repository)
----------------------------------------------------

Now we'll create a repository on Github. This repository will host your plugin code, and will be used to distribute your plugin package in the Caido Store.

1.  Visit [https://github.com/new](https://github.com/new)
2.  Give it a name and a description
3.  Click the `Create repository` button
4.  In your terminal, navigate to your project folder (created in the step 1)

5.  Connect your local project to your Github repository

bash

    git init
    git add .
    git commit -m "init"
    git branch -M main
    git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main

INFO

The steps above will create a repository under your own account.

If you would like to host your repository under the [caido-community](https://github.com/caido-community) organization instead, you can request a repository on our [Discord server](https://links.caido.io/www-discord).

3\. Generate a Key-Pair [​](#_3-generate-a-key-pair)
----------------------------------------------------

Plugin packages **must** be digitally signed to be installable in Caido.

To sign your plugin package, you need to generate a public/private key-pair.

### Generate the Private Key [​](#generate-the-private-key)

Run the following command to generate a private key:

bash

    openssl genpkey -algorithm ed25519 -out private.pem

This will create a file `private.pem` with the private key. We will use this key to sign our plugin package when we create a release.

The file `private.pem` will contain the following format:

    -----BEGIN PRIVATE KEY-----
    <SOME BASE64 DATA ON ONE LINE>
    -----END PRIVATE KEY-----

### Generate the Public Key [​](#generate-the-public-key)

Run the following command to generate a public key:

bash

    openssl pkey -in private.pem -pubout --out public.pem

This will create a file `public.pem` with the public key. We will use this key when submitting the plugin package to the store.

The file `public.pem` will contain the following format:

    -----BEGIN PUBLIC KEY-----
    <SOME BASE64 DATA ON ONE LINE>
    -----END PUBLIC KEY-----

4\. Create a Release [​](#_4-create-a-release)
----------------------------------------------

Now that your repository and key-pair are ready, it’s time to create a release!

1.  [Create a Github Action Secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) called `PRIVATE_KEY` with the content of the private key generated in [step 3](#3-generate-a-key-pair).
2.  Go to the `Actions` tab of your repository and trigger the `Release` workflow.

This will create a release with the version specified in your project's [caido.config.ts](https://developer.caido.io/guides/config.html#version) file.

What's next? [​](#what-s-next)
------------------------------

Now that you have a repository and a release, you can submit your plugin to the Caido Store for review.</content>
</page>

<page>
  <title>Documentation | Developer</title>
  <url>https://developer.caido.io/guides/contributions/documentation.html</url>
  <content>Our documentation is totally [open source](https://github.com/caido/doc-developer) and is there to help the community. We are doing our best to improve it, but we would gladly welcome your contributions. Don't hesitate to join our [Discord](https://links.caido.io/www-discord) if you need help.

Requirements [​](#requirements)
-------------------------------

*   [Git](https://git-scm.com/)
*   [NodeJS](https://nodejs.org/)
*   [Pnpm](https://pnpm.io/)
*   [Github Account](https://github.com/)

Steps [​](#steps)
-----------------

### Prepare [​](#prepare)

1.  (Optional) Open an issue on the [repository](https://github.com/caido/doc-developer) to let us know you are working on something.
2.  [Fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
3.  Clone your fork: `git clone https://github.com/[USERNAME]/doc-developer`.
4.  Move into the directory: `cd doc-developer`.
5.  Install dependencies: `pnpm i`
6.  Create a new branch: `git branch -b [BRANCH NAME]`.

You are now ready to edit files. 🚀

### Edits [​](#edits)

*   Pages are primarily markdown files, but HTML can be used too.
*   **Always** link pages in the `index.md` file otherwise they won't show up.
*   To render the website we suggest using: `pnpm dev`.

### Publish [​](#publish)

1.  Commit changes: `git add . && git commit -m "[WHAT IS MY COMMIT ABOUT]"`.
2.  Push changes to your fork: `git push`.
3.  Open a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) on the [Caido repository](https://github.com/caido/doc-developer).
4.  A preview link will appear in a comment.
5.  Sign the CLA using the link that will also appear in a comment.

We will then check your pull request, make changes if necessary and merge it. It will then appear on the official documentation. 🎉</content>
</page>

<page>
  <title>Submitting to the Store | Developer</title>
  <url>https://developer.caido.io/guides/distribution/store.html</url>
  <content>If you want to share your plugin package with the Caido community, the best way is to submit it to the official list of plugin packages.

Once we've reviewed and published your plugin package, users will be able to install it directly from within Caido.

The submission process is done once. Once your plugin package has been accepted, you'll be able to release new versions of it by creating new releases in your repository.

Prerequisites [​](#prerequisites)
---------------------------------

Before submitting your plugin package to the store, make sure you have followed the [Setting Up Your Repository](https://developer.caido.io/guides/distribution/repository.html) guide.

By this point, you should have a repository with a [Github release](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) of your plugin package.

1\. Submit Your Plugin for Review [​](#_1-submit-your-plugin-for-review)
------------------------------------------------------------------------

The official list of plugin packages can be found in the `plugin_packages.json` file in the [caido/store](https://github.com/caido/store) repository.

In order to submit your plugin package, you need to update the `plugin_packages.json` file via a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

1.  Visit [plugin\_packages.json](https://github.com/caido/store/edit/main/plugin_packages.json) to edit the file.
    
2.  Add a new entry at the end of the JSON array. **Remember to add a comma after the closing brace `}` of the previous entry otherwise the json will not be valid.** Visit the [reference](https://developer.caido.io/reference/plugin_packages.html) page for more information on each field.
    
    json
    
        {
          "id": "my-unique-plugin",
          "name": "My Unique Plugin",
          "license": "MIT",
          "description": "This my super cool new Caido plugin",
          "author": {
            "name": "John Doe",
            "email": "john@example.com",
            "url": "https://example.com"
          },
          "public_key": "MCowBQYDK2VwAyEA0zDx1tIO7S/d+AYFjLLmTA6pvuEyf+70KfcgVi1DNhc=",
          "repository": "john/my-unique-plugin"
        }
    
3.  Select `Commit changes...` in the upper-right corner.
    
4.  Select `Propose changes`.
    
5.  Name your pull request `Add <YOUR PLUGIN PACKAGE NAME>`
    
6.  Fill in the details in the description for the pull request. For the checkboxes, insert an x between the brackets, \[x\], to mark them as done.
    
7.  Click `Create pull request`.
    

You've now submitted your plugin package to the Caido store. Our bot will verify that the format is correct and you will have to sign the [Contributor License Agreement](https://cla-assistant.io/caido/store). Once your submission is ready for review, you can sit back and wait for the Caido team to review it.

Once a Caido team member has reviewed your plugin, they will add a comment to your pull request with the result of the review. The reviewer may ask that you update your plugin, or they can offer suggestions on how you can improve it.

Address any required changes and update the GitHub release with the new changes. Leave a comment on the PR to let us know you've addressed the feedback.

We will publish the plugin as soon we have verified that all required changes have been addressed.

What's next? [​](#what-s-next)
------------------------------

Once your plugin is published, it is time to announce it to the community! ✨

*   Announce it in the Plugin `#discussion` channel on [Discord](https://links.caido.io/www-discord).</content>
</page>