import {db, eq} from "@repo/database/";
import { projectsTable, sharesTable } from "@repo/database/schema";
import { CreateShareLinkInput, CreateShareLinkInputType, DisableSharingInput, DisableSharingInputType, EnableSharingInput, EnableSharingInputType, SharedProjectInput, SharedProjectInputType } from "./model";
import crypto from "crypto";

class ShareLinkService {
    public async createShareLink(payload: CreateShareLinkInputType){
        const {projectsId, creatorsId} = await CreateShareLinkInput.parseAsync(payload);

        const shareToken = crypto.randomBytes(32).toString("hex");

        const shareLinkResult = await db.insert(sharesTable).values({
            projectsId: projectsId,
            creatorsId: creatorsId,
            shareToken: shareToken
        }).returning({
            id: sharesTable.id,
            shareToken: sharesTable.shareToken
        });
        if(!shareLinkResult || shareLinkResult.length === 0 || !shareLinkResult[0]?.id) {
            throw new Error("Something went wrong while creating the share link");
        }

        return shareLinkResult[0];
    }
    public async enableSharing(payload: EnableSharingInputType){
        const {projectsId} = await EnableSharingInput.parseAsync(payload);

        await db.update(sharesTable)
        .set({
            isPublic: true,
        })
        .where(eq(sharesTable.projectsId, projectsId));

        return {
            success: true,
        }

    }


    public async disableSharing(payload: DisableSharingInputType){
        const {projectId} = await DisableSharingInput.parseAsync(payload);

        await db.update(sharesTable)
        .set({
            isPublic: false,
        })
        .where(eq(sharesTable.projectsId, projectId));

        return {
            success: true,
        }
    }

    public async getSharedProject(payload: SharedProjectInputType){
        const {token} = await SharedProjectInput.parseAsync(payload);

        const result = await db.select().from(sharesTable).where(eq(sharesTable.shareToken, token));

        if(!result || result.length === 0 || !result[0]?.shareToken|| !result[0].isPublic){
            throw new Error("Token is invalid")
        }

        const projectInfo = await db.select().from(projectsTable).where(eq(projectsTable.id, result[0].projectsId));

        if(!projectInfo || projectInfo.length===0){
            throw new Error("Something went wrong")
        }
        return {
            projectInfo: projectInfo[0]!,
        }

}
}

export default ShareLinkService;