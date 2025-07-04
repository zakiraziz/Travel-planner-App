import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply custom config
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    callbackUrl: process.env.NEXTAUTH_URL,
  },

  // Add middleware for authentication
  middleware: async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // You can add additional user validation here
    if (!session.user?.email?.endsWith('@yourdomain.com')) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Return user info that will be available in onUploadComplete
    return { userId: session.user.id };
  },

  // Custom error handling
  onError: (error) => {
    console.error("UploadThing error:", error);
    
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
    
    return new NextResponse("Internal Server Error", { status: 500 });
  },

  // Custom upload complete handler
  onUploadComplete: async ({ metadata, file }) => {
    console.log(`Upload complete for userId: ${metadata?.userId}`);
    console.log("File url:", file.url);
    
    // Here you could update your database with the file info
    // await prisma.file.create({
    //   data: {
    //     url: file.url,
    //     userId: metadata.userId,
    //     key: file.key,
    //     name: file.name,
    //   },
    // });
  },
});
