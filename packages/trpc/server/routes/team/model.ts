import { z } from "zod";

export const createTeamInputModel = z.object({

  name: z

    .string()

    .min(1)

    .max(100)

    .describe("Name of the Team"),

  description: z

    .string()

    .max(300)

    .optional()


    .describe("Optional description of the Team"),

});

export const createTeamOutputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

});

export const getTeamByIdInputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

});

export const getTeamByIdOutputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

  name: z.string().describe("Name of the Team"),

  description: z

    .string()

    .nullable()

    .describe("Description of the Team"),

  createdBy: z

    .string()

    .uuid()

    .describe("UUID of the Team Creator"),

  createdAt: z.date().describe("Creation date of the Team"),

  updatedAt: z.date().describe("Last updated date of the Team"),

});

export const updateTeamInputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

  name: z

    .string()

    .min(1)

    .max(100)

    .optional()

    .describe("Updated name of the Team"),

  description: z

    .string()

    .max(300)

    .optional()


    .describe("Updated description of the Team"),

});

export const updateTeamOutputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

});

export const deleteTeamInputModel = z.object({

  id: z.string().uuid().describe("UUID of the Team"),

});

export const deleteTeamOutputModel = z.object({

  id: z.string().uuid().describe("UUID of the deleted Team"),

});