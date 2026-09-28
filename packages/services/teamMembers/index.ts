import { asc, eq ,db, and } from "@repo/database";
import {
  teamMembersTable,
  usersTable,
} from "@repo/database/schema";

import {
  addTeamMemberInput,
  AddTeamMemberInputType,
  getTeamMembersInput,
  GetTeamMembersInputType,
  removeTeamMemberInput,
  RemoveTeamMemberInputType,
  updateTeamMemberRoleInput,
  UpdateTeamMemberRoleInputType,
} from "./model";

class TeamMemberService {
  public async addMember(
    payload: AddTeamMemberInputType,
  ) {
    const {
      teamId,
      userId,
      role,
    } = await addTeamMemberInput.parseAsync(payload);

    const memberInsertResult = await db
      .insert(teamMembersTable)
      .values({
        teamId,
        userId,
        role,
      })
      .returning({
        id: teamMembersTable.id,
      });

    if (
      !memberInsertResult ||
      memberInsertResult.length === 0 ||
      !memberInsertResult[0]?.id
    ) {
      throw new Error(
        "Something went wrong while adding the team member",
      );
    }

    return memberInsertResult[0];
  }

  public async getMembers(
    payload: GetTeamMembersInputType,
  ) {
    const { teamId } =
      await getTeamMembersInput.parseAsync(payload);

    const members = await db
      .select({
        id: teamMembersTable.id,
        teamId: teamMembersTable.teamId,
        userId: teamMembersTable.userId,
        role: teamMembersTable.role,
        createdAt: teamMembersTable.createdAt,

        fullName: usersTable.fullName,
        email: usersTable.email,
        profileImageUrl: usersTable.profileImageUrl,
      })
      .from(teamMembersTable)
      .innerJoin(
        usersTable,
        eq(
          teamMembersTable.userId,
          usersTable.id,
        ),
      )
      .where(
        eq(teamMembersTable.teamId, teamId),
      )
      .orderBy(
        asc(teamMembersTable.createdAt),
      );

    return members;
  }

  public async removeMember(
    payload: RemoveTeamMemberInputType,
  ) {
    const {
      teamId,
      userId,
    } = await removeTeamMemberInput.parseAsync(payload);

    const memberDeleteResult = await db
      .delete(teamMembersTable)
      .where(
        and(
          eq(teamMembersTable.teamId, teamId),
          eq(teamMembersTable.userId, userId),
        )
      )
      .returning({
        id: teamMembersTable.id,
      });

    if (
      !memberDeleteResult ||
      memberDeleteResult.length === 0 ||
      !memberDeleteResult[0]?.id
    ) {
      throw new Error(
        "Team member does not exist",
      );
    }

    return {
      id: memberDeleteResult[0].id,
    };
  }

  public async updateMemberRole(
    payload: UpdateTeamMemberRoleInputType,
  ) {
    const {
      teamId,
      userId,
      role,
    } =
      await updateTeamMemberRoleInput.parseAsync(
        payload,
      );

    const memberUpdateResult = await db
      .update(teamMembersTable)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(teamMembersTable.teamId, teamId),
          eq(teamMembersTable.userId, userId),
        )
      )
      .returning({
        id: teamMembersTable.id,
        role: teamMembersTable.role,
      });

    if (
      !memberUpdateResult ||
      memberUpdateResult.length === 0 ||
      !memberUpdateResult[0]?.id
    ) {
      throw new Error(
        "Team member does not exist",
      );
    }

    return memberUpdateResult[0];
  }
}

export default TeamMemberService;