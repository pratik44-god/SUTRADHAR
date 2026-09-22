import {z} from "zod";

export const CreateShareLinkInput = z.object({
    projecstId: z.string().uuid().describe("Id of the Project"),
    creatorsId: z.string().uuid().describe("Id of the Creator"),
});

export type CreateShareLinkInputType = z.infer<typeof CreateShareLinkInput>;
