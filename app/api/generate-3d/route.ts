import { Generate3DRequest, Generate3DResponse } from "@/types/ai";
import { NextRequest, NextResponse } from "next/server";

const TRIPO_API_URL = "https://api.tripo3d.ai/v2/openapi/task";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.TRIPO_API_KEY;

    if (!apiKey) {
      return NextResponse.json<Generate3DResponse>(
        { success: false, error: 'کلید API در سرور یافت نشد (.env.local را چک کنید).' },
        { status: 500 }
      );
    }

    const body: Generate3DRequest = await req.json();
    const { prompt } = body;
    if (!prompt || prompt.trim() === "") {
      return NextResponse.json<Generate3DResponse>(
        { success: false, error: "prompt is empty .." },
        { status: 400 },
      );
    }

    // create  task

    const sampleModelUrl =
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb";

    return NextResponse.json<Generate3DResponse>({
      success: true,
      modelUrl: sampleModelUrl,
    });
  } catch (error) {
    console.log("server error :", error);
    return NextResponse.json<Generate3DResponse>(
      { success: false, error: "خطایی در پردازش سرور رخ داد ." },
      { status: 500 },
    );
  }
}
