
 [Skip to content](#VPContent) [![](/logo.png)Caido](/)Search`K`Main Navigation[Guides](/guides/)[Tutorials](/tutorials/)[Reference](/reference/)[Concepts](/concepts/)[Policy](/policy.html)MenuReturn to top Sidebar Navigation
## Reference

[Introduction](/reference/)
## SDKs

[Backend](/reference/sdks/backend/)[Frontend](/reference/sdks/frontend/)[Workflow](/reference/sdks/workflow/)
## Runtime

[Backend Modules](/reference/modules/)
## Cloud

[Authentication](/reference/cloud/authentication/)[API](/reference/cloud/api/)
## Files

[caido.config.ts](/reference/config.html)[plugin\_packages.json](/reference/plugin_packages.html)[manifest.json](/reference/manifest.html)On this page

# @caido/sdk-frontend [​](#caido-sdk-frontend)

This is the reference for the frontend SDK used by frontend plugins. [Caido](#caido-t-e) is the main interface that provides access to various services and functionalities.

## SDK [​](#sdk)

### Caido<T, E> [​](#caido-t-e)

> **Caido**<`T`, `E`>: `object`

Utilities for frontend plugins.

#### Type Parameters [​](#type-parameters)

| Type Parameter | Default type |
| --- | --- |
| `T` *extends* [`BackendEndpoints`](./#backendendpoints) | `Record`<`string`, `never`> |
| `E` *extends* [`BackendEvents`](./#backendevents) | `Record`<`string`, `never`> |

#### Type declaration [​](#type-declaration)

##### assets [​](#assets)

> **assets**: [`AssetsSDK`](./#assetssdk)

Utilities to interact with the plugin's static assets.

##### backend [​](#backend)

> **backend**: [`BackendSDK`](./#backendsdkt-e)<`T`, `E`>

Utilities to interact with the backend plugin.

##### commandPalette [​](#commandpalette)

> **commandPalette**: [`CommandPaletteSDK`](./#commandpalettesdk)

Utilities to interact with the command palette.

##### commands [​](#commands)

> **commands**: [`CommandsSDK`](./#commandssdk)

Utilities to interact with commands

##### env [​](#env)

> **env**: [`EnvironmentSDK`](./#environmentsdk)

Utilities to interact with the environment.

##### files [​](#files)

> **files**: [`FilesSDK`](./#filessdk)

Utilities to interact with the Files page.

##### filters [​](#filters)

> **filters**: [`FiltersSDK`](./#filterssdk)

Utilities to interact with Filters page.

##### findings [​](#findings)

> **findings**: [`FindingsSDK`](./#findingssdk)

Utilities to interact with findings

##### footer [​](#footer)

> **footer**: [`FooterSDK`](./#footersdk)

Utilities to interact with the footer.

##### graphql [​](#graphql)

> **graphql**: `GraphqlSDK`

Utilities to interact with the GraphQL API.

##### httpHistory [​](#httphistory)

> **httpHistory**: [`HTTPHistorySDK`](./#httphistorysdk)

Utilities to interact with the HTTP History page.

##### intercept [​](#intercept)

> **intercept**: [`InterceptSDK`](./#interceptsdk)

Utilities to interact with the Intercept page.

##### matchReplace [​](#matchreplace)

> **matchReplace**: [`MatchReplaceSDK`](./#matchreplacesdk)

Utilities to interact with Match and Replace page.

##### menu [​](#menu)

> **menu**: [`MenuSDK`](./#menusdk)

Utilities to insert menu items and context-menus throughout the UI.

##### navigation [​](#navigation)

> **navigation**: [`NavigationSDK`](./#navigationsdk)

Utilities to interact with navigation.

##### replay [​](#replay)

> **replay**: [`ReplaySDK`](./#replaysdk)

Utilities to interact with the Replay page.

##### runtime [​](#runtime)

> **runtime**: [`RuntimeSDK`](./#runtimesdk)

Utilities to interact with the runtime.

##### scopes [​](#scopes)

> **scopes**: [`ScopesSDK`](./#scopessdk)

Utilities to interact with scopes

##### search [​](#search)

> **search**: [`SearchSDK`](./#searchsdk)

Utilities to interact with the Search page.

##### shortcuts [​](#shortcuts)

> **shortcuts**: [`ShortcutsSDK`](./#shortcutssdk)

Utilities to interact with shortcuts.

##### sidebar [​](#sidebar)

> **sidebar**: [`SidebarSDK`](./#sidebarsdk)

Utilities to interact with the sidebar.

##### sitemap [​](#sitemap)

> **sitemap**: [`SitemapSDK`](./#sitemapsdk)

Utilities to interact with the Sitemap page.

##### storage [​](#storage)

> **storage**: [`StorageSDK`](./#storagesdk)

Utilities to interact with frontend-plugin storage.

##### ui [​](#ui)

> **ui**: [`UISDK`](./#uisdk)

Utilities to create UI components.

##### window [​](#window)

> **window**: [`WindowSDK`](./#windowsdk)

Utilities to interact with the active page.

##### workflows [​](#workflows)

> **workflows**: [`WorkflowSDK`](./#workflowsdk)

Utilities to interact with workflows.

## Backend [​](#backend-1)

### BackendEndpoints [​](#backendendpoints)

> **BackendEndpoints**: `object`

Endpoints provided by the backend plugin.

#### Index Signature [​](#index-signature)

[`key`: `string`]: (...`args`: `any`[]) => `any`

---

### BackendEvents [​](#backendevents)

> **BackendEvents**: `object`

Events emitted by the backend plugin.

#### Index Signature [​](#index-signature-1)

[`key`: `string`]: (...`args`: `any`[]) => `void`

---

### BackendSDK<T, E> [​](#backendsdk-t-e)

> **BackendSDK**<`T`, `E`>: `{ [K in keyof T]: (args: Parameters<T[K]>) => PromisifiedReturnType<T[K]> }` & `object`

Utilities to interact with the backend plugin.

#### Type declaration [​](#type-declaration-1)

##### onEvent() [​](#onevent)

> **onEvent**: <`K`>(`event`: `K`, `callback`: `E`[`K`]) => `object`

Subscribe to a backend event.

###### Type Parameters [​](#type-parameters-1)

| Type Parameter |
| --- |
| `K` *extends* keyof `E` |

###### Parameters [​](#parameters)

| Parameter | Type | Description |
| --- | --- | --- |
| `event` | `K` | The event to subscribe to. |
| `callback` | `E`[`K`] | The callback to call when the event is emitted. |

###### Returns [​](#returns)

`object`

An object with a `stop` method that can be called to stop listening to the event.

###### stop() [​](#stop)

> **stop**: () => `void`

###### Returns [​](#returns-1)

`void`

#### Type Parameters [​](#type-parameters-2)

| Type Parameter |
| --- |
| `T` *extends* [`BackendEndpoints`](./#backendendpoints) |
| `E` *extends* [`BackendEvents`](./#backendevents) |

## UI [​](#ui-1)

### UISDK [​](#uisdk)

> **UISDK**: `object`

Utilities to create UI components.

#### Type declaration [​](#type-declaration-2)

##### button() [​](#button)

> **button**: (`options`?: `object`) => `HTMLElement`

Create a button.

###### Parameters [​](#parameters-1)

| Parameter | Type | Description |
| --- | --- | --- |
| `options`? | { `label`: `string`; `leadingIcon`: [`Icon`](./#icon); `size`: `"small"` | `"medium"` | `"large"`; `trailingIcon`: [`Icon`](./#icon); `variant`: `"primary"` | `"secondary"` | `"tertiary"`; } | Options for the button. |
| `options.label`? | `string` | The label of the button. |
| `options.leadingIcon`? | [`Icon`](./#icon) | The leading icon of the button. |
| `options.size`? | `"small"` | `"medium"` | `"large"` | The size of the button. |
| `options.trailingIcon`? | [`Icon`](./#icon) | The trailing icon of the button. |
| `options.variant`? | `"primary"` | `"secondary"` | `"tertiary"` | The variant of the button. |

###### Returns [​](#returns-2)

`HTMLElement`

The button element.

###### Example [​](#example)

ts
```
const deleteButton = sdk.ui.button({
  variant: "primary",
  label: "Delete",
  trailingIcon: "fas fa-trash-can",
  size: "small",
});
```
##### card() [​](#card)

> **card**: (`options`?: `object`) => `HTMLElement`

Create a card.

###### Parameters [​](#parameters-2)

| Parameter | Type | Description |
| --- | --- | --- |
| `options`? | { `body`: `HTMLElement`; `footer`: `HTMLElement`; `header`: `HTMLElement`; } | Options for the card. |
| `options.body`? | `HTMLElement` | The body of the card. |
| `options.footer`? | `HTMLElement` | The footer of the card. |
| `options.header`? | `HTMLElement` | The header of the card. |

###### Returns [​](#returns-3)

`HTMLElement`

The card element.

##### httpRequestEditor() [​](#httprequesteditor)

> **httpRequestEditor**: () => [`HTTPRequestEditor`](./#httprequesteditor)

Create an HTTP request editor

###### Returns [​](#returns-4)

[`HTTPRequestEditor`](./#httprequesteditor)

The HTTP request editor.

##### httpResponseEditor() [​](#httpresponseeditor)

> **httpResponseEditor**: () => [`HTTPResponseEditor`](./#httpresponseeditor)

Create an HTTP response editor

###### Returns [​](#returns-5)

[`HTTPResponseEditor`](./#httpresponseeditor)

The HTTP response editor.

##### well() [​](#well)

> **well**: (`options`?: `object`) => `HTMLElement`

Create a well.

###### Parameters [​](#parameters-3)

| Parameter | Type | Description |
| --- | --- | --- |
| `options`? | { `body`: `HTMLElement`; `footer`: `HTMLElement`; `header`: `HTMLElement`; } | Options for the well. |
| `options.body`? | `HTMLElement` | The body of the well. |
| `options.footer`? | `HTMLElement` | The footer of the well. |
| `options.header`? | `HTMLElement` | The header of the well. |

###### Returns [​](#returns-6)

`HTMLElement`

The well element.

## Scopes [​](#scopes-1)

### Scope [​](#scope)

> **Scope**: `object`

Represents a scope.

#### Type declaration [​](#type-declaration-3)

##### allowlist [​](#allowlist)

> **allowlist**: `string`[]

The list of included items.

##### denylist [​](#denylist)

> **denylist**: `string`[]

The list of excluded items.

##### id [​](#id)

> **id**: [`ID`](./#id-3)

The unique ID of the scope.

##### name [​](#name)

> **name**: `string`

The name of the scope.

---

### ScopesSDK [​](#scopessdk)

> **ScopesSDK**: `object`

Utilities to interact with scopes

#### Type declaration [​](#type-declaration-4)

##### createScope() [​](#createscope)

> **createScope**: (`options`: `object`) => `Promise`<[`Scope`](./#scope) | `undefined`>

Create a scope.

###### Parameters [​](#parameters-4)

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | { `allowlist`: `string`[]; `denylist`: `string`[]; `name`: `string`; } | Options for the scope. |
| `options.allowlist` | `string`[] | The list of included items in the scope. |
| `options.denylist` | `string`[] | The list of excluded items in the scope. |
| `options.name` | `string` | The name of the scope. |

###### Returns [​](#returns-7)

`Promise`<[`Scope`](./#scope) | `undefined`>

The created scope.

###### Example [​](#example-1)

ts
```
const newScope = await sdk.scopes.createScope({
  name: "Example",
  allowlist: ["*example.com", "*github.com"],
  denylist: ["*caido.io"],
});
```
##### deleteScope() [​](#deletescope)

> **deleteScope**: (`id`: [`ID`](./#id-3)) => `Promise`<`boolean`>

Delete a scope.

###### Parameters [​](#parameters-5)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The id of the scope to delete. |

###### Returns [​](#returns-8)

`Promise`<`boolean`>

Whether the scope was deleted.

##### getScopes() [​](#getscopes)

> **getScopes**: () => [`Scope`](./#scope)[]

Get all scopes.

###### Returns [​](#returns-9)

[`Scope`](./#scope)[]

A list of scopes.

##### updateScope() [​](#updatescope)

> **updateScope**: (`id`: [`ID`](./#id-3), `options`: `object`) => `Promise`<[`Scope`](./#scope) | `undefined`>

Update a scope.

###### Parameters [​](#parameters-6)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The id of the scope to update. |
| `options` | { `allowlist`: `string`[]; `denylist`: `string`[]; `name`: `string`; } | Options for the scope. |
| `options.allowlist`? | `string`[] | The list of included items in the scope. |
| `options.denylist`? | `string`[] | The list of excluded items in the scope. |
| `options.name`? | `string` | The name of the scope. |

###### Returns [​](#returns-10)

`Promise`<[`Scope`](./#scope) | `undefined`>

The updated scope.

## Findings [​](#findings-1)

### Finding [​](#finding)

> **Finding**: `object`

Represents a [https://docs.caido.io/reference/features/logging/findings|Finding](https://docs.caido.io/reference/features/logging/findings%7CFinding).

#### Type declaration [​](#type-declaration-5)

##### description? [​](#description)

> `optional` **description**: `string`

The description of the finding.

##### host [​](#host)

> **host**: `string`

The host of the request attached to this finding

##### id [​](#id-1)

> **id**: [`ID`](./#id-3)

The ID of the finding.

##### path [​](#path)

> **path**: `string`

The path of the request attached to this finding

##### reporter [​](#reporter)

> **reporter**: `string`

The reporter of the finding.

##### title [​](#title)

> **title**: `string`

The title of the finding.

---

### FindingsSDK [​](#findingssdk)

> **FindingsSDK**: `object`

Utilities to interact with findings

#### Type declaration [​](#type-declaration-6)

##### createFinding() [​](#createfinding)

> **createFinding**: (`requestId`: [`ID`](./#id-3), `options`: `object`) => `Promise`<[`Finding`](./#finding) | `undefined`>

Create a [Finding](./#finding).

###### Parameters [​](#parameters-7)

| Parameter | Type | Description |
| --- | --- | --- |
| `requestId` | [`ID`](./#id-3) | The id of the request the finding is associated with. |
| `options` | { `dedupeKey`: `string`; `description`: `string`; `reporter`: `string`; `title`: `string`; } | Options for the finding. |
| `options.dedupeKey`? | `string` | If a finding with the same deduplication key already exists, it will not create a new finding. |
| `options.description`? | `string` | The description of the finding. |
| `options.reporter` | `string` | The reporter of the finding. |
| `options.title` | `string` | The title of the finding. |

###### Returns [​](#returns-11)

`Promise`<[`Finding`](./#finding) | `undefined`>

The created finding.

## Commands [​](#commands-1)

### CommandContext [​](#commandcontext)

> **CommandContext**: [`CommandContextBase`](./#commandcontextbase) | [`CommandContextRequestRow`](./#commandcontextrequestrow) | [`CommandContextRequest`](./#commandcontextrequest) | [`CommandContextResponse`](./#commandcontextresponse)

Represents the context in which a command is executed.

---

### CommandContextBase [​](#commandcontextbase)

> **CommandContextBase**: `object`

The base context for a command. This context is used for commands that are not executed in a specific context, such as via shortcuts and the command palette.

#### Type declaration [​](#type-declaration-7)

##### type [​](#type)

> **type**: `"BaseContext"`

---

### CommandContextRequest [​](#commandcontextrequest)

> **CommandContextRequest**: `object`

The context for a command that is executed on a request pane.

#### Type declaration [​](#type-declaration-8)

##### request [​](#request)

> **request**: `object`

The request that is currently open in the request pane. If the request has not yet been saved in the database, the id will be undefined.

###### request.host [​](#request-host)

> **host**: `string`

###### request.id [​](#request-id)

> **id**: [`ID`](./#id-3) | `undefined`

###### request.isTls [​](#request-istls)

> **isTls**: `boolean`

###### request.path [​](#request-path)

> **path**: `string`

###### request.port [​](#request-port)

> **port**: `number`

###### request.query [​](#request-query)

> **query**: `string`

###### request.raw [​](#request-raw)

> **raw**: `string`

###### request.streamId? [​](#request-streamid)

> `optional` **streamId**: [`ID`](./#id-3)

##### selection [​](#selection)

> **selection**: `string`

The currently selected text in the request pane.

##### type [​](#type-1)

> **type**: `"RequestContext"`

---

### CommandContextRequestRow [​](#commandcontextrequestrow)

> **CommandContextRequestRow**: `object`

The context for a command that is executed on a row in the request table.

#### Type declaration [​](#type-declaration-9)

##### requests [​](#requests)

> **requests**: `object`[]

The requests that are selected in the request table.

##### type [​](#type-2)

> **type**: `"RequestRowContext"`

---

### CommandContextResponse [​](#commandcontextresponse)

> **CommandContextResponse**: `object`

The context for a command that is executed on a response pane.

#### Type declaration [​](#type-declaration-10)

##### request [​](#request-1)

> **request**: `object`

The request that is associated with the response.

###### request.host [​](#request-host-1)

> **host**: `string`

###### request.id [​](#request-id-1)

> **id**: [`ID`](./#id-3)

###### request.isTls [​](#request-istls-1)

> **isTls**: `boolean`

###### request.path [​](#request-path-1)

> **path**: `string`

###### request.port [​](#request-port-1)

> **port**: `number`

###### request.query [​](#request-query-1)

> **query**: `string`

###### request.streamId? [​](#request-streamid-1)

> `optional` **streamId**: [`ID`](./#id-3)

##### response [​](#response)

> **response**: `object`

The response that is currently open in the response pane.

###### response.id [​](#response-id)

> **id**: [`ID`](./#id-3)

###### response.raw [​](#response-raw)

> **raw**: `string`

###### response.roundtripTime [​](#response-roundtriptime)

> **roundtripTime**: `number`

###### response.statusCode [​](#response-statuscode)

> **statusCode**: `number`

##### selection [​](#selection-1)

> **selection**: `string`

The currently selected text in the response pane.

##### type [​](#type-3)

> **type**: `"ResponseContext"`

---

### CommandsSDK [​](#commandssdk)

> **CommandsSDK**: `object`

Utilities to interact with commands

#### Type declaration [​](#type-declaration-11)

##### register() [​](#register)

> **register**: (`id`: [`CommandID`](./#commandid), `options`: `object`) => `void`

Register a command.

###### Parameters [​](#parameters-8)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`CommandID`](./#commandid) | The id of the command. |
| `options` | { `group`: `string`; `name`: `string`; `run`: (`context`: [`CommandContext`](./#commandcontext)) => `Promise`<`void`> | `void`; `when`: (`context`: [`CommandContext`](./#commandcontext)) => `Promise`<`boolean`> | `boolean`; } | Options for the command. |
| `options.group`? | `string` | The group this command belongs to. |
| `options.name` | `string` | The name of the command. |
| `options.run` | (`context`: [`CommandContext`](./#commandcontext)) => `Promise`<`void`> | `void` | The function to run when the command is executed. |
| `options.when`? | (`context`: [`CommandContext`](./#commandcontext)) => `Promise`<`boolean`> | `boolean` | A function to determine if the command is available. |

###### Returns [​](#returns-12)

`void`

###### Example [​](#example-2)

ts
```
sdk.commands.register("hello", {
  name: "Print to console.",
  run: () => console.log("Hello world!"),
  group: "Custom Commands",
});
```
## Menu [​](#menu-1)

### MenuItem [​](#menuitem)

> **MenuItem**: [`RequestRowMenuItem`](./#requestrowmenuitem) | [`SettingsMenuItem`](./#settingsmenuitem) | [`RequestMenuItem`](./#requestmenuitem) | [`ResponseMenuItem`](./#responsemenuitem)

A content-menu item.

---

### MenuSDK [​](#menusdk)

> **MenuSDK**: `object`

Utilities to insert menu items and context-menus throughout the UI.

#### Type declaration [​](#type-declaration-12)

##### registerItem() [​](#registeritem)

> **registerItem**: (`item`: [`MenuItem`](./#menuitem)) => `void`

Register a menu item.

###### Parameters [​](#parameters-9)

| Parameter | Type | Description |
| --- | --- | --- |
| `item` | [`MenuItem`](./#menuitem) | The menu item to register. |

###### Returns [​](#returns-13)

`void`

###### Example [​](#example-3)

ts
```
sdk.menu.registerItem({
  type: "Request",
  commandId: "hello",
  leadingIcon: "fas fa-hand",
});
```

---

### RequestMenuItem [​](#requestmenuitem)

> **RequestMenuItem**: `object`

A context-menu item that appears when right-clicking a request pane.

#### Type declaration [​](#type-declaration-13)

##### commandId [​](#commandid)

> **commandId**: [`CommandID`](./#commandid)

The command ID to execute when the menu item is clicked.

##### leadingIcon? [​](#leadingicon)

> `optional` **leadingIcon**: `string`

The icon to display to the left of the menu item.

##### type [​](#type-4)

> **type**: `"Request"`

---

### RequestRowMenuItem [​](#requestrowmenuitem)

> **RequestRowMenuItem**: `object`

A context-menu item that appears when right-clicking a request row.

#### Type declaration [​](#type-declaration-14)

##### commandId [​](#commandid-1)

> **commandId**: [`CommandID`](./#commandid)

The command ID to execute when the menu item is clicked.

##### leadingIcon? [​](#leadingicon-1)

> `optional` **leadingIcon**: `string`

The icon to display to the left of the menu item.

##### type [​](#type-5)

> **type**: `"RequestRow"`

---

### ResponseMenuItem [​](#responsemenuitem)

> **ResponseMenuItem**: `object`

A context-menu item that appears when right-clicking a response pane.

#### Type declaration [​](#type-declaration-15)

##### commandId [​](#commandid-2)

> **commandId**: [`CommandID`](./#commandid)

The command ID to execute when the menu item is

##### leadingIcon? [​](#leadingicon-2)

> `optional` **leadingIcon**: `string`

The icon to display to the left of the menu item.

##### type [​](#type-6)

> **type**: `"Response"`

---

### SettingsMenuItem [​](#settingsmenuitem)

> **SettingsMenuItem**: `object`

A menu item that appears in the settings menu.

#### Type declaration [​](#type-declaration-16)

##### label [​](#label)

> **label**: `string`

The label of the menu item.

##### leadingIcon? [​](#leadingicon-3)

> `optional` **leadingIcon**: [`Icon`](./#icon)

The [Icon](./#icon) to display to the left of the menu item.

##### path [​](#path-1)

> **path**: `string`

The path that the user will be navigated to when the menu item is clicked The path must start with "/settings/".

##### type [​](#type-7)

> **type**: `"Settings"`

## Navigation [​](#navigation-1)

### NavigationSDK [​](#navigationsdk)

> **NavigationSDK**: `object`

Utilities to interact with navigation.

#### Type declaration [​](#type-declaration-17)

##### addPage() [​](#addpage)

> **addPage**: (`path`: `string`, `options`: `object`) => `void`

Add a page to the navigation.

###### Parameters [​](#parameters-10)

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The path of the page. |
| `options` | { `body`: `HTMLElement`; `onEnter`: () => `void`; `topbar`: `HTMLElement`; } | Options for the page. |
| `options.body` | `HTMLElement` | The body of the page. |
| `options.onEnter`? | () => `void` | The callback to execute when the page is entered. |
| `options.topbar`? | `HTMLElement` | The topbar of the page. |

###### Returns [​](#returns-14)

`void`

##### goTo() [​](#goto)

> **goTo**: (`path`: `string`) => `void`

Navigate to a path.

###### Parameters [​](#parameters-11)

| Parameter | Type | Description |
| --- | --- | --- |
| `path` | `string` | The path to navigate to. |

###### Returns [​](#returns-15)

`void`

###### Example [​](#example-4)

ts
```
sdk.navigation.goTo("/my-plugin-page");
```
## Window [​](#window-1)

### WindowSDK [​](#windowsdk)

> **WindowSDK**: `object`

Utilities to interact with the active page.

#### Type declaration [​](#type-declaration-18)

##### getActiveEditor() [​](#getactiveeditor)

> **getActiveEditor**: () => [`Editor`](./#editor) | `undefined`

Get the active editor.

###### Returns [​](#returns-16)

[`Editor`](./#editor) | `undefined`

The active editor.

##### showDialog() [​](#showdialog)

> **showDialog**: (`component`: [`ComponentDefinition`](./#componentdefinition), `options`?: [`DialogOptions`](./#dialogoptions)) => [`Dialog`](./#dialog)

Show a dialog component.

###### Parameters [​](#parameters-12)

| Parameter | Type | Description |
| --- | --- | --- |
| `component` | [`ComponentDefinition`](./#componentdefinition) | The custom slot content to display in the dialog. |
| `options`? | [`DialogOptions`](./#dialogoptions) | Options for the dialog. |

###### Returns [​](#returns-17)

[`Dialog`](./#dialog)

A dialog object that can be used to close the dialog.

##### showToast() [​](#showtoast)

> **showToast**: (`message`: `string`, `options`?: `object`) => `void`

Show a toast message.

###### Parameters [​](#parameters-13)

| Parameter | Type | Description |
| --- | --- | --- |
| `message` | `string` | The message to show. |
| `options`? | { `duration`: `number`; `variant`: `"success"` | `"error"` | `"warning"` | `"info"`; } | Options for the toast message. |
| `options.duration`? | `number` | The duration of the toast message in milliseconds. |
| `options.variant`? | `"success"` | `"error"` | `"warning"` | `"info"` | The variant of the toast message. |

###### Returns [​](#returns-18)

`void`

## Storage [​](#storage-1)

### StorageSDK [​](#storagesdk)

> **StorageSDK**: `object`

Utilities to interact with frontend-plugin storage.

#### Type declaration [​](#type-declaration-19)

##### get() [​](#get)

> **get**: () => [`JSONValue`](./#jsonvalue)

Get the storage.

###### Returns [​](#returns-19)

[`JSONValue`](./#jsonvalue)

The storage.

##### onChange() [​](#onchange)

> **onChange**: (`callback`: (`value`: [`JSONValue`](./#jsonvalue)) => `void`) => `void`

Subscribe to storage changes.

###### Parameters [​](#parameters-14)

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | (`value`: [`JSONValue`](./#jsonvalue)) => `void` | The callback to call when the storage changes. |

###### Returns [​](#returns-20)

`void`

##### set() [​](#set)

> **set**: <`T`>(`value`: [`JSONCompatible`](./#jsoncompatiblet)<`T`>) => `Promise`<`void`>

Set the storage.

###### Type Parameters [​](#type-parameters-3)

| Type Parameter |
| --- |
| `T` |

###### Parameters [​](#parameters-15)

| Parameter | Type | Description |
| --- | --- | --- |
| `value` | [`JSONCompatible`](./#jsoncompatiblet)<`T`> | The value to set the storage to |

###### Returns [​](#returns-21)

`Promise`<`void`>

A promise that resolves when the storage has been set.

## Shortcuts [​](#shortcuts-1)

### ShortcutsSDK [​](#shortcutssdk)

> **ShortcutsSDK**: `object`

Utilities to interact with shortcuts.

#### Type declaration [​](#type-declaration-20)

##### register() [​](#register-1)

> **register**: (`commandId`: [`CommandID`](./#commandid), `keys`: `string`[]) => `void`

Register a shortcut.

###### Parameters [​](#parameters-16)

| Parameter | Type | Description |
| --- | --- | --- |
| `commandId` | [`CommandID`](./#commandid) | The id of the command to run when the shortcut is triggered. |
| `keys` | `string`[] | The keys of the shortcut. Check out [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) for the list of supported keys. |

###### Returns [​](#returns-22)

`void`

## Command Palette [​](#command-palette)

### CommandPaletteSDK [​](#commandpalettesdk)

> **CommandPaletteSDK**: `object`

Utilities to interact with the command palette.

#### Type declaration [​](#type-declaration-21)

##### register() [​](#register-2)

> **register**: (`commandId`: [`CommandID`](./#commandid)) => `void`

Register a command.

###### Parameters [​](#parameters-17)

| Parameter | Type | Description |
| --- | --- | --- |
| `commandId` | [`CommandID`](./#commandid) | The id of the command to register. |

###### Returns [​](#returns-23)

`void`

## Sidebar [​](#sidebar-1)

### SidebarItem [​](#sidebaritem)

> **SidebarItem**: `object`

Represents a sidebar item.

#### Type declaration [​](#type-declaration-22)

##### setCount() [​](#setcount)

> **setCount**: (`count`: `number`) => `void`

Set the value of a notification badge next to the sidebar item.

###### Parameters [​](#parameters-18)

| Parameter | Type | Description |
| --- | --- | --- |
| `count` | `number` | The number to display in the badge. A value of 0 will hide the badge. |

###### Returns [​](#returns-24)

`void`

---

### SidebarSDK [​](#sidebarsdk)

> **SidebarSDK**: `object`

Utilities to interact with the sidebar.

#### Type declaration [​](#type-declaration-23)

##### registerItem() [​](#registeritem-1)

> **registerItem**: (`name`: `string`, `path`: `string`, `options`?: `object`) => [`SidebarItem`](./#sidebaritem)

Register a sidebar item.

###### Parameters [​](#parameters-19)

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the sidebar item. |
| `path` | `string` | The path that the user will be navigated to when the sidebar item is clicked. |
| `options`? | { `group`: `string`; `icon`: [`Icon`](./#icon); `isExternal`: `boolean`; } | Options for the sidebar item. |
| `options.group`? | `string` | The group the sidebar item belongs to. |
| `options.icon`? | [`Icon`](./#icon) | The [Icon](./#icon) of the sidebar item. |
| `options.isExternal`? | `boolean` | Whether the path points to an external URL. |

###### Returns [​](#returns-25)

[`SidebarItem`](./#sidebaritem)

The created sidebar item.

###### Example [​](#example-5)

ts
```
sdk.sidebar.registerItem("My Plugin", "/my-plugin-page", {
  icon: "fas fa-rocket",
});
```
## Replay [​](#replay-1)

### OpenTabOptions [​](#opentaboptions)

> **OpenTabOptions**: `object`

Options for opening a tab.

#### Type declaration [​](#type-declaration-24)

##### select? [​](#select)

> `optional` **select**: `boolean`

Whether to select the tab after opening it. Defaults to true.

---

### ReplayCollection [​](#replaycollection)

> **ReplayCollection**: `object`

A collection in Replay.

#### Type declaration [​](#type-declaration-25)

##### id [​](#id-2)

> **id**: [`ID`](./#id-3)

The ID of the collection.

##### name [​](#name-1)

> **name**: `string`

The name of the collection.

##### sessionIds [​](#sessionids)

> **sessionIds**: [`ID`](./#id-3)[]

The sessions in the collection.

---

### ReplaySDK [​](#replaysdk)

> **ReplaySDK**: `object`

Utilities to interact with Replay.

#### Type declaration [​](#type-declaration-26)

##### addRequestEditorExtension() [​](#addrequesteditorextension)

> **addRequestEditorExtension**: (`extension`: `Extension`) => `void`

Add an extension to the request editor.

###### Parameters [​](#parameters-20)

| Parameter | Type | Description |
| --- | --- | --- |
| `extension` | `Extension` | The extension to add. |

###### Returns [​](#returns-26)

`void`

##### addToSlot [​](#addtoslot)

> **addToSlot**: [`DefineAddToSlotFn`](./#defineaddtoslotfntmap)<[`ReplaySlotContent`](./#replayslotcontent)>

Add a component to a slot.

###### Param [​](#param)

The slot to add the component to.

###### Param [​](#param-1)

The content to add to the slot.

###### Example [​](#example-6)

ts
```
addToSlot(ReplaySlot.SessionToolbarPrimary, {
  kind: "Command",
  commandId: "my-command",
  icon: "my-icon",
});

addToSlot(ReplaySlot.SessionToolbarSecondary, {
  kind: "Custom",
  component: MyComponent,
});

addToSlot(ReplaySlot.Topbar, {
  kind: "Button",
  label: "My Button",
  icon: "my-icon",
  onClick: () => {
    console.log("Button clicked");
  },
});
```
##### closeTab() [​](#closetab)

> **closeTab**: (`sessionId`: [`ID`](./#id-3)) => `void`

Close a replay tab for the given session.

###### Parameters [​](#parameters-21)

| Parameter | Type | Description |
| --- | --- | --- |
| `sessionId` | [`ID`](./#id-3) | The ID of the session to close. |

###### Returns [​](#returns-27)

`void`

##### createCollection() [​](#createcollection)

> **createCollection**: (`name`: `string`) => `Promise`<[`ReplayCollection`](./#replaycollection)>

Create a new collection.

###### Parameters [​](#parameters-22)

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the collection to create. |

###### Returns [​](#returns-28)

`Promise`<[`ReplayCollection`](./#replaycollection)>

##### deleteCollection() [​](#deletecollection)

> **deleteCollection**: (`id`: [`ID`](./#id-3)) => `Promise`<`boolean`>

Delete a collection.

###### Parameters [​](#parameters-23)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the collection to delete. |

###### Returns [​](#returns-29)

`Promise`<`boolean`>

Whether the collection was deleted.

##### deleteSessions() [​](#deletesessions)

> **deleteSessions**: (`sessionIds`: [`ID`](./#id-3)[]) => `Promise`<[`ID`](./#id-3)[]>

Delete a session.

###### Parameters [​](#parameters-24)

| Parameter | Type | Description |
| --- | --- | --- |
| `sessionIds` | [`ID`](./#id-3)[] | The IDs of the sessions to delete. |

###### Returns [​](#returns-30)

`Promise`<[`ID`](./#id-3)[]>

##### getCollections() [​](#getcollections)

> **getCollections**: () => [`ReplayCollection`](./#replaycollection)[]

Get the list of all replay collections.

###### Returns [​](#returns-31)

[`ReplayCollection`](./#replaycollection)[]

The list of all replay collections.

##### getSessions() [​](#getsessions)

> **getSessions**: () => [`ReplaySession`](./#replaysession)[]

Get the list of all replay sessions.

###### Returns [​](#returns-32)

[`ReplaySession`](./#replaysession)[]

The list of all replay sessions.

##### getTabs() [​](#gettabs)

> **getTabs**: () => [`ReplayTab`](./#replaytab)[]

Get the list of all open replay tabs.

###### Returns [​](#returns-33)

[`ReplayTab`](./#replaytab)[]

The list of all open replay tabs.

##### moveSession() [​](#movesession)

> **moveSession**: (`sessionId`: [`ID`](./#id-3), `collectionId`: [`ID`](./#id-3)) => `Promise`<[`ReplaySession`](./#replaysession)>

Move a session to a different collection.

###### Parameters [​](#parameters-25)

| Parameter | Type | Description |
| --- | --- | --- |
| `sessionId` | [`ID`](./#id-3) | The ID of the session to move. |
| `collectionId` | [`ID`](./#id-3) | The ID of the collection to move the session to. |

###### Returns [​](#returns-34)

`Promise`<[`ReplaySession`](./#replaysession)>

The updated session.

##### openTab() [​](#opentab)

> **openTab**: (`sessionId`: [`ID`](./#id-3), `options`?: [`OpenTabOptions`](./#opentaboptions)) => `void`

Open a replay tab for the given session.

###### Parameters [​](#parameters-26)

| Parameter | Type | Description |
| --- | --- | --- |
| `sessionId` | [`ID`](./#id-3) | The ID of the session to open. |
| `options`? | [`OpenTabOptions`](./#opentaboptions) | The options for opening the tab. |

###### Returns [​](#returns-35)

`void`

##### renameCollection() [​](#renamecollection)

> **renameCollection**: (`id`: [`ID`](./#id-3), `name`: `string`) => `Promise`<[`ReplayCollection`](./#replaycollection)>

Rename a collection.

###### Parameters [​](#parameters-27)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the collection to rename. |
| `name` | `string` | The new name of the collection. |

###### Returns [​](#returns-36)

`Promise`<[`ReplayCollection`](./#replaycollection)>

The updated collection.

##### renameSession() [​](#renamesession)

> **renameSession**: (`id`: [`ID`](./#id-3), `name`: `string`) => `Promise`<[`ReplaySession`](./#replaysession)>

Rename a session.

###### Parameters [​](#parameters-28)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the session to rename. |
| `name` | `string` | The new name of the session. |

###### Returns [​](#returns-37)

`Promise`<[`ReplaySession`](./#replaysession)>

The updated session.

##### sendRequest() [​](#sendrequest)

> **sendRequest**: (`sessionId`: [`ID`](./#id-3), `options`: [`SendRequestOptions`](./#sendrequestoptions)) => `Promise`<`void`>

Send a request to the Replay backend.

###### Parameters [​](#parameters-29)

| Parameter | Type | Description |
| --- | --- | --- |
| `sessionId` | [`ID`](./#id-3) | - |
| `options` | [`SendRequestOptions`](./#sendrequestoptions) | The options for sending the request. |

###### Returns [​](#returns-38)

`Promise`<`void`>

###### Example [​](#example-7)

ts
```
sendRequest(sessionId, {
  connectionInfo: {
    SNI: "example.com",
    host: "example.com",
    isTLS: true,
    port: 443,
  },
  raw: "GET / HTTP/1.1\r\nHost: example.com\r\n\r\n",
  updateContentLength: false,
});
```

---

### ReplaySession [​](#replaysession)

> **ReplaySession**: `object`

A session in Replay.

#### Type declaration [​](#type-declaration-27)

##### collectionId [​](#collectionid)

> **collectionId**: [`ID`](./#id-3)

The ID of the collection the session belongs to.

##### id [​](#id-3)

> **id**: [`ID`](./#id-3)

The ID of the session.

##### name [​](#name-2)

> **name**: `string`

The name of the session.

---

### ReplayTab [​](#replaytab)

> **ReplayTab**: `object`

A replay tab.

#### Type declaration [​](#type-declaration-28)

##### sessionId [​](#sessionid)

> **sessionId**: [`ID`](./#id-3)

The ID of the session associated with this tab.

---

### SendRequestOptions [​](#sendrequestoptions)

> **SendRequestOptions**: `object`

Options for sending a request.

#### Type declaration [​](#type-declaration-29)

##### background? [​](#background)

> `optional` **background**: `boolean`

Whether to send the request in the background without updating the UI. If true, the request will not update the UI. If false, the UI will be updated to display the session and the new request. Defaults to false.

##### connectionInfo [​](#connectioninfo)

> **connectionInfo**: `object`

The connection information to use for the request.

###### connectionInfo.host [​](#connectioninfo-host)

> **host**: `string`

The host to use for the request.

###### connectionInfo.isTLS [​](#connectioninfo-istls)

> **isTLS**: `boolean`

Whether the request is TLS.

###### connectionInfo.port [​](#connectioninfo-port)

> **port**: `number`

The port to use for the request.

###### connectionInfo.SNI? [​](#connectioninfo-sni)

> `optional` **SNI**: `string`

The SNI to use for the request. If not provided, the SNI will be inferred from the host.

##### overwriteDraft? [​](#overwritedraft)

> `optional` **overwriteDraft**: `boolean`

Whether to overwrite the editor's draft content. If true, draft content will be overwritten with the new request. If false, the draft will be kept. Defaults to true.

##### raw [​](#raw)

> **raw**: `string`

The raw request to send.

##### updateContentLength? [​](#updatecontentlength)

> `optional` **updateContentLength**: `boolean`

Whether to update the content length automatically to match the body. Defaults to true.

---

### ReplaySlot [​](#replayslot)

> `const` **ReplaySlot**: `object`

The slots in the Replay UI.

#### Type declaration [​](#type-declaration-30)

##### SessionToolbarPrimary [​](#sessiontoolbarprimary)

> `readonly` **SessionToolbarPrimary**: `"session-toolbar-primary"`

The left side of the session toolbar.

##### SessionToolbarSecondary [​](#sessiontoolbarsecondary)

> `readonly` **SessionToolbarSecondary**: `"session-toolbar-secondary"`

The right side of the session toolbar.

##### Topbar [​](#topbar)

> `readonly` **Topbar**: `"topbar"`

The left side of the topbar.

## HTTP History [​](#http-history)

### HTTPHistorySDK [​](#httphistorysdk)

> **HTTPHistorySDK**: `object`

Utilities to interact with the HTTP History page.

#### Type declaration [​](#type-declaration-31)

##### addRequestEditorExtension() [​](#addrequesteditorextension-1)

> **addRequestEditorExtension**: (`extension`: `Extension`) => `void`

Add an extension to the request editor.

###### Parameters [​](#parameters-30)

| Parameter | Type | Description |
| --- | --- | --- |
| `extension` | `Extension` | The extension to add. |

###### Returns [​](#returns-39)

`void`

##### addRequestViewMode() [​](#addrequestviewmode)

> **addRequestViewMode**: (`options`: [`RequestViewModeOptions`](./#requestviewmodeoptions)) => `void`

Add a custom request view mode.

###### Parameters [​](#parameters-31)

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | [`RequestViewModeOptions`](./#requestviewmodeoptions) | The view mode options. |

###### Returns [​](#returns-40)

`void`

##### addResponseEditorExtension() [​](#addresponseeditorextension)

> **addResponseEditorExtension**: (`extension`: `Extension`) => `void`

Add an extension to the response editor.

###### Parameters [​](#parameters-32)

| Parameter | Type | Description |
| --- | --- | --- |
| `extension` | `Extension` | The extension to add. |

###### Returns [​](#returns-41)

`void`

##### getQuery() [​](#getquery)

> **getQuery**: () => [`HTTPQL`](./#httpql)

Get the current HTTPQL query.

###### Returns [​](#returns-42)

[`HTTPQL`](./#httpql)

The current HTTPQL query.

##### getScopeId() [​](#getscopeid)

> **getScopeId**: () => [`ID`](./#id-3) | `undefined`

Get the current scope ID.

###### Returns [​](#returns-43)

[`ID`](./#id-3) | `undefined`

The current scope ID.

##### setQuery() [​](#setquery)

> **setQuery**: (`query`: [`HTTPQL`](./#httpql)) => `void`

Set the HTTPQL query that will be applied on the HTTP History table results.

###### Parameters [​](#parameters-33)

| Parameter | Type | Description |
| --- | --- | --- |
| `query` | [`HTTPQL`](./#httpql) | The HTTPQL query. |

###### Returns [​](#returns-44)

`void`

##### setScope() [​](#setscope)

> **setScope**: (`id`: [`ID`](./#id-3) | `undefined`) => `Promise`<`void`>

Set the current scope.

###### Parameters [​](#parameters-34)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | `undefined` | The ID of the scope to set. |

###### Returns [​](#returns-45)

`Promise`<`void`>

## Search [​](#search-1)

### SearchSDK [​](#searchsdk)

> **SearchSDK**: `object`

Utilities to interact with the Search page.

#### Type declaration [​](#type-declaration-32)

##### getQuery() [​](#getquery-1)

> **getQuery**: () => [`HTTPQL`](./#httpql)

Get the current HTTPQL query.

###### Returns [​](#returns-46)

[`HTTPQL`](./#httpql)

The current HTTPQL query.

##### getScopeId() [​](#getscopeid-1)

> **getScopeId**: () => [`ID`](./#id-3) | `undefined`

Get the current scope ID.

###### Returns [​](#returns-47)

[`ID`](./#id-3) | `undefined`

The current scope ID.

##### setQuery() [​](#setquery-1)

> **setQuery**: (`query`: [`HTTPQL`](./#httpql)) => `void`

Set the HTTPQL query that will be applied on the search table results.

###### Parameters [​](#parameters-35)

| Parameter | Type | Description |
| --- | --- | --- |
| `query` | [`HTTPQL`](./#httpql) | The HTTPQL query. |

###### Returns [​](#returns-48)

`void`

##### setScope() [​](#setscope-1)

> **setScope**: (`id`: [`ID`](./#id-3) | `undefined`) => `Promise`<`void`>

Set the current scope.

###### Parameters [​](#parameters-36)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | `undefined` | The ID of the scope to set. |

###### Returns [​](#returns-49)

`Promise`<`void`>

## Files [​](#files-1)

### Asset [​](#asset)

> **Asset**: `object`

A static asset.

#### Type declaration [​](#type-declaration-33)

##### asArrayBuffer() [​](#asarraybuffer)

> **asArrayBuffer**: () => `Promise`<`ArrayBuffer`>

###### Returns [​](#returns-50)

`Promise`<`ArrayBuffer`>

##### asJson() [​](#asjson)

> **asJson**: <`T`>() => `Promise`<`T`>

###### Type Parameters [​](#type-parameters-4)

| Type Parameter | Default type |
| --- | --- |
| `T` | `unknown` |

###### Returns [​](#returns-51)

`Promise`<`T`>

##### asReadableStream() [​](#asreadablestream)

> **asReadableStream**: () => `ReadableStream`

###### Returns [​](#returns-52)

`ReadableStream`

##### asString() [​](#asstring)

> **asString**: () => `Promise`<`string`>

###### Returns [​](#returns-53)

`Promise`<`string`>

---

### AssetsSDK [​](#assetssdk)

> **AssetsSDK**: `object`

Utilities to interact with the plugin's static assets.

#### Type declaration [​](#type-declaration-34)

##### get() [​](#get-1)

> **get**: (`path`: `string`) => `Promise`<[`Asset`](./#asset)>

Get a file from the assets folder.

###### Parameters [​](#parameters-37)

| Parameter | Type |
| --- | --- |
| `path` | `string` |

###### Returns [​](#returns-54)

`Promise`<[`Asset`](./#asset)>

The asset file.

---

### FilesSDK [​](#filessdk)

> **FilesSDK**: `object`

SDK for interacting with the Files page.

#### Type declaration [​](#type-declaration-35)

##### create() [​](#create)

> **create**: (`file`: `File`) => `Promise`<[`HostedFile`](./#hostedfile)>

Uploads a file to the host.

###### Parameters [​](#parameters-38)

| Parameter | Type | Description |
| --- | --- | --- |
| `file` | `File` | The file to upload. |

###### Returns [​](#returns-55)

`Promise`<[`HostedFile`](./#hostedfile)>

The uploaded file.

##### delete() [​](#delete)

> **delete**: (`id`: `string`) => `Promise`<`void`>

Deletes a file from the host.

###### Parameters [​](#parameters-39)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the file to delete. |

###### Returns [​](#returns-56)

`Promise`<`void`>

The deleted file.

##### getAll() [​](#getall)

> **getAll**: () => [`HostedFile`](./#hostedfile)[]

Gets all hosted files.

###### Returns [​](#returns-57)

[`HostedFile`](./#hostedfile)[]

The files.

##### rename() [​](#rename)

> **rename**: (`id`: `string`, `name`: `string`) => `Promise`<[`HostedFile`](./#hostedfile)>

Renames a file on the host.

###### Parameters [​](#parameters-40)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | `string` | The ID of the file to rename. |
| `name` | `string` | The new name of the file. |

###### Returns [​](#returns-58)

`Promise`<[`HostedFile`](./#hostedfile)>

The renamed file.

---

### HostedFile [​](#hostedfile)

> **HostedFile**: `object`

A hosted file.

#### Type declaration [​](#type-declaration-36)

##### createdAt [​](#createdat)

> **createdAt**: `Date`

The date the file was created.

##### id [​](#id-4)

> **id**: `string`

The ID of the file.

##### name [​](#name-3)

> **name**: `string`

The name of the file.

##### path [​](#path-2)

> **path**: `string`

The path of the file.

##### size [​](#size)

> **size**: `number`

The size of the file in bytes.

##### updatedAt [​](#updatedat)

> **updatedAt**: `Date`

The date the file was updated.

## Environment [​](#environment)

### EnvironmentSDK [​](#environmentsdk)

> **EnvironmentSDK**: `object`

Utilities to interact with the environment.

#### Type declaration [​](#type-declaration-37)

##### getVar() [​](#getvar)

> **getVar**: (`name`: `string`) => `string` | `undefined`

Get the value of an environment variable.

###### Parameters [​](#parameters-41)

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the environment variable. |

###### Returns [​](#returns-59)

`string` | `undefined`

The value of the environment variable.

##### getVars() [​](#getvars)

> **getVars**: () => [`EnvironmentVariable`](./#environmentvariable)[]

Get all environment variables available in the global environment and the selected environment.

###### Returns [​](#returns-60)

[`EnvironmentVariable`](./#environmentvariable)[]

All environment variables.

## Filters [​](#filters-1)

### Filter [​](#filter)

> **Filter**: `object`

Represents a filter.

#### Type declaration [​](#type-declaration-38)

##### alias [​](#alias)

> **alias**: `string`

The alias of the filter. This alias is used when referencing the filter in an HTTPQL query (e.g. `preset:my-alias`).

##### id [​](#id-5)

> **id**: [`ID`](./#id-3)

The ID of the filter.

##### name [​](#name-4)

> **name**: `string`

The name of the filter.

##### query [​](#query)

> **query**: [`HTTPQL`](./#httpql)

The HTTPQL expression of the filter.

---

### FiltersSDK [​](#filterssdk)

> **FiltersSDK**: `object`

SDK for interacting with the Filters page.

#### Type declaration [​](#type-declaration-39)

##### create() [​](#create-1)

> **create**: (`options`: `object`) => `Promise`<[`Filter`](./#filter)>

Creates a filter.

###### Parameters [​](#parameters-42)

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | { `alias`: `string`; `name`: `string`; `query`: [`HTTPQL`](./#httpql); } | Options for the filter. |
| `options.alias` | `string` | The alias of the filter. Used when referencing the filter in an HTTPQL query (e.g. `preset:my-alias`). Should be unique and follow the format `[a-zA-Z0-9_-]+`. |
| `options.name` | `string` | The name of the filter. Should be unique. |
| `options.query` | [`HTTPQL`](./#httpql) | The HTTPQL query of the filter. |

###### Returns [​](#returns-61)

`Promise`<[`Filter`](./#filter)>

The created filter.

##### delete() [​](#delete-1)

> **delete**: (`id`: [`ID`](./#id-3)) => `Promise`<`void`>

Deletes a filter.

###### Parameters [​](#parameters-43)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the filter to delete. |

###### Returns [​](#returns-62)

`Promise`<`void`>

##### getAll() [​](#getall-1)

> **getAll**: () => [`Filter`](./#filter)[]

Gets all filters.

###### Returns [​](#returns-63)

[`Filter`](./#filter)[]

The filters.

##### update() [​](#update)

> **update**: (`id`: [`ID`](./#id-3), `options`: `object`) => `Promise`<[`Filter`](./#filter)>

Updates a filter.

###### Parameters [​](#parameters-44)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the filter to update. |
| `options` | { `alias`: `string`; `name`: `string`; `query`: [`HTTPQL`](./#httpql); } | Options for the filter. |
| `options.alias` | `string` | The alias of the filter. |
| `options.name` | `string` | The name of the filter. |
| `options.query` | [`HTTPQL`](./#httpql) | The HTTPQL query of the filter. |

###### Returns [​](#returns-64)

`Promise`<[`Filter`](./#filter)>

The updated filter.

## Footer [​](#footer-1)

### FooterSDK [​](#footersdk)

> **FooterSDK**: `object`

Utilities to interact with the footer.

#### Type declaration [​](#type-declaration-40)

##### addToSlot [​](#addtoslot-1)

> **addToSlot**: [`DefineAddToSlotFn`](./#defineaddtoslotfntmap)<[`FooterSlotContent`](./#footerslotcontent)>

Add a component to a slot.

###### Param [​](#param-2)

The slot to add the component to.

###### Param [​](#param-3)

The content to add to the slot.

###### Example [​](#example-8)

ts
```
addToSlot(FooterSlot.FooterSlotPrimary, {
  kind: "Command",
  commandId: "my-command",
  icon: "my-icon",
});

addToSlot(FooterSlot.FooterSlotPrimary, {
  kind: "Button",
  label: "My button",
  icon: "fas fa-rocket",
  onClick: () => {
    console.log("Button clicked");
  },
});

addToSlot(FooterSlot.FooterSlotSecondary, {
  kind: "Custom",
  component: MyComponent,
});
```
## Intercept [​](#intercept-1)

### InterceptSDK [​](#interceptsdk)

> **InterceptSDK**: `object`

Utilities to interact with the Intercept page.

#### Type declaration [​](#type-declaration-41)

##### getScopeId() [​](#getscopeid-2)

> **getScopeId**: () => [`ID`](./#id-3) | `undefined`

Get the current scope ID.

###### Returns [​](#returns-65)

[`ID`](./#id-3) | `undefined`

The current scope ID.

##### setScope() [​](#setscope-2)

> **setScope**: (`id`: [`ID`](./#id-3) | `undefined`) => `void`

Set the current scope.

###### Parameters [​](#parameters-45)

| Parameter | Type |
| --- | --- |
| `id` | [`ID`](./#id-3) | `undefined` |

###### Returns [​](#returns-66)

`void`

## Match and Replace [​](#match-and-replace)

### MatchReplaceCollection [​](#matchreplacecollection)

> **MatchReplaceCollection**: `object`

A collection in Match and Replace.

#### Type declaration [​](#type-declaration-42)

##### id [​](#id-6)

> **id**: [`ID`](./#id-3)

##### name [​](#name-5)

> **name**: `string`

##### ruleIds [​](#ruleids)

> **ruleIds**: [`ID`](./#id-3)[]

---

### MatchReplaceMatcherRaw [​](#matchreplacematcherraw)

> **MatchReplaceMatcherRaw**: [`MatchReplaceMatcherRawRegex`](./#matchreplacematcherrawregex) | [`MatchReplaceMatcherRawValue`](./#matchreplacematcherrawvalue) | [`MatchReplaceMatcherRawFull`](./#matchreplacematcherrawfull)

A matcher for raw operations in Match and Replace.

---

### MatchReplaceMatcherRawFull [​](#matchreplacematcherrawfull)

> **MatchReplaceMatcherRawFull**: `object`

This matcher will match the entire section.

#### Type declaration [​](#type-declaration-43)

##### kind [​](#kind)

> **kind**: `"MatcherRawFull"`

---

### MatchReplaceMatcherRawRegex [​](#matchreplacematcherrawregex)

> **MatchReplaceMatcherRawRegex**: `object`

This matcher will match using a regex over the section.

#### Type declaration [​](#type-declaration-44)

##### kind [​](#kind-1)

> **kind**: `"MatcherRawRegex"`

##### regex [​](#regex)

> **regex**: `string`

---

### MatchReplaceMatcherRawValue [​](#matchreplacematcherrawvalue)

> **MatchReplaceMatcherRawValue**: `object`

This matcher will match the value if present in the section.

#### Type declaration [​](#type-declaration-45)

##### kind [​](#kind-2)

> **kind**: `"MatcherRawValue"`

##### value [​](#value)

> **value**: `string`

---

### MatchReplaceOperationBody [​](#matchreplaceoperationbody)

> **MatchReplaceOperationBody**: [`KeepOperation`](./#keepoperationt)<[`MatchReplaceOperationBodyRaw`](./#matchreplaceoperationbodyraw)>

An operation for the body section.

---

### MatchReplaceOperationBodyRaw [​](#matchreplaceoperationbodyraw)

> **MatchReplaceOperationBodyRaw**: `object`

A raw operation for the body section.

#### Type declaration [​](#type-declaration-46)

##### kind [​](#kind-3)

> **kind**: `"OperationBodyRaw"`

##### matcher [​](#matcher)

> **matcher**: [`MatchReplaceMatcherRaw`](./#matchreplacematcherraw)

##### replacer [​](#replacer)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationFirstLineRaw [​](#matchreplaceoperationfirstlineraw)

> **MatchReplaceOperationFirstLineRaw**: `object`

A raw operation for the request first line.

#### Type declaration [​](#type-declaration-47)

##### kind [​](#kind-4)

> **kind**: `"OperationFirstLineRaw"`

##### matcher [​](#matcher-1)

> **matcher**: [`MatchReplaceMatcherRaw`](./#matchreplacematcherraw)

##### replacer [​](#replacer-1)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationHeader [​](#matchreplaceoperationheader)

> **MatchReplaceOperationHeader**: [`MatchReplaceOperationHeaderRaw`](./#matchreplaceoperationheaderraw) | [`MatchReplaceOperationHeaderAdd`](./#matchreplaceoperationheaderadd) | [`MatchReplaceOperationHeaderRemove`](./#matchreplaceoperationheaderremove) | [`MatchReplaceOperationHeaderUpdate`](./#matchreplaceoperationheaderupdate)

An operation for the header section.

---

### MatchReplaceReplacer [​](#matchreplacereplacer)

> **MatchReplaceReplacer**: [`MatchReplaceReplacerTerm`](./#matchreplacereplacerterm) | [`MatchReplaceReplacerWorkflow`](./#matchreplacereplacerworkflow)

A replacer in Match and Replace.

---

### MatchReplaceReplacerTerm [​](#matchreplacereplacerterm)

> **MatchReplaceReplacerTerm**: `object`

A replacer that replaces with a term. If the matcher is a regex, groups will be interpolated.

#### Type declaration [​](#type-declaration-48)

##### kind [​](#kind-5)

> **kind**: `"ReplacerTerm"`

##### term [​](#term)

> **term**: `string`

---

### MatchReplaceReplacerWorkflow [​](#matchreplacereplacerworkflow)

> **MatchReplaceReplacerWorkflow**: `object`

A replacer that replaces with the result of a workflow. The input of the workflow depends on the operation and matcher.

#### Type declaration [​](#type-declaration-49)

##### kind [​](#kind-6)

> **kind**: `"ReplacerWorkflow"`

##### workflowId [​](#workflowid)

> **workflowId**: [`ID`](./#id-3)

---

### MatchReplaceRule [​](#matchreplacerule)

> **MatchReplaceRule**: `object`

A rule in Match and Replace.

#### Type declaration [​](#type-declaration-50)

##### collectionId [​](#collectionid-1)

> **collectionId**: [`ID`](./#id-3)

The ID of the collection the rule belongs to.

##### id [​](#id-7)

> **id**: [`ID`](./#id-3)

The ID of the rule.

##### isEnabled [​](#isenabled)

> **isEnabled**: `boolean`

Whether the rule is enabled.

##### name [​](#name-6)

> **name**: `string`

The name of the rule.

##### query [​](#query-1)

> **query**: [`HTTPQL`](./#httpql)

The HTTPQL query to match the rule against. Only requests that match the query will be affected by the rule.

##### section [​](#section)

> **section**: [`MatchReplaceSection`](./#matchreplacesection)

The section of the rule.

---

### MatchReplaceSDK [​](#matchreplacesdk)

> **MatchReplaceSDK**: `object`

Utilities to interact with the Match and Replace page.

#### Type declaration [​](#type-declaration-51)

##### createCollection() [​](#createcollection-1)

> **createCollection**: (`options`: `object`) => `Promise`<[`MatchReplaceCollection`](./#matchreplacecollection)>

Create a collection.

###### Parameters [​](#parameters-46)

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | { `name`: `string`; } | The options for the collection. |
| `options.name` | `string` | The name of the collection. |

###### Returns [​](#returns-67)

`Promise`<[`MatchReplaceCollection`](./#matchreplacecollection)>

##### createRule() [​](#createrule)

> **createRule**: (`options`: `object`) => `Promise`<[`MatchReplaceRule`](./#matchreplacerule)>

Create a rule.

###### Parameters [​](#parameters-47)

| Parameter | Type | Description |
| --- | --- | --- |
| `options` | { `collectionId`: [`ID`](./#id-3); `name`: `string`; `query`: [`HTTPQL`](./#httpql); `section`: [`MatchReplaceSection`](./#matchreplacesection); } | The options for the rule. |
| `options.collectionId` | [`ID`](./#id-3) | The ID of the collection the rule belongs to. |
| `options.name` | `string` | The name of the rule. |
| `options.query` | [`HTTPQL`](./#httpql) | The HTTPQL query to match the rule against. |
| `options.section` | [`MatchReplaceSection`](./#matchreplacesection) | - |

###### Returns [​](#returns-68)

`Promise`<[`MatchReplaceRule`](./#matchreplacerule)>

##### deleteCollection() [​](#deletecollection-1)

> **deleteCollection**: (`id`: [`ID`](./#id-3)) => `Promise`<`void`>

Delete a collection.

###### Parameters [​](#parameters-48)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the collection. |

###### Returns [​](#returns-69)

`Promise`<`void`>

##### deleteRule() [​](#deleterule)

> **deleteRule**: (`id`: [`ID`](./#id-3)) => `Promise`<`void`>

Delete a rule.

###### Parameters [​](#parameters-49)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the rule. |

###### Returns [​](#returns-70)

`Promise`<`void`>

##### getActiveRules() [​](#getactiverules)

> **getActiveRules**: () => [`MatchReplaceRule`](./#matchreplacerule)[]

Get all active rules. Rules are ordered in priority from highest to lowest.

###### Returns [​](#returns-71)

[`MatchReplaceRule`](./#matchreplacerule)[]

All active rules.

##### getCollections() [​](#getcollections-1)

> **getCollections**: () => [`MatchReplaceCollection`](./#matchreplacecollection)[]

Get all collections.

###### Returns [​](#returns-72)

[`MatchReplaceCollection`](./#matchreplacecollection)[]

##### getRules() [​](#getrules)

> **getRules**: () => [`MatchReplaceRule`](./#matchreplacerule)[]

Get all rules.

###### Returns [​](#returns-73)

[`MatchReplaceRule`](./#matchreplacerule)[]

All rules.

##### selectRule() [​](#selectrule)

> **selectRule**: (`id`: [`ID`](./#id-3) | `undefined`) => `void`

Select a rule to be displayed in the UI.

###### Parameters [​](#parameters-50)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | `undefined` | The ID of the rule, or undefined to clear the selection. |

###### Returns [​](#returns-74)

`void`

##### toggleRule() [​](#togglerule)

> **toggleRule**: (`id`: [`ID`](./#id-3), `enabled`: `boolean`) => `Promise`<`void`>

Toggle a rule.

###### Parameters [​](#parameters-51)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the rule. |
| `enabled` | `boolean` | Whether the rule should be enabled. |

###### Returns [​](#returns-75)

`Promise`<`void`>

##### updateCollection() [​](#updatecollection)

> **updateCollection**: (`id`: [`ID`](./#id-3), `options`: `object`) => `Promise`<[`MatchReplaceCollection`](./#matchreplacecollection)>

Update a collection.

###### Parameters [​](#parameters-52)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the collection. |
| `options` | { `name`: `string`; } | The new values for the collection. |
| `options.name` | `string` | The new name of the collection. |

###### Returns [​](#returns-76)

`Promise`<[`MatchReplaceCollection`](./#matchreplacecollection)>

##### updateRule() [​](#updaterule)

> **updateRule**: (`id`: [`ID`](./#id-3), `options`: `object`) => `Promise`<[`MatchReplaceRule`](./#matchreplacerule)>

Update a rule.

###### Parameters [​](#parameters-53)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | The ID of the rule. |
| `options` | { `name`: `string`; `query`: [`HTTPQL`](./#httpql); `section`: [`MatchReplaceSection`](./#matchreplacesection); } | The new values for the rule. |
| `options.name` | `string` | The new name of the rule. |
| `options.query`? | [`HTTPQL`](./#httpql) | The new HTTPQL query of the rule. |
| `options.section` | [`MatchReplaceSection`](./#matchreplacesection) | The new section of the rule. |

###### Returns [​](#returns-77)

`Promise`<[`MatchReplaceRule`](./#matchreplacerule)>

---

### MatchReplaceSectionRequestFirstLine [​](#matchreplacesectionrequestfirstline)

> **MatchReplaceSectionRequestFirstLine**: `object`

A section for the request first line.

#### Type declaration [​](#type-declaration-52)

##### kind [​](#kind-7)

> **kind**: `"SectionRequestFirstLine"`

##### operation [​](#operation)

> **operation**: [`MatchReplaceOperationFirstLine`](./#matchreplaceoperationfirstline)

---

### MatchReplaceSectionResponseFirstLine [​](#matchreplacesectionresponsefirstline)

> **MatchReplaceSectionResponseFirstLine**: `object`

A section for the response first line.

#### Type declaration [​](#type-declaration-53)

##### kind [​](#kind-8)

> **kind**: `"SectionResponseFirstLine"`

##### operation [​](#operation-1)

> **operation**: [`MatchReplaceOperationFirstLine`](./#matchreplaceoperationfirstline)

## Other [​](#other)

### ButtonSlotContent [​](#buttonslotcontent)

> **ButtonSlotContent**: [`DefineSlotContent`](./#defineslotcontentttype-p)<`"Button"`, { `icon`: `string`; `label`: `string`; `onClick`: () => `void`; }>

---

### CommandID [​](#commandid-3)

> **CommandID**: `string` & `object`

A unique command identifier.

#### Type declaration [​](#type-declaration-54)

##### \_\_commandId? [​](#commandid-4)

> `optional` **\_\_commandId**: `never`

#### Example [​](#example-9)

ts
```
"my-super-command"
```

---

### CommandSlotContent [​](#commandslotcontent)

> **CommandSlotContent**: [`DefineSlotContent`](./#defineslotcontentttype-p)<`"Command"`, { `commandId`: [`CommandID`](./#commandid); `icon`: `string`; }>

---

### ComponentDefinition [​](#componentdefinition)

> **ComponentDefinition**: `object`

A custom component that will be rendered in the UI.

#### Type declaration [​](#type-declaration-55)

##### component [​](#component)

> **component**: `VueComponent`

##### events? [​](#events)

> `optional` **events**: `Record`<`string`, (...`args`: `unknown`[]) => `void`>

##### props? [​](#props)

> `optional` **props**: `Record`<`string`, `unknown`>

---

### CustomSlotContent [​](#customslotcontent)

> **CustomSlotContent**: [`DefineSlotContent`](./#defineslotcontentttype-p)<`"Custom"`, { `definition`: [`ComponentDefinition`](./#componentdefinition); }>

---

### DefineAddToSlotFn()<TMap> [​](#defineaddtoslotfn-tmap)

> **DefineAddToSlotFn**<`TMap`>: <`K`>(`slot`: `K`, `spec`: `TMap`[`K`]) => `void`

#### Type Parameters [​](#type-parameters-5)

| Type Parameter |
| --- |
| `TMap` *extends* `Record`<`string`, [`DefineSlotContent`](./#defineslotcontentttype-p)<`string`, `Record`<`string`, `unknown`>>> |

#### Type Parameters [​](#type-parameters-6)

| Type Parameter |
| --- |
| `K` *extends* `string` | `number` | `symbol` |

#### Parameters [​](#parameters-54)

| Parameter | Type |
| --- | --- |
| `slot` | `K` |
| `spec` | `TMap`[`K`] |

#### Returns [​](#returns-78)

`void`

---

### DefineSlotContent<TType, P> [​](#defineslotcontent-ttype-p)

> **DefineSlotContent**<`TType`, `P`>: `object` & `P`

#### Type declaration [​](#type-declaration-56)

##### type [​](#type-8)

> **type**: `TType`

#### Type Parameters [​](#type-parameters-7)

| Type Parameter |
| --- |
| `TType` *extends* `string` |
| `P` *extends* `Record`<`string`, `unknown`> |

---

### Dialog [​](#dialog)

> **Dialog**: `object`

#### Type declaration [​](#type-declaration-57)

##### close() [​](#close)

> **close**: () => `void`

###### Returns [​](#returns-79)

`void`

---

### DialogOptions [​](#dialogoptions)

> **DialogOptions**: `object`

#### Type declaration [​](#type-declaration-58)

##### closable? [​](#closable)

> `optional` **closable**: `boolean`

##### closeOnEscape? [​](#closeonescape)

> `optional` **closeOnEscape**: `boolean`

##### draggable? [​](#draggable)

> `optional` **draggable**: `boolean`

##### modal? [​](#modal)

> `optional` **modal**: `boolean`

##### position? [​](#position)

> `optional` **position**: `"left"` | `"right"` | `"top"` | `"bottom"` | `"center"` | `"topleft"` | `"topright"` | `"bottomleft"` | `"bottomright"`

##### title? [​](#title-1)

> `optional` **title**: `string`

---

### Editor [​](#editor)

> **Editor**: `object`

Generic editor interface.

#### Type declaration [​](#type-declaration-59)

##### focus() [​](#focus)

> **focus**: () => `void`

Focus the editor.

###### Returns [​](#returns-80)

`void`

##### getEditorView() [​](#geteditorview)

> **getEditorView**: () => `EditorView`

Get the editor view.

###### Returns [​](#returns-81)

`EditorView`

The CodeMirror [EditorView](https://codemirror.net/docs/ref/#view.EditorView).

##### getSelectedText() [​](#getselectedtext)

> **getSelectedText**: () => `string`

Get the currently selected text of the editor.

###### Returns [​](#returns-82)

`string`

##### isReadOnly() [​](#isreadonly)

> **isReadOnly**: () => `boolean`

Check whether the editor is read-only.

###### Returns [​](#returns-83)

`boolean`

Whether the editor is read-only.

##### replaceSelectedText() [​](#replaceselectedtext)

> **replaceSelectedText**: (`text`: `string`) => `void`

Replace the currently selected text of the editor.

###### Parameters [​](#parameters-55)

| Parameter | Type | Description |
| --- | --- | --- |
| `text` | `string` | The text to replace the selection with. |

###### Returns [​](#returns-84)

`void`

---

### EnvironmentVariable [​](#environmentvariable)

> **EnvironmentVariable**: `object`

#### Type declaration [​](#type-declaration-60)

##### isSecret [​](#issecret)

> **isSecret**: `boolean`

Whether the environment variable is a secret.

##### name [​](#name-7)

> **name**: `string`

The name of the environment variable.

##### value [​](#value-1)

> **value**: `string`

The value of the environment variable.

---

### FooterSlot [​](#footerslot)

> **FooterSlot**: *typeof* [`FooterSlot`](./#footerslot-1)[keyof *typeof* [`FooterSlot`](./#footerslot-1)]

---

### FooterSlotContent [​](#footerslotcontent)

> **FooterSlotContent**: `object`

#### Type declaration [​](#type-declaration-61)

##### footer-primary [​](#footer-primary)

> **footer-primary**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

##### footer-secondary [​](#footer-secondary)

> **footer-secondary**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

---

### HTTPQL [​](#httpql)

> **HTTPQL**: `string` & `object`

An HTTPQL expression.

#### Type declaration [​](#type-declaration-62)

##### \_\_httpql? [​](#httpql-1)

> `optional` **\_\_httpql**: `never`

#### Example [​](#example-10)

ts
```
`req.method.eq:"POST"`
```

---

### HTTPRequestEditor [​](#httprequesteditor-1)

> **HTTPRequestEditor**: `object`

#### Type declaration [​](#type-declaration-63)

##### getEditorView() [​](#geteditorview-1)

> **getEditorView**: () => `EditorView`

Get the editor view.

###### Returns [​](#returns-85)

`EditorView`

The CodeMirror [EditorView](https://codemirror.net/docs/ref/#view.EditorView).

##### getElement() [​](#getelement)

> **getElement**: () => `HTMLElement`

Get the editor element. Append this to your DOM to display the editor.

###### Returns [​](#returns-86)

`HTMLElement`

The editor element.

---

### HTTPResponseEditor [​](#httpresponseeditor-1)

> **HTTPResponseEditor**: `object`

#### Type declaration [​](#type-declaration-64)

##### getEditorView() [​](#geteditorview-2)

> **getEditorView**: () => `EditorView`

Get the editor view.

###### Returns [​](#returns-87)

`EditorView`

The CodeMirror [EditorView](https://codemirror.net/docs/ref/#view.EditorView).

##### getElement() [​](#getelement-1)

> **getElement**: () => `HTMLElement`

Get the editor element. Append this to your DOM to display the editor.

###### Returns [​](#returns-88)

`HTMLElement`

The editor element.

---

### Icon [​](#icon)

> **Icon**: `string` & `object`

A [https://fontawesome.com/icons|FontAwesome](https://fontawesome.com/icons%7CFontAwesome) icon class.

#### Type declaration [​](#type-declaration-65)

##### \_\_icon? [​](#icon-1)

> `optional` **\_\_icon**: `never`

#### Example [​](#example-11)

ts
```
"fas fa-rocket"
```

---

### ID [​](#id-8)

> **ID**: `string` & `object`

A unique Caido identifier per type.

#### Type declaration [​](#type-declaration-66)

##### \_\_id? [​](#id-9)

> `optional` **\_\_id**: `never`

---

### JSONCompatible<T> [​](#jsoncompatible-t)

> **JSONCompatible**<`T`>: `unknown` *extends* `T` ? `never` : `{ [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends NotAssignableToJson ? never : JSONCompatible<T[P]> }`

#### Type Parameters [​](#type-parameters-8)

| Type Parameter |
| --- |
| `T` |

---

### JSONPrimitive [​](#jsonprimitive)

> **JSONPrimitive**: `string` | `number` | `boolean` | `null` | `undefined`

---

### JSONValue [​](#jsonvalue)

> **JSONValue**: [`JSONPrimitive`](./#jsonprimitive) | [`JSONValue`](./#jsonvalue)[] | {}

---

### KeepOperation<T> [​](#keepoperation-t)

> **KeepOperation**<`T`>: `T` & `object`

#### Type declaration [​](#type-declaration-67)

##### \_\_operation? [​](#operation-2)

> `optional` **\_\_operation**: `never`

#### Type Parameters [​](#type-parameters-9)

| Type Parameter |
| --- |
| `T` |

---

### ListenerHandle [​](#listenerhandle)

> **ListenerHandle**: `object`

A handle for a listener.

#### Type declaration [​](#type-declaration-68)

##### stop() [​](#stop-1)

> **stop**: () => `void`

Stop the listener.

###### Returns [​](#returns-89)

`void`

---

### MatchReplaceMatcherName [​](#matchreplacematchername)

> **MatchReplaceMatcherName**: `object`

#### Type declaration [​](#type-declaration-69)

##### kind [​](#kind-9)

> **kind**: `"MatcherName"`

##### name [​](#name-8)

> **name**: `string`

---

### MatchReplaceOperationFirstLine [​](#matchreplaceoperationfirstline)

> **MatchReplaceOperationFirstLine**: [`KeepOperation`](./#keepoperationt)<[`MatchReplaceOperationFirstLineRaw`](./#matchreplaceoperationfirstlineraw)>

---

### MatchReplaceOperationHeaderAdd [​](#matchreplaceoperationheaderadd)

> **MatchReplaceOperationHeaderAdd**: `object`

#### Type declaration [​](#type-declaration-70)

##### kind [​](#kind-10)

> **kind**: `"OperationHeaderAdd"`

##### matcher [​](#matcher-2)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

##### replacer [​](#replacer-2)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationHeaderRaw [​](#matchreplaceoperationheaderraw)

> **MatchReplaceOperationHeaderRaw**: `object`

#### Type declaration [​](#type-declaration-71)

##### kind [​](#kind-11)

> **kind**: `"OperationHeaderRaw"`

##### matcher [​](#matcher-3)

> **matcher**: [`MatchReplaceMatcherRaw`](./#matchreplacematcherraw)

##### replacer [​](#replacer-3)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationHeaderRemove [​](#matchreplaceoperationheaderremove)

> **MatchReplaceOperationHeaderRemove**: `object`

#### Type declaration [​](#type-declaration-72)

##### kind [​](#kind-12)

> **kind**: `"OperationHeaderRemove"`

##### matcher [​](#matcher-4)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

---

### MatchReplaceOperationHeaderUpdate [​](#matchreplaceoperationheaderupdate)

> **MatchReplaceOperationHeaderUpdate**: `object`

#### Type declaration [​](#type-declaration-73)

##### kind [​](#kind-13)

> **kind**: `"OperationHeaderUpdate"`

##### matcher [​](#matcher-5)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

##### replacer [​](#replacer-4)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationMethod [​](#matchreplaceoperationmethod)

> **MatchReplaceOperationMethod**: [`KeepOperation`](./#keepoperationt)<[`MatchReplaceOperationMethodUpdate`](./#matchreplaceoperationmethodupdate)>

---

### MatchReplaceOperationMethodUpdate [​](#matchreplaceoperationmethodupdate)

> **MatchReplaceOperationMethodUpdate**: `object`

#### Type declaration [​](#type-declaration-74)

##### kind [​](#kind-14)

> **kind**: `"OperationMethodUpdate"`

##### replacer [​](#replacer-5)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationPath [​](#matchreplaceoperationpath)

> **MatchReplaceOperationPath**: [`KeepOperation`](./#keepoperationt)<[`MatchReplaceOperationPathRaw`](./#matchreplaceoperationpathraw)>

---

### MatchReplaceOperationPathRaw [​](#matchreplaceoperationpathraw)

> **MatchReplaceOperationPathRaw**: `object`

#### Type declaration [​](#type-declaration-75)

##### kind [​](#kind-15)

> **kind**: `"OperationPathRaw"`

##### matcher [​](#matcher-6)

> **matcher**: [`MatchReplaceMatcherRaw`](./#matchreplacematcherraw)

##### replacer [​](#replacer-6)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationQuery [​](#matchreplaceoperationquery)

> **MatchReplaceOperationQuery**: [`MatchReplaceOperationQueryRaw`](./#matchreplaceoperationqueryraw) | [`MatchReplaceOperationQueryAdd`](./#matchreplaceoperationqueryadd) | [`MatchReplaceOperationQueryRemove`](./#matchreplaceoperationqueryremove) | [`MatchReplaceOperationQueryUpdate`](./#matchreplaceoperationqueryupdate)

---

### MatchReplaceOperationQueryAdd [​](#matchreplaceoperationqueryadd)

> **MatchReplaceOperationQueryAdd**: `object`

#### Type declaration [​](#type-declaration-76)

##### kind [​](#kind-16)

> **kind**: `"OperationQueryAdd"`

##### matcher [​](#matcher-7)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

##### replacer [​](#replacer-7)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationQueryRaw [​](#matchreplaceoperationqueryraw)

> **MatchReplaceOperationQueryRaw**: `object`

#### Type declaration [​](#type-declaration-77)

##### kind [​](#kind-17)

> **kind**: `"OperationQueryRaw"`

##### matcher [​](#matcher-8)

> **matcher**: [`MatchReplaceMatcherRaw`](./#matchreplacematcherraw)

##### replacer [​](#replacer-8)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationQueryRemove [​](#matchreplaceoperationqueryremove)

> **MatchReplaceOperationQueryRemove**: `object`

#### Type declaration [​](#type-declaration-78)

##### kind [​](#kind-18)

> **kind**: `"OperationQueryRemove"`

##### matcher [​](#matcher-9)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

---

### MatchReplaceOperationQueryUpdate [​](#matchreplaceoperationqueryupdate)

> **MatchReplaceOperationQueryUpdate**: `object`

#### Type declaration [​](#type-declaration-79)

##### kind [​](#kind-19)

> **kind**: `"OperationQueryUpdate"`

##### matcher [​](#matcher-10)

> **matcher**: [`MatchReplaceMatcherName`](./#matchreplacematchername)

##### replacer [​](#replacer-9)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceOperationStatusCode [​](#matchreplaceoperationstatuscode)

> **MatchReplaceOperationStatusCode**: [`KeepOperation`](./#keepoperationt)<[`MatchReplaceOperationStatusCodeUpdate`](./#matchreplaceoperationstatuscodeupdate)>

---

### MatchReplaceOperationStatusCodeUpdate [​](#matchreplaceoperationstatuscodeupdate)

> **MatchReplaceOperationStatusCodeUpdate**: `object`

#### Type declaration [​](#type-declaration-80)

##### kind [​](#kind-20)

> **kind**: `"OperationStatusCodeUpdate"`

##### replacer [​](#replacer-10)

> **replacer**: [`MatchReplaceReplacer`](./#matchreplacereplacer)

---

### MatchReplaceSection [​](#matchreplacesection)

> **MatchReplaceSection**: [`MatchReplaceSectionRequestBody`](./#matchreplacesectionrequestbody) | [`MatchReplaceSectionRequestFirstLine`](./#matchreplacesectionrequestfirstline) | [`MatchReplaceSectionRequestHeader`](./#matchreplacesectionrequestheader) | [`MatchReplaceSectionRequestMethod`](./#matchreplacesectionrequestmethod) | [`MatchReplaceSectionRequestPath`](./#matchreplacesectionrequestpath) | [`MatchReplaceSectionRequestQuery`](./#matchreplacesectionrequestquery) | [`MatchReplaceSectionResponseBody`](./#matchreplacesectionresponsebody) | [`MatchReplaceSectionResponseFirstLine`](./#matchreplacesectionresponsefirstline) | [`MatchReplaceSectionResponseHeader`](./#matchreplacesectionresponseheader) | [`MatchReplaceSectionResponseStatusCode`](./#matchreplacesectionresponsestatuscode)

---

### MatchReplaceSectionRequestBody [​](#matchreplacesectionrequestbody)

> **MatchReplaceSectionRequestBody**: `object`

#### Type declaration [​](#type-declaration-81)

##### kind [​](#kind-21)

> **kind**: `"SectionRequestBody"`

##### operation [​](#operation-3)

> **operation**: [`MatchReplaceOperationBody`](./#matchreplaceoperationbody)

---

### MatchReplaceSectionRequestHeader [​](#matchreplacesectionrequestheader)

> **MatchReplaceSectionRequestHeader**: `object`

#### Type declaration [​](#type-declaration-82)

##### kind [​](#kind-22)

> **kind**: `"SectionRequestHeader"`

##### operation [​](#operation-4)

> **operation**: [`MatchReplaceOperationHeader`](./#matchreplaceoperationheader)

---

### MatchReplaceSectionRequestMethod [​](#matchreplacesectionrequestmethod)

> **MatchReplaceSectionRequestMethod**: `object`

#### Type declaration [​](#type-declaration-83)

##### kind [​](#kind-23)

> **kind**: `"SectionRequestMethod"`

##### operation [​](#operation-5)

> **operation**: [`MatchReplaceOperationMethod`](./#matchreplaceoperationmethod)

---

### MatchReplaceSectionRequestPath [​](#matchreplacesectionrequestpath)

> **MatchReplaceSectionRequestPath**: `object`

#### Type declaration [​](#type-declaration-84)

##### kind [​](#kind-24)

> **kind**: `"SectionRequestPath"`

##### operation [​](#operation-6)

> **operation**: [`MatchReplaceOperationPath`](./#matchreplaceoperationpath)

---

### MatchReplaceSectionRequestQuery [​](#matchreplacesectionrequestquery)

> **MatchReplaceSectionRequestQuery**: `object`

#### Type declaration [​](#type-declaration-85)

##### kind [​](#kind-25)

> **kind**: `"SectionRequestQuery"`

##### operation [​](#operation-7)

> **operation**: [`MatchReplaceOperationQuery`](./#matchreplaceoperationquery)

---

### MatchReplaceSectionResponseBody [​](#matchreplacesectionresponsebody)

> **MatchReplaceSectionResponseBody**: `object`

#### Type declaration [​](#type-declaration-86)

##### kind [​](#kind-26)

> **kind**: `"SectionResponseBody"`

##### operation [​](#operation-8)

> **operation**: [`MatchReplaceOperationBody`](./#matchreplaceoperationbody)

---

### MatchReplaceSectionResponseHeader [​](#matchreplacesectionresponseheader)

> **MatchReplaceSectionResponseHeader**: `object`

#### Type declaration [​](#type-declaration-87)

##### kind [​](#kind-27)

> **kind**: `"SectionResponseHeader"`

##### operation [​](#operation-9)

> **operation**: [`MatchReplaceOperationHeader`](./#matchreplaceoperationheader)

---

### MatchReplaceSectionResponseStatusCode [​](#matchreplacesectionresponsestatuscode)

> **MatchReplaceSectionResponseStatusCode**: `object`

#### Type declaration [​](#type-declaration-88)

##### kind [​](#kind-28)

> **kind**: `"SectionResponseStatusCode"`

##### operation [​](#operation-10)

> **operation**: [`MatchReplaceOperationStatusCode`](./#matchreplaceoperationstatuscode)

---

### NotAssignableToJson [​](#notassignabletojson)

> **NotAssignableToJson**: `bigint` | `symbol` | `Function`

---

### OnCreatedWorkflowCallback() [​](#oncreatedworkflowcallback)

> **OnCreatedWorkflowCallback**: (`event`: `object`) => `void`

#### Parameters [​](#parameters-56)

| Parameter | Type |
| --- | --- |
| `event` | { `workflow`: [`Workflow`](./#workflow); } |
| `event.workflow` | [`Workflow`](./#workflow) |

#### Returns [​](#returns-90)

`void`

---

### OnDeletedWorkflowCallback() [​](#ondeletedworkflowcallback)

> **OnDeletedWorkflowCallback**: (`event`: `object`) => `void`

#### Parameters [​](#parameters-57)

| Parameter | Type |
| --- | --- |
| `event` | { `id`: [`ID`](./#id-3); } |
| `event.id` | [`ID`](./#id-3) |

#### Returns [​](#returns-91)

`void`

---

### OnUpdatedWorkflowCallback() [​](#onupdatedworkflowcallback)

> **OnUpdatedWorkflowCallback**: (`event`: `object`) => `void`

#### Parameters [​](#parameters-58)

| Parameter | Type |
| --- | --- |
| `event` | { `workflow`: [`Workflow`](./#workflow); } |
| `event.workflow` | [`Workflow`](./#workflow) |

#### Returns [​](#returns-92)

`void`

---

### PromisifiedReturnType<T> [​](#promisifiedreturntype-t)

> **PromisifiedReturnType**<`T`>: `ReturnType`<`T`> *extends* `Promise`<infer U> ? `Promise`<`U`> : `Promise`<`ReturnType`<`T`>>

#### Type Parameters [​](#type-parameters-10)

| Type Parameter |
| --- |
| `T` *extends* (...`args`: `unknown`[]) => `unknown` |

---

### ReplaySlot [​](#replayslot-1)

> **ReplaySlot**: *typeof* [`ReplaySlot`](./#replayslot-1)[keyof *typeof* [`ReplaySlot`](./#replayslot-1)]

---

### ReplaySlotContent [​](#replayslotcontent)

> **ReplaySlotContent**: `object`

#### Type declaration [​](#type-declaration-89)

##### session-toolbar-primary [​](#session-toolbar-primary)

> **session-toolbar-primary**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

##### session-toolbar-secondary [​](#session-toolbar-secondary)

> **session-toolbar-secondary**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

##### topbar [​](#topbar-1)

> **topbar**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

---

### RequestViewModeOptions [​](#requestviewmodeoptions)

> **RequestViewModeOptions**: `object`

#### Type declaration [​](#type-declaration-90)

##### label [​](#label-1)

> **label**: `string`

The label of the view mode.

##### view [​](#view)

> **view**: [`ComponentDefinition`](./#componentdefinition)

The component to render when the view mode is selected.

---

### SlotContent [​](#slotcontent)

> **SlotContent**: [`ButtonSlotContent`](./#buttonslotcontent) | [`CustomSlotContent`](./#customslotcontent) | [`CommandSlotContent`](./#commandslotcontent)

---

### FooterSlot [​](#footerslot-1)

> `const` **FooterSlot**: `object`

#### Type declaration [​](#type-declaration-91)

##### FooterSlotPrimary [​](#footerslotprimary)

> `readonly` **FooterSlotPrimary**: `"footer-primary"`

##### FooterSlotSecondary [​](#footerslotsecondary)

> `readonly` **FooterSlotSecondary**: `"footer-secondary"`

---

### API [​](#api)

Renames and re-exports [Caido](./#caidot-e)

## Runtime [​](#runtime-1)

### RuntimeSDK [​](#runtimesdk)

> **RuntimeSDK**: `object`

Utilities to interact with the runtime.

#### Type declaration [​](#type-declaration-92)

##### version [​](#version)

###### Get Signature [​](#get-signature)

> **get** **version**(): `string`

Get the current version of Caido.

###### Returns [​](#returns-93)

`string`

## Sitemap [​](#sitemap-1)

### SitemapSDK [​](#sitemapsdk)

> **SitemapSDK**: `object`

Utilities to interact with the Sitemap page.

#### Type declaration [​](#type-declaration-93)

##### getScopeId() [​](#getscopeid-3)

> **getScopeId**: () => [`ID`](./#id-3) | `undefined`

Get the current scope ID.

###### Returns [​](#returns-94)

[`ID`](./#id-3) | `undefined`

The current scope ID.

##### setScope() [​](#setscope-3)

> **setScope**: (`id`: [`ID`](./#id-3) | `undefined`) => `void`

Set the current scope.

###### Parameters [​](#parameters-59)

| Parameter | Type | Description |
| --- | --- | --- |
| `id` | [`ID`](./#id-3) | `undefined` | The ID of the scope to set. |

###### Returns [​](#returns-95)

`void`

## Workflows [​](#workflows-1)

### Workflow [​](#workflow)

> **Workflow**: `object`

A workflow

#### Type declaration [​](#type-declaration-94)

##### description [​](#description-1)

> **description**: `string`

##### id [​](#id-10)

> **id**: `string`

##### kind [​](#kind-29)

> **kind**: [`WorkflowKind`](./#workflowkind)

##### name [​](#name-9)

> **name**: `string`

---

### WorkflowKind [​](#workflowkind)

> **WorkflowKind**: `"Convert"` | `"Active"` | `"Passive"`

The kind of workflow.

---

### WorkflowSDK [​](#workflowsdk)

> **WorkflowSDK**: `object`

Utilities to interact with workflows.

#### Type declaration [​](#type-declaration-95)

##### getWorkflows() [​](#getworkflows)

> **getWorkflows**: () => [`Workflow`](./#workflow)[]

Get all workflows.

###### Returns [​](#returns-96)

[`Workflow`](./#workflow)[]

All workflows.

##### onCreatedWorkflow() [​](#oncreatedworkflow)

> **onCreatedWorkflow**: (`callback`: [`OnCreatedWorkflowCallback`](./#oncreatedworkflowcallback)) => [`ListenerHandle`](./#listenerhandle)

Register a callback to be called when a workflow is created.

###### Parameters [​](#parameters-60)

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | [`OnCreatedWorkflowCallback`](./#oncreatedworkflowcallback) | The callback to be called. |

###### Returns [​](#returns-97)

[`ListenerHandle`](./#listenerhandle)

##### onDeletedWorkflow() [​](#ondeletedworkflow)

> **onDeletedWorkflow**: (`callback`: [`OnDeletedWorkflowCallback`](./#ondeletedworkflowcallback)) => [`ListenerHandle`](./#listenerhandle)

Register a callback to be called when a workflow is deleted.

###### Parameters [​](#parameters-61)

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | [`OnDeletedWorkflowCallback`](./#ondeletedworkflowcallback) | The callback to be called. |

###### Returns [​](#returns-98)

[`ListenerHandle`](./#listenerhandle)

##### onUpdatedWorkflow() [​](#onupdatedworkflow)

> **onUpdatedWorkflow**: (`callback`: [`OnUpdatedWorkflowCallback`](./#onupdatedworkflowcallback)) => [`ListenerHandle`](./#listenerhandle)

Register a callback to be called when a workflow is updated.

###### Parameters [​](#parameters-62)

| Parameter | Type | Description |
| --- | --- | --- |
| `callback` | [`OnUpdatedWorkflowCallback`](./#onupdatedworkflowcallback) | The callback to be called. |

###### Returns [​](#returns-99)

[`ListenerHandle`](./#listenerhandle)

Pager[Previous pageBackend](/reference/sdks/backend/)[Next pageWorkflow](/reference/sdks/workflow/)

