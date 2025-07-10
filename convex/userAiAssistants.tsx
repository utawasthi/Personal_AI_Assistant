import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const InsertSelectedAssistants = mutation({
  args: {
    uid: v.id("users"),
    records: v.array(
      v.object({
        id: v.number(),
        name: v.string(),
        title: v.string(),
        image: v.string(),
        instruction: v.string(),
        userInstruction: v.string(),
        sampleQuestions: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const inserted = await Promise.all(
      args.records.map(async (record) => {
        return await ctx.db.insert("userAiAssistants", {
          ...record,
          uid: args.uid,
        });
      })
    );
    return inserted;
  },
});
