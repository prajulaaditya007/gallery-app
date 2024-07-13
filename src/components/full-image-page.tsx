import { getImage } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

/**
 * Asynchronously renders the photo modal based on the provided photo ID.
 *
 * @param {string} params.id - The ID of the photo to be displayed.
 * @return {JSX.Element} The rendered photo modal.
 * @param props
 */
export default async function FullPageImageView(props: {
  id: number;
}): Promise<JSX.Element> {
  // Retrieve the image data based on the ID
  const image = await getImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  // Render the modal with the image
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-20xl flex overflow-hidden rounded-lg bg-opacity-90 shadow-lg">
        <div className="flex w-3/4 items-center justify-center bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            className="max-h-screen object-contain p-4"
            alt={image.name}
          />
        </div>
        <div className="flex w-1/5 flex-col p-4">
          <div className="mb-2 truncate border-b pb-2 text-center text-lg">
            {image.name}
          </div>
          <div className="mb-4 flex flex-row gap-2">
            <span>Uploaded By:</span>
            <span>{uploaderInfo.fullName}</span>
          </div>
          <div className="flex flex-row gap-2">
            <span>Created On:</span>
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
