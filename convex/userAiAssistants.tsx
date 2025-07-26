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
        aiModelId: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const results = [];

    for (const record of args.records) {
      const existing = await ctx.db
        .query("userAiAssistants")
        .filter(q =>
          q.and(
            q.eq(q.field("uid"), args.uid),
            q.eq(q.field("title"), record.title)
          )
        )
        .first();

      if (existing) {
        results.push({
          title: record.title,
          status: "skipped",
          reason: "duplicate"
        });
      } else {
        const insertedId = await ctx.db.insert("userAiAssistants", {
          ...record,
          aiModelId: record.aiModelId ?? "Google: Gemma 3n 2B",
          uid: args.uid,
        });

        results.push({
          title: record.title,
          status: "inserted",
          id: insertedId,
        });
      }
    }

    return results;
  },
});

export const GetAllUserAssistants = query({
  args : {
    uid : v.id('users'),
  },
  handler : async (ctx , args) => {
    const result = await ctx.db.query('userAiAssistants').filter(q => q.eq(q.field('uid'), args.uid)).order('desc').collect();

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
});

export const DeleteAssistant = mutation({
  args : {
    id : v.id('userAiAssistants')
  },
  handler : async (ctx , args) => {
    await ctx.db.delete(args.id);
  }
});