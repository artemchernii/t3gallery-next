import Image from "next/image";
import { db } from "~/server/db";

const listOfImages = [
  "https://87lonw9uk3.ufs.sh/f/WlkP3zTxsMr2nwyrgdmTBsbIpjCaqyO9f0K57iEx64JWGrmn",
  "https://87lonw9uk3.ufs.sh/f/WlkP3zTxsMr28rKstdmEeaYoXqi7Hltg96nzD5bp1TfMFu3s",
  "https://87lonw9uk3.ufs.sh/f/WlkP3zTxsMr2TCvPqH5f0PpExwvoOhrtiymsn4bc38KHkDAq",
  "https://87lonw9uk3.ufs.sh/f/WlkP3zTxsMr26lXy4XZHDXAOzfaIGhbvrVdQuwc0F9Bnmx8l",
].map((image, index) => ({
  url: image,
  id: index + 1,
}));

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log("POSTS =>", posts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Hello <span className="text-[hsl(280,100%,70%)]">Gallery</span> in
          progress
        </h1>

        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.name}</h2>
          </div>
        ))}
        <hr />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {[...listOfImages, ...listOfImages].map((image) => (
            <Image
              key={Math.random() * 1000}
              src={image.url}
              alt={`Image ${image.id}`}
              width={150}
              height={150}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
