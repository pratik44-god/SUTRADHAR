import {
  authenticatedProcedure,
  publicProcedure,
  router,
} from "../../trpc";

import { generatePath } from "../../utils/path-generator";

import { shareLinkService } from "../../services";

import {
  CreateShareLinkInputModel,
  CreateShareLinkOutputModel,
  DisableSharingInputModel,
  DisableSharingOutputModel,
  EnableSharingInputModel,
  EnableSharingOutputModel,
  SharedProjectInputModel,
  SharedProjectOutputModel,
} from "./model";

const TAGS = ["ShareLink"];

const getPath = generatePath("/shareLink");

export const shareLinkRouter = router({
  createShareLink: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createShareLink"),
        tags: TAGS,
      },
    })
    .input(CreateShareLinkInputModel)
    .output(CreateShareLinkOutputModel)
    .mutation(async ({ ctx, input }) => {
      const { projectsId } = input;

      const shareLink =
        await shareLinkService.createShareLink({
          projectsId,
          creatorsId: ctx.user.id,
        });

      return {
        id: shareLink.id,
        shareToken: shareLink.shareToken,
      };
    }),

  enableSharing: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/enableSharing"),
        tags: TAGS,
      },
    })
    .input(EnableSharingInputModel)
    .output(EnableSharingOutputModel)
    .mutation(async ({ input }) => {
      const { projectsId } = input;

      await shareLinkService.enableSharing({
        projectsId,
      });

      return {
        success: true,
      };
    }),

  disableSharing: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/disableSharing"),
        tags: TAGS,
      },
    })
    .input(DisableSharingInputModel)
    .output(DisableSharingOutputModel)
    .mutation(async ({ input }) => {
      const { projectsId } = input;

      await shareLinkService.disableSharing({
        projectId: projectsId,
      });

      return {
        success: true,
      };
    }),

  getSharedProject: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/sharedProject"),
        tags: TAGS,
      },
    })
    .input(SharedProjectInputModel)
    .output(SharedProjectOutputModel)
    .query(async ({ input }) => {
      const { token } = input;

      const sharedProject =
        await shareLinkService.getSharedProject({
          token,
        });

      const {
        id,
        creatorsId,
        title,
        description,
        canvasData,
        status,
        createdAt,
        updatedAt,
      } = sharedProject.projectInfo;

      return {
        id,
        creatorsId,
        title,
        description,
        canvasData,
        status,
        createdAt,
        updatedAt,
      };
    }),
});