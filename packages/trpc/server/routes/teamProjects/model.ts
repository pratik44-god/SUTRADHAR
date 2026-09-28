import { z } from "zod";

/* CREATE TEAM PROJECT */

export const createTeamProjectInputModel = z.object({
  teamId: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
});

export const createTeamProjectOutputModel = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  teamId: z.string().uuid(),
});

export type CreateTeamProjectInputModelType = z.infer<
  typeof createTeamProjectInputModel
>;

export type CreateTeamProjectOutputModelType = z.infer<
  typeof createTeamProjectOutputModel
>;


/* GET TEAM PROJECTS BY TEAM ID */

export const getTeamProjectsByTeamIdInputModel = z.object({
  teamId: z.string().uuid(),
});

export const teamProjectOutputModel = z.object({
  id: z.string().uuid(),
  teamId: z.string().uuid(),
  projectId: z.string().uuid(),
  creatorsId: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  canvasData: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getTeamProjectsByTeamIdOutputModel = z.array(
  teamProjectOutputModel,
);

export type GetTeamProjectsByTeamIdInputModelType = z.infer<
  typeof getTeamProjectsByTeamIdInputModel
>;

export type TeamProjectOutputModelType = z.infer<
  typeof teamProjectOutputModel
>;


/* GET TEAM PROJECT BY PROJECT ID */

export const getTeamProjectByProjectIdInputModel = z.object({
  projectId: z.string().uuid(),
});

export const getTeamProjectByProjectIdOutputModel = teamProjectOutputModel;

export type GetTeamProjectByProjectIdInputModelType = z.infer<
  typeof getTeamProjectByProjectIdInputModel
>;

export type GetTeamProjectByProjectIdOutputModelType = z.infer<
  typeof getTeamProjectByProjectIdOutputModel
>;


/* UPDATE TEAM PROJECT */

export const updateTeamProjectInputModel = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(300).optional(),
  canvasData: z.string().optional(),
});

export const updateTeamProjectOutputModel = z.object({
  id: z.string().uuid(),
});

export type UpdateTeamProjectInputModelType = z.infer<
  typeof updateTeamProjectInputModel
>;

export type UpdateTeamProjectOutputModelType = z.infer<
  typeof updateTeamProjectOutputModel
>;


/* DELETE TEAM PROJECT */

export const deleteTeamProjectInputModel = z.object({
  projectId: z.string().uuid(),
});

export const deleteTeamProjectOutputModel = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  teamId: z.string().uuid(),
});

export type DeleteTeamProjectInputModelType = z.infer<
  typeof deleteTeamProjectInputModel
>;

export type DeleteTeamProjectOutputModelType = z.infer<
  typeof deleteTeamProjectOutputModel
>;