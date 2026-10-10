import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { owner, repo, filePath } = body || {};

    // if body incomplete ..
    if (!owner || !repo || !filePath) {
      return NextResponse.json({
        error: "The file specifications are incomplete. ..",
        status: 400,
      });
    }

    const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;

    // get content for main branch
    let fileRes = await fetch(rawFileUrl, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    // get content for master branch

    if (!fileRes.ok) {
      const fallbackUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${filePath}`;
      fileRes = await fetch(fallbackUrl, {
        headers: {
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      });
    }

    // if get content error
    if (!fileRes.ok) {
      return NextResponse.json({
        error: "get content from github acccure error ..",
        status: 404,
      });
    }

    const codeContent = await fileRes.text();
    const truncatedCode = codeContent.slice(0, 15000);

    const freeModels = ["openrouter/free"];

    let aiRes: Response | null = null;
    let lastErrorDetails = "";

    for (const modelId of freeModels) {
      try {
        // ارسال از طریق endpoint پروکسی آزاد جهت دور زدن تحریم IP
        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "Git3D Code Visualizer",
            },
            body: JSON.stringify({
              model: modelId,
              messages: [
                {
                  role: "system",
                  content:
                    "تو یک دستیار ارشد معماری نرم‌افزار هستی. فایل کدی که به تو داده می‌شود را بررسی کن و یک تحلیل بسیار کوتاه، دقیق و ساختاریافته به زبان فارسی شامل: ۱) هدف اصلی فایل، ۲) ورودی‌ها/خروجی‌ها یا متدهای کلیدی، ۳) نکته معماری یا امنیت ارائه بده.",
                },
                {
                  role: "user",
                  content: `مسیر فایل: ${filePath}\n\nکد سورس:\n\`\`\`\n${truncatedCode}\n\`\`\``,
                },
              ],
            }),
          },
        );

        if (response.ok) {
          aiRes = response;
          break;
        } else {
          const errText = await response.text();
          lastErrorDetails = `Model ${modelId} failed (${response.status}): ${errText}`;
        }
      } catch (err: any) {
        lastErrorDetails = err.message;
      }
    }

    if (!aiRes) {
      throw new Error(`خطا در ارتباط: ${lastErrorDetails}`);
    }

    const data = await aiRes.json();
    const analysis =
      data.choices?.[0]?.message?.content || "تحلیلی دریافت نشد.";

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: error.message || "خطا در تحلیل هوش مصنوعی." },
      { status: 500 },
    );
  }
}
