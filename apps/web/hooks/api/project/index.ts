import { trpc } from "~/trpc/client";

export const useCreateProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createProjectAsync,
    mutate: createProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.createProject.useMutation({
    onSuccess: async () => {
      await utils.project.getProjects.invalidate();
    },
  });

  return {
    createProjectAsync,
    createProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useProjects = () => {
  const {
    data: projects,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.project.getProjects.useQuery();

  return {
    projects,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};

export const useGetProject = (id: string) => {
  const {
    data: project,
    error,
    isFetched,
    isFetching,
    isLoading,
    isError,
    isSuccess,
    refetch,
    status,
  } = trpc.project.getProjectById.useQuery({
    id,
  });

  return {
    project,
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

export const useUpdateProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateProjectAsync,
    mutate: updateProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.updateProject.useMutation({
    onSuccess: async () => {
      // The list only shows titles / status, so this is for renames.
      // Canvas saves go through useCanvasAutosave and do not touch the list.
      await utils.project.getProjects.invalidate();
    },
  });

  return {
    updateProjectAsync,
    updateProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useUpdateProjectStatus = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: updateProjectStatusAsync,
    mutate: updateProjectStatus,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.updateProjectStatus.useMutation({
    onSuccess: async () => {
      await utils.project.getProjects.invalidate();
    },
  });

  return {
    updateProjectStatusAsync,
    updateProjectStatus,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useDeleteProject = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: deleteProjectAsync,
    mutate: deleteProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.deleteProject.useMutation({
    onSuccess: async () => {
      await utils.project.getProjects.invalidate();
    },
  });

  return {
    deleteProjectAsync,
    deleteProject,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

