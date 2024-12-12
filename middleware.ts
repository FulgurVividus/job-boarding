import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/dashboard/company/:path*", "/dashboard/applicant/:path*"],
};
