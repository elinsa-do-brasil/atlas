import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { DocsHeader } from "@/components/docs-header";
import { gitConfig } from "./shared";

export const translations = {
  displayName: "Português",
  "Copy Markdown(page actions)": "Copiar conteúdo",
  "Open(page actions)": "Tem dúvidas sobre este conteúdo?",
  "Open in ChatGPT(page actions)": "Perguntar ao ChatGPT",
  "Open in Claude(page actions)": "Perguntar ao Claude",
  "Search(search dialog)": "Pesquisar",
  "Search(search trigger)": "Pesquisar",
  "On this page(table of contents)": "Nesta página",
  "No results found(search dialog)": "Nenhum resultado encontrado",
  "Back to Home(404 page)": "Voltar para a página inicial",
  "Last updated on(page footer)": "Atualizado pela última vez em",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: <DocsHeader />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
