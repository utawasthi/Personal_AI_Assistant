import { mutation, query } from "./_generated/server";
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
          aiModelId : 'Google: Gemma 3n 2B',
          uid: args.uid,
        });
      })
    );
    return inserted;
  },
});

export const GetAllUserAssistants = query({
  args : {
    uid : v.id('users'),
  },
  handler : async (ctx , args) => {
    const result = await ctx.db.query('userAiAssistants').filter(q => q.eq(q.field('uid'), args.uid)).collect();

    return result;
  }
});

export const UpdateUserAiAssistant = mutation({
  args : {
    id : v.id('userAiAssistants'),
    userInstruction : v.string(),
    aiModelId : v.string(),
  },
  handler : async (ctx , args) => {
    const result = await ctx.db.patch(args.id , {
      aiModelId : args.aiModelId,
      userInstruction : args.userInstruction,
    });

    return result;
  }
})