
import { z } from "zod";

export const createProjectInputModel = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe("Title of the Project"),

  description: z
    .string()
    .max(300)
    .optional()
    .nullable()
    .describe("Optional description of the Project"),
});

export const createProjectOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export const getProjectByIdInputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export const getProjectByIdOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
  creatorsId: z.string().uuid().describe("UUID of the Project Creator"),
  title: z.string().describe("Title of the Project"),
  description: z
    .string()
    .nullable()
    .describe("Description of the Project"),
      canvasData: z
    .string()
    .nullable()
    .optional()
    .describe("Serialized canvas data of the Project"),
  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .describe("Status of the Project"),
  createdAt: z.date().describe("Creation date of the Project"),
  updatedAt: z.date().describe("Last updated date of the Project"),
});

export const getProjectsByCreatorIdOutputModel = z.array(
  getProjectByIdOutputModel,
);

export const updateProjectInputModel = z.object({
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
    .optional()
    .nullable()
    .describe("Updated description of the Project"),
     canvasData : z.string().optional(),
});

export const updateProjectOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export const updateProjectStatusInputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),

  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .describe("New status of the Project"),
});

export const updateProjectStatusOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),

  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
    .describe("Status of the Project"),
});

export const deleteProjectInputModel = z.object({
  id: z.string().uuid().describe("UUID of the Project"),
});

export const deleteProjectOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the deleted Project"),
});
