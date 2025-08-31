import { registerAs } from "@nestjs/config";

export default registerAs("googleOauth", () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  secretKey: process.env.GOOGLE_SECRET_KEY,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL
}))