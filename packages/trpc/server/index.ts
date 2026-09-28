import { router } from "./trpc";

import { authRouter } from "./routes/auth/route";
import { projectRouter } from "./routes/project/route";
import { shareLinkRouter } from "./routes/shareLink/route";
import { teamMemberRouter } from "./routes/teamMembers/route";
import {teamRouter} from "./routes/team/route";
import { teamProjectsRouter } from "./routes/teamProjects/route";

export const serverRouter = router({
  auth: authRouter,
  project: projectRouter,
  shareLink: shareLinkRouter,
  teamMembers: teamMemberRouter,
  team: teamRouter,
  teamProjects: teamProjectsRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
