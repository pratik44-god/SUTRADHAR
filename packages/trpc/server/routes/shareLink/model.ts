import {z} from "zod";

export const CreateShareLinkInputModel = z.object({
    projectsId: z.string().uuid().describe("Id of the Project"),
});

export const CreateShareLinkOutputModel = z.object({
    id: z.string().uuid().describe("UUID of the Share Link"),
    shareToken: z.string().describe("Share Token of the Share Link"),
});

export const EnableSharingInputModel = z.object({
    projectsId: z.string().uuid().describe("Id of the Project"),
});


export const DisableSharingInputModel = z.object({
    projectsId: z.string().uuid().describe("Id of the Project"),
});

export const SharedProjectInputModel = z.object({
    token: z.string().describe("Token of the Project"),
});

export const SharedProjectOutputModel = z.object({
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
})


export const EnableSharingOutputModel = z.object({
  success: z.boolean(),
});

export const DisableSharingOutputModel = z.object({
  success: z.boolean(),
});