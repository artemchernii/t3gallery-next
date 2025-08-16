import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const ImagesGallery = async () => {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Hello <span className="text-[hsl(280,100%,70%)]">Gallery</span> in
        progress
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url.trimEnd()}
            alt={`Image ${image.id}`}
            width={150}
            height={150}
          />
        ))}
      </div>
    </div>
  );
};

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <SignedOut>
          Login to see the images
          <SignInButton>
            <button className="text-ceramic-white h-10 cursor-pointer rounded-full bg-[#6c47ff] px-4 text-sm font-medium sm:h-12 sm:px-5 sm:text-base">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>ImagesGallery</SignedIn>
      </div>
    </main>
  );
}
