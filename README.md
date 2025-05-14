# Product Manager
![image](https://github.com/user-attachments/assets/9e65deca-4f76-48ae-9d1f-95a20867f183)

Confira em: https://challenge-product-manager.vercel.app/products

## ✨ Sobre o Projeto

O **Product Manager** é uma aplicação web para gerenciamento de produtos, desenvolvida com foco em boas práticas de frontend moderno. Permite listar, filtrar, cadastrar e visualizar produtos de tecnologia, com uma interface responsiva e amigável.

O projeto foi criado como desafio técnico para demonstrar habilidades com Next.js, gerenciamento de estado, consumo de APIs, estilização com Tailwind CSS, componentes shadcn-ui e testes.

---

## 🚀 Tecnologias & Bibliotecas

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (componentes UI modernos)
- [Zustand](https://zustand-demo.pmnd.rs/) (gerenciamento de estado global)
- [json-server](https://github.com/typicode/json-server) (API fake REST)
- [Sonner](https://sonner.emilkowal.ski/) (notificações)
- [Lucide React](https://lucide.dev/) (ícones)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) (testes)

---

## 🖥️ Funcionalidades

- Listagem de produtos com paginação
- Filtros por nome, faixa de preço (slider e input), ordenação
- Cadastro de novos produtos
- Visualização de imagem (preview)
- Interface responsiva e acessível
- Feedback visual com loading e notificações
- Componentização e organização de código

---

## ⚡ Como rodar localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/juniorpaiva95/challenge-product-manager.git
   cd challenge-product-manager
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Rode o json-server (API fake)**
   ```bash
   npm run json-server
   # A API estará em http://localhost:3001/products
   ```

4. **Rode o projeto Next.js**
   ```bash
   npm run dev
   # Acesse http://localhost:3000
   ```

---

## 📦 Scripts disponíveis

- `npm run dev` — inicia o servidor Next.js em modo desenvolvimento
- `npm run build` — build de produção
- `npm run start` — inicia o servidor em produção
- `npm run json-server` — inicia a API fake com json-server

---

## 🛠️ Pontos de melhoria & ideias futuras

- Adicionar testes automatizados (unitários e de integração)
- Implementar autenticação e autorização
- Adicionar edição e exclusão de produtos
- Melhorar UX do formulário (validação com YUP ou ZOD, upload de imagem)
- Internacionalização (i18n)
- Melhorar acessibilidade (a11y)

---

## 📸 Screenshots

| Listagem de Produtos | Filtros & Cadastro | Responsivo |
|----------------------|-------------------|------------|
| ![image](https://github.com/user-attachments/assets/9e65deca-4f76-48ae-9d1f-95a20867f183) | ![image](https://github.com/user-attachments/assets/b3419eb7-d266-423e-a3dd-b22c116bb977) | ![image](https://github.com/user-attachments/assets/710fdc17-8b93-4ef2-85fd-4b8594762408)
