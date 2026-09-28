import { db, eq } from "@repo/database";
import {
  projectsTable,
  teamProjectsTable,
} from "@repo/database/schema";

import {
  createTeamProjectInput,
  CreateTeamProjectInputType,
  getTeamProjectsByTeamIdInput,
  GetTeamProjectsByTeamIdInputType,
  getTeamProjectByProjectIdInput,
  GetTeamProjectByProjectIdInputType,
  updateTeamProjectInput,
  UpdateTeamProjectInputType,
  deleteTeamProjectInput,
  DeleteTeamProjectInputType,
} from "./model";

class TeamProjectsService {
  public async createTeamProject(
    payload: CreateTeamProjectInputType,
  ) {
    const {
      teamId,
      creatorsId,
      title,
      description,
    } = await createTeamProjectInput.parseAsync(payload);

    return await db.transaction(async (tx) => {
      const projectInsertResult = await tx
        .insert(projectsTable)
        .values({
          creatorsId,
          title,
          description,
        })
        .returning({
          id: projectsTable.id,
        });

      if (
        !projectInsertResult ||
        projectInsertResult.length === 0 ||
        !projectInsertResult[0]?.id
      ) {
        throw new Error(
          "Something went wrong while creating the project",
        );
      }

      const projectId = projectInsertResult[0].id;

      const teamProjectInsertResult = await tx
        .insert(teamProjectsTable)
        .values({
          teamId,
          projectId,
        })
        .returning({
          id: teamProjectsTable.id,
          teamId: teamProjectsTable.teamId,
          projectId: teamProjectsTable.projectId,
        });

      if (
        !teamProjectInsertResult ||
        teamProjectInsertResult.length === 0 ||
        !teamProjectInsertResult[0]?.id
      ) {
        throw new Error(
          "Something went wrong while creating the team project",
        );
      }

      return {
        id: teamProjectInsertResult[0].id,
        projectId: teamProjectInsertResult[0].projectId,
        teamId: teamProjectInsertResult[0].teamId,
      };
    });
  }

  public async getTeamProjectsByTeamId(
    payload: GetTeamProjectsByTeamIdInputType,
  ) {
    const { teamId } =
      await getTeamProjectsByTeamIdInput.parseAsync(payload);

    const teamProjects = await db
      .select({
        id: teamProjectsTable.id,
        teamId: teamProjectsTable.teamId,
        projectId: teamProjectsTable.projectId,

        creatorsId: projectsTable.creatorsId,
        title: projectsTable.title,
        description: projectsTable.description,
        canvasData: projectsTable.canvasData,

        createdAt: projectsTable.createdAt,
        updatedAt: projectsTable.updatedAt,
      })
      .from(teamProjectsTable)
      .innerJoin(
        projectsTable,
        eq(
          teamProjectsTable.projectId,
          projectsTable.id,
        ),
      )
      .where(eq(teamProjectsTable.teamId, teamId));

    return teamProjects;
  }

  public async getTeamProjectByProjectId(
    payload: GetTeamProjectByProjectIdInputType,
  ) {
    const { projectId } =
      await getTeamProjectByProjectIdInput.parseAsync(payload);

    const teamProject = await db
      .select({
        id: teamProjectsTable.id,
        teamId: teamProjectsTable.teamId,
        projectId: teamProjectsTable.projectId,

        creatorsId: projectsTable.creatorsId,
        title: projectsTable.title,
        description: projectsTable.description,
        canvasData: projectsTable.canvasData,

        createdAt: projectsTable.createdAt,
        updatedAt: projectsTable.updatedAt,
      })
      .from(teamProjectsTable)
      .innerJoin(
        projectsTable,
        eq(
          teamProjectsTable.projectId,
          projectsTable.id,
        ),
      )
      .where(eq(teamProjectsTable.projectId, projectId));

    if (
      !teamProject ||
      teamProject.length === 0 ||
      !teamProject[0]
    ) {
      throw new Error(
        `Team project with project ID: ${projectId} does not exist`,
      );
    }

    return teamProject[0];
  }

  public async updateTeamProject(
    payload: UpdateTeamProjectInputType,
  ) {
    const {
      projectId,
      title,
      description,
      canvasData,
    } = await updateTeamProjectInput.parseAsync(payload);

    const projectUpdateResult = await db
      .update(projectsTable)
      .set({
        ...(title !== undefined && {
          title,
        }),

        ...(description !== undefined && {
          description,
        }),

        ...(canvasData !== undefined && {
          canvasData,
        }),

        updatedAt: new Date(),
      })
      .where(eq(projectsTable.id, projectId))
      .returning({
        id: projectsTable.id,
      });

    if (
      !projectUpdateResult ||
      projectUpdateResult.length === 0 ||
      !projectUpdateResult[0]?.id
    ) {
      throw new Error(
        `Project with ID: ${projectId} does not exist`,
      );
    }

    return projectUpdateResult[0];
  }

  public async deleteTeamProject(
    payload: DeleteTeamProjectInputType,
  ) {
    const { projectId } =
      await deleteTeamProjectInput.parseAsync(payload);

    return await db.transaction(async (tx) => {
      const teamProjectDeleteResult = await tx
        .delete(teamProjectsTable)
        .where(
          eq(
            teamProjectsTable.projectId,
            projectId,
          ),
        )
        .returning({
          id: teamProjectsTable.id,
          projectId: teamProjectsTable.projectId,
          teamId: teamProjectsTable.teamId,
        });

      if (
        !teamProjectDeleteResult ||
        teamProjectDeleteResult.length === 0 ||
        !teamProjectDeleteResult[0]?.id
      ) {
        throw new Error(
          `Team project with project ID: ${projectId} does not exist`,
        );
      }

      await tx
        .delete(projectsTable)
        .where(
          eq(projectsTable.id, projectId),
        );

      return {
        id: teamProjectDeleteResult[0].id,
        projectId: teamProjectDeleteResult[0].projectId,
        teamId: teamProjectDeleteResult[0].teamId,
      };
    });
  }
}

export const teamProjectsService =
  new TeamProjectsService();

export default TeamProjectsService;