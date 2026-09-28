import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { teamService } from "../../services";

import {
    createTeamInputModel,
    createTeamOutputModel,
    getTeamByIdInputModel,
    getTeamByIdOutputModel,
    updateTeamInputModel,
    updateTeamOutputModel,
    deleteTeamInputModel,
    deleteTeamOutputModel,
} from "./model";

const TAGS = ["Teams"];

const getPath = generatePath("/teams");

export const teamRouter = router({
    createTeam: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/createTeam"),
                tags: TAGS,
            },
        })
        .input(createTeamInputModel)
        .output(createTeamOutputModel)
        .mutation(async ({ ctx, input }) => {
            const { name, description } = input;

            const team = await teamService.createTeam({
                name,
                description,
                createdBy: ctx.user.id,
            });

            return {
                id: team.id,
            };
        }),

    getTeamById: authenticatedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: getPath("/getTeamById"),
                tags: TAGS,
            },
        })
        .input(getTeamByIdInputModel)
        .output(getTeamByIdOutputModel)
        .query(async ({ input }) => {

            const {id} = input;
            const team = await teamService.getTeamById({
                id,
            });

            return team;
        }),

    updateTeam: authenticatedProcedure
        .meta({
            openapi: {
                method: "PATCH",
                path: getPath("/updateTeam"),
                tags: TAGS,
            },
        })
        .input(updateTeamInputModel)
        .output(updateTeamOutputModel)
        .mutation(async ({ input }) => {
            const { id, name, description } = input;

            const team = await teamService.updateTeam({
                id,
                name,
                description,
            });

            return {
                id: team.id,
            };
        }),

    deleteTeam: authenticatedProcedure
        .meta({
            openapi: {
                method: "DELETE",
                path: getPath("/deleteTeam"),
                tags: TAGS,
            },
        })
        .input(deleteTeamInputModel)
        .output(deleteTeamOutputModel)
        .mutation(async ({ input }) => {
            const team = await teamService.deleteTeam(input);

            return {
                id: team.id,
            };
        }),
});