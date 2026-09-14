import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import { env } from "../env";
import { googleOAuth2Client } from "../clients/google-oauth";
import { generateUserTokenPayload, GenerateUserTokenPayloadType, GetAuthenticationMethodOutputSchema, loginUserWithGoogleIdInput, LoginUserWithGoogleIdInputType } from "./model";
import jwt from "jsonwebtoken"
import { Pause } from "lucide-react";
import { email } from "zod";
class UserService {
  public async getAuthenticationMethods(): Promise<
    ReadonlyArray<GetAuthenticationMethodOutputSchema>
  > {
    const supportedAuthenticationProviders: GetAuthenticationMethodOutputSchema[] = [];

    const isGoogleConfigured = !!(env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET);

    if (isGoogleConfigured) {
      const url = googleOAuth2Client.generateAuthUrl();
      supportedAuthenticationProviders.push({
        provider: "GOOGLE_OAUTH",
        displayName: "Google",
        displayText: "Signin with Google",
        authUrl: url,
      });
    }

    return supportedAuthenticationProviders;
  };

  private async existingUserWithGoogleId(googleId: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.googleId, googleId))

    if (!result || result.length === 0) {
      return null
    }

    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const id = await generateUserTokenPayload.parseAsync(payload)
    const token = jwt.sign({ id }, env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return token;
  }


  private verifyUserToken(token: string): GenerateUserTokenPayloadType {
    const verifyUserTokenResult = jwt.verify(
      token,
      env.JWT_SECRET
    ) as GenerateUserTokenPayloadType

    return generateUserTokenPayload.parse(verifyUserTokenResult)
  }

  public async loginUserWithGoogleId(payload: LoginUserWithGoogleIdInputType) {
    const { googleId, fullName, email, emailVerified, profileImageUrl } = await loginUserWithGoogleIdInput.parseAsync(payload)

    const existingUser = await this.existingUserWithGoogleId(googleId)

    if (existingUser) {
      const token = await this.generateUserToken({
        id: existingUser.id,
      })

      return {
        id: existingUser.id,
        token
      }

    }

    const role = "USER";
    const userInsertResult = await db.insert(usersTable).values({ googleId, fullName, email, emailVerified, role, profileImageUrl })
      .returning({
        id: usersTable.id
      })

    if (!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id) {
      throw new Error("Something went wrong while creating the user")
    }
    const user = userInsertResult[0]
    const token = await this.generateUserToken({ id: user?.id })
    return {
      id: user?.id,
      token
    }
  }

  public async handleGoogleOAuthCallback(code: string) {

    const { tokens } = await googleOAuth2Client.getToken({
      code,
      redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI
    })

    googleOAuth2Client.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new Error("Google OAuth did not return the Id_token")
    }
    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: env.GOOGLE_OAUTH_CLIENT_ID
    })

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload?.email || !payload?.name) {
      throw new Error("Incomplete Google user information")
    }

    return this.loginUserWithGoogleId({
      googleId: payload.sub,
      fullName: payload.name,
      email: payload.email,
      emailVerified: payload.email_verified ?? false,
      profileImageUrl: payload.picture
    })
  }

  public async isUserLoggedIn(token: string) {
    const { id } = this.verifyUserToken(token);

    return {
      id
    }
  }

  public async getUserInfoById(id: string) {
    const user = await db.select({
      id: usersTable.id,
      fullName: usersTable.fullName,
      email: usersTable.email,
      profileImageUrl: usersTable.profileImageUrl,
      role: usersTable.role
    }).from(usersTable).where(eq(usersTable.id, id))

    if (!user || user.length === 0) throw new Error(`User with ID: ${id} does not exists`)

    return user[0]!
  }
}



export default UserService;
