<h1 align="center"> DIAMOND MANAGEMENT</h1>
<h4 align="center">
  Next.js | TypeScript | Tailwind | Jest</h4>

  <p align="center">
  <a href="#-sobre">Sobre</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> • 
  <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-pré-requisitos">Pré-requisitos</a> • 
  <a href="#-rodando-o-projeto">Rodando o projeto</a> •
 <a href="#-link-do-deploy">Link do Deploy</a> • 
 <a href="#-autor">Autor</a>
</p>

<img width="1914" height="905" alt="image" src="https://github.com/user-attachments/assets/076465a7-4fb3-4f60-a59d-d04d432e29b9" />
<img width="1916" height="905" alt="image" src="https://github.com/user-attachments/assets/df27270d-3727-4390-a736-6a6afb2b287b" />
<img width="1916" height="907" alt="image" src="https://github.com/user-attachments/assets/c5fa0bba-f57d-43fe-8f32-4a3384bceac5" />
<img width="1904" height="909" alt="image" src="https://github.com/user-attachments/assets/2f612399-ea7b-4a11-8971-414410a9957e" />


## 💎 Sobre
O projeto Diamond Management foi desenvolvido como parte de um **desafio técnico proposto pela MaxUp Consultoria**. Trata-se de uma aplicação web em que o usuário poderá gerenciar uma lista dos produtos disponíveis em um **painel administrativo**. Na página principal é possível ver uma tabela com todos os produtos listados onde é possível realizar ações de visualizar, editar e deletar cada um deles, além de criar novos produtos. A aplicação foi desenvolvida com **Next.js 15 (App Router)** e **TypeScript**, utilizando a **FakeStore API** para simulação do gerenciamento de dados.

-----

## 🔧 Tecnologias Utilizadas

As seguintes ferramentas foram usadas na construção do projeto pensando em **desempenho**, **escalabilidade** e uma **experiência do usuário**:

- **[Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Jest](https://jestjs.io/)**: Garantindo robustez e segurança pra o código, além de diferentes arquiteturas, hooks, otimizações, testes unitários e outros recursos.
- **[Tailwind CSS](https://tailwindcss.com/) + [ShadcnUI](https://ui.shadcn.com/) + [Lucide Icons](https://lucide.dev/icons/)**: Componentização reutilizável, ícones modernos e utilitários para tornar o desenvolvimento ágil, responsivo, acessível e de fácil manutenção.
- **[FakeStore API](https://fakestoreapi.com/):** **FakeStore API** – API pública utilizada para simular a obtenção e manipulação de dados de produtos.

Essas tecnologias foram aliadas a arquitetura de componentização por tipo de feature, uma abordagem mobile-first com preocupação com performance, acessibilidade e design responsivo, commits semênticos, boas práticas de código com e princípios de desenvolvimento de software para trazer uma aplicação **performática**, **escalável** e **responsiva**.

-----

## 💻 Funcionalidades

As principais funcionalidades da Diamond Management:

- **HomePage com animações:** Para dar aquele tcham!
- **Tela de login:** Autenticação simulada para proteger nossa dashboard de milhões. ✨
- **Minha conta:** Um formulário sem interações para simular os dados de cadastro usuário logado.
- **PAGINA DE PRODUTOS:** o 💗 da aplicação!
  Nela você vai encontrar:
  * **Listagem de produtos:** A lista dos seus produtos cadastrados com imagem, nome, categoria e botões de ação para gerenciamento.
  * **Visualização detalhada de produto:** Quer mais informação? TEMOS! Página de detalhes para cada produto.
  * **Adicionar novo produto:** Chegou produtos novos na sua loja? É só colocar na lista com nosso formulário!. 🆕
  * **Editar produto existente:** Não tem tempo ruim com esse formulário... você poder trocar preço, imagem, nome e mais.
  * **Excluir produto:** Saiu de estoque? Pode remover da lista e tem até alerta de confirmação para maior segurança.
- **Cadastro de cupons:** Uma página para cadastrar aquele descontinho para os seus produtos e fidelizar o cliente! 🏷️
- **Modo visualização:**: Aqui você vê como ficam seus produtos do ponto de vista do seu cliente. Dá até pra favoritar!

💡 **Observações**: 
- A **FakeStore API** não armazena dados de forma persistente, dessa forma os dados de criação e edição são persistidos apenas na sua sessão via `localStorage` e serão perdidos ao limpar o cache do navegador. Devido a essa limitação também não é possível atualizar a lista de produtos ou favoritá-los no modo visualização.
- O cadastro de cupons é apenas um mini CRUD utilizando um hook customizado para fins didáticos.

-----

## 📝 Pré-requisitos

Para rodar o projeto localmente, certifique-se de ter os seguintes softwares instalados:

  * **Node.js:** Versão 18.18.0 ou superior (O projeto foi testado com Node.js v22).
  * **npm**: Gerenciador de pacotes.

-----


## 🎲 Rodando o projeto

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente local:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/belatoledo/dev-frontend-nextjs.git
    cd dev-frontend-nextjs
    ```
2. **Abra o projeto**
   * Na **raiz** do repositório crie o arquivo **.env.local**
   * Copie a chave abaixo dentro do arquivo:
       
    ```
   NEXT_PUBLIC_API_URL="https://fakestoreapi.com"
    ```

   * Salve o arquivo
   
4. **Instale as dependências:**

    Com npm:

    ```bash
    npm install
    ```

5.  **Inicie o servidor de desenvolvimento:**

    Com npm:

    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:3000`.

    #### ⚠️ CREDENCIAIS PARA LOGIN:
```
    💌 email: admin@diamond.com
    🗝️ senha: store123
  ```

5.  **Build para produção:**

    Para gerar uma build otimizada para produção:

    Com npm:

    ```bash
    npm run build
    ```
-----

## 📄 Arquivo `.gitignore`

Para garantir que arquivos desnecessários não sejam versionados, certifique-se de que seu arquivo `.gitignore` inclua as seguintes entradas:

```
node_modules/
.next/
.vscode/
.DS_Store
```

-----

## 🌐 Link do Deploy

  * [Acesse na Vercel](https://dev-frontend-nextjs-xi.vercel.app/)

-----

## 🎉 Autor

<a href="https://www.linkedin.com/in/izabela-toledo/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/61567726?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Izabela Toledo</b></sub><a href="https://github.com/belatoledo">🚀</a>
