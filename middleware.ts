import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    return;
  },
  {
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    "/users/:path*", // Match all routes starting with /users and pass the path as a parameter
    "/submit-listing",
    "/account/:path*", // Match all routes starting with /account and pass the path as a parameter
  ],
};
