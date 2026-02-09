import { Hono } from "hono";
import type { Bindings } from "./types/bindings";
import type { Job } from "./types/job";
import { TOTP } from "./services/totp";

const app = new Hono<{ Bindings: Bindings }>();

const routes = app.get("/api/jobs", async (context) => {
  const otp = context.req.header("X-OTP");
  if (otp == undefined) {
    return context.json(
      {
        result: false,
        message: "no X-OTP header provided",
      },
      401,
    );
  }

  const OTP = new TOTP(context.env.TOTP_SECRET);
  const isValid = await OTP.verifyOTP(otp);
  if (!isValid) {
    return context.json(
      {
        result: false,
        message: "invalid otp",
      },
      401,
    );
  }

  try {
    const { results } = await context.env.SCRAPPER_DB.prepare(
      "SELECT * FROM jobs_list ORDER BY added_at DESC LIMIT 50;",
    ).all<Job>();

    return context.json(
      {
        result: true,
        message: "data fetched successfully",
        data: results,
        secret: context.env.TOTP_SECRET,
      },
      200,
    );
  } catch (err) {
    console.log(err);
    return context.json(
      {
        result: false,
        message: "internal server error",
      },
      500,
    );
  }
});

export default app;
export type AppType = typeof routes;
