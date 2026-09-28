import { z } from "zod";

export const addTeamMemberInputModel = z.object({

  teamId: z

    .string()

    .uuid()

    .describe("UUID of the Team"),

  userId: z

    .string()

    .uuid()

    .describe("UUID of the User"),

  role: z

    .enum(["ADMIN", "EDITOR", "VIEWER"])

    .optional()

    .describe("Role of the Team Member"),

});

export const addTeamMemberOutputModel = z.object({

  id: z

    .string()

    .uuid()

    .describe("UUID of the Team Member"),

});

export const getTeamMembersInputModel = z.object({

  teamId: z

    .string()

    .uuid()

    .describe("UUID of the Team"),

});

export const getTeamMembersOutputModel = z.array(

  z.object({

    id: z

      .string()

      .uuid()

      .describe("UUID of the Team Member"),

    teamId: z

      .string()

      .uuid()

      .describe("UUID of the Team"),

    userId: z

      .string()

      .uuid()

      .describe("UUID of the User"),

    role: z

      .enum(["ADMIN", "EDITOR", "VIEWER"])

      .describe("Role of the Team Member"),

    createdAt: z

      .date()

      .describe("Date when the member was added"),

    fullName: z

      .string()

      .describe("Full name of the User"),

    email: z

      .string()

      .describe("Email of the User"),

    profileImageUrl: z

      .string()

      .nullable()

      .describe("Profile image URL of the User"),

  }),

);

export const removeTeamMemberInputModel = z.object({

  teamId: z

    .string()

    .uuid()

    .describe("UUID of the Team"),

  userId: z

    .string()

    .uuid()

    .describe("UUID of the User"),

});

export const removeTeamMemberOutputModel = z.object({

  id: z

    .string()

    .uuid()

    .describe("UUID of the removed Team Member"),

});

export const updateTeamMemberRoleInputModel = z.object({

  teamId: z

    .string()

    .uuid()

    .describe("UUID of the Team"),

  userId: z

    .string()

    .uuid()

    .describe("UUID of the User"),

  role: z

    .enum(["ADMIN", "EDITOR", "VIEWER"])

    .describe("New role of the Team Member"),

});

export const updateTeamMemberRoleOutputModel = z.object({

  id: z

    .string()

    .uuid()

    .describe("UUID of the Team Member"),

  role: z

    .enum(["ADMIN", "EDITOR", "VIEWER"])

    .describe("Role of the Team Member"),

});