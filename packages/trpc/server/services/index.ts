import UserService from "@repo/services/user";
import ProjectService from "@repo/services/project"
import ShareLinkService from "@repo/services/shareLink";
import TeamService from "@repo/services/teams";
import TeamMembersService from "@repo/services/teamMembers";
import TeamProjectsService from "@repo/services/teamProjects";

export const teamProjectsService = new TeamProjectsService();
export const teamService = new TeamService();
export const teamMembersService = new TeamMembersService();
export const shareLinkService = new ShareLinkService();
export const userService = new UserService();
export const projectService = new ProjectService()
