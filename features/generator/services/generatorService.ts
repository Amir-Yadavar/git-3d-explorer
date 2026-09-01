import { Generate3DRequest, Generate3DResponse } from "@/types/ai";

export async function generate3dModel(prompt: string): Promise<string> {
  const res = await fetch("/api/generate-3d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt } as Generate3DRequest),
  });

  const data: Generate3DResponse = await res.json();
  if (!res.ok || !data.success || !data.modelUrl) {
    throw new Error(data.error || "خطا در دریافت مدل سه‌بعدی از سرور");
  }

  return data.modelUrl;
}
