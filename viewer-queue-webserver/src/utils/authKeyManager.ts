import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const AUTH_KEY_LENGTH = 48;
const AUTH_KEY_EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours;
const NO_EXPIRY_KEY = process.env.PERMA_AUTH_KEY;
export default class AuthKeyManager {
  static authKeysMap: Map<string, [string, number]> = new Map<string, [string, number]>();

  static genAuthKey(ipAddress: string): { authKey: string; time: number } {
    const authKey = crypto.randomBytes(AUTH_KEY_LENGTH).toString("hex");
    const time = Date.now();
    this.authKeysMap.set(authKey, [ipAddress, time]);
    // console.log(`Generated auth key ${authKey} for ${ipAddress}`);
    return { authKey, time };
  }

  static verifyKey(authKey: string, requestingIpAddr: string): { valid: boolean; expiryTimeMs: number } {
    console.log(`Verify key for ${requestingIpAddr}`);
    if (this.authKeysMap.has(authKey)) {
      console.log(`Found auth key ${authKey}`);
      const meta = this.authKeysMap.get(authKey);
      if (meta) {
        const [ipAddress, time] = meta;
        console.log(`ipAddress: ${ipAddress}, time: ${time}`);
        console.log(`requestingIpAddr: ${requestingIpAddr}`);

        if (requestingIpAddr === ipAddress && time && Date.now() - time < AUTH_KEY_EXPIRATION_TIME) {
          console.log(`Auth key is valid`);
          return { valid: true, expiryTimeMs: AUTH_KEY_EXPIRATION_TIME - (Date.now() - time) };
        } else {
          console.log(`Auth key is invalid (expired)`);
          this.authKeysMap.delete(authKey);
          return { valid: false, expiryTimeMs: -1 };
        }
      }
    } else if (authKey === NO_EXPIRY_KEY) {
      console.log(`Auth key is valid`);
      return { valid: true, expiryTimeMs: -1 };
    }
    console.log(`Auth key is invalid (not found)`);
    return { valid: false, expiryTimeMs: -1 };
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
}, 1000 * 60 * 60 * 2);
