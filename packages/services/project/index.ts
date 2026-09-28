import { db, eq } from "@repo/database";
import { projectsTable } from "@repo/database/schema";
import {
  createProjectInput,
  CreateProjectInputType,
  deleteProjectInput,
  DeleteProjectInputType,
  getProjectByIdInput,
  GetProjectByIdInputType,
  getProjectsByCreatorIdInput,
  GetProjectsByCreatorIdInputType,
  updateProjectInput,
  UpdateProjectInputType,
  updateProjectStatusInput,
  UpdateProjectStatusInputType,
} from "./model";

class ProjectService {
  public async createProject(payload: CreateProjectInputType) {
    const {
      creatorsId,
      title,
      description,
    } = await createProjectInput.parseAsync(payload);

    const projectInsertResult = await db
      .insert(projectsTable)
      .values({
        creatorsId,
        title,
        description,
      })
      .returning({
        id: projectsTable.id,
      });

    if (
      !projectInsertResult ||
      projectInsertResult.length === 0 ||
      !projectInsertResult[0]?.id
    ) {
      throw new Error("Something went wrong while creating the project");
    }

    return projectInsertResult[0];
  }

  public async getProjectById(payload: GetProjectByIdInputType) {
    const { id } = await getProjectByIdInput.parseAsync(payload);

    const project = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id));

    if (!project || project.length === 0) {
      throw new Error(`Project with ID: ${id} does not exist`);
    }

    return project[0]!;
  }

  public async getProjectsByCreatorId(
    payload: GetProjectsByCreatorIdInputType,
  ) {
    const { creatorsId } =
      await getProjectsByCreatorIdInput.parseAsync(payload);

    const projects = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.creatorsId, creatorsId));

    return projects;
  }

  public async updateProject(payload: UpdateProjectInputType) {
    const {
      id,
      title,
      description,
      canvasData,
    } = await updateProjectInput.parseAsync(payload);

    const projectUpdateResult = await db
      .update(projectsTable)
      .set({
        ...(title !== undefined && {
          title,
        }),
        ...(description !== undefined && {
          description,
        }),
        ...(canvasData !== undefined && {
        canvasData,
         }),
        updatedAt: new Date(),
      })
      .where(eq(projectsTable.id, id))
      .returning({
        id: projectsTable.id,
      });

    if (
      !projectUpdateResult ||
      projectUpdateResult.length === 0 ||
      !projectUpdateResult[0]?.id
    ) {
      throw new Error(`Project with ID: ${id} does not exist`);
    }

    return projectUpdateResult[0];
  }

  public async updateProjectStatus(
    payload: UpdateProjectStatusInputType,
  ) {
    const { id, status } =
      await updateProjectStatusInput.parseAsync(payload);

    const projectUpdateResult = await db
      .update(projectsTable)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(projectsTable.id, id))
      .returning({
        id: projectsTable.id,
        status: projectsTable.status,
      });

    if (
      !projectUpdateResult ||
      projectUpdateResult.length === 0 ||
      !projectUpdateResult[0]?.id
    ) {
      throw new Error(`Project with ID: ${id} does not exist`);
    }

    return projectUpdateResult[0];
  }

  public async deleteProject(payload: DeleteProjectInputType) {
    const { id } = await deleteProjectInput.parseAsync(payload);

    const projectDeleteResult = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning({
        id: projectsTable.id,
      });

    if (
      !projectDeleteResult ||
      projectDeleteResult.length === 0 ||
      !projectDeleteResult[0]?.id
    ) { 
      throw new Error(`Project with ID: ${id} does not exist`);
    }

    return {
      id: projectDeleteResult[0].id,
    };
  }
}

export default ProjectService;

