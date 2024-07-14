"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { LoadingSpinnerSVG, UploadSpinnerSVG } from "~/assets/spinners";
import { usePostHog } from "posthog-js/react";


// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}



export function SimpleUploadButton() {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => {
      posthog?.capture("uploading");
      toast(<div className="flex gap-2 items-center">
        <UploadSpinnerSVG />
        <span className="text-lg">Uploading...</span>
      </div>, {
        icon: "📤",
        duration: 100000,
        id: "uploading",
      });
    },
    onClientUploadComplete: () => {
      toast.dismiss("uploading");
      toast( <span className="text-lg">✅ Upload Complete</span>)
      router.refresh();
    },
    onUploadError: (error) => {
      toast.dismiss("uploading");
      toast(<span  className="text-lg">{`❌ Upload failed: ${error.message}`}</span>)
    }
  });

  

  return (
    <div>
      <label htmlFor={"upload-button"} className={"cursor-pointer"}>
        <UploadSVG />
      </label>
      <input
        id={"upload-button"}
        type="file"
        className={"sr-only"}
        {...inputProps}
      />
      {/* <LoadingSpinnerSVG />
      <UploadSpinnerSVG /> */}
    </div>
  );
}
