// // "use client";

// // const members = [
// //   {
// //     name: "You",
// //     role: "Owner",
// //     initials: "YO",
// //     online: true,
// //   },
// //   {
// //     name: "Aarav",
// //     role: "Designer",
// //     initials: "AR",
// //     online: true,
// //   },
// //   {
// //     name: "Maya",
// //     role: "Contributor",
// //     initials: "MA",
// //     online: false,
// //   },
// // ];

// // export default function TeamMembers() {
// //   return (
// //     <aside className="min-h-[calc(100vh-70px)] border-l border-[#A9854F]/10 bg-[#090B0A]">
// //       <div className="px-4 py-5">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="font-mono text-[7px] uppercase tracking-[0.25em] text-[#655F56]">
// //               Collaboration
// //             </p>

// //             <h2 className="mt-2 font-serif text-[17px] text-[#DDD4C5]">
// //               Team
// //             </h2>
// //           </div>

// //           <button
// //             type="button"
// //             className="flex h-7 w-7 items-center justify-center rounded-md border border-[#A9854F]/10 bg-[#111310] text-[#8C806D] transition hover:border-[#A9854F]/25 hover:text-[#D6C4A3]"
// //           >
// //             +
// //           </button>
// //         </div>

// //         <div className="mt-5 rounded-xl border border-[#A9854F]/10 bg-[#101211] p-3">
// //           <div className="flex items-center justify-between">
// //             <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#68645D]">
// //               Members
// //             </span>

// //             <span className="font-mono text-[8px] text-[#9C8C72]">
// //               {members.length}
// //             </span>
// //           </div>

// //           <div className="mt-3 space-y-1">
// //             {members.map((member) => (
// //               <div
// //                 key={member.name}
// //                 className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-[#17130F]"
// //               >
// //                 <div className="relative">
// //                   <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A9854F]/15 bg-[#1A1814] font-serif text-[9px] text-[#C7B89E]">
// //                     {member.initials}
// //                   </div>

// //                   <span
// //                     className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-[#101211] ${
// //                       member.online
// //                         ? "bg-[#7B9B72]"
// //                         : "bg-[#514F49]"
// //                     }`}
// //                   />
// //                 </div>

// //                 <div className="min-w-0">
// //                   <p className="truncate text-[10px] text-[#C8C0B2]">
// //                     {member.name}
// //                   </p>

// //                   <p className="mt-0.5 text-[8px] text-[#68645D]">
// //                     {member.role}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="mt-4 rounded-xl border border-[#A9854F]/10 bg-[#111310] p-3">
// //           <div className="flex items-center gap-2">
// //             <div className="h-1.5 w-1.5 rounded-full bg-[#7B9B72]" />

// //             <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-[#77736B]">
// //               Team activity
// //             </p>
// //           </div>

// //           <p className="mt-3 text-[9px] leading-4 text-[#625F58]">
// //             Activity history will appear here
// //             as your team works together.
// //           </p>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // }

// "use client";

// const members = [
//   {
//     name: "You",
//     role: "Owner",
//     initials: "YO",
//     online: true,
//   },
//   {
//     name: "Aarav",
//     role: "Designer",
//     initials: "AR",
//     online: true,
//   },
//   {
//     name: "Maya",
//     role: "Contributor",
//     initials: "MA",
//     online: false,
//   },
// ];

// export default function TeamMembers() {
//   return (
//     <aside className="border-l border-[#A9854F]/10 bg-[#0B0D0C]">
//       <div className="flex h-full min-h-[calc(100vh-76px)] flex-col px-5 py-7">
//         <div>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#625D54]">
//                 Collaboration
//               </p>

//               <h2 className="mt-2 text-[17px] font-medium text-[#D8CFBF]">
//                 Team
//               </h2>
//             </div>

//             <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
//               <TeamIcon />
//             </div>
//           </div>

//           <div className="mt-6 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
//             <div className="flex items-center justify-between">
//               <p className="text-[11px] text-[#858078]">
//                 Members
//               </p>

//               <span className="font-mono text-[10px] text-[#A9854F]">
//                 {members.length}
//               </span>
//             </div>

//             <div className="mt-4 space-y-3">
//               {members.map(
//                 (member) => (
//                   <Member
//                     key={member.name}
//                     {...member}
//                   />
//                 ),
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#625D54]">
//             Activity
//           </p>

//           <div className="mt-3 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-5">
//             <div className="flex gap-3">
//               <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7B9B72]" />

//               <div>
//                 <p className="text-[11px] leading-5 text-[#9A9489]">
//                   Team activity will appear
//                   here as your workspace
//                   evolves.
//                 </p>

