
function encodeKey(key: string): string {
  return encodeURIComponent(String(key))
    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
    .replace(/[\(\)]/g, escape)
}

function encodeValue(value: string): string {
  return encodeURIComponent(String(value))
    .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)
}

function decode(value: string): string {
  return value.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
}

export class Cookie {
  public static fromSetCookieString(setCookie: string): Cookie {
    const chunks = setCookie.split(/\s*;\s*/).map(chunk => chunk.split(/\s*\=\s*/))
    const others: any = {}
    for (const chunk of chunks.slice(1)) {
      const key = chunk[0].toLowerCase()
      let value = chunk[1]
      if (key === "secure") {
        value = "true"
      } else if (key === "httponly") {
        value = "true"
      }
      others[key] = decode(value)
    }
    return new Cookie(
      chunks[0][0],
      chunks[0][1],
      others.expires ? new Date(others.expires) : undefined,
      others.path,
      others.domain,
      others.secure === "true",
      others.httponly === "true")
  }

  constructor(
    public name: string,
    public value: string,
    public expire?: Date,
    public path?: string,
    public domain?: string,
    public secure?: boolean,
    public httpOnly?: boolean) {
  }

  public isExpired(): boolean {
    return !!(this.expire && this.expire.getTime() < new Date().getTime())
  }

  public toCookieString(): string {
    return `${encodeKey(this.name)}=${encodeValue(this.value)}`
  }

  public toSetCookieString(): string {
    let ret = `${encodeKey(this.name)}=`
    if (this.value && !this.isExpired()) {
      ret += encodeValue(this.value)
      if (this.expire) {
        // format "l, d-M-Y H:i:s T"
        // getmax age and expire to format
        // ret += `; Expires=${expire}; Max-Age=${maxAge}`
      }
    } else {
        ret += "deleted; Expires=Thursday, 01-Jan-1970 00:00:00 GMT; Max-Age=0"
    }
    if (this.path) {
        ret += `; Path=${this.path}`
    }
    if (this.domain) {
        ret += `; Domain=${this.domain}`
    }
    if (this.secure) {
        ret += "; Secure"
    }
    if (this.httpOnly) {
        ret += "; HttpOnly"
    }
    return ret
  }
}
