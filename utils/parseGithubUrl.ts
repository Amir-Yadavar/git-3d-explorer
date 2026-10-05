export interface RepoInfo {
  owner: string;
  repo: string;
}

export function parseGithubUrl(input: string): RepoInfo | null {
  // remove more space
  let cleanInput = input.trim();

  // remove .git from end url
  if (cleanInput.endsWith(".git")) {
    cleanInput = cleanInput.slice(0, -4);
  }

  
  const match = cleanInput.match(/(?:github\.com\/)?([^\/]+)\/([^\/?#]+)/);

  if (match && match[1] && match[2]) {
    return {
      owner: match[1],
      repo: match[2],
    };
  }

  return null;
}