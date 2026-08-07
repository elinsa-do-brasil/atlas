export const appName = "Docs da Elinsa";
export const docsRoute = "/";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

const fallbackDocsOrigin = "https://docs.elinsadobrasil.com.br";

function normalizeOrigin(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function getDocsOrigin() {
  const explicitDocsUrl = process.env.NEXT_PUBLIC_DOCS_URL;
  if (explicitDocsUrl) return normalizeOrigin(explicitDocsUrl);

  return fallbackDocsOrigin;
}

export const docsOrigin = getDocsOrigin();

export function createDocsUrl(path: string) {
  return new URL(path, docsOrigin).toString();
}

export function absolutizeDocsMarkdownLinks(markdown: string, basePath = "/") {
  const baseUrl = createDocsUrl(
    basePath.endsWith("/") ? basePath : `${basePath}/`,
  );

  return markdown.replace(
    /(\[[^\]]+\]\()((?!https?:|mailto:|#)[^)]+)(\))/g,
    (_match, prefix: string, href: string, suffix: string) => {
      const url = href.startsWith("/")
        ? createDocsUrl(href)
        : new URL(href, baseUrl).toString();

      return `${prefix}${url}${suffix}`;
    },
  );
}

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "elinsa-do-brasil",
  repo: "polaris",
  branch: "main",
};
