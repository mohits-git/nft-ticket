import { toast } from "sonner";

export async function uploadFile(file: File) {
  try {
    const data = new FormData();
    data.set("file", file);
    const uploadRequest = await fetch("/api/files", {
      method: "POST",
      body: data,
    });
    const ipfsUrl = await uploadRequest.json();
    return ipfsUrl;
  } catch (error) {
    // @ts-expect-error invalid type error
    toast.error("Failed to upload file", error.message);
    return null
  }
}
