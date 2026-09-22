import { z } from "zod"


export const getGoogleAuthUrlOutputModel = z.object({
  authUrl: z.string().url().describe("Authentication URL for the provider"),
})

export const isUserLoggedInInputModel = z.undefined();

export const isUserLoggedInOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the user")
})

export const logoutInputModel = z.undefined()

export const logoutOutputModel = z.object({
  success: z.boolean()
})

export const getUserByIdInputModel = z.undefined()


export const getUserByIdOutputModel = z.object({
   id: z.string().describe("ID of the User"),
    fullName: z.string().describe("fullName of the User"),
    email: z.email().describe("Email of the User"),
    profileImageUrl: z.string().describe("prfileImageUrl of the User").optional().nullable()

})