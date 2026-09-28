import { z } from "zod";

export const addTeamMemberInput = z.object({
    teamId: z.string().uuid().describe("Id of the Team"),
    userId: z.string().uuid().describe("Id of the User"),
    role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional().describe("Role of the Team Member"),
});

export type AddTeamMemberInputType = z.infer<typeof addTeamMemberInput>;


export const getTeamMembersInput = z.object({
    teamId: z.string().uuid().describe("Id of the Team"),
});

export type GetTeamMembersInputType = z.infer<typeof getTeamMembersInput>;


export const removeTeamMemberInput = z.object({
    teamId: z.string().uuid().describe("Id of the Team"),
    userId: z.string().uuid().describe("Id of the User"),
});

export type RemoveTeamMemberInputType = z.infer<typeof removeTeamMemberInput>;


export const updateTeamMemberRoleInput = z.object({
    teamId: z.string().uuid().describe("Id of the Team"),
    userId: z.string().uuid().describe("Id of the User"),
    role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).describe("Role of the Team Member"),
});

export type UpdateTeamMemberRoleInputType = z.infer<typeof updateTeamMemberRoleInput>;