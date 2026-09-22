
import { z } from "zod";

export const createProjectInput = z.object({
  creatorsId: z.string().uuid().describe("UUID of the Project Creator"),
  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Title of the Project"),
  description: z
    .string()
    .max(300)
    .nullish()
    .describe("Optional description of the Project"),
    
});

export type CreateProjectInputType = z.infer<typeof createProjectInput>;

export const getProjectByIdInput = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export type GetProjectByIdInputType = z.infer<typeof getProjectByIdInput>;

export const getProjectsByCreatorIdInput = z.object({
  creatorsId: z
    .string()
    .uuid()
    .describe("UUID of the Project Creator"),
});

export type GetProjectsByCreatorIdInputType = z.infer<
  typeof getProjectsByCreatorIdInput
>;

export const updateProjectInput = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
  title: z
    .string()
    .min(1)
    .max(100)
    .optional()
    .describe("Updated title of the Project"),
  description: z
    .string()
    .max(300)
    .nullish()
    .optional()
    .describe("Updated description of the Project"),
     canvasData : z.string().optional(),
});

export type UpdateProjectInputType = z.infer<typeof updateProjectInput>;

export const updateProjectStatusInput = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .describe("Status of the Project"),
  
});

export type UpdateProjectStatusInputType = z.infer<
  typeof updateProjectStatusInput
>;

export const deleteProjectInput = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export type DeleteProjectInputType = z.infer<typeof deleteProjectInput>;

