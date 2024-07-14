import { Modal } from "~/app/@modal/(.)img/[id]/modal";
import FullPageImageView from "~/common/full-image-page";

/**
 * Asynchronously renders the photo modal based on the provided photo ID.
 *
 * @param {object} params - Object containing the photo ID.
 * @param {string} params.id - The ID of the photo to be displayed.
 * @return {JSX.Element} The rendered photo modal.
 */
export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  // Convert the photo ID to a number
  const idIsNum = Number(photoId);

  // Throw an error if the ID is not a number
  if (Number.isNaN(idIsNum)) throw new Error("Invalid ID");

  // Render the modal with the image
  return (
    <Modal>
      <FullPageImageView photoId={idIsNum} />
    </Modal>
  );
}
