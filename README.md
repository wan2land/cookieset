# httpcookie

[![Downloads](https://img.shields.io/npm/dt/httpcookie.svg)](https://npmcharts.com/compare/httpcookie?minimal=true)
[![Version](https://img.shields.io/npm/v/httpcookie.svg)](https://www.npmjs.com/package/httpcookie)
[![License](https://img.shields.io/npm/l/httpcookie.svg)](https://www.npmjs.com/package/httpcookie)

[![NPM](https://nodei.co/npm/httpcookie.png)](https://www.npmjs.com/package/httpcookie)

Cookie / SetCookie library for Javascript (& Typescript).

## Installation

```bash
npm install httpcookie --save
```

## Usage

```javascript
const httpcookie = require("httpcookie")
// or import httpcookie from "httpcookie"
```

then, simple usage as below:

```typescript
const cookieJar = new httpcookie.CookieJar()

cookieJar.set("foo", "value for foo")
cookieJar.set(new httpcookie.Cookie("bar", "value for bar"))
cookieJar.set(new httpcookie.Cookie("baz", "value for baz", new Date("1970-01-01")))

expect(cookieJar.has("foo")).toBeTruthy()
expect(cookieJar.has("bar")).toBeTruthy()
expect(cookieJar.has("baz")).toBeFalsy()

expect(cookieJar.get("foo")).toBeInstanceOf(httpcookie.Cookie)
expect(cookieJar.get("bar")).toBeInstanceOf(httpcookie.Cookie)
expect(cookieJar.get("baz")).toBeUndefined()

expect(cookieJar.toCookieString()).toEqual("foo=value%20for%20foo; bar=value%20for%20bar")
```

## Example with Axios

```typescript
const instance = axios.create()

const cookieJar = new httpcookie.CookieJar()
instance.interceptors.request.use(req => {
  req.headers["cookie"] = cookieJar.toCookieString()
  return req
})
instance.interceptors.response.use(res => {
  cookieJar.setRaw(res.headers["set-cookie"])
  return res
})

await instance.get("http://localhost:8000/?username=corgidisco")
await instance.get("http://localhost:8000/")
const response = await instance.get("http://localhost:8000/")

expect(response.data).toEqual("corgidisco")
```
