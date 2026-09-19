import { GraphNode, GraphLink, RepoGraphData } from "@/types/graph";

export default function processGitHubTree(tree: any[]): RepoGraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const addedPaths = new Set<string>();

  if (!Array.isArray(tree)) return { nodes: [], links: [] };

  nodes.push({
    id: "root",
    name: "Root",
    path: "root",
    extension: "folder",
    size: 0,
  });
  addedPaths.add("root");

  tree.forEach((item) => {
    const parts = item.path.split("/");
    let currentPath = "";
    let parentPath = "root";

    parts.forEach((part: string, index: number) => {
      const isFile = index === parts.length - 1 && item.type === "blob";
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!addedPaths.has(currentPath)) {
        const ext = isFile ? part.split(".").pop() || "" : "folder";

        nodes.push({
          id: currentPath,
          name: part,
          path: currentPath,
          extension: ext,
          size: item.size || 0,
        });

        links.push({
          source: parentPath,
          target: currentPath,
        });

        addedPaths.add(currentPath);
      }

      parentPath = currentPath;
    });
  });

  return { nodes, links };
}