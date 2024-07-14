import "server-only";
import { db } from "~/server/db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  return db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
}

/**
 * Retrieves an image from the database by its ID.
 *
 * @param {number} id - The ID of the image to retrieve.
 * @return {Promise<Image>} A promise that resolves to the retrieved image, or throws an error if the image is not found.
 */

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "Image Deleted",
      properties: {
        imageId: id
      }
    })

  // revalidatePath("/");
  redirect("/")
}
