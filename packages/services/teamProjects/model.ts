import { z } from "zod";

/*
 * CREATE PROJECT
 */

export const createProjectInput = z.object({
  creatorsId: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
  teamId: z.string().uuid().describe("Id of the team")
});

export type CreateProjectInputType = z.infer<
  typeof createProjectInput
>;


/*
 * CREATE TEAM PROJECT
 */

export const createTeamProjectInput = z.object({
  teamId: z.string().uuid(),
  creatorsId: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
});

export type CreateTeamProjectInputType = z.infer<
  typeof createTeamProjectInput
>;


/*
 * GET PROJECT BY ID
 */

export const getProjectByIdInput = z.object({
  id: z.string().uuid(),
});

export type GetProjectByIdInputType = z.infer<
  typeof getProjectByIdInput
>;


/*
 * GET PROJECTS BY CREATOR
 *
 * Used for PERSONAL PROJECTS.
 */

export const getProjectsByCreatorIdInput =
  z.object({
    creatorsId: z.string().uuid(),
  });

export type GetProjectsByCreatorIdInputType =
  z.infer<
    typeof getProjectsByCreatorIdInput
  >;


/*
 * GET TEAM PROJECT BY PROJECT ID
 */

export const getTeamProjectByProjectIdInput =
  z.object({
    projectId: z.string().uuid(),
  });

export type GetTeamProjectByProjectIdInputType =
  z.infer<
    typeof getTeamProjectByProjectIdInput
  >;


/*
 * GET ALL TEAM PROJECTS BY TEAM ID
 */

export const getTeamProjectsByTeamIdInput =
  z.object({
    teamId: z.string().uuid(),
  });

export type GetTeamProjectsByTeamIdInputType =
  z.infer<
    typeof getTeamProjectsByTeamIdInput
  >;


/*
 * UPDATE PROJECT
 */

export const updateProjectInput = z.object({
  id: z.string().uuid(),

  title: z
    .string()
    .min(1)
    .max(100)
    .optional(),

  description: z
    .string()
    .max(300)
    .optional(),

  canvasData: z
    .string()
    .optional(),
});

export type UpdateProjectInputType = z.infer<
  typeof updateProjectInput
>;


/*
 * UPDATE TEAM PROJECT
 *
 * The actual project is stored inside
 * projectsTable, so we update it using
 * projectId.
 */

export const updateTeamProjectInput =
  z.object({
    projectId: z.string().uuid(),

    title: z
      .string()
      .min(1)
      .max(100)
      .optional(),

    description: z
      .string()
      .max(300)
      .optional(),

    canvasData: z
      .string()
      .optional(),
  });

export type UpdateTeamProjectInputType =
  z.infer<
    typeof updateTeamProjectInput
  >;


/*
 * UPDATE PROJECT STATUS
 */

export const updateProjectStatusInput =
  z.object({
    id: z.string().uuid(),

    status: z.enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ]),
  });

export type UpdateProjectStatusInputType =
  z.infer<
    typeof updateProjectStatusInput
  >;


/*
 * DELETE PROJECT
 */

export const deleteProjectInput = z.object({
  id: z.string().uuid(),
});

export type DeleteProjectInputType =
  z.infer<
    typeof deleteProjectInput
  >;


/*
 * DELETE TEAM PROJECT
 *
 * projectId is used because the workspace
 * route uses the actual project ID.
 */

export const deleteTeamProjectInput =
  z.object({
    projectId: z.string().uuid(),
  });

export type DeleteTeamProjectInputType =
  z.infer<
    typeof deleteTeamProjectInput
  >;