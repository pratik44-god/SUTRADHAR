import { router } from "./trpc";

import { authRouter } from "./routes/auth/route";
import { projectRouter } from "./routes/project/route";
import { shareLinkRouter } from "./routes/shareLink/route";
export const serverRouter = router({
  auth: authRouter,
  project: projectRouter,
  shareLink: shareLinkRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
