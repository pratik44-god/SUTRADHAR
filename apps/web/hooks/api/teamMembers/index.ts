import { trpc } from "~/trpc/client";

export const useAddTeamMember = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: addTeamMemberAsync,
    mutate: addTeamMember,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamMembers.addMember.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.teamMembers.getMembers.invalidate({
        teamId: variables.teamId,
      });
    },
  });

  return {
    addTeamMemberAsync,
    addTeamMember,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useTeamMembers = (teamId: string) => {
  const {
    data: members,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
    refetch,
  } = trpc.teamMembers.getMembers.useQuery(
    {
      teamId,
    },
    {
      enabled: Boolean(teamId),
    },
  );

  return {
    members,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
    refetch,
  };
};

export const useRemoveTeamMember = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: removeTeamMemberAsync,
    mutate: removeTeamMember,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamMembers.removeMember.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.teamMembers.getMembers.invalidate({
        teamId: variables.teamId,
      });
    },
  });

  return {
    removeTeamMemberAsync,
    removeTeamMember,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useUpdateTeamMemberRole = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateTeamMemberRoleAsync,
    mutate: updateTeamMemberRole,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamMembers.updateMemberRole.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.teamMembers.getMembers.invalidate({
        teamId: variables.teamId,
      });
    },
  });

  return {
    updateTeamMemberRoleAsync,
    updateTeamMemberRole,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};