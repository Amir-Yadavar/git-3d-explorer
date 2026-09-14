import processGitHubTree from "@/features/parsers/github-tree";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, branch = "main" } = body || {};

    if (!owner || !repo) {
      return NextResponse.json({
        error: "owner or repo is required ..",
      });
    }

    // github url
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

    const res = await fetch(githubUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Git3D-Explorer",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!res.ok) {
      if (branch === "main") {
        const fallbackRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`,
        );
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          return processGitHubTree(fallbackData.tree);
        }
      }
      throw new Error(`error for get info from github ..: ${res.statusText}`);
    }

    const data = await res.json();
    const graphData = processGitHubTree(data.tree);

    return NextResponse.json(graphData);
  } catch (error: any) {
    console.log("Github Api error : ", error);
    return NextResponse.json({
      status: 500,
      error: error.message || "error in proccess repo ..",
    });
  }
}
