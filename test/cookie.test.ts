
import {} from "jest"

import cookieset from "../dist"

describe("Cookie", () => {
  it("test toCookieString", () => {
    expect(new cookieset.Cookie("name", "value").toCookieString()).toEqual("name=value")
  })
})
