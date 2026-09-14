import { z } from "zod";

export const getAuthenticationMethodOutputSchema = z.object({
  provider: z.enum(["GOOGLE_OAUTH"]),
  displayName: z.string().optional(),
  displayText: z.string().optional(),
  authUrl: z.string(),
});
export type GetAuthenticationMethodOutputSchema = z.infer<
  typeof getAuthenticationMethodOutputSchema
>;


export const loginUserWithGoogleIdInput = z.object({
  googleId: z.string().describe("Google ID"),
  fullName: z.string().describe("Full Name of the User"),
  email: z.email().describe("Email of the User"),
  emailVerified: z.boolean().describe("Whether the Email is verified or not"),
  profileImageUrl: z.string().url().nullish().describe("Profile Image Url")
})

export type LoginUserWithGoogleIdInputType = z.infer<typeof loginUserWithGoogleIdInput>
export const generateUserTokenPayload = z.object({
  id: z.string().describe("UUID of the User")
})

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>
