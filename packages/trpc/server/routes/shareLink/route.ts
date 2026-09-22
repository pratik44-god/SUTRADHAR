import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { shareLinkService } from "../../services";
import { CreateShareLinkInputModel, CreateShareLinkOutputModel } from "./model";
    
const TAGS = ["ShareLink"];
const getPath = generatePath("/shareLink");
export const shareLinkRouter = router({
  createShareLink: authenticatedProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/createShareLink"),
      tags: TAGS,
    },
  })
    .input(CreateShareLinkInputModel)
    .output(CreateShareLinkOutputModel)
    .mutation(async ({ ctx, input }) => {
      const { projecstId } = input;
        const shareLink = await shareLinkService.createShareLink({
            projecstId,
            creatorsId: ctx.user.id,
        });
        return {
            id: shareLink.id,
            shareToken: shareLink.shareToken,
        };
    }
    ),

});