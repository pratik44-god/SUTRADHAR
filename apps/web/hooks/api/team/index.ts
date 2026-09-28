import { trpc } from "~/trpc/client";

export const useCreateTeam = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createTeamAsync,
    mutate: createTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.team.createTeam.useMutation({
    onSuccess: async () => {
      await utils.team.getTeamById.invalidate();
    },
  });

  return {
    createTeamAsync,
    createTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useGetTeam = (id: string) => {
  const {
    data: team,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    refetch,
    status,
  } = trpc.team.getTeamById.useQuery(
    {
      id,
    },
    {
      enabled: Boolean(id),
    },
  );

  return {
    team,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    refetch,
    status,
  };
};

export const useUpdateTeam = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateTeamAsync,
    mutate: updateTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.team.updateTeam.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.team.getTeamById.invalidate({
        id: variables.id,
      });
    },
  });

  return {
    updateTeamAsync,
    updateTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useDeleteTeam = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteTeamAsync,
    mutate: deleteTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.team.deleteTeam.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.team.getTeamById.invalidate({
        id: variables.id,
      });
    },
  });

  return {
    deleteTeamAsync,
    deleteTeam,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};