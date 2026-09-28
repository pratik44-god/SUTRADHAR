import {
  authenticatedProcedure,
  router,
} from "../../trpc";

import { generatePath } from "../../utils/path-generator";

import {
  teamProjectsService,
} from "../../services";

import {
  createTeamProjectInputModel,
  createTeamProjectOutputModel,

  getTeamProjectsByTeamIdInputModel,
  getTeamProjectsByTeamIdOutputModel,

  getTeamProjectByProjectIdInputModel,
  getTeamProjectByProjectIdOutputModel,

  updateTeamProjectInputModel,
  updateTeamProjectOutputModel,

  deleteTeamProjectInputModel,
  deleteTeamProjectOutputModel,
} from "./model";

const TAGS = ["Team Projects"];

const getPath =
  generatePath("/teamProject");

export const teamProjectsRouter = router({

  createTeamProject: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createTeamProject"),
        tags: TAGS,
      },
    })
    .input(createTeamProjectInputModel)
    .output(createTeamProjectOutputModel)
    .mutation(async ({ ctx, input }) => {
      const teamProject =
        await teamProjectsService.createTeamProject({
          teamId: input.teamId,
          creatorsId: ctx.user.id,
          title: input.title,
          description: input.description,
        });

      return {
        id: teamProject.id,
        projectId: teamProject.projectId,
        teamId: teamProject.teamId,
      };
    }),

  getTeamProjectsByTeamId:
    authenticatedProcedure
      .meta({
        openapi: {
          method: "GET",
          path: getPath(
            "/getTeamProjectsByTeamId",
          ),
          tags: TAGS,
        },
      })
      .input(
        getTeamProjectsByTeamIdInputModel,
      )
      .output(
        getTeamProjectsByTeamIdOutputModel,
      )
      .query(async ({ input }) => {
        return await teamProjectsService
          .getTeamProjectsByTeamId({
            teamId: input.teamId,
          });
      }),

  getTeamProjectByProjectId:
    authenticatedProcedure
      .meta({
        openapi: {
          method: "GET",
          path: getPath(
            "/getTeamProjectByProjectId",
          ),
          tags: TAGS,
        },
      })
      .input(
        getTeamProjectByProjectIdInputModel,
      )
      .output(
        getTeamProjectByProjectIdOutputModel,
      )
      .query(async ({ input }) => {
        return await teamProjectsService
          .getTeamProjectByProjectId({
            projectId: input.projectId,
          });
      }),

  updateTeamProject:
    authenticatedProcedure
      .meta({
        openapi: {
          method: "PATCH",
          path: getPath(
            "/updateTeamProject",
          ),
          tags: TAGS,
        },
      })
      .input(
        updateTeamProjectInputModel,
      )
      .output(
        updateTeamProjectOutputModel,
      )
      .mutation(async ({ input }) => {
        const teamProject =
          await teamProjectsService
            .updateTeamProject(input);

        return {
          id: teamProject.id,
        };
      }),

  deleteTeamProject:
    authenticatedProcedure
      .meta({
        openapi: {
          method: "DELETE",
          path: getPath(
            "/deleteTeamProject",
          ),
          tags: TAGS,
        },
      })
      .input(
        deleteTeamProjectInputModel,
      )
      .output(
        deleteTeamProjectOutputModel,
      )
      .mutation(async ({ input }) => {
        const teamProject =
          await teamProjectsService
            .deleteTeamProject(input);

        return {
          id: teamProject.id,
          projectId: teamProject.projectId,
          teamId: teamProject.teamId,
        };
      }),
});