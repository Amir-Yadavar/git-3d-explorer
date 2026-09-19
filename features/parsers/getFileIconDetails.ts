export default function getFileIconDetails(ext: string, isFolder: boolean) {
  if (isFolder) return { color: "#EAB308", symbol: "📁" }; // Yellow Folder

  const lowerExt = ext.toLowerCase();

  switch (lowerExt) {
    // Web / JS Ecosystem
    case "js":
    case "cjs":
    case "mjs":
      return { color: "#F7DF1E", symbol: "⚡" }; // Official JS Yellow
    case "ts":
    case "mts":
      return { color: "#3178C6", symbol: "🔷" }; // TS Blue
    case "jsx":
    case "tsx":
      return { color: "#61DAFB", symbol: "⚛️" }; // React Cyan
    case "html":
      return { color: "#E34F26", symbol: "🌐" };
    case "css":
    case "scss":
    case "sass":
    case "less":
      return { color: "#1572B6", symbol: "🎨" };

    // Backend / Enterprise
    case "cs":
      return { color: "#512BD4", symbol: "🎯" }; // C# / .NET Purple
    case "csproj":
    case "sln":
      return { color: "#178600", symbol: "📦" }; // .NET Green
    case "py":
    case "pyw":
      return { color: "#3776AB", symbol: "🐍" }; // Python Blue
    case "java":
    case "jar":
      return { color: "#ED8B00", symbol: "☕" }; // Java Orange
    case "go":
      return { color: "#00ADD8", symbol: "🐹" }; // Go Cyan
    case "rs":
      return { color: "#DEA584", symbol: "🦀" }; // Rust Crab
    case "php":
      return { color: "#777BB4", symbol: "🐘" };
    case "rb":
      return { color: "#CC342D", symbol: "💎" }; // Ruby Red
    case "cpp":
    case "c":
    case "h":
    case "hpp":
      return { color: "#00599C", symbol: "⚙️" };

    // Config / Docs / Data
    case "json":
    case "json5":
      return { color: "#F1E05A", symbol: "🔧" };
    case "yml":
    case "yaml":
      return { color: "#CB171E", symbol: "⚙️" };
    case "md":
    case "mdx":
      return { color: "#083344", symbol: "📝" };
    case "env":
    case "gitignore":
    case "dockerignore":
      return { color: "#64748B", symbol: "🔒" };
    case "dockerfile":
      return { color: "#2496ED", symbol: "🐳" };

    default:
      return { color: "#94A3B8", symbol: "📄" };
  }
}