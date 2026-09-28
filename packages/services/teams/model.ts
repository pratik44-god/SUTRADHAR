import { z } from "zod";

export const createTeamInput = z.object({
    name: z.string().min(1).max(100).describe("Name of the Team"),
    description: z.string().max(300).optional().describe("Description of the Team"),
    createdBy: z.string().uuid().describe("Id of the Creator"),
});

export type CreateTeamInputType = z.infer<typeof createTeamInput>;


export const getTeamByIdInput = z.object({
    id: z.string().uuid().describe("Id of the Team"),
});

export type GetTeamByIdInputType = z.infer<typeof getTeamByIdInput>;


export const updateTeamInput = z.object({
    id: z.string().uuid().describe("Id of the Team"),
    name: z.string().min(1).max(100).optional().describe("Name of the Team"),
    description: z.string().max(300).optional().describe("Description of the Team"),
});

export type UpdateTeamInputType = z.infer<typeof updateTeamInput>;


export const deleteTeamInput = z.object({
    id: z.string().uuid().describe("Id of the Team"),
});

export type DeleteTeamInputType = z.infer<typeof deleteTeamInput>;