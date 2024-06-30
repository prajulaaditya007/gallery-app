"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/app/utils/uploadthing";
import { useRouter } from "next/navigation";

function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Wall Gallery</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={() => {
              router.refresh();
            }}
          />{" "}
          {/* imageUploader came from api/uploadthing/core.ts */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
