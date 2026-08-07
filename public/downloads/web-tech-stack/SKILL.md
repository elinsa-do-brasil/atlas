---
name: web-tech-stack
description: Padronizacao de stack para projetos web corporativos da Elinsa. Use quando o usuario estiver planejando, iniciando, revisando, auditando ou documentando sites, portais internos, aplicacoes acessadas pelo navegador, formularios, dashboards, areas restritas, CMS, automacoes integradas ao ambiente digital ou decisoes de tecnologia para web; tambem use para justificar excecoes ao padrao e preparar checklist de aprovacao de TI.
---

# Web Tech Stack

Use esta skill para transformar a politica de padronizacao web da Elinsa em decisoes praticas de arquitetura, implementacao e aprovacao. Priorize uma stack comum, mantida pela empresa e facil de operar.

## Fluxo de decisao

1. Identifique o tipo de solucao: site publico, portal interno, area restrita, formulario, painel, CMS, automacao ou sistema web.
2. Levante usuarios, dados tratados, necessidade de login, permissoes, edicao de conteudo, integracoes e criticidade operacional.
3. Comece pela stack recomendada abaixo e remova pecas que nao sao necessarias ao escopo.
4. Se uma tecnologia fora do padrao parecer necessaria, documente motivo, risco, custo de manutencao, plano de saida e quem aprova.
5. Antes de producao, inclua revisao da TI, repositorio corporativo, gestao de segredos, dominio/hospedagem corporativos e checklist de seguranca.

## Stack recomendada

| Tecnologia | Usar para | Preferir quando |
|---|---|---|
| Next.js | Base de sites, portais e sistemas web. | A solucao sera acessada por link, publicada como site ou organizada por rotas/paginas. |
| React | Componentes e interacoes de tela. | Houver formularios, filtros, listas, paineis, botoes ou estados de interface. |
| TypeScript | Codigo revisavel e mais seguro. | O projeto sera mantido pela empresa, por fornecedor ou por mais de uma pessoa. |
| Payload CMS | Edicao de conteudo por painel. | Pessoas nao tecnicas precisarem atualizar paginas, noticias, documentos ou cadastros editoriais. |
| PostgreSQL | Armazenamento de dados estruturados. | Houver cadastros, solicitacoes, historicos, respostas, configuracoes ou trilhas de auditoria. |
| Drizzle ORM | Organizacao e evolucao do banco. | O banco precisar de schema, migracoes e revisao de mudancas em codigo. |
| Better Auth | Login, sessoes e permissoes. | Existirem areas restritas, perfis de acesso, times ou permissoes diferentes. |
| Tailwind CSS | Aparencia consistente. | A interface precisar seguir o padrao visual da Elinsa sem CSS avulso espalhado. |
| shadcn/ui | Componentes de interface. | Houver botoes, campos, tabelas, menus, popovers, dialogs, cards ou confirmacoes. |
| Infraestrutura corporativa | Publicacao e operacao segura. | A solucao passar de teste para uso real da empresa. |

## Regras praticas

- Use Next.js, React e TypeScript como base inicial para novos projetos web, salvo justificativa clara.
- Use Payload CMS apenas quando houver necessidade real de edicao de conteudo sem mexer em codigo.
- Use PostgreSQL e Drizzle quando houver dados persistentes; nao crie banco para paginas puramente estaticas.
- Use Better Auth quando existir login, permissao, area interna ou diferenca de acesso entre usuarios.
- Use Tailwind CSS e shadcn/ui para manter componentes previsiveis, acessiveis e consistentes.
- Verifique a documentacao oficial antes de citar sintaxe, comandos ou configuracoes atuais de bibliotecas.
- Em repos existentes, leia `package.json`, estrutura de rotas, componentes e padroes locais antes de sugerir mudancas.

## O que evitar

Evite aprovar ou implementar solucoes web corporativas baseadas em:

- contas pessoais para hospedagem, banco, dominio, e-mail ou servicos externos;
- codigo sem repositorio corporativo;
- ferramentas fechadas sem exportacao, backup ou plano de substituicao;
- dados sensiveis gravados no codigo, no navegador ou em planilhas pessoais;
- login, permissoes ou compartilhamento de links sem controle da empresa;
- dependencias sem licenca clara, sem manutencao ou incompativeis com uso corporativo;
- segredos em arquivos versionados, exemplos publicos, builds de frontend ou mensagens de erro.

## Checklist de aprovacao

Antes de recomendar producao, confirme:

- objetivo da solucao e responsavel interno;
- repositorio corporativo e historico de mudancas;
- dados tratados, classificacao de sensibilidade e necessidade de retencao;
- autenticacao, permissoes e usuarios administradores;
- variaveis de ambiente e segredos fora do codigo;
- dominio, hospedagem, banco e servicos externos sob controle da empresa;
- backup, logs, monitoramento e plano de manutencao;
- documentacao minima para operar, atualizar e substituir a solucao;
- revisao e aprovacao da TI.

## Formato recomendado de resposta

Ao orientar um projeto web, responda de forma objetiva:

1. **Recomendacao de stack**: liste as tecnologias que entram e as que ficam fora.
2. **Justificativa**: explique por que cada peca e necessaria para o caso.
3. **Riscos e excecoes**: destaque desvios do padrao, dependencias externas e cuidados de seguranca.
4. **Proximos passos**: informe o que precisa ser validado antes de desenvolvimento ou producao.

## Exemplo

Pedido: "Precisamos de um portal interno com login, formularios e painel para acompanhar solicitacoes."

Resposta esperada: recomendar Next.js, React, TypeScript, Better Auth, PostgreSQL, Drizzle, Tailwind CSS e shadcn/ui; considerar Payload CMS apenas se o conteudo do portal precisar ser editado por usuarios administrativos; exigir repositorio corporativo, variaveis de ambiente, controle de permissao e revisao da TI antes de producao.
