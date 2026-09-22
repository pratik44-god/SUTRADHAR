import cookieParser from "cookie-parser";

import { setAuthenticationCookie } from "@repo/trpc/server/utils/cookie";

import { userService } from "@repo/trpc/server/services";

import express from "express";
import { logger } from "@repo/logger";
import cors from "cors";


import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";

import { serverRouter, createContext } from "@repo/trpc/server";

import { env } from "./env";
import { createContextFromExpress } from "@repo/trpc/server/context";

const WEB_APP_URL = process.env.WEB_APP_URL ?? "http://localhost:3000";

export const app = express();

const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "Streamyst OpenAPI",
  version: "1.0.0",
  baseUrl: env.BASE_URL.concat("/api"),
});

if (env.NODE_ENV !== "prod") {
  app.use(
    cors({
      origin: WEB_APP_URL,
      credentials: true
    }),
  );
}

app.use(express.json({limit : "10mb"}));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ message: "Streamyst is up and running..." });
});

app.get("/health", (req, res) => {
  return res.json({ message: "Streamyst server is healthy", healthy: true });
});

logger.debug(`openapi.json: ${env.BASE_URL}/openapi.json`);
app.get("/openapi.json", (req, res) => {
  return res.json(openApiDocument);
});

logger.debug(`docs: ${env.BASE_URL}/docs`);
app.use("/docs", apiReference({ url: "/openapi.json" }));

app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

app.get("/authentication/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    if (typeof code !== "string" || code.length === 0) {
      return res.redirect(`${WEB_APP_URL}/login?error=missing_code`);
    }

    const { token } = await userService.handleGoogleOAuthCallback(code);

    const ctx = createContextFromExpress(req, res);
    setAuthenticationCookie(ctx, token);

    return res.redirect(`${WEB_APP_URL}/dashboard`);
  } catch (error) {
    logger.error("Google OAuth callback failed", error);

    return res.redirect(`${WEB_APP_URL}/login?error=auth_failed`);
  }
});



app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

export default app;
