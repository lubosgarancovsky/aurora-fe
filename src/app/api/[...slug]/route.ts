import { routeHandler } from "@/utils/api";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  return routeHandler(req);
}

export function POST(req: NextRequest) {
  return routeHandler(req);
}

export function PUT(req: NextRequest) {
  return routeHandler(req);
}

export function DELETE(req: NextRequest) {
  return routeHandler(req);
}
