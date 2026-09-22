"use client";

import CreateProjectDialog from "./CreateProjectDialog";

type EmptyProjectsProps = {
  onCreateProject: (
    title: string,
    description?: string,
  ) => Promise<void>;
  isCreating: boolean;
};

export default function EmptyProjects({
  onCreateProject,
  isCreating,
}: EmptyProjectsProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#B28A50]/15 bg-[#111514] px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#B28A50]/15 bg-[#1C1D1A]">
        <span className="font-serif text-2xl text-[#C49A5A]">
          +
        </span>
      </div>

      <h3 className="mt-5 font-serif text-[20px] text-[#E8DECE]">
        Start your first project
      </h3>

      <p className="mx-auto mt-2 max-w-[330px] text-[12px] leading-5 text-[#858078]">
        Create a visual workspace and start shaping your idea.
      </p>

      <div className="mt-6 flex justify-center">
        <CreateProjectDialog
          type="blank"
          title="Blank File"
          description="Start from scratch"
          onCreateProject={onCreateProject}
          isCreating={isCreating}
        />
      </div>
    </div>
  );
}