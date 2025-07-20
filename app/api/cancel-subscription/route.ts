import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// POST /api/subscription/cancel
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { subscriptionId, cancelAtCycleEnd = false } = body;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "subscriptionId is required" },
        { status: 400 }
      );
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET_KEY!,
    });

    // Cancel subscription
    const result = await instance.subscriptions.cancel(
      subscriptionId,
      cancelAtCycleEnd
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json({ 
        error: error.message || "Something went wrong" 
      },
      { 
        status: 500 
      }
    );
  }
}
