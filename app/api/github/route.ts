import processGitHubTree from "@/features/parsers/github-tree";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, branch = "main" } = body || {};

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "owner and repo are required" },
        { status: 400 }
      );
    }

    // تنظیم هدرهای مشترک جهت ارسال توکن و مشخصات کلاینت
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Git3D-Explorer",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    };

    // درخواست اول
    let githubUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    let res = await fetch(githubUrl, { headers });

    // اگر branch اصلی پیدا نشد و main بود، تلاش مجدد روی branch موسوم به master
    if (!res.ok && branch === "main") {
      const fallbackUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`;
      res = await fetch(fallbackUrl, { headers });
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch repo info from GitHub: ${res.statusText}`);
    }

    const data = await res.json();
    const graphData = processGitHubTree(data.tree);

    return NextResponse.json(graphData);
  } catch (error: any) {
    console.error("Github Api Error:", error);
    return NextResponse.json(
      { error: error.message || "Error processing repository" },
      { status: 500 }
    );
  }
}