
import {Cookie} from "./cookie"

export interface CookieMap {
  [key: string]: Cookie
}

export class CookieJar {

  public static fromSetCookieHeader(setCookies: string[]): CookieJar
  public static fromSetCookieHeader(setCookie?: string): CookieJar
  public static fromSetCookieHeader(data: any): CookieJar {
    const cookieJar = new CookieJar()
    cookieJar.setRaw(data)
    return cookieJar
  }

  protected cookies: CookieMap

  constructor(cookies: Cookie[] = []) {
    this.cookies = {}
    cookies.forEach(cookie => this.set(cookie))
  }

  public has(key: string): boolean {
    return (key in this.cookies) && !(this.cookies[key].isExpired())
  }

  public setRaw(setCookies: string[]): void
  public setRaw(setCookie?: string): void
  public setRaw(data: any): void {
    if (data) {
      const setCookies = (Array.isArray(data) ? data : [data]) as string[]
      setCookies.forEach(setCookie => this.set(Cookie.fromSetCookieString(setCookie)))
    }
  }

  public set(cookie: Cookie): void
  public set(name: string, value: string, expire?: Date): void
  public set(nameOrCookie: any, value?: any, expire?: Date): void {
    if (typeof nameOrCookie === "string") {
      nameOrCookie = new Cookie(nameOrCookie, value, expire)
    }
    this.cookies[nameOrCookie.name] = nameOrCookie
  }

  public get(name: string): Cookie | undefined {
    if (this.has(name)) {
      return this.cookies[name]
    }
    return
  }

  public toCookieString(): string {
    const filteredCookies = []
    for (const key of Object.keys(this.cookies)) {
      const cookie = this.cookies[key]
      if (!cookie.isExpired()) {
        filteredCookies.push(cookie)
      }
    }
    return filteredCookies.map(cookie => cookie.toCookieString()).join("; ")
  }
}
