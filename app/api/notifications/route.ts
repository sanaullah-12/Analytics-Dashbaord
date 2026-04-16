import { NextRequest, NextResponse } from "next/server";

import { generateNotifications } from "@/utils/mockData";
import { UserRole } from "@/utils/types";

export async function GET(request: NextRequest) {
  const role = (request.nextUrl.searchParams.get("role") ?? "admin") as UserRole;

  if (!["admin", "viewer"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const data = generateNotifications(role);
  return NextResponse.json({ data });
}
