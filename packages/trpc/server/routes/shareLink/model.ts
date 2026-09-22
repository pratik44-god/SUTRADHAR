import {z} from "zod";

export const CreateShareLinkInputModel = z.object({
    projecstId: z.string().uuid().describe("Id of the Project"),
});

export const CreateShareLinkOutputModel = z.object({
    id: z.string().uuid().describe("UUID of the Share Link"),
    shareToken: z.string().describe("Share Token of the Share Link"),
});