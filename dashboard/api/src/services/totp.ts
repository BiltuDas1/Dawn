import { verify } from "otplib";
import base32 from "hi-base32";

export class TOTP {
  #secret: string;

  constructor(secretkey: string) {
    this.#secret = base32.encode(secretkey);
  }

  async verifyOTP(otp: string) {
    return (await verify({ secret: this.#secret, token: otp })).valid;
  }
}
