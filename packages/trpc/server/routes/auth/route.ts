import { z, zodUndefinedModel } from "../../schema";
import { userService } from "../../services";
import { getAuthenticationMethodOutputSchema } from "@repo/services/user/model";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { getGoogleAuthUrl } from "@repo/services/clients/google-oauth";
import { getGoogleAuthUrlOuputModel, getUserByIdInputModel, getUserByIdOutputModel, isUserLoggedInOutputModel, logoutOutputModel } from "./model";
import { clearAuthenticationCookie, getAuthenticationCookie } from "../../utils/cookie";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({

  getGoogleAuthUrl: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getGoogleAuthUrl"),
        tags: TAGS
      }
    })
    .output(getGoogleAuthUrlOuputModel)
    .mutation(async () => {
      const authUrl = getGoogleAuthUrl();

      if (!authUrl) throw new Error("Google Authentication is not configured");

      return {
        authUrl,
      }
    }),

  isUserLoggedIn: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/isUserLoggedIn"),
        tags: TAGS
      }
    })
    .output(isUserLoggedInOutputModel)
    .query(async ({ ctx }) => {
      const userToken = getAuthenticationCookie(ctx)
      if (!userToken) throw new Error("User is not LoggedIn")
      const { id } = await userService.isUserLoggedIn(userToken);

      return {
        id
      }
    }),

  logout: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/logout"),
        tags: TAGS
      }
    })
    .output(logoutOutputModel)
    .mutation(async ({ ctx }) => {
      clearAuthenticationCookie(ctx);

      return {
        success: true,
      }
    }),

  getUserInfoById: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getUserInfoById"),
        tags: TAGS
      }
    })
    .input(getUserByIdInputModel)
    .output(getUserByIdOutputModel)
    .query(async ({ ctx }) => {
      const { id, fullName, email, role, profileImageUrl } = await userService.getUserInfoById(ctx.user.id);

      return {
        id,
        fullName,
        email,
        profileImageUrl,
        role,
      }

    }),
});