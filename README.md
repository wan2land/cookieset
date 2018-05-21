# cookieset

[![Downloads](https://img.shields.io/npm/dt/cookieset.svg)](https://npmcharts.com/compare/cookieset?minimal=true)
[![Version](https://img.shields.io/npm/v/cookieset.svg)](https://www.npmjs.com/package/cookieset)
[![License](https://img.shields.io/npm/l/cookieset.svg)](https://www.npmjs.com/package/cookieset)

[![NPM](https://nodei.co/npm/cookieset.png)](https://www.npmjs.com/package/cookieset)

Cookie / SetCookie library for Javascript (& Typescript).

## Installation

```bash
npm install cookieset --save
```

## Usage

```javascript
const cookieset = require("cookieset")
// or import cookieset from "cookieset"
```

then, simple usage as below:

```typescript
const cookieJar = new cookieset.CookieJar()

cookieJar.set("foo", "value for foo")
cookieJar.set(new cookieset.Cookie("bar", "value for bar"))
cookieJar.set(new cookieset.Cookie("baz", "value for baz", new Date("1970-01-01")))

expect(cookieJar.has("foo")).toBeTruthy()
expect(cookieJar.has("bar")).toBeTruthy()
expect(cookieJar.has("baz")).toBeFalsy()

expect(cookieJar.get("foo")).toBeInstanceOf(cookieset.Cookie)
expect(cookieJar.get("bar")).toBeInstanceOf(cookieset.Cookie)
expect(cookieJar.get("baz")).toBeUndefined()

expect(cookieJar.toCookieString()).toEqual("foo=value%20for%20foo; bar=value%20for%20bar")
```

## Example with Axios

```typescript
const instance = axios.create()

const cookieJar = new cookieset.CookieJar()
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
