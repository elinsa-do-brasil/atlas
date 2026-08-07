import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import type { Plugin } from "fumadocs-mdx";

const execFileAsync = promisify(execFile);
const authorCache = new Map<string, Promise<string | undefined>>();

export function lastModifiedAuthor(): Plugin {
  let cwd = process.cwd();

  return {
    name: "last-modified-author",
    "index-file": {
      generateTypeConfig() {
        return `{
  DocData: {
    docs: {
      /**
       * Author of the most recent Git commit that changed the document.
       */
      lastModifiedBy?: string;
    };
  };
}`;
      },
    },
    config() {
      const { root, workspace } = this.core;
      cwd = workspace ? path.resolve(root, workspace.dir) : root;
    },
    doc: {
      async frontmatter(data) {
        const author = await getLastModifiedAuthor(this.filePath, cwd);
        if (!author) return;

        return {
          ...data,
          lastModifiedBy: author,
        };
      },
    },
  };
}

function getLastModifiedAuthor(
  filePath: string,
  cwd: string,
): Promise<string | undefined> {
  const key = `${cwd}\0${filePath}`;
  const cached = authorCache.get(key);
  if (cached) return cached;

  const author = readLastModifiedAuthor(filePath, cwd);
  authorCache.set(key, author);
  return author;
}

async function readLastModifiedAuthor(
  filePath: string,
  cwd: string,
): Promise<string | undefined> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["log", "-1", "--format=%an", "--", path.relative(cwd, filePath)],
      { cwd, encoding: "utf8" },
    );
    return stdout.trim() || undefined;
  } catch {
    return undefined;
  }
}
