import UserService from "@repo/services/user";
import ProjectService from "@repo/services/project"
import ShareLinkService from "@repo/services/shareLink";

export const shareLinkService = new ShareLinkService();
export const userService = new UserService();
export const projectService = new ProjectService()
