import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

// Seule route API hors UploadThing : NextAuth impose ce handler.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
