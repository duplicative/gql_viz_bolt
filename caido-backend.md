
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

# @caido/sdk-backend [​](#caido-sdk-backend)

This is the reference for the backend SDK used by backend plugins. [SDK](#events) is the main interface that provides access to various services and functionalities.

## SDK [​](#sdk)

### SDK<API, Events> [​](#sdk-api-events)

The SDK object available to all scripts.

#### Type Parameters [​](#type-parameters)

| Type Parameter | Default type |
| --- | --- |
| `API` | `object` |
| `Events` | `object` |

#### Properties [​](#properties)

##### api [​](#api)

> **api**: [`APISDK`](./#apisdkapi-events)<`API`, `Events`>

The SDK for the API RPC service.

##### console [​](#console)

> **console**: [`Console`](./#console-1)

The console.

This is currently the same as the global `console`.

##### env [​](#env)

> **env**: [`EnvironmentSDK`](./#environmentsdk)

The SDK for the Environment service.

##### events [​](#events)

> **events**: [`EventsSDK`](./#eventssdkapi-events)<`API`, `Events`>

The SDK for the Events service.

##### findings [​](#findings)

> **findings**: [`FindingsSDK`](./#findingssdk)

The SDK for the Findings service.

##### meta [​](#meta)

> **meta**: [`MetaSDK`](./#metasdk)

The SDK for metadata information about the plugin.

##### projects [​](#projects)

> **projects**: [`ProjectsSDK`](./#projectssdk)

The SDK for the Projects service.

##### replay [​](#replay)

> **replay**: [`ReplaySDK`](./#replaysdk)

The SDK for the Replay service.

##### requests [​](#requests)

> **requests**: [`RequestsSDK`](./#requestssdk)

The SDK for the Requests service.

##### runtime [​](#runtime)

> **runtime**: [`RuntimeSDK`](./#runtimesdk)

The SDK for the runtime information.

##### scope [​](#scope)

> **scope**: [`ScopeSDK`](./#scopesdk)

The SDK for the Scope service.

## Meta [​](#meta-1)

### MetaSDK [​](#metasdk)

> **MetaSDK**: `object`

The SDK for metadata information about the plugin.

#### Type declaration [​](#type-declaration)

##### assetsPath() [​](#assetspath)

The directory of the plugin's assets in Caido Data. You can read static data from your plugin in this directory. You shouldn't write anything there, as the contents can be reset at any time.

###### Returns [​](#returns)

`string`

##### db() [​](#db)

Get a sqlite database for the plugin stored in Caido Data. You can use this to store data related to your plugin.

###### Returns [​](#returns-1)

`Promise`<[`Database`](./#database)>

##### path() [​](#path)

The directory of the plugin in Caido Data. You can store data related to your plugin in this directory.

###### Returns [​](#returns-2)

`string`

##### updateAvailable() [​](#updateavailable)

Check if an update is available for the plugin.

###### Returns [​](#returns-3)

`Promise`<`boolean`>

###### Throws [​](#throws)

If Caido Cloud is offline.

##### version() [​](#version)

Get the version of the plugin. This uses the semver format.

###### Returns [​](#returns-4)

`string`

## API [​](#api-1)

### APISDK<API, Events> [​](#apisdk-api-events)

> **APISDK**<`API`, `Events`>: `object`

The SDK for the API RPC service.

#### Type Parameters [​](#type-parameters-1)

| Type Parameter | Default type |
| --- | --- |
| `API` | `object` |
| `Events` | `object` |

#### Type declaration [​](#type-declaration-1)

##### register() [​](#register)

Registers a new backend function for the RPC.

###### Parameters [​](#parameters)

| Parameter | Type |
| --- | --- |
| `name` | keyof `API` |
| `callback` | (`sdk`: [`SDK`](./#sdkapi-events), ...`args`: `any`[]) => `any` |

###### Returns [​](#returns-5)

`void`

###### Example [​](#example)

ts
```
sdk.api.register("multiply", (sdk: SDK, a: number, b: number) => {
   return a * b;
});
```
##### send() [​](#send)

Sends an event to the frontend plugin.

###### Parameters [​](#parameters-1)

| Parameter | Type |
| --- | --- |
| `event` | keyof `Events` |
| ...`args` | `any`[] |

###### Returns [​](#returns-6)

`void`

###### Example [​](#example-1)

ts
```
sdk.api.send("myEvent", 5, "hello");
```
## Events [​](#events-1)

### EventsSDK<API, Events> [​](#eventssdk-api-events)

> **EventsSDK**<`API`, `Events`>: `object`

The SDK for the API RPC service.

#### Type Parameters [​](#type-parameters-2)

| Type Parameter | Default type |
| --- | --- |
| `API` | `object` |
| `Events` | `object` |

#### Type declaration [​](#type-declaration-2)

##### onInterceptRequest() [​](#oninterceptrequest)

Registers an callback on new intercepted requests.

This callback is called asynchronously and cannot modify requests.

###### Parameters [​](#parameters-2)

| Parameter | Type |
| --- | --- |
| `callback` | (`sdk`: [`SDK`](./#sdkapi-events)<`API`, `Events`>, `request`: [`Request`](./#request-1)) => [`MaybePromise`](./#maybepromiset-1)<`void`> |

###### Returns [​](#returns-7)

`void`

###### Example [​](#example-2)

ts
```
sdk.events.onInterceptRequest((sdk, request) => {
   // Do something with the request
});
```
##### onInterceptResponse() [​](#oninterceptresponse)

Registers an callback on new intercepted responses.

This callback is called asynchronously and cannot modify responses.

###### Parameters [​](#parameters-3)

| Parameter | Type |
| --- | --- |
| `callback` | (`sdk`: [`SDK`](./#sdkapi-events)<`API`, `Events`>, `request`: [`Request`](./#request-1), `response`: [`Response`](./#response-4)) => [`MaybePromise`](./#maybepromiset-1)<`void`> |

###### Returns [​](#returns-8)

`void`

###### Example [​](#example-3)

ts
```
sdk.events.onInterceptResponse((sdk, request, response) => {
   // Do something with the request/response
});
```
##### onProjectChange() [​](#onprojectchange)

Registers an callback on project change.

This callback is called asynchronously and cannot modify the project.

It can happen that the project is null if the user deleted the currently selected one.

###### Parameters [​](#parameters-4)

| Parameter | Type |
| --- | --- |
| `callback` | (`sdk`: [`SDK`](./#sdkapi-events)<`API`, `Events`>, `project`: `null` | [`Project`](./#project)) => [`MaybePromise`](./#maybepromiset-1)<`void`> |

###### Returns [​](#returns-9)

`void`

###### Example [​](#example-4)

ts
```
sdk.events.onProjectChange((sdk, project) => {
  if (project !== null) {
    // Do something with the project
  }
});
```
## Requests [​](#requests-1)

### Body [​](#body)

The body of a [Request](./#request-1) or [Response](./#response-4).

Calling `to<FORMAT>` will try to convert the body to the desired format.

#### Constructors [​](#constructors)

##### new Body() [​](#new-body)

> **new Body**(`data`: `string` | `number`[] | `Uint8Array`): [`Body`](./#body)

###### Parameters [​](#parameters-5)

| Parameter | Type |
| --- | --- |
| `data` | `string` | `number`[] | `Uint8Array` |

###### Returns [​](#returns-10)

[`Body`](./#body)

#### Properties [​](#properties-1)

##### length [​](#length)

> `readonly` **length**: `number`

The length of the body in bytes.

#### Methods [​](#methods)

##### toJson() [​](#tojson)

> **toJson**(): `unknown`

Try to parse the body as JSON.

###### Returns [​](#returns-11)

`unknown`

###### Throws [​](#throws-1)

If the body is not valid JSON.

##### toRaw() [​](#toraw)

> **toRaw**(): `Uint8Array`

Get the raw body as an array of bytes.

###### Returns [​](#returns-12)

`Uint8Array`

##### toText() [​](#totext)

> **toText**(): `string`

Parse the body as a string.

Unprintable characters will be replaced with `�`.

###### Returns [​](#returns-13)

`string`

---

### RequestSpec [​](#requestspec)

A mutable Request that has not yet been sent.

#### Constructors [​](#constructors-1)

##### new RequestSpec() [​](#new-requestspec)

> **new RequestSpec**(`url`: `string`): [`RequestSpec`](./#requestspec)

Build a new [RequestSpec](./#requestspec) from a URL string. We try to infer as much information as possible from the URL, including the scheme, host, path and query.

You can convert a saved immutable [Request](./#request-1) object into a [RequestSpec](./#requestspec) object by using the `toSpec()` method.

By default:

* Method is `GET`.
* Path is `/`.

###### Parameters [​](#parameters-6)

| Parameter | Type |
| --- | --- |
| `url` | `string` |

###### Returns [​](#returns-14)

[`RequestSpec`](./#requestspec)

###### Throws [​](#throws-2)

If the URL is invalid.

###### Example [​](#example-5)

js
```
const spec = new RequestSpec("https://example.com");
```
#### Methods [​](#methods-1)

##### getBody() [​](#getbody)

> **getBody**(): `undefined` | [`Body`](./#body)

The body of the request.

###### Returns [​](#returns-15)

`undefined` | [`Body`](./#body)

##### getHeader() [​](#getheader)

> **getHeader**(`name`: `string`): `undefined` | `string`[]

Get a header value.

Header name is case-insensitive. The header might have multiple values.

###### Parameters [​](#parameters-7)

| Parameter | Type |
| --- | --- |
| `name` | `string` |

###### Returns [​](#returns-16)

`undefined` | `string`[]

##### getHeaders() [​](#getheaders)

> **getHeaders**(): `Record`<`string`, `string`[]>

The headers of the request.

Header names are case-insensitive. Each header might have multiple values.

###### Returns [​](#returns-17)

`Record`<`string`, `string`[]>

###### Example [​](#example-6)

json
```
{
  "Host": ["caido.io"],
  "Connection": ["keep-alive"],
  "Content-Length": ["95"]
}
```
##### getHost() [​](#gethost)

> **getHost**(): `string`

Get the host of the request.

###### Returns [​](#returns-18)

`string`

##### getMethod() [​](#getmethod)

###### Call Signature [​](#call-signature)

> **getMethod**(): `string`

Get the HTTP method of the request.

Get the raw version by passing `{ raw: true }` in the options.

###### Returns [​](#returns-19)

`string`

###### Call Signature [​](#call-signature-1)

> **getMethod**(`options`: [`RawOption`](./#rawoption)): `Uint8Array`

Get the HTTP method of the request.

Get the raw version by passing `{ raw: true }` in the options.

###### Parameters [​](#parameters-8)

| Parameter | Type |
| --- | --- |
| `options` | [`RawOption`](./#rawoption) |

###### Returns [​](#returns-20)

`Uint8Array`

##### getPath() [​](#getpath)

###### Call Signature [​](#call-signature-2)

> **getPath**(): `string`

Get the path of the request.

Get the raw version by passing `{ raw: true }` in the options.

###### Returns [​](#returns-21)

`string`

###### Call Signature [​](#call-signature-3)

> **getPath**(`options`: [`RawOption`](./#rawoption)): `Uint8Array`

Get the path of the request.

Get the raw version by passing `{ raw: true }` in the options.

###### Parameters [​](#parameters-9)

| Parameter | Type |
| --- | --- |
| `options` | [`RawOption`](./#rawoption) |

###### Returns [​](#returns-22)

`Uint8Array`

##### getPort() [​](#getport)

> **getPort**(): `number`

Get the port of the request.

###### Returns [​](#returns-23)

`number`

##### getQuery() [​](#getquery)

###### Call Signature [​](#call-signature-4)

> **getQuery**(): `string`

Get the unparsed query of the request.

Get the raw version by passing `{ raw: true }` in the options.

Excludes the leading `?`.

###### Returns [​](#returns-24)

`string`

###### Call Signature [​](#call-signature-5)

> **getQuery**(`options`: [`RawOption`](./#rawoption)): `Uint8Array`

Get the unparsed query of the request.

Get the raw version by passing `{ raw: true }` in the options.

Excludes the leading `?`.

###### Parameters [​](#parameters-10)

| Parameter | Type |
| --- | --- |
| `options` | [`RawOption`](./#rawoption) |

###### Returns [​](#returns-25)

`Uint8Array`

##### getRaw() [​](#getraw)

> **getRaw**(): [`RequestSpecRaw`](./#requestspecraw)

This methods converts the [RequestSpec](./#requestspec) to a [RequestSpecRaw](./#requestspecraw).

This is useful to retrieve the raw bytes of the request.

###### Returns [​](#returns-26)

[`RequestSpecRaw`](./#requestspecraw)

###### Example [​](#example-7)

js
```
const spec = new RequestSpec("https://example.com");
const specRaw = spec.getRaw();
const bytes = specRaw.getRaw(); // GET / HTTP/1.1\r\nHost: example.com\r\n\r\n
```
##### getTls() [​](#gettls)

> **getTls**(): `boolean`

Get if the request uses TLS (HTTPS).

###### Returns [​](#returns-27)

`boolean`

##### removeHeader() [​](#removeheader)

> **removeHeader**(`name`: `string`): `void`

Removes a header.

###### Parameters [​](#parameters-11)

| Parameter | Type |
| --- | --- |
| `name` | `string` |

###### Returns [​](#returns-28)

`void`

##### setBody() [​](#setbody)

> **setBody**(`body`: [`Body`](./#body) | [`Bytes`](./#bytes), `options`?: [`SetBodyOptions`](./#setbodyoptions)): `void`

Set the body of the request.

The body can either be a [Body](./#body) or any type that can be converted to [Bytes](./#bytes).

###### Parameters [​](#parameters-12)

| Parameter | Type |
| --- | --- |
| `body` | [`Body`](./#body) | [`Bytes`](./#bytes) |
| `options`? | [`SetBodyOptions`](./#setbodyoptions) |

###### Returns [​](#returns-29)

`void`

###### Example [​](#example-8)

js
```
const body = new Body("Hello world.");
const options = { updateContentLength: true };
request.setBody(body, options);
```
##### setHeader() [​](#setheader)

> **setHeader**(`name`: `string`, `value`: `string`): `void`

Set a header value.

This will overwrite any existing values.

###### Parameters [​](#parameters-13)

| Parameter | Type |
| --- | --- |
| `name` | `string` |
| `value` | `string` |

###### Returns [​](#returns-30)

`void`

##### setHost() [​](#sethost)

> **setHost**(`host`: `string`): `void`

Set the host of the request.

It will also update the `Host` header.

###### Parameters [​](#parameters-14)

| Parameter | Type |
| --- | --- |
| `host` | `string` |

###### Returns [​](#returns-31)

`void`

##### setMethod() [​](#setmethod)

> **setMethod**(`method`: [`Bytes`](./#bytes)): `void`

Set the HTTP method of the request.

All strings are accepted.

###### Parameters [​](#parameters-15)

| Parameter | Type |
| --- | --- |
| `method` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-32)

`void`

##### setPath() [​](#setpath)

> **setPath**(`path`: [`Bytes`](./#bytes)): `void`

Set the path of the request.

###### Parameters [​](#parameters-16)

| Parameter | Type |
| --- | --- |
| `path` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-33)

`void`

##### setPort() [​](#setport)

> **setPort**(`port`: `number`): `void`

Set the port of the request.

The port number must be between 1 and 65535.

###### Parameters [​](#parameters-17)

| Parameter | Type |
| --- | --- |
| `port` | `number` |

###### Returns [​](#returns-34)

`void`

##### setQuery() [​](#setquery)

> **setQuery**(`query`: [`Bytes`](./#bytes)): `void`

Set the unparsed query of the request.

The query string should not include the leading `?`.

###### Parameters [​](#parameters-18)

| Parameter | Type |
| --- | --- |
| `query` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-35)

`void`

###### Example [​](#example-9)

js
```
spec.setQuery("q=hello");
```
##### setRaw() [​](#setraw)

> **setRaw**(`raw`: [`Bytes`](./#bytes)): [`RequestSpecRaw`](./#requestspecraw)

This method sets the raw [Bytes](./#bytes) of the request and converts it to a [RequestSpecRaw](./#requestspecraw).

This is useful when you have a prepared [RequestSpec](./#requestspec) and you just want to modify the raw data.

###### Parameters [​](#parameters-19)

| Parameter | Type |
| --- | --- |
| `raw` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-36)

[`RequestSpecRaw`](./#requestspecraw)

###### Example [​](#example-10)

js
```
const rawBytes = []; // RAW BYTES HERE
const request = new RequestSpec("https://example.com");
const rawRequest = request.setRaw(rawBytes);
```
##### setTls() [​](#settls)

> **setTls**(`tls`: `boolean`): `void`

Set if the request uses TLS (HTTPS).

###### Parameters [​](#parameters-20)

| Parameter | Type |
| --- | --- |
| `tls` | `boolean` |

###### Returns [​](#returns-37)

`void`

##### parse() [​](#parse)

###### Call Signature [​](#call-signature-6)

> `static` **parse**(`bytes`: [`Bytes`](./#bytes)): [`RequestSpec`](./#requestspec)

Parses raw bytes into a [RequestSpec](./#requestspec).

###### Parameters [​](#parameters-21)

| Parameter | Type |
| --- | --- |
| `bytes` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-38)

[`RequestSpec`](./#requestspec)

###### Throws [​](#throws-3)

If the bytes are not a valid HTTP request.

###### Example [​](#example-11)

js
```
const rawInput = 'GET / HTTP/1.1\r\nHost: example.com\r\n\r\n';
const spec = RequestSpec.parse(rawInput);
spec.setHeader('x-caido', 'test');
const specRaw = spec.getRaw();
const rawOutput = specRaw.getRaw(); // Will contain the new header
```
###### Call Signature [​](#call-signature-7)

> `static` **parse**(`raw`: [`RequestSpecRaw`](./#requestspecraw)): [`RequestSpec`](./#requestspec)

Parses the raw bytes of a [RequestSpecRaw](./#requestspecraw) into a [RequestSpec](./#requestspec).

###### Parameters [​](#parameters-22)

| Parameter | Type |
| --- | --- |
| `raw` | [`RequestSpecRaw`](./#requestspecraw) |

###### Returns [​](#returns-39)

[`RequestSpec`](./#requestspec)

###### Throws [​](#throws-4)

If the bytes are not a valid HTTP request.

---

### RequestSpecRaw [​](#requestspecraw)

A mutable raw Request that has not yet been sent.

#### Constructors [​](#constructors-2)

##### new RequestSpecRaw() [​](#new-requestspecraw)

> **new RequestSpecRaw**(`url`: `string`): [`RequestSpecRaw`](./#requestspecraw)

Build a new [RequestSpecRaw](./#requestspecraw) from a URL string. Only the host, port and scheme will be parsed.

You can convert a saved immutable [Request](./#request-1) object into a [RequestSpecRaw](./#requestspecraw) object by using the `toSpecRaw()` method.

You MUST use `setRaw` to set the raw bytes of the request.

###### Parameters [​](#parameters-23)

| Parameter | Type |
| --- | --- |
| `url` | `string` |

###### Returns [​](#returns-40)

[`RequestSpecRaw`](./#requestspecraw)

###### Example [​](#example-12)

js
```
const spec = new RequestSpecRaw("https://example.com");
```
#### Methods [​](#methods-2)

##### getHost() [​](#gethost-1)

> **getHost**(): `string`

Get the host of the request.

###### Returns [​](#returns-41)

`string`

##### getPort() [​](#getport-1)

> **getPort**(): `number`

Get the port of the request.

###### Returns [​](#returns-42)

`number`

##### getRaw() [​](#getraw-1)

> **getRaw**(): `Uint8Array`

Get the raw bytes of the request.

###### Returns [​](#returns-43)

`Uint8Array`

##### getSpec() [​](#getspec)

> **getSpec**(): [`RequestSpec`](./#requestspec)

This methods converts the [RequestSpecRaw](./#requestspecraw) to a [RequestSpec](./#requestspec).

###### Returns [​](#returns-44)

[`RequestSpec`](./#requestspec)

###### Throws [​](#throws-5)

If the bytes are not a valid HTTP request.

###### See [​](#see)

[RequestSpec.parse](./#parse)

##### getTls() [​](#gettls-1)

> **getTls**(): `boolean`

Get if the request uses TLS (HTTPS).

###### Returns [​](#returns-45)

`boolean`

##### setHost() [​](#sethost-1)

> **setHost**(`host`: `string`): `void`

Set the host of the request.

It will NOT update the `Host` header.

###### Parameters [​](#parameters-24)

| Parameter | Type |
| --- | --- |
| `host` | `string` |

###### Returns [​](#returns-46)

`void`

##### setPort() [​](#setport-1)

> **setPort**(`port`: `number`): `void`

Set the port of the request.

The port number must be between 1 and 65535.

###### Parameters [​](#parameters-25)

| Parameter | Type |
| --- | --- |
| `port` | `number` |

###### Returns [​](#returns-47)

`void`

##### setRaw() [​](#setraw-1)

> **setRaw**(`raw`: [`Bytes`](./#bytes)): `void`

Set the raw [Bytes](./#bytes) of the request.

###### Parameters [​](#parameters-26)

| Parameter | Type |
| --- | --- |
| `raw` | [`Bytes`](./#bytes) |

###### Returns [​](#returns-48)

`void`

##### setTls() [​](#settls-1)

> **setTls**(`tls`: `boolean`): `void`

Set if the request uses TLS (HTTPS).

###### Parameters [​](#parameters-27)

| Parameter | Type |
| --- | --- |
| `tls` | `boolean` |

###### Returns [​](#returns-49)

`void`

---

### Request [​](#request)

> **Request**: `object`

An immutable saved Request.

To modify, use `toSpec` to get a `RequestSpec` object.

#### Type declaration [​](#type-declaration-3)

##### getBody() [​](#getbody-1)

The body of the request.

###### Returns [​](#returns-50)

`undefined` | [`Body`](./#body)

##### getCreatedAt() [​](#getcreatedat)

The datetime the request was recorded by the proxy.

###### Returns [​](#returns-51)

`Date`

##### getHeader() [​](#getheader-1)

Get a header value.

Header name is case-insensitive. The header might have multiple values.

###### Parameters [​](#parameters-28)

| Parameter | Type |
| --- | --- |
| `name` | `string` |

###### Returns [​](#returns-52)

`undefined` | `string`[]

##### getHeaders() [​](#getheaders-1)

The headers of the request.

Header names are case-insensitive. Each header might have multiple values.

###### Returns [​](#returns-53)

`Record`<`string`, `string`[]>

###### Example [​](#example-13)

json
```
{
  "Host": ["caido.io"],
  "Connection": ["keep-alive"],
  "Content-Length": ["95"]
}
```
##### getHost() [​](#gethost-2)

The target host of the request.

###### Returns [​](#returns-54)

`string`

##### getId() [​](#getid)

The unique Caido [ID](./#id) of the request.

###### Returns [​](#returns-55)

[`ID`](./#id)

##### getMethod() [​](#getmethod-1)

The HTTP method of the request.

###### Returns [​](#returns-56)

`string`

##### getPath() [​](#getpath-1)

The path of the request.

###### Returns [​](#returns-57)

`string`

##### getPort() [​](#getport-2)

The target port of the request.

###### Returns [​](#returns-58)

`number`

##### getQuery() [​](#getquery-1)

The unparsed query of the request.

Excludes the leading `?`.

###### Returns [​](#returns-59)

`string`

##### getRaw() [​](#getraw-2)

The raw version of the request.

Used to access the bytes directly.

###### Returns [​](#returns-60)

[`RequestRaw`](./#requestraw)

##### getTls() [​](#gettls-2)

If the request uses TLS (HTTPS).

###### Returns [​](#returns-61)

`boolean`

##### getUrl() [​](#geturl)

The full URL of the request.

###### Returns [​](#returns-62)

`string`

##### toSpec() [​](#tospec)

Copied the request to a mutable un-saved [RequestSpec](./#requestspec). This enables you to make modify a request before re-sending it.

###### Returns [​](#returns-63)

[`RequestSpec`](./#requestspec)

##### toSpecRaw() [​](#tospecraw)

Copied the request to a mutable un-saved [RequestSpecRaw](./#requestspecraw). The raw requests are not parsed and can be used to send invalid HTTP Requests.

###### Returns [​](#returns-64)

[`RequestSpecRaw`](./#requestspecraw)

---

### RequestOrderField [​](#requestorderfield)

> **RequestOrderField**: `"ext"` | `"host"` | `"id"` | `"method"` | `"path"` | `"query"` | `"created_at"` | `"source"`

Field to order requests by.

---

### RequestRaw [​](#requestraw)

> **RequestRaw**: `object`

An immutable saved raw Request.

#### Type declaration [​](#type-declaration-4)

##### toBytes() [​](#tobytes)

Get the raw request as an array of bytes.

###### Returns [​](#returns-65)

`Uint8Array`

##### toText() [​](#totext-1)

Parse the raw request as a string.

Unprintable characters will be replaced with `�`.

###### Returns [​](#returns-66)

`string`

---

### RequestResponse [​](#requestresponse)

> **RequestResponse**: `object`

An immutable saved Request and Response pair.

#### Type declaration [​](#type-declaration-5)

##### request [​](#request-1)

> **request**: [`Request`](./#request-1)

##### response [​](#response)

> **response**: [`Response`](./#response-4)

---

### RequestResponseOpt [​](#requestresponseopt)

> **RequestResponseOpt**: `object`

An immutable saved Request and optional Response pair.

#### Type declaration [​](#type-declaration-6)

##### request [​](#request-2)

> **request**: [`Request`](./#request-1)

##### response? [​](#response-1)

> `optional` **response**: [`Response`](./#response-4)

---

### RequestsConnection [​](#requestsconnection)

> **RequestsConnection**: `object`

A connection of requests.

#### Type declaration [​](#type-declaration-7)

##### items [​](#items)

> **items**: [`RequestsConnectionItem`](./#requestsconnectionitem)[]

##### pageInfo [​](#pageinfo)

> **pageInfo**: [`PageInfo`](./#pageinfo)

---

### RequestsConnectionItem [​](#requestsconnectionitem)

> **RequestsConnectionItem**: `object`

An item in a connection of requests.

#### Type declaration [​](#type-declaration-8)

##### cursor [​](#cursor)

> **cursor**: [`Cursor`](./#cursor)

##### request [​](#request-3)

> **request**: [`Request`](./#request-1)

##### response? [​](#response-2)

> `optional` **response**: [`Response`](./#response-4)

---

### RequestSendTimeouts [​](#requestsendtimeouts)

> **RequestSendTimeouts**: `object`

Timeouts for sending a request and receiving a response.

#### Type declaration [​](#type-declaration-9)

##### connect? [​](#connect)

> `optional` **connect**: `number`

The timeout to open the TCP connection to the target host and perform the TLS handshake.

Defaults to 30s.

##### extra? [​](#extra)

> `optional` **extra**: `number`

The timeout to read data after we have a read the full response.

This is useful if you believe the server will send more data than implied by the Content-Length header.

Defaults to 0s (no timeout).

##### global? [​](#global)

> `optional` **global**: `number`

The global timeout for sending a request and receiving a response.

No default value.

##### partial? [​](#partial)

> `optional` **partial**: `number`

The timeout between each read attempt for the response. On a slow connection, this is important to increase.

Defaults to 5s.

##### response? [​](#response-3)

> `optional` **response**: `number`

The timeout to receive the first byte of the response.

After the first byte is received, the partial timeout will be used.

Defaults to 30s.

---

### RequestsQuery [​](#requestsquery)

> **RequestsQuery**: `object`

Query builder to fetch requests.

#### Type declaration [​](#type-declaration-10)

##### after() [​](#after)

Requests after a given cursor.

###### Parameters [​](#parameters-29)

| Parameter | Type | Description |
| --- | --- | --- |
| `cursor` | [`Cursor`](./#cursor) | [Cursor](./#cursor) of the request |

###### Returns [​](#returns-67)

[`RequestsQuery`](./#requestsquery)

##### ascending() [​](#ascending)

###### Call Signature [​](#call-signature-8)

Ascending ordering.

###### Parameters [​](#parameters-30)

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | `"req"` | Target of the ordering: req or resp. |
| `field` | [`RequestOrderField`](./#requestorderfield) | Field to order by. |

###### Returns [​](#returns-68)

[`RequestsQuery`](./#requestsquery)

###### Call Signature [​](#call-signature-9)

###### Parameters [​](#parameters-31)

| Parameter | Type |
| --- | --- |
| `target` | `"resp"` |
| `field` | [`ResponseOrderField`](./#responseorderfield) |

###### Returns [​](#returns-69)

[`RequestsQuery`](./#requestsquery)

##### before() [​](#before)

Requests before a given cursor.

###### Parameters [​](#parameters-32)

| Parameter | Type | Description |
| --- | --- | --- |
| `cursor` | [`Cursor`](./#cursor) | [Cursor](./#cursor) of the request |

###### Returns [​](#returns-70)

[`RequestsQuery`](./#requestsquery)

##### descending() [​](#descending)

###### Call Signature [​](#call-signature-10)

Descending ordering.

###### Parameters [​](#parameters-33)

| Parameter | Type | Description |
| --- | --- | --- |
| `target` | `"req"` | Target of the ordering: req or resp. |
| `field` | [`RequestOrderField`](./#requestorderfield) | Field to order by. |

###### Returns [​](#returns-71)

[`RequestsQuery`](./#requestsquery)

###### Call Signature [​](#call-signature-11)

###### Parameters [​](#parameters-34)

| Parameter | Type |
| --- | --- |
| `target` | `"resp"` |
| `field` | [`ResponseOrderField`](./#responseorderfield) |

###### Returns [​](#returns-72)

[`RequestsQuery`](./#requestsquery)

##### execute() [​](#execute)

Execute the query.

###### Returns [​](#returns-73)

`Promise`<[`RequestsConnection`](./#requestsconnection)>

###### Throws [​](#throws-6)

If a query parameter is invalid or the query cannot be executed.

##### filter() [​](#filter)

Filter requests.

###### Parameters [​](#parameters-35)

| Parameter | Type | Description |
| --- | --- | --- |
| `filter` | `string` | HTTPQL filter |

###### Returns [​](#returns-74)

[`RequestsQuery`](./#requestsquery)

##### first() [​](#first)

First n requests.

###### Parameters [​](#parameters-36)

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | `number` | Number of requests to return |

###### Returns [​](#returns-75)

[`RequestsQuery`](./#requestsquery)

##### last() [​](#last)

Last n requests.

###### Parameters [​](#parameters-37)

| Parameter | Type | Description |
| --- | --- | --- |
| `n` | `number` | Number of requests to return |

###### Returns [​](#returns-76)

[`RequestsQuery`](./#requestsquery)

---

### RequestsSDK [​](#requestssdk)

> **RequestsSDK**: `object`

The SDK for the Requests service.

#### Type declaration [​](#type-declaration-11)

##### get() [​](#get)

Get a request by its unique [ID](./#id).

###### Parameters [​](#parameters-38)

| Parameter | Type |
| --- | --- |
| `id` | [`ID`](./#id) |

###### Returns [​](#returns-77)

`Promise`<`undefined` | [`RequestResponseOpt`](./#requestresponseopt)>

###### Example [​](#example-14)

js
```
await sdk.requests.get("1");
```
##### inScope() [​](#inscope)

Checks if a request is in scope.

###### Parameters [​](#parameters-39)

| Parameter | Type |
| --- | --- |
| `request` | [`Request`](./#request-1) | [`RequestSpec`](./#requestspec) |

###### Returns [​](#returns-78)

`boolean`

###### Example [​](#example-15)

js
```
if (sdk.requests.inScope(request)) {
 sdk.console.log("In scope");
}
```
##### matches() [​](#matches)

Checks if a request/response matches an HTTPQL filter.

###### Parameters [​](#parameters-40)

| Parameter | Type | Description |
| --- | --- | --- |
| `filter` | `string` | HTTPQL filter |
| `request` | [`Request`](./#request-1) | The [Request](./#request-1) to match against |
| `response`? | [`Response`](./#response-4) | The [Response](./#response-4) to match against |

###### Returns [​](#returns-79)

`boolean`

##### query() [​](#query)

Query requests of the current project.

###### Returns [​](#returns-80)

[`RequestsQuery`](./#requestsquery)

###### Example [​](#example-16)

js
```
const page = await sqk.requests.query().first(2).execute();
sdk.console.log(`ID: ${page.items[1].request.getId()}`);
```
##### send() [​](#send-1)

Sends an HTTP request, either a [RequestSpec](./#requestspec) or [RequestSpecRaw](./#requestspecraw).

This respects the upstream proxy settings.

###### Parameters [​](#parameters-41)

| Parameter | Type |
| --- | --- |
| `request` | [`RequestSpec`](./#requestspec) | [`RequestSpecRaw`](./#requestspecraw) |
| `options`? | [`RequestSendOptions`](./#requestsendoptions) |

###### Returns [​](#returns-81)

`Promise`<[`RequestResponse`](./#requestresponse)>

###### Throws [​](#throws-7)

If the request cannot be sent. If the request times out, the error message will contain the word "Timeout".

###### Example [​](#example-17)

js
```
const spec = new RequestSpec("https://example.com");
try {
  const res = await sdk.requests.send(request)
  sdk.console.log(res.request.getId());
  sdk.console.log(res.response.getCode());
} catch (err) {
  sdk.console.error(err);
}
```

---

### Response [​](#response-4)

> **Response**: `object`

An immutable saved Response.

#### Type declaration [​](#type-declaration-12)

##### getBody() [​](#getbody-2)

The body of the response

###### Returns [​](#returns-82)

`undefined` | [`Body`](./#body)

##### getCode() [​](#getcode)

The status code of the response.

###### Returns [​](#returns-83)

`number`

##### getCreatedAt() [​](#getcreatedat-1)

The datetime the response was recorded by the proxy.

###### Returns [​](#returns-84)

`Date`

##### getHeader() [​](#getheader-2)

Get a header value.

Header name is case-insensitive. The header might have multiple values.

###### Parameters [​](#parameters-42)

| Parameter | Type |
| --- | --- |
| `name` | `string` |

###### Returns [​](#returns-85)

`undefined` | `string`[]

##### getHeaders() [​](#getheaders-2)

The headers of the response.

Header names are case-insensitive. Each header might have multiple values.

###### Returns [​](#returns-86)

`Record`<`string`, `string`[]>

###### Example [​](#example-18)

json
```
{
  "Date": ["Sun, 26 May 2024 10:59:21 GMT"],
  "Content-Type": ["text/html"]
}
```
##### getId() [​](#getid-1)

The unique Caido [ID](./#id) of the response.

###### Returns [​](#returns-87)

[`ID`](./#id)

##### getRaw() [​](#getraw-3)

The raw version of the response.

Used to access the bytes directly.

###### Returns [​](#returns-88)

[`ResponseRaw`](./#responseraw)

##### getRoundtripTime() [​](#getroundtriptime)

The time it took to send the request and receive the response in milliseconds.

###### Returns [​](#returns-89)

`number`

---

### ResponseOrderField [​](#responseorderfield)

> **ResponseOrderField**: `"length"` | `"roundtrip"` | `"code"`

Field to order responses by.

---

### ResponseRaw [​](#responseraw)

> **ResponseRaw**: `object`

An immutable saved raw Response.

#### Type declaration [​](#type-declaration-13)

##### toBytes() [​](#tobytes-1)

Get the raw response as an array of bytes.

###### Returns [​](#returns-90)

`Uint8Array`

##### toText() [​](#totext-2)

Parse the raw response as a string.

Unprintable characters will be replaced with `�`.

###### Returns [​](#returns-91)

`string`

---

### SetBodyOptions [​](#setbodyoptions)

> **SetBodyOptions**: `object`

Options when setting the body of a Request.

#### Type declaration [​](#type-declaration-14)

##### updateContentLength [​](#updatecontentlength)

> **updateContentLength**: `boolean`

Should update the Content-export type header.

###### Default [​](#default)

ts
```
true
```
## Findings [​](#findings-1)

### DedupeKey [​](#dedupekey)

> **DedupeKey**: `string` & `object`

A deduplication key.

#### Type declaration [​](#type-declaration-15)

##### \_\_dedupeKey? [​](#dedupekey-1)

> `optional` **\_\_dedupeKey**: `never`

---

### Finding [​](#finding)

> **Finding**: `object`

A saved immutable Finding.

#### Type declaration [​](#type-declaration-16)

##### getDedupeKey() [​](#getdedupekey)

The deduplication key of the finding.

###### Returns [​](#returns-92)

`undefined` | [`DedupeKey`](./#dedupekey)

##### getDescription() [​](#getdescription)

The description of the finding.

###### Returns [​](#returns-93)

`undefined` | `string`

##### getId() [​](#getid-2)

The unique Caido [ID](./#id) of the finding.

###### Returns [​](#returns-94)

[`ID`](./#id)

##### getReporter() [​](#getreporter)

The name of the reporter.

###### Returns [​](#returns-95)

`string`

##### getRequestId() [​](#getrequestid)

The ID of the associated [Request](./#request-1).

###### Returns [​](#returns-96)

`string`

##### getTitle() [​](#gettitle)

The title of the finding.

###### Returns [​](#returns-97)

`string`

---

### FindingSpec [​](#findingspec)

> **FindingSpec**: `object`

A mutable Finding not yet created.

#### Type declaration [​](#type-declaration-17)

##### dedupeKey? [​](#dedupekey-2)

> `optional` **dedupeKey**: [`DedupeKey`](./#dedupekey)

Deduplication key for findings. If a finding with the same dedupe key already exists, it will not be created.

##### description? [​](#description)

> `optional` **description**: `string`

The description of the finding.

##### reporter [​](#reporter)

> **reporter**: `string`

The name of the reporter. It will be used to group findings.

##### request [​](#request-4)

> **request**: [`Request`](./#request-1)

The associated [Request](./#request-1).

##### title [​](#title)

> **title**: `string`

The title of the finding.

---

### FindingsSDK [​](#findingssdk)

> **FindingsSDK**: `object`

The SDK for the Findings service.

#### Type declaration [​](#type-declaration-18)

##### create() [​](#create)

Creates a new Finding.

###### Parameters [​](#parameters-43)

| Parameter | Type |
| --- | --- |
| `spec` | [`FindingSpec`](./#findingspec) |

###### Returns [​](#returns-98)

`Promise`<[`Finding`](./#finding)>

###### Throws [​](#throws-8)

If the request cannot be saved.

###### Example [​](#example-19)

js
```
await sdk.findings.create({
  title: "Title",
  description: "Description",
  reporter: "Reporter",
  dedupeKey: `${request.getHost()}-${request.getPath()}`,
  request,
});
```
##### exists() [​](#exists)

Check if a [Finding](./#finding) exists. Similar to `get`, but returns a boolean.

###### Parameters [​](#parameters-44)

| Parameter | Type |
| --- | --- |
| `input` | [`GetFindingInput`](./#getfindinginput) |

###### Returns [​](#returns-99)

`Promise`<`boolean`>

###### Example [​](#example-20)

js
```
await sdk.findings.exists("my-dedupe-key");
```
##### get() [​](#get-1)

Try to get a [Finding](./#finding) for a request.

Since a request can have multiple findings, this will return the first one found. You can also filter by reporter to get a specific finding.

Finally, you can use a deduplication key to get a specific finding.

###### Parameters [​](#parameters-45)

| Parameter | Type |
| --- | --- |
| `input` | [`GetFindingInput`](./#getfindinginput) |

###### Returns [​](#returns-100)

`Promise`<`undefined` | [`Finding`](./#finding)>

###### Example [​](#example-21)

js
```
await sdk.findings.get({
 reporter: "Reporter",
 request,
});
```

---

### GetFindingInput [​](#getfindinginput)

> **GetFindingInput**: [`DedupeKey`](./#dedupekey) | { `reporter`: `string`; `request`: [`Request`](./#request-1); }

Input to get a [Finding](./#finding).

#### Type declaration [​](#type-declaration-19)

[`DedupeKey`](./#dedupekey)

{ `reporter`: `string`; `request`: [`Request`](./#request-1); }

##### reporter? [​](#reporter-1)

> `optional` **reporter**: `string`

The name of the reporter.

##### request [​](#request-5)

> **request**: [`Request`](./#request-1)

The associated [Request](./#request-1).

## Replay [​](#replay-1)

### ReplayCollection [​](#replaycollection)

> **ReplayCollection**: `object`

A collection of replay sessions.

#### Type declaration [​](#type-declaration-20)

##### getId() [​](#getid-3)

The unique Caido [ID](./#id) of the replay collection.

###### Returns [​](#returns-101)

[`ID`](./#id)

##### getName() [​](#getname)

The name of the replay collection.

###### Returns [​](#returns-102)

`string`

---

### ReplaySDK [​](#replaysdk)

> **ReplaySDK**: `object`

The SDK for the Replay service.

#### Type declaration [​](#type-declaration-21)

##### createSession() [​](#createsession)

###### Parameters [​](#parameters-46)

| Parameter | Type |
| --- | --- |
| `source`? | [`RequestSource`](./#requestsource) |
| `collection`? | [`ID`](./#id) | [`ReplayCollection`](./#replaycollection) |

###### Returns [​](#returns-103)

`Promise`<[`ReplaySession`](./#replaysession)>

##### getCollections() [​](#getcollections)

###### Returns [​](#returns-104)

`Promise`<[`ReplayCollection`](./#replaycollection)[]>

---

### ReplaySession [​](#replaysession)

> **ReplaySession**: `object`

A replay session.

#### Type declaration [​](#type-declaration-22)

##### getId() [​](#getid-4)

The unique Caido [ID](./#id) of the replay session.

###### Returns [​](#returns-105)

[`ID`](./#id)

##### getName() [​](#getname-1)

The name of the replay session.

###### Returns [​](#returns-106)

`string`

## Projects [​](#projects-1)

### Project [​](#project)

> **Project**: `object`

A saved immutable Project.

#### Type declaration [​](#type-declaration-23)

##### getId() [​](#getid-5)

The unique Caido [ID](./#id) of the project.

###### Returns [​](#returns-107)

[`ID`](./#id)

##### getName() [​](#getname-2)

The name of the project.

###### Returns [​](#returns-108)

`string`

##### getStatus() [​](#getstatus)

The status of the project.

###### Returns [​](#returns-109)

[`ProjectStatus`](./#projectstatus)

##### getVersion() [​](#getversion)

The version of the project. The format is `MAJOR.MINOR.PATCH`.

###### Returns [​](#returns-110)

`string`

---

### ProjectsSDK [​](#projectssdk)

> **ProjectsSDK**: `object`

The SDK for the Projects service.

#### Type declaration [​](#type-declaration-24)

##### getCurrent() [​](#getcurrent)

Get the currently selected [Project](./#project) if any.

###### Returns [​](#returns-111)

`Promise`<`undefined` | [`Project`](./#project)>

###### Example [​](#example-22)

js
```
await sdk.projects.getCurrent();
```

---

### ProjectStatus [​](#projectstatus)

> **ProjectStatus**: `"ready"` | `"restoring"` | `"error"`

A [Project](./#project) status.

## Shared [​](#shared)

### Bytes [​](#bytes)

> **Bytes**: `string` | `number`[] | `Uint8Array`

Types that can be converted to bytes in inputs.

---

### Cursor [​](#cursor-1)

> **Cursor**: `string` & `object`

A cursor for pagination.

#### Type declaration [​](#type-declaration-25)

##### \_\_cursor? [​](#cursor-2)

> `optional` **\_\_cursor**: `never`

---

### DefineAPI<API> [​](#defineapi-api)

> **DefineAPI**<`API`>: `{ [K in keyof API]: DefineAPICallback<API[K]> }`

Define a Plugin backend functions that are callable from the frontend.

#### Type Parameters [​](#type-parameters-3)

| Type Parameter |
| --- |
| `API` *extends* `Record`<`string`, (...`args`: `any`[]) => [`MaybePromise`](./#maybepromiset)<`any`>> |

#### Example [​](#example-23)

typescript
```
function generateNumber(sdk: SDK, min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export type API = DefineAPI<{
  generateNumber: typeof generateNumber;
}>;

export function init(sdk: SDK<API>) {
  sdk.api.register("generateNumber", generateNumber);
}
```

---

### DefineAPICallback<F> [​](#defineapicallback-f)

> **DefineAPICallback**<`F`>: `F` *extends* (`sdk`: [`SDK`](./#sdkapi-events), ...`args`: infer A) => infer R ? (...`args`: `A`) => `R` : `"Your callback must respect the format (sdk: SDK, ...args: unknown[]) => MaybePromise<unknown>"`

Parser for Plugin backend callable functions

#### Type Parameters [​](#type-parameters-4)

| Type Parameter |
| --- |
| `F` |

---

### DefineEventCallback<F> [​](#defineeventcallback-f)

> **DefineEventCallback**<`F`>: `F` *extends* (...`args`: infer A) => [`MaybePromise`](./#maybepromiset)<`void`> ? (...`args`: `A`) => [`MaybePromise`](./#maybepromiset)<`void`> : `"Your callback must respect the format (...args: unknown[]) => MaybePromise<void>"`

Parser for Plugin backend events callbacks.

#### Type Parameters [​](#type-parameters-5)

| Type Parameter |
| --- |
| `F` |

---

### DefineEvents<Events> [​](#defineevents-events)

> **DefineEvents**<`Events`>: `{ [K in keyof Events]: DefineEventCallback<Events[K]> }`

Define a Plugin backend events that the frontend can receive.

#### Type Parameters [​](#type-parameters-6)

| Type Parameter |
| --- |
| `Events` *extends* `Record`<`string`, (...`args`: `any`[]) => [`MaybePromise`](./#maybepromiset)<`void`>> |

#### Example [​](#example-24)

typescript
```
type MyEventData = { id: string; name: string };

export type BackendEvents = DefineEvents<{
  "myevent": (data: MyEventData) => void;
}>;

export function init(sdk: SDK<{}, BackendEvents>) {
  sdk.api.send("myevent", { id: "1", name: "hello" });
}
```

---

### ID [​](#id)

> **ID**: `string` & `object`

A unique identifier.

#### Type declaration [​](#type-declaration-26)

##### \_\_id? [​](#id-1)

> `optional` **\_\_id**: `never`

---

### MaybePromise<T> [​](#maybepromise-t)

> **MaybePromise**<`T`>: `T` | `Promise`<`T`>

Promise or value.

#### Type Parameters [​](#type-parameters-7)

| Type Parameter |
| --- |
| `T` |

---

### MaybePromise<T> [​](#maybepromise-t-1)

> **MaybePromise**<`T`>: `T` | `Promise`<`T`>

Promise or value.

#### Type Parameters [​](#type-parameters-8)

| Type Parameter |
| --- |
| `T` |

---

### RawOption [​](#rawoption)

> **RawOption**: `object`

Option to return raw value

#### Type declaration [​](#type-declaration-27)

##### raw [​](#raw)

> **raw**: `true`

---

### RequestSource [​](#requestsource)

> **RequestSource**: [`ID`](./#id) | [`Request`](./#request-1) | [`RequestSpec`](./#requestspec) | [`RequestSpecRaw`](./#requestspecraw)

The source of a request.

## Environment [​](#environment)

### EnvironmentSDK [​](#environmentsdk)

> **EnvironmentSDK**: `object`

The SDK for the Environment service.

#### Type declaration [​](#type-declaration-28)

##### getVar() [​](#getvar)

Get the value of an environment variable.

###### Parameters [​](#parameters-47)

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the environment variable. |

###### Returns [​](#returns-112)

`undefined` | `string`

The value of the environment variable.

##### getVars() [​](#getvars)

Get all the environment variables. It includes the global environment and the selected environment. Those variables can change over time so avoid caching them.

###### Returns [​](#returns-113)

[`EnvironmentVariable`](./#environmentvariable)[]

An array of [EnvironmentVariable](./#environmentvariable)

##### setVar() [​](#setvar)

Sets an environment variable to a given value. This will override any existing value. The environment variable can be set either on the currently selected environment or the global environment.

###### Parameters [​](#parameters-48)

| Parameter | Type |
| --- | --- |
| `input` | [`SetVarInput`](./#setvarinput) |

###### Returns [​](#returns-114)

`Promise`<`void`>

###### Throws [​](#throws-9)

If trying to set when a project is not selected.

###### Throws [​](#throws-10)

If trying to set when an environment is not selected (with `global: false`).

###### Example [​](#example-25)

js
```
await sdk.env.setVar({
  name: "USER_SECRET",
  value: "my secret value",
  secret: true,
  global: false
});
```

---

### EnvironmentVariable [​](#environmentvariable)

> **EnvironmentVariable**: `object`

A saved immutable Finding.

#### Type declaration [​](#type-declaration-29)

##### isSecret [​](#issecret)

> `readonly` **isSecret**: `boolean`

If the environment variable is a secret

##### name [​](#name)

> `readonly` **name**: `string`

The name of the environment variable

##### value [​](#value)

> `readonly` **value**: `string`

The value of the environment variable

---

### SetVarInput [​](#setvarinput)

> **SetVarInput**: `object`

Input for the `setVar` of [EnvironmentSDK](./#environmentsdk).

#### Type declaration [​](#type-declaration-30)

##### env? [​](#env-1)

> `optional` **env**: `string`

The `name` of the Environment to set the variable on. This will take precedence over the `global` flag if provided.

##### global [​](#global-1)

> **global**: `boolean`

If the environment variable should be set on the global environment or the currently selected environment. By default, it will be set globally.

###### Default [​](#default-1)

ts
```
true
```
##### name [​](#name-1)

> **name**: `string`

Name of the environment variable

##### secret [​](#secret)

> **secret**: `boolean`

If the environment variable should be treated as secret. Secrets are encrypted on the disk.

###### Default [​](#default-2)

ts
```
false
```
##### value [​](#value-1)

> **value**: `string`

Value of the environment variable

## Other [​](#other)

### Database [​](#database)

A SQLite database.

The implementation uses a connection pool and is fully asynchronous. Each connection will be spawned in a worker thread.

#### Example [​](#example-26)

ts
```
const db = await open({ filename: "path/to/database.sqlite" });
await db.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT);");
await db.exec("INSERT INTO test (name) VALUES ('foo');");
```
#### Constructors [​](#constructors-3)

##### new Database() [​](#new-database)

> **new Database**(): [`Database`](./#database)

###### Returns [​](#returns-115)

[`Database`](./#database)

#### Methods [​](#methods-3)

##### exec() [​](#exec)

> **exec**(`sql`: `string`): `Promise`<`void`>

This method allows one or more SQL statements to be executed without returning any results.

###### Parameters [​](#parameters-49)

| Parameter | Type |
| --- | --- |
| `sql` | `string` |

###### Returns [​](#returns-116)

`Promise`<`void`>

##### prepare() [​](#prepare)

> **prepare**(`sql`: `string`): `Promise`<[`Statement`](./#statement)>

Compiles a SQL statement into a [prepared statement](https://www.sqlite.org/c3ref/stmt.html).

###### Parameters [​](#parameters-50)

| Parameter | Type |
| --- | --- |
| `sql` | `string` |

###### Returns [​](#returns-117)

`Promise`<[`Statement`](./#statement)>

---

### Statement [​](#statement)

This class represents a single prepared statement. This class cannot be instantiated via its constructor. Instead, instances are created via the database.prepare() method.

#### Constructors [​](#constructors-4)

##### new Statement() [​](#new-statement)

> **new Statement**(): [`Statement`](./#statement)

###### Returns [​](#returns-118)

[`Statement`](./#statement)

#### Methods [​](#methods-4)

##### all() [​](#all)

> **all**<`T`>(...`params`: [`Parameter`](./#parameter)[]): `Promise`<`T`[]>

This method executes a prepared statement and returns all results as an array of objects. If the prepared statement does not return any results, this method returns an empty array. The prepared statement [parameters are bound](https://www.sqlite.org/c3ref/bind_blob.html) using the values in `params`.

###### Type Parameters [​](#type-parameters-9)

| Type Parameter | Default type |
| --- | --- |
| `T` *extends* `object` | `object` |

###### Parameters [​](#parameters-51)

| Parameter | Type | Description |
| --- | --- | --- |
| ...`params` | [`Parameter`](./#parameter)[] | The values to bind to the prepared statement. Named parameters are not supported. |

###### Returns [​](#returns-119)

`Promise`<`T`[]>

##### get() [​](#get-2)

> **get**<`T`>(...`params`: [`Parameter`](./#parameter)[]): `Promise`<`undefined` | `T`>

This method executes a prepared statement and returns the first result as an object. If the prepared statement does not return any results, this method returns undefined. The prepared statement [parameters are bound](https://www.sqlite.org/c3ref/bind_blob.html) using the values in params.

###### Type Parameters [​](#type-parameters-10)

| Type Parameter | Default type |
| --- | --- |
| `T` *extends* `object` | `object` |

###### Parameters [​](#parameters-52)

| Parameter | Type | Description |
| --- | --- | --- |
| ...`params` | [`Parameter`](./#parameter)[] | The values to bind to the prepared statement. Named parameters are not supported. |

###### Returns [​](#returns-120)

`Promise`<`undefined` | `T`>

##### run() [​](#run)

> **run**(...`params`: [`Parameter`](./#parameter)[]): `Promise`<[`Result`](./#result)>

This method executes a prepared statement and returns an object summarizing the resulting changes. The prepared statement [parameters are bound](https://www.sqlite.org/c3ref/bind_blob.html) using the values in params.

###### Parameters [​](#parameters-53)

| Parameter | Type | Description |
| --- | --- | --- |
| ...`params` | [`Parameter`](./#parameter)[] | The values to bind to the prepared statement. Named parameters are not supported. |

###### Returns [​](#returns-121)

`Promise`<[`Result`](./#result)>

---

### Console [​](#console-1)

> **Console**: `object`

Console interface for logging.

Currently logs are only available in the backend logs. See the [documentation](https://docs.caido.io/report_bug.html#1-backend-logs) on how to retrieve them.

#### Type declaration [​](#type-declaration-31)

##### debug() [​](#debug)

Log a message with the debug level.

Usually used for troubleshooting purposes.

###### Parameters [​](#parameters-54)

| Parameter | Type |
| --- | --- |
| `message` | `any` |

###### Returns [​](#returns-122)

`void`

##### error() [​](#error)

Log a message with the error level.

Usually used for critical errors.

###### Parameters [​](#parameters-55)

| Parameter | Type |
| --- | --- |
| `message` | `any` |

###### Returns [​](#returns-123)

`void`

##### log() [​](#log)

Log a message with the info level.

Usually used for general information.

###### Parameters [​](#parameters-56)

| Parameter | Type |
| --- | --- |
| `message` | `any` |

###### Returns [​](#returns-124)

`void`

##### warn() [​](#warn)

Log a message with the warn level.

Usually used for unexpected behaviors.

###### Parameters [​](#parameters-57)

| Parameter | Type |
| --- | --- |
| `message` | `any` |

###### Returns [​](#returns-125)

`void`

---

### PageInfo [​](#pageinfo-1)

> **PageInfo**: `object`

Information on the current page of paginated data.

#### Type declaration [​](#type-declaration-32)

##### endCursor [​](#endcursor)

> **endCursor**: [`Cursor`](./#cursor)

##### hasNextPage [​](#hasnextpage)

> **hasNextPage**: `boolean`

##### hasPreviousPage [​](#haspreviouspage)

> **hasPreviousPage**: `boolean`

##### startCursor [​](#startcursor)

> **startCursor**: [`Cursor`](./#cursor)

---

### Parameter [​](#parameter)

> **Parameter**: `null` | `number` | `bigint` | `string` | `Uint8Array`

---

### RequestSendOptions [​](#requestsendoptions)

> **RequestSendOptions**: `object`

#### Type declaration [​](#type-declaration-33)

##### save? [​](#save)

> `optional` **save**: `boolean`

If true, the request and response will be saved to the database and the user will see them in the Search tab.

If you do not save, the request and response IDs will be set to 0.

###### Default [​](#default-3)

ts
```
true
```
##### timeouts? [​](#timeouts)

> `optional` **timeouts**: [`RequestSendTimeouts`](./#requestsendtimeouts) | `number`

The timeouts to use for sending a request and receiving a response.

If a number is provided, it will be used as the global timeout and the other timeouts will be set to infinity.

See the [RequestSendTimeouts](./#requestsendtimeouts) for the default values.

---

### Result [​](#result)

> **Result**: `object`

#### Type declaration [​](#type-declaration-34)

##### changes [​](#changes)

> **changes**: `number`

##### lastInsertRowid [​](#lastinsertrowid)

> **lastInsertRowid**: `number`

## Runtime [​](#runtime-1)

### RuntimeSDK [​](#runtimesdk)

> **RuntimeSDK**: `object`

The SDK for the runtime information.

#### Type declaration [​](#type-declaration-35)

##### version [​](#version-1)

###### Get Signature [​](#get-signature)

> **get** **version**(): `string`

Get the current version of Caido.

###### Returns [​](#returns-126)

`string`

## Scope [​](#scope-1)

### Scope [​](#scope-2)

> **Scope**: `object`

A saved immutable Scope.

#### Type declaration [​](#type-declaration-36)

##### allowlist [​](#allowlist)

> `readonly` **allowlist**: `string`[]

The allowlist of the scope.

##### denylist [​](#denylist)

> `readonly` **denylist**: `string`[]

The denylist of the scope.

##### id [​](#id-2)

> `readonly` **id**: [`ID`](./#id)

The unique Caido [ID](./#id) of the scope.

##### name [​](#name-2)

> `readonly` **name**: `string`

The name of the scope.

---

### ScopeSDK [​](#scopesdk)

> **ScopeSDK**: `object`

The SDK for the Scope service.

#### Type declaration [​](#type-declaration-37)

##### getAll() [​](#getall)

Get all the scopes.

###### Returns [​](#returns-127)

`Promise`<[`Scope`](./#scope-1)[]>

An array of [Scope](./#scope-1)

Pager[Previous pageIntroduction](/reference/)[Next pageFrontend](/reference/sdks/frontend/)

