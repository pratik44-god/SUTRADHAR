import {z} from "zod";

export const CreateShareLinkInput = z.object({
    projectsId: z.string().uuid().describe("Id of the Project"),
    creatorsId: z.string().uuid().describe("Id of the Creator"),
});

export type CreateShareLinkInputType = z.infer<typeof CreateShareLinkInput>;


export const EnableSharingInput = z.object({
    projectsId: z.string().uuid().describe("Id of the Project"),
})

export type EnableSharingInputType = z.infer<typeof EnableSharingInput>;


export const DisableSharingInput = z.object({
    projectId: z.string().uuid().describe("Id of the Project"),
})

export type DisableSharingInputType = z.infer<typeof DisableSharingInput>;

export const SharedProjectInput = z.object({
    token: z.string().describe("Token of the Project"),
})

export type SharedProjectInputType = z.infer<typeof SharedProjectInput>;
