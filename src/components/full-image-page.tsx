import { getImage } from "~/server/queries";

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

  // Render the modal with the image
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.url}
          className="flex-shrink object-contain"
          alt={image.name}
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
