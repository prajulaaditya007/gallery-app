import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idIsNum = Number(photoId);

  if (Number.isNaN(idIsNum)) throw new Error("Invalid ID");
  const image = await getImage(idIsNum);
  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}
