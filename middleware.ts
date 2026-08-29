import { withAuth } from "next-auth/middleware";

// Protège tout /admin/* ; /admin/login reste public (sinon boucle de redirection).
export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: ["/admin", "/admin/((?!login$).*)"],
};
