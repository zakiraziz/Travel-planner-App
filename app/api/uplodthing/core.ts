import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Single image upload with strict validation
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
      fileTypes: ["image/png", "image/jpeg", "image/webp"],
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();

      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }

      // Additional user validation
      if (!session.user.emailVerified) {
        throw new UploadThingError("Please verify your email first");
      }

      // Return metadata that will be available in onUploadComplete
      return { 
        userId: session.user.id,
        userEmail: session.user.email,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`Upload complete for user ${metadata.userId}`);
      console.log("File URL:", file.url);
      
      // Here you could:
      // 1. Add to your database
      // 2. Trigger downstream processing
      // 3. Send notifications
    }),

  // PDF upload route with multiple files
  documentUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 5,
    },
  })
    .input(z.object({ documentType: z.enum(["contract", "invoice", "other"]) }))
    .middleware(async ({ input, req }) => {
      const session = await auth();
      
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }

      return { 
        userId: session.user.id,
        documentType: input.documentType,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`Uploaded ${metadata.documentType} by ${metadata.userId}`);
    }),

  // Video upload route with custom validation
  videoUploader: f({
    video: {
      maxFileSize: "256MB",
      maxFileCount: 1,
      fileTypes: ["video/mp4", "video/webm"],
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();
      
      // Only allow premium users to upload videos
      if (!session?.user?.isPremium) {
        throw new UploadThingError("Premium feature");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Could trigger video processing pipeline here
      console.log(`Video uploaded by ${metadata.userId}`);
    }),

  // Avatar upload with automatic resizing
  avatarUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
      dimensions: {
        min: { width: 200, height: 200 },
        max: { width: 2000, height: 2000 },
      },
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();
      
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Could generate thumbnails here
      console.log(`New avatar for user ${metadata.userId}`);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
