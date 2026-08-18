import { uploadApi } from "@/lib/api/upload.api";

export type UploadedFile = {
  filename: string;
  originalname: string;
  path: string;
  size: number;
};

export type ResponseUpload = {
  key: string;
  url: string;
};

export type ResponseUploadMultiple = {
  message: string;
  files: UploadedFile[];
};

export type ResponseView = {
  url: string;
  expiresIn: number;
};

export type ResponseDelete = {
  message: string;
  key: string;
};


export async function uploadSingleFile(
  file: File,
  options?: { folder?: string; fileName?: string },
) {
  const formData = new FormData();
  formData.append("file", file);
  if (options?.folder) formData.append("folder", options.folder);
  if (options?.fileName) formData.append("fileName", options.fileName);

  const data = await uploadApi.post<ResponseUpload>(
    "upload-s3/single",
    { body: formData },
  ).json();

  return data;
}

export async function uploadMultipleFiles(
  files: File[],
  options?: { folder?: string },
) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  if (options?.folder) formData.append("folder", options.folder);

  const data = await uploadApi.post<ResponseUploadMultiple>(
    "upload-s3/multiple",
   { body: formData,}
  ).json();

  return data;
}


export async function getFileUrl(key: string, expiry?: number) {
  const data = await uploadApi.get<ResponseView>("upload-s3/view", {
    searchParams: { key, ...(expiry ? { expiry } : {}) },
  }).json();

  return data;
}

export async function deleteFile(key: string) {
  const data = await uploadApi.delete<ResponseDelete>("upload-s3", {
    json: { key },
  });

  return data;
}