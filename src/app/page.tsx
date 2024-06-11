import jsonData from "../utils/rows.json";
import {db} from "~/server/db";

interface Item {
  name: string;
  key: string;
  customId: string | null;
  url: string;
  size: number;
  uploadedAt: string;
}

const imageUrls = (jsonData: Item[]) => {
  return jsonData.map((item) => item.url);
};

const mockUrls = imageUrls(jsonData);
const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));



export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts)

  return (
    <main className="">
      <div className="flex flex-wrap gap-4 ">
        {posts.map((post) => (
            <div key={post.id}>{post.name}</div>
        ))}

        {mockImages.map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
