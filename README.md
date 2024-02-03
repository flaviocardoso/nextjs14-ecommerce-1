This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Projeto desenvolvido por Coding in Flow.
Um curso no Youtube (uma aplicação ecommerce).

-- Nexjs 14 utilizado Typescript, acões de servidor (client, server)
-- TailwindCSS theme daisyUI
-- ORM : Prisma com mysql
-- Serviço de autenticação: Google, next-auth

Components:
  - Botão de submit de formulário
  - Barra de páginação com daisyUI
  - tag de preço
  - carrinho de produtos
  - navegação: barra de navegação ( logo, campo de busca, carrinho de compras, botão de usuário para login or logout)

Páginas:
  - adição de produtos
  - carrrinho
  - produtos
  - burcar
  - costumização de páginas de erro e não encontrada

  página de adição de produtos:
    - adiciona produtos para a lista de produtos

  página de carrinho:
    - selecionar quantidade de produto
    - cartão para entrada de produto ( useTransition - loading ), atualização de items no produto
    - mostrar o total

  página de produtos:
    - pega o id do produto
    - cria o carrinho se não tiver
    - cartão de produto
    - adiciona produto no carrinho

  página de busca:
    - busca produtos na query

Autenticação: (NextAuth)
  - Google privider
  - Prisma Adapter
  - Callbacks session (types - session user id)
  - events - signIn, concatenando o carrinho anomimo com o carrinho logado

libs:
  - acões de servidor para carrinho: getCart(), createCart()
  - configuração de cliente prisma , extensão do prisma
  - formatos - dinheiro
  - env com zod

prisma:
  - migrações
  - esquemas
