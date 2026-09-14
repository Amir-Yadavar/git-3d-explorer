const validExtensions = ["js", "jsx", "ts", "tsx", "css", "json", "md", "html"];

export default function processGitHubTree(tree: any[]) {
  const nodes: any[] = [];
  const links: any[] = [];

  if (!Array.isArray(tree)) {
    return { nodes: [], links: [] };
  }
  tree.forEach((item) => {
    if (item.type === "blob") {
      const ext = item.path.split(".").pop() || "";

      if (validExtensions.includes(ext)) {
        nodes.push({
          id: item.path,
          name: item.path.split("/").pop(),
          path: item.path,
          extension: ext,
          size: item.size,
        });
      }
    }
  });

  nodes.forEach((node) => {
    const parts = node.path.split("/");
    if (parts.length > 1) {
      const parentPath = parts.slice(0, -1).join("/");
      const sibling = nodes.find(
        (n) => n.path.startsWith(parentPath) && n.id !== node.id,
      );
      if (sibling) {
        links.push({
          source: node.id,
          target: sibling.id,
        });
      }
    }
  });

  return { nodes, links };
}
