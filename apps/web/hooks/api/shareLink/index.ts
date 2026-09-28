import { trpc } from "~/trpc/client";

export const useCreateShareLink = () => {
  const {
    mutateAsync: createShareLinkAsync,
    mutate: createShareLink,
    data: shareLink,
    error,
    isError,
    isPending,
    isSuccess,
    status,
  } = trpc.shareLink.createShareLink.useMutation();

  return {
    createShareLinkAsync,
    createShareLink,
    shareLink,
    error,
    isError,
    isPending,
    isSuccess,
    status,
  };
};

export const useEnableSharing = () => {
  const {
    mutateAsync: enableSharingAsync,
    mutate: enableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.shareLink.enableSharing.useMutation();

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
  const {
    mutateAsync: disableSharingAsync,
    mutate: disableSharing,
    data,
    error,
    isError,
    isSuccess,
    status,
  } = trpc.shareLink.disableSharing.useMutation();

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

export const useSharedProject = (token: string) => {
  const {
    data: project,
    error,
    isLoading,
    isError,
    isSuccess,
    status,
  } = trpc.shareLink.getSharedProject.useQuery(
    { token },
    { retry: false }
  );

  return {
    project,
    error,
    isLoading,
    isError,
    isSuccess,
    status,
  };
};