//                 <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#5F5B54]">
//                   Activity history
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-auto pt-8">
//           <div className="rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
//             <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#A9854F]">
//               Living workspace
//             </p>

//             <p className="mt-2 text-[11px] leading-5 text-[#77736B]">
//               Ideas become clearer when
//               people can see the same
//               structure.
//             </p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// type MemberProps = {
//   name: string;
//   role: string;
//   initials: string;
//   online: boolean;
// };

// function Member({
//   name,
//   role,
//   initials,
//   online,
// }: MemberProps) {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex min-w-0 items-center gap-3">
//         <div className="relative">
//           <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A9854F]/15 bg-[#17130F] font-serif text-[10px] text-[#D6C4A3]">
//             {initials}
//           </div>

//           {online && (
//             <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#111311] bg-[#7B9B72]" />
//           )}
//         </div>

//         <div className="min-w-0">
//           <p className="truncate text-[11px] font-medium text-[#C9C0B1]">
//             {name}
//           </p>

//           <p className="mt-0.5 text-[9px] text-[#66625B]">
//             {role}
//           </p>
//         </div>
//       </div>

//       <span
//         className={`font-mono text-[7px] uppercase tracking-[0.1em] ${
//           online
//             ? "text-[#7B9B72]"
//             : "text-[#5F5B54]"
//         }`}
//       >
//         {online
//           ? "Online"
//           : "Offline"}
//       </span>
//     </div>
//   );
// }

// function TeamIcon() {
//   return (
//     <svg
//       width="19"
//       height="19"
//       viewBox="0 0 24 24"
//       fill="none"
//     >
//       <circle
//         cx="9"
//         cy="8"
//         r="3"
//         stroke="#B99052"
//         strokeWidth="1.3"
//       />

//       <circle
//         cx="17"
//         cy="9"
//         r="2.5"
//         stroke="#B99052"
//         strokeWidth="1.3"
//       />

//       <path
//         d="M3.5 20C4 16.5 5.7 14.5 9 14.5C12.3 14.5 14 16.5 14.5 20"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />

//       <path
//         d="M14.5 15C15.3 14.5 16.2 14.2 17 14.2C19.5 14.2 20.5 16 20.7 18.5"
//         stroke="#B99052"
//         strokeWidth="1.3"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGetTeam } from "~/hooks/api/team";
import { useTeamMembers } from "~/hooks/api/teamMembers";

const TEAM_ID_STORAGE_KEY = "sutradhara-team-id";

type TeamMember = {
  id: string;
  teamId: string;
  userId: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  createdAt: Date | string;
  fullName: string | null;
  email: string;
  profileImageUrl: string | null;
};

