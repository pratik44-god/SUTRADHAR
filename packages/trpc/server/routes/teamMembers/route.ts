import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { teamMembersService } from "../../services";

import {
    addTeamMemberInputModel,
    addTeamMemberOutputModel,
    getTeamMembersInputModel,
    getTeamMembersOutputModel,
    removeTeamMemberInputModel,
    removeTeamMemberOutputModel,
    updateTeamMemberRoleInputModel,
    updateTeamMemberRoleOutputModel,
} from "./model";

const TAGS = ["Team Members"];

const getPath = generatePath("/teamMembers");

export const teamMemberRouter = router({
    addMember: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/addMember"),
                tags: TAGS,
            },
        })
        .input(addTeamMemberInputModel)
        .output(addTeamMemberOutputModel)
        .mutation(async ({ input }) => {
            const { teamId, userId, role } = input;

            const member = await teamMembersService.addMember({
                teamId,
                userId,
                role,
            });

            return {
                id: member.id,
            };
        }),

    getMembers: authenticatedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: getPath("/getMembers"),
                tags: TAGS,
            },
        })
        .input(getTeamMembersInputModel)
        .output(getTeamMembersOutputModel)
        .query(async ({ input }) => {
            const members = await teamMembersService.getMembers({
                teamId: input.teamId,
            });

            return members;
        }),

    removeMember: authenticatedProcedure
        .meta({
            openapi: {
                method: "DELETE",
                path: getPath("/removeMember"),
                tags: TAGS,
            },
        })
        .input(removeTeamMemberInputModel)
        .output(removeTeamMemberOutputModel)
        .mutation(async ({ input }) => {
            const member = await teamMembersService.removeMember(input);

            return {
                id: member.id,
            };
        }),

    updateMemberRole: authenticatedProcedure
        .meta({
            openapi: {
                method: "PATCH",
                path: getPath("/updateMemberRole"),
                tags: TAGS,
            },
        })
        .input(updateTeamMemberRoleInputModel)
        .output(updateTeamMemberRoleOutputModel)
        .mutation(async ({ input }) => {
            const member = await teamMembersService.updateMemberRole(input);

            return {
                id: member.id,
                role: member.role,
            };
        }),
});