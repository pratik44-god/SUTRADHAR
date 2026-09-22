import {db, eq} from "@repo/database/";
import { sharesTable } from "@repo/database/schema";
import { CreateShareLinkInputType } from "./model";
import crypto from "crypto";

class ShareLinkService {
    public async createShareLink(payload: CreateShareLinkInputType){
        const {projecstId, creatorsId} = payload;

        const shareToken = crypto.randomBytes(32).toString("hex");

        const shareLinkResult = await db.insert(sharesTable).values({
            projectsId: projecstId,
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

}

export default ShareLinkService;