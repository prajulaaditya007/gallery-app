import { getImage } from "~/server/queries";

/**
 * Asynchronously renders the photo modal based on the provided photo ID.
 *
 * @param {object} params - Object containing the photo ID.
 * @param {string} params.id - The ID of the photo to be displayed.
 * @return {JSX.Element} The rendered photo modal.
 */
export default async function FullPageImageView(props: { id: number }) {
  // Retrieve the image data based on the ID
  const image = await getImage(props.id);

  // Render the modal with the image
  return (
    <div className="flex w-full h-full bg-green-500">
      <img src={image.url} className="w-96 object-contain" alt={image.name} />
    </div>
  );
}
