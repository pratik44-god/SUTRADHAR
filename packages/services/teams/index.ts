import { db, eq } from "@repo/database";
import { teamsTable } from "@repo/database/schema";
import {
  createTeamInput,
  CreateTeamInputType,
  getTeamByIdInput,
  GetTeamByIdInputType,
  updateTeamInput,
  UpdateTeamInputType,
  deleteTeamInput,
  DeleteTeamInputType,
} from "./model";

class TeamService {
  public async createTeam(payload: CreateTeamInputType) {
    const {
      name,
      description,
      createdBy,
    } = await createTeamInput.parseAsync(payload);

    const teamInsertResult = await db
      .insert(teamsTable)
      .values({
        name,
        description,
        createdBy,
      })
      .returning({
        id: teamsTable.id,
      });

    if (
      !teamInsertResult ||
      teamInsertResult.length === 0 ||
      !teamInsertResult[0]?.id
    ) {
      throw new Error("Something went wrong while creating the team");
    }

    return teamInsertResult[0];
  }

  public async getTeamById(
    payload: GetTeamByIdInputType,
  ) {
    const { id } =
      await getTeamByIdInput.parseAsync(payload);

    const team = await db
      .select()
      .from(teamsTable)
      .where(eq(teamsTable.id, id));

    if (!team || team.length === 0) {
      throw new Error(
        `Team with ID: ${id} does not exist`,
      );
    }

    return team[0]!;
  }

  public async updateTeam(
    payload: UpdateTeamInputType,
  ) {
    const {
      id,
      name,
      description,
    } = await updateTeamInput.parseAsync(payload);

    const teamUpdateResult = await db
      .update(teamsTable)
      .set({
        ...(name !== undefined && {
          name,
        }),
        ...(description !== undefined && {
          description,
        }),
        updatedAt: new Date(),
      })
      .where(eq(teamsTable.id, id))
      .returning({
        id: teamsTable.id,
      });

    if (
      !teamUpdateResult ||
      teamUpdateResult.length === 0 ||
      !teamUpdateResult[0]?.id
    ) {
      throw new Error(
        `Team with ID: ${id} does not exist`,
      );
    }

    return teamUpdateResult[0];
  }

  public async deleteTeam(
    payload: DeleteTeamInputType,
  ) {
    const { id } =
      await deleteTeamInput.parseAsync(payload);

    const teamDeleteResult = await db
      .delete(teamsTable)
      .where(eq(teamsTable.id, id))
      .returning({
        id: teamsTable.id,
      });

    if (
      !teamDeleteResult ||
      teamDeleteResult.length === 0 ||
      !teamDeleteResult[0]?.id
    ) {
      throw new Error(
        `Team with ID: ${id} does not exist`,
      );
    }

    return {
      id: teamDeleteResult[0].id,
    };
  }
}

export default TeamService;