export default function TeamMembers() {
  const router = useRouter();

  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    const storedTeamId =
      window.localStorage.getItem(
        TEAM_ID_STORAGE_KEY,
      );

    if (storedTeamId) {
      setTeamId(storedTeamId);
    }
  }, []);

  const {
    team,
    isLoading: isTeamLoading,
    isError: isTeamError,
  } = useGetTeam(teamId);

  const {
    members,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useTeamMembers(teamId);

  const isLoading =
    Boolean(teamId) &&
    (isTeamLoading || isMembersLoading);

  const hasTeam =
    Boolean(teamId) &&
    Boolean(team);

  const hasMembers =
    Array.isArray(members) &&
    members.length > 0;

  const handleCreateCollaboration = () => {
    router.push("/dashboard?section=team");
  };

  return (
    <aside className="border-l border-[#A9854F]/10 bg-[#0B0D0C]">
      <div className="flex h-full min-h-[calc(100vh-76px)] flex-col px-5 py-7">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#625D54]">
                Collaboration
              </p>

              <h2 className="mt-2 text-[17px] font-medium text-[#D8CFBF]">
                {team?.name ?? "Team"}
              </h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#A9854F]/10 bg-[#171A17]">
              <TeamIcon />
            </div>
          </div>

          {isLoading && (
            <TeamLoadingState />
          )}

          {!isLoading && !hasTeam && (
            <EmptyTeamState
              isError={
                isTeamError ||
                isMembersError
              }
              onCreateCollaboration={
                handleCreateCollaboration
              }
            />
          )}

          {!isLoading && hasTeam && team && (
            <>
              <div className="mt-6 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-[#858078]">
                    Members
                  </p>

                  <span className="font-mono text-[10px] text-[#A9854F]">
                    {members?.length ?? 0}
                  </span>
                </div>

                {!hasMembers ? (
                  <div className="mt-5 rounded-xl border border-dashed border-[#A9854F]/10 bg-[#0D0F0E] px-4 py-5 text-center">
                    <p className="text-[10px] text-[#77736B]">
                      No members yet.
                    </p>

                    <button
                      type="button"
                      onClick={
                        handleCreateCollaboration
                      }
                      className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-[#A9854F] transition hover:text-[#D6C4A3]"
                    >
                      Manage team
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    {members.map(
                      (member: TeamMember) => (
                        <Member
                          key={member.id}
                          member={member}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#A9854F]">
                  {team.name}
                </p>

                <p className="mt-2 text-[10px] leading-5 text-[#77736B]">
                  {team.description ??
                    "A shared workspace for organizing ideas and building structure together."}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#A9854F]">
              Living workspace
            </p>

            <p className="mt-2 text-[11px] leading-5 text-[#77736B]">
              Ideas become clearer when
              people can see the same
              structure.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

type MemberProps = {
  member: TeamMember;
};

function Member({
  member,
}: MemberProps) {
  const displayName =
    member.fullName?.trim() ||
    member.email;

  const initials = getInitials(
    member.fullName,
    member.email,
  );

  const role = formatRole(member.role);

  return (
    <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          {member.profileImageUrl ? (
            <img
              src={member.profileImageUrl}
              alt={displayName}
              className="h-9 w-9 rounded-full border border-[#A9854F]/15 object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A9854F]/15 bg-[#17130F] font-serif text-[10px] text-[#D6C4A3]">
              {initials}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-[#C9C0B1]">
            {displayName}
          </p>

          <p className="mt-0.5 text-[9px] text-[#66625B]">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}

type EmptyTeamStateProps = {
  isError: boolean;
  onCreateCollaboration: () => void;
};

function EmptyTeamState({
  isError,
  onCreateCollaboration,
}: EmptyTeamStateProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A9854F]/15 bg-[#171A17]">
        <PlusIcon />
      </div>

      <p className="mt-4 text-[12px] font-medium text-[#C9C0B1]">
        Start a collaboration
      </p>

      <p className="mt-2 text-[10px] leading-5 text-[#77736B]">
        {isError
          ? "Your team could not be loaded right now."
          : "Create a team and bring your collaborators into the same workspace."}
      </p>

      <button
        type="button"
        onClick={onCreateCollaboration}
        className="mt-4 rounded-xl border border-[#A9854F]/20 bg-[#17130F] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-[#B99052] transition hover:border-[#A9854F]/35 hover:bg-[#1C1813] hover:text-[#D6C4A3]"
      >
        Create collaboration
      </button>
    </div>
  );
}

function TeamLoadingState() {
  return (
    <div className="mt-6 rounded-2xl border border-[#A9854F]/10 bg-[#111311] p-4">
      <div className="animate-pulse">
        <div className="h-3 w-16 rounded bg-[#1A1C19]" />

        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#171A17]" />

            <div className="space-y-2">
              <div className="h-2.5 w-24 rounded bg-[#171A17]" />
              <div className="h-2 w-14 rounded bg-[#151714]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#171A17]" />

            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-[#171A17]" />
              <div className="h-2 w-16 rounded bg-[#151714]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getInitials(
  fullName: string | null,
  email: string,
): string {
  if (!fullName?.trim()) {
    return email
      .trim()
      .slice(0, 2)
      .toUpperCase();
  }

  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const firstPart = parts.at(0);
  const lastPart = parts.at(-1);

  if (!firstPart) {
    return email
      .trim()
      .slice(0, 2)
      .toUpperCase();
  }

  if (parts.length === 1) {
    return firstPart
      .slice(0, 2)
      .toUpperCase();
  }

  if (!lastPart) {
    return firstPart
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    firstPart.charAt(0) +
    lastPart.charAt(0)
  ).toUpperCase();
}

function formatRole(
  role: TeamMember["role"],
): string {
  if (role === "ADMIN") {
    return "Admin";
  }

  if (role === "EDITOR") {
    return "Editor";
  }

  return "Viewer";
}

function TeamIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
        stroke="#B99052"
        strokeWidth="1.3"
      />

      <circle
        cx="17"
        cy="9"
        r="2.5"
        stroke="#B99052"
        strokeWidth="1.3"
      />

      <path
        d="M3.5 20C4 16.5 5.7 14.5 9 14.5C12.3 14.5 14 16.5 14.5 20"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <path
        d="M14.5 15C15.3 14.5 16.2 14.2 17 14.2C19.5 14.2 20.5 16 20.7 18.5"
        stroke="#B99052"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 5V19"
        stroke="#B99052"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M5 12H19"
        stroke="#B99052"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}