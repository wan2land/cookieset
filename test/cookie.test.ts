
import {} from "jest"

import httpcookie from "../dist"

describe("Cookie", () => {
  it("test toCookieString", () => {
    expect(new httpcookie.Cookie("name", "value").toCookieString()).toEqual("name=value")
  })
})
