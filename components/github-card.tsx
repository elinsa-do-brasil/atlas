import { cn } from "@/lib/cn";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

import { FaGithub } from "react-icons/fa";
import { BookOpen, ExternalLink } from "lucide-react";
import { cacheLife } from "next/cache";

export type DownloadableFileProps = {
  href: string;
  title: string;
  description: string;
  className?: string;
  owner: string;
  repo: string;
  docs?: string;
};

async function getDataFromGitHub(owner: string, repo: string) {
  "use cache";
  cacheLife("hours");

  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // o github exige um User-Agent para chamadas de API
        "User-Agent": "elinsa-docs-site",
      },
    });

    // verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      throw new Error(`Erro na API do GitHub: ${response.status}`);
    }

    // transforma a resposta em um objeto JSON
    const data = await response.json();

    const estrelas = data.stargazers_count; // a chave que contém as estrelas é "stargazers_count"
    const forks = data.forks_count; // a chave que contém os forks é "forks_count"

    const dados = {
      stars: estrelas.toLocaleString(), // formata o número de estrelas com separadores de milhar
      forks: forks.toLocaleString(), // formata o número de forks com separadores de milhar
    };

    return dados;
  } catch (error) {
    console.error(
      "Falha ao buscar os dados:",
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export async function GithubCard({
  href,
  title,
  description,
  owner,
  className,
  repo,
  docs,
}: DownloadableFileProps) {
  const repoStats = await getDataFromGitHub(owner, repo);

  return (
    <Card
      className={cn(
        "not-prose my-6 w-full max-w-sm rounded-2xl p-2",
        className,
      )}
    >
      <CardContent className="flex max-w-full flex-col gap-4 p-3">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-md border bg-fd-background">
            <FaGithub size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="m-0 text-sm font-semibold leading-6 text-fd-foreground">
              {title} <span className="text-fd-muted-foreground">• {owner}/{repo}</span>
            </p>
            {repoStats && (
              <p className="m-0 text-sm leading-6 text-fd-muted-foreground">
                {repoStats.stars} estrelas • {repoStats.forks} forks
              </p>
            )}
          </div>
        </div>

        <p className="m-0 text-sm leading-6">{description}</p>
      </CardContent>

      <CardFooter className="px-3 py-2 flex gap-2">
        <a
          className={cn(
            buttonVariants({ size: "sm", variant: "primary" }),
            "mt-2 w-full shrink-0 gap-2 px-4 py-2 no-underline hover:no-underline sm:w-auto [&_svg]:size-4",
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink />
          Abrir
        </a>

        {docs && (
          <a
            className={cn(
              buttonVariants({ size: "sm", variant: "secondary" }),
              "mt-2 w-full shrink-0 gap-2 px-4 py-2 no-underline hover:no-underline sm:w-auto [&_svg]:size-4",
            )}
            href={docs}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BookOpen />
            Documentação
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
