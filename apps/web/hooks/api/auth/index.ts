import { trpc } from "~/trpc/client"

export const useLogin = () => {

    const utils = trpc.useUtils();
    const {
        mutateAsync: getGoogleAuthUrlAsync,
        mutate: getGoogleAuthUrl,
        isError,
        error,
        status,
        isSuccess,
        isPending


    } = trpc.auth.getGoogleAuthUrl.useMutation({
        onSuccess: async () => {
            await utils.auth.isUserLoggedIn.invalidate()
        }
    })

    return {
        getGoogleAuthUrlAsync,
        getGoogleAuthUrl,
        isError,
        error,
        status,
        isSuccess,
        isPending
    }
}

export const useIsUserLoggedIn = () => {
    const {
        data,
        isError,
        error,
        status,
        isLoading,
        isSuccess,
    } = trpc.auth.isUserLoggedIn.useQuery()
    const isUserLoggedIn = Boolean(data?.id);

    return {
        isUserLoggedIn,
        isError,
        error,
        isLoading,
        status,
        isSuccess
    }
}


export const useGetUserById = () => {
    const {
        data,
        isError,
        error,
        status,
        isSuccess,
    } = trpc.auth.getUserInfoById.useQuery()

    return {
        data,
        isError,
        error,
        status,
        isSuccess
    }
}

export const useLogout = () => {
    const utils = trpc.useUtils();
    const {
        mutateAsync: logoutAsync,
        mutate: logout,
        isError,
        error,
        status,
        isSuccess,



    } = trpc.auth.logout.useMutation({
        onSuccess: async () => {
            await utils.auth.isUserLoggedIn.invalidate()
        }
    })

    return {
        logoutAsync,
        logout,
        isError,
        error,
        status,
        isSuccess
    }
}