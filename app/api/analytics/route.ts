import { NextRequest, NextResponse } from "next/server";

import { generateAnalytics } from "@/utils/mockData";
import { DateRangeOption } from "@/utils/types";

export async function GET(request: NextRequest) {
  const range = (request.nextUrl.searchParams.get("range") ?? "30d") as DateRangeOption;
  const customDays = Number(request.nextUrl.searchParams.get("customDays") ?? "14");

  if (!["7d", "30d", "custom"].includes(range)) {
    return NextResponse.json({ error: "Invalid range" }, { status: 400 });
  }

  const data = generateAnalytics(range, customDays);
  return NextResponse.json({ data });
}
