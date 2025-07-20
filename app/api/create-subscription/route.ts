import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay"

export async function POST (req : NextRequest){
  const instance = new Razorpay({ 
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
  });

  const currentTime =  Math.floor(Date.now() / 1000);
  const startAt = currentTime + 3600;

  const result = await instance.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID!,
    customer_notify: true,
    quantity: 1,
    total_count: 12,
    start_at: startAt,
    addons: [],
    notes: {
      key1: "value3",
      key2: "value2"
    }
  });

  return NextResponse.json(result);
}