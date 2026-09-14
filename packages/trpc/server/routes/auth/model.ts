import {z} from "zod"

export const getGoogleAuthUrlOuputModel = z.object({
    authUrl: z.string().url().describe("Auth Url")
})

export const isUserLoggedInOutputModel = z.object({
    id: z.string().describe("ID of the user")
})

export const logoutOutputModel = z.object({
    success: z.boolean()
})

export const getUserByIdInputModel = z.undefined()

export const getUserByIdOutputModel = z.object({
    id: z.string().describe("UUID of the User"),
    fullName: z.string().describe("Full Name of the User"),
    email: z.string().email().describe("Email of the User"),
    profileImageUrl: z.string().url().nullish().describe("Profile Image Url"),
    role: z.enum(["USER", "ADMIN"]).describe("Role of the User")
})
