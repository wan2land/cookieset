
import {} from "jest"

import axios from "axios"
import httpcookie from "../dist"

describe("CookieJar", () => {
  it("test toCookieString", () => {
    expect(new httpcookie.CookieJar([
      new httpcookie.Cookie("key1", "value1"),
      new httpcookie.Cookie("key2", "value2"),
    ]).toCookieString()).toEqual("key1=value1; key2=value2")
  })

  it("test toCookieString with expires", () => {
    expect(new httpcookie.CookieJar([
      new httpcookie.Cookie("key1", "value1"),
      new httpcookie.Cookie("key2", "value2", new Date("1970-01-01")), // expires
    ]).toCookieString()).toEqual("key1=value1")
  })

  it("test set & has", () => {
    // section:example-default
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
    // endsection
  })

  it("test with axios", async () => {
    // section:example-with-axios
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
    // endsection
  })
})
