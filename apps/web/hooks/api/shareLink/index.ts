// import { trpc } from "~/trpc/client";


// export const useCreateShareLink = (projectId: string) => {
//   const {
//     data: shareLink,
//     error,
//     isError,
//     isPending,
//     isSuccess,
//     status,
//   } = trpc.shareLink.createShareLink.useMutation();

//   return {        
//     shareLink,
//     error,
//     isError,
//     isPending,
//     isSuccess,
//     status,
//   };
// };


export const useEnableSharing = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: enableSharingAsync,
    mutate: enableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.enableSharing.useMutation({
    onSuccess: async (_result, variables) => {
      await utils.project.getProjectById.invalidate({ id: variables.id });
    },
  });

  return {
    enableSharingAsync,
    enableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

export const useDisableSharing = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: disableSharingAsync,
    mutate: disableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.project.disableSharing.useMutation({
    onSuccess: async (_result, variables) => {
      await utils.project.getProjectById.invalidate({ id: variables.id });
    },
  });

  return {
    disableSharingAsync,
    disableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  };
};

/** Public: works for visitors who are not logged in. */
export const useSharedProject = (token: string) => {
  const {
    data: project,
    error,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.project.getSharedProject.useQuery({ token }, { retry: false });

  return { project, error, isLoading, isError, isSuccess, status };
};