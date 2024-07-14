import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "~/app/_components/simple-upload-button";

function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Wall Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          {/* imageUploader came from api/uploadthing/core.ts */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default TopNav;
