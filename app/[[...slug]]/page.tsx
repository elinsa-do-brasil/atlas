import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { Clock9 } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewOptionsPopover } from "@/components/ai/page-actions";
import { getMDXComponents } from "@/components/mdx";
import { appName, createDocsUrl } from "@/lib/shared";
import { getPageImage, getPageMarkdownUrl, source } from "@/lib/source";

export default async function Page(props: PageProps<"/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).path;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
      tableOfContentPopover={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      {page.data.lastModified ? (
        <p className="text-sm text-fd-muted-foreground my-6 py-6 border-t border-t-fd-border border-b border-b-fd-border flex flex-row gap-2 items-center">
          <Clock9 aria-hidden="true" size={14} />
          {formatLastModified(page.data.lastModified, page.data.lastModifiedBy)}
        </p>
      ) : null}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const socialTitle = page.data.socialTitle ?? page.data.title;
  const socialDescription =
    page.data.socialDescription ?? page.data.description;
  const canonicalUrl = createDocsUrl(page.url);
  const image = getPageImage(page);

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type: "article",
      url: canonicalUrl,
      siteName: appName,
      locale: "pt_BR",
      images: [
        {
          url: image.url,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: image.url,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
  };
}

function formatLastModified(date: Date, author?: string) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const attribution = author ? ` por ${author}` : "";

  return `Atualizado em ${formattedDate}${attribution}`;
}
