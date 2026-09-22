"use client";

import CreateProjectDialog from "./CreateProjectDialog";

type ProjectStatsProps = {
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;

  isCreating: boolean;
};

export default function ProjectStats({
  onCreateProject,
  isCreating,
}: ProjectStatsProps) {
  return (
    <div className="mt-7 grid grid-cols-4 gap-4">
      <CreateProjectDialog
        type="blank"
        title="Blank File"
        description="Start from scratch"
        onCreateProject={onCreateProject}
        isCreating={isCreating}
      />

      <CreateProjectDialog
        type="ai"
        title="Generate with AI"
        description="Turn ideas into diagrams"
        onCreateProject={onCreateProject}
        isCreating={isCreating}
      />

      <CreateProjectDialog
        type="template"
        title="Use Template"
        description="Get started quickly"
        onCreateProject={onCreateProject}
        isCreating={isCreating}
      />

      <CreateProjectDialog
        type="team"
        title="For Team"
        description="Collaborate together"
        onCreateProject={onCreateProject}
        isCreating={isCreating}
      />
    </div>
  );
}