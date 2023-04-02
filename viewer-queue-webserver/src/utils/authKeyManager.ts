import crypto from "crypto";

export default class AuthKeyManager {
  static authKeysMap: Map<string, [string, number]> = new Map<string, [string, number]>();

  static genAuthKey(ipAddress: string): string {
    const authKey = crypto.randomBytes(48).toString("hex");
    this.authKeysMap.set(authKey, [ipAddress, Date.now()]);
    // console.log(`Generated auth key ${authKey} for ${ipAddress}`);
    return authKey;
  }

  static verifyKey(authKey: string, requestingIpAddr: string): boolean {
    if (this.authKeysMap.has(authKey)) {
      const meta = this.authKeysMap.get(authKey);
      if (meta) {
        const [ipAddress, time] = meta;

        if (requestingIpAddr === ipAddress && time && Date.now() - time < 1000 * 60 * 60 * 2) {
          return true;
        } else {
          this.authKeysMap.delete(authKey);
          return false;
        }
      }
    }
    return false;
  }

  constructor() {}
}
