import { trpc } from "~/trpc/client";

/* CREATE TEAM PROJECT */

export const useCreateTeamProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createTeamProjectAsync,
    mutate: createTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamProjects.createTeamProject.useMutation({
    onSuccess: async (data, variables) => {
      await utils.teamProjects.getTeamProjectsByTeamId.invalidate({
        teamId: variables.teamId,
      });
    },
  });

  return {
    createTeamProjectAsync,
    createTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};


/* GET TEAM PROJECTS BY TEAM ID */

export const useTeamProjects = (teamId: string) => {
  const {
    data: teamProjects,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
    refetch,
  } = trpc.teamProjects.getTeamProjectsByTeamId.useQuery(
    {
      teamId,
    },
    {
      enabled: Boolean(teamId),
    },
  );

  return {
    teamProjects,
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


/* GET TEAM PROJECT BY PROJECT ID */

export const useTeamProject = (projectId: string) => {
  const {
    data: teamProject,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
    refetch,
  } = trpc.teamProjects.getTeamProjectByProjectId.useQuery(
    {
      projectId,
    },
    {
      enabled: Boolean(projectId),
    },
  );

  return {
    teamProject,
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


/* UPDATE TEAM PROJECT */

export const useUpdateTeamProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateTeamProjectAsync,
    mutate: updateTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamProjects.updateTeamProject.useMutation({
    onSuccess: async (data, variables) => {
      await utils.teamProjects.getTeamProjectByProjectId.invalidate({
        projectId: variables.projectId,
      });
    },
  });

  return {
    updateTeamProjectAsync,
    updateTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};


/* DELETE TEAM PROJECT */

export const useDeleteTeamProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteTeamProjectAsync,
    mutate: deleteTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.teamProjects.deleteTeamProject.useMutation({
    onSuccess: async (data, variables) => {
      await utils.teamProjects.getTeamProjectsByTeamId.invalidate();

      await utils.teamProjects.getTeamProjectByProjectId.invalidate({
        projectId: variables.projectId,
      });
    },
  });

  return {
    deleteTeamProjectAsync,
    deleteTeamProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};