
import { z } from "../../schema";

import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { projectService } from "../../services";

import {
    createProjectInputModel,
    createProjectOutputModel,
    deleteProjectInputModel,
    deleteProjectOutputModel,
    getProjectByIdInputModel,
    getProjectByIdOutputModel,
    getProjectsByCreatorIdOutputModel,
    updateProjectInputModel,
    updateProjectOutputModel,
    updateProjectStatusInputModel,
    updateProjectStatusOutputModel,
} from "./model";

const TAGS = ["Projects"];

const getPath = generatePath("/projects");

export const projectRouter = router({
    createProject: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/createProject"),
                tags: TAGS,
            },
        })
        .input(createProjectInputModel)
        .output(createProjectOutputModel)
        .mutation(async ({ ctx, input }) => {
            const { title, description } = input;

            const project = await projectService.createProject({
                creatorsId: ctx.user.id,
                title,
                description,
            });

            return {
                id: project.id,
            };
        }),

    getProjects: authenticatedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: getPath("/getProjects"),
                tags: TAGS,
            },
        })
        .output(getProjectsByCreatorIdOutputModel)
        .query(async ({ ctx }) => {
            const projects = await projectService.getProjectsByCreatorId({
                creatorsId: ctx.user.id,
            });

            return projects;
        }),

    getProjectById: authenticatedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: getPath("/getProjectById"),
                tags: TAGS,
            },
        })
        .input(getProjectByIdInputModel)
        .output(getProjectByIdOutputModel)
        .query(async ({ input }) => {

            const project = await projectService.getProjectById({
                id: input.id,
            });

            return project;
        }),

    updateProject: authenticatedProcedure
        .meta({
            openapi: {
                method: "PATCH",
                path: getPath("/updateProject"),
                tags: TAGS,
            },
        })
        .input(updateProjectInputModel)
        .output(updateProjectOutputModel)
        .mutation(async ({ input }) => {
            const {id, title, description, canvasData} = input;
            const project = await projectService.updateProject({
                id,
                title,
                description,
                 canvasData,
            });

            return {
                id: project.id,
            };
        }),

    updateProjectStatus: authenticatedProcedure
        .meta({
            openapi: {
                method: "PATCH",
                path: getPath("/updateProjectStatus"),
                tags: TAGS,
            },
        })
        .input(updateProjectStatusInputModel)
        .output(updateProjectStatusOutputModel)
        .mutation(async ({ input }) => {
            const project = await projectService.updateProjectStatus(input);

            return {
                id: project.id,
                status: project.status,
            };
        }),

    deleteProject: authenticatedProcedure
        .meta({
            openapi: {
                method: "DELETE",
                path: getPath("/deleteProject"),
                tags: TAGS,
            },
        })
        .input(deleteProjectInputModel)
        .output(deleteProjectOutputModel)
        .mutation(async ({ input }) => {
            const project = await projectService.deleteProject(input);

            return {
                id: project.id,
            };
        }),
});

