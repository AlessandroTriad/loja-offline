# 🛍️ Loja Offline (TypeScript + Dexie + Bootstrap + Vite)

Uma aplicação 100% frontend e offline, construída em **TypeScript**, usando **IndexedDB** via **Dexie.js**, com layout em **Bootstrap 5**.

---

## 🚀 Tecnologias Utilizadas

- **TypeScript**
- **Vite** (dev server e build)
- **Dexie.js** (IndexedDB)
- **Bootstrap 5**
- **HTML5 + CSS3**
- **LocalStorage** (para usuário)

---

## ⚙️ Como Rodar Localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O projeto abrirá em **http://localhost:5173**

3. Build de produção:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧠 Explicação Técnica

### IndexedDB com Dexie.js

O **IndexedDB** é o banco de dados nativo dos navegadores, ideal para aplicações offline.  
O **Dexie.js** abstrai a API nativa, tornando as operações com o banco muito mais simples e seguras.

### Estrutura do banco

- **produtos** → catálogo estático inicializado automaticamente
- **pedidos** → histórico dos pedidos do usuário
- **userId** → identificação do usuário gerado automaticamente

### Usuário

- Gerado com `crypto.randomUUID()` e armazenado no `localStorage`.
- Evita necessidade de login e mantém histórico local por usuário.

### Responsividade

- Layout fluido com Bootstrap.
- Cards responsivos (catálogo e pedidos).

---

## 💡 Objetivos do Projeto

- Listagem de produtos do banco local.
- Adição e remoção de produtos no carrinho.
- Finalização e salvamento de pedidos no IndexedDB.
- Consulta de pedidos realizados.

---

## 🧾 Licença

MIT © 2025
"# loja-offline" 
