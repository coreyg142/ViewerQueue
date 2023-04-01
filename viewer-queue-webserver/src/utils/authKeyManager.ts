import crypto from "crypto";

export default class AuthKeyManager {
  static authKeysMap: Map<string, number> = new Map<string, number>();

  static genAuthKey(): string {
    const authKey = crypto.randomBytes(48).toString("hex");
    this.authKeysMap.set(authKey, Date.now());
    return authKey;
  }

  static checkAuthKey(authKey: string): boolean {
    if (this.authKeysMap.has(authKey)) {
      const time = this.authKeysMap.get(authKey);
      if (time && Date.now() - time < 1000 * 60 * 60 * 2) {
        return true;
      } else {
        this.authKeysMap.delete(authKey);
        return false;
      }
    } else return false;
  }

  constructor() {}
}
