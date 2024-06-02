import Link from "next/link";
import jsonData from "../utils/rows.json";

interface Item {
  name: string;
  key: string;
  customId: string | null;
  url: string;
  size: number;
  uploadedAt: string;
}

const imageUrls = (jsonData: Item[]) => {
  const mockUrls: string[] = jsonData.map((item) => item.url);
  return mockUrls;
};
const mockUrls = imageUrls(jsonData);
const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
