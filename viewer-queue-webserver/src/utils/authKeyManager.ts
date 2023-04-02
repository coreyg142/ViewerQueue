import crypto from "crypto";

const AUTH_KEY_LENGTH = 48;
const AUTH_KEY_EXPIRATION_TIME = 1000 * 60 * 60 * 2; // 2 hours
export default class AuthKeyManager {
  static authKeysMap: Map<string, [string, number]> = new Map<string, [string, number]>();

  static genAuthKey(ipAddress: string): { authKey: string; time: number } {
    const authKey = crypto.randomBytes(AUTH_KEY_LENGTH).toString("hex");
    const time = Date.now();
    this.authKeysMap.set(authKey, [ipAddress, time]);
    // console.log(`Generated auth key ${authKey} for ${ipAddress}`);
    return { authKey, time };
  }

  static verifyKey(authKey: string, requestingIpAddr: string): boolean {
    if (this.authKeysMap.has(authKey)) {
      const meta = this.authKeysMap.get(authKey);
      if (meta) {
        const [ipAddress, time] = meta;

        if (requestingIpAddr === ipAddress && time && Date.now() - time < AUTH_KEY_EXPIRATION_TIME) {
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

setInterval(() => {
  console.log("Clearing expired auth keys...");
  AuthKeyManager.authKeysMap.forEach((meta, key) => {
    if (Date.now() - meta[1] > AUTH_KEY_EXPIRATION_TIME) {
      AuthKeyManager.authKeysMap.delete(key);
    }
  });
}, AUTH_KEY_EXPIRATION_TIME);
