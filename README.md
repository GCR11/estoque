# Controle de Estoque

Aplicação web para consultar produtos cadastrados no Supabase e gerenciar o acesso com Supabase Auth.

## Requisitos

- Node.js e npm
- Um projeto Supabase com a tabela `Estoque`
- Supabase Auth habilitado para cadastro por e-mail e senha

## Configuração do Supabase

O Vite está configurado para carregar as variáveis de ambiente da pasta imediatamente acima de `estoque`. Crie nessa pasta um arquivo `.env` com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_ou_publishable
```

Obtenha a URL e a chave `anon`/publishable nas configurações de API do seu projeto Supabase. A chave `anon`/publishable é usada pelo cliente no navegador; proteja os dados configurando as políticas de Row Level Security (RLS) adequadas na tabela.

**Nunca coloque uma chave privada, como `service_role` ou `secret`, em variáveis `VITE_*`, no código do cliente ou no repositório.** Não versione nem compartilhe seu arquivo `.env`.

O cadastro usa Supabase Auth e guarda o nome completo nos metadados do usuário. A senha e sua confirmação são usadas somente no formulário; nenhuma delas é armazenada na tabela de perfil. Não é necessária uma tabela `Usuarios` para autenticar ou exibir o perfil.

Configure as políticas de Row Level Security (RLS) da tabela `Estoque` para que somente usuários autorizados possam consultar os dados. Proteger rotas no React não substitui as políticas de segurança do banco.

## Executar localmente

No terminal, entre na pasta `estoque` e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço informado pelo Vite.

## Verificações

Para gerar a versão de produção:

```bash
npm run build
```

Para executar o linter:

```bash
npm run lint
```

## Funcionalidades

- Cadastro com nome, e-mail, senha e confirmação; o cadastro utiliza `supabase.auth.signUp`.
- Login com e-mail e senha; a sessão é gerenciada pelo Supabase Auth.
- Contexto de autenticação compartilhado entre as páginas e restaurado ao recarregar a aplicação.
- Rotas protegidas para dashboard, listagem, detalhes dos produtos e perfil.
- Perfil com nome, e-mail e identificador do usuário, além de opção para sair.
- Consultas de produtos existentes mantidas para usuários autenticados.

Se a confirmação de e-mail estiver habilitada no Supabase, o usuário receberá uma orientação para confirmar o endereço antes de entrar.

## Questões da atividade

1. **Qual é a responsabilidade do Supabase Auth?**  
   Cadastrar e autenticar usuários, validar credenciais e gerenciar a sessão e os tokens de acesso.
2. **Por que usar Context API para compartilhar o usuário?**  
   Para que componentes distantes acessem o estado de autenticação sem repassar os dados manualmente por várias camadas de props.
3. **Qual a diferença entre `useState` local e um contexto global?**  
   Um estado local pertence a um componente; o contexto compartilha um estado entre vários componentes da árvore React.
4. **O que ocorre ao acessar uma rota protegida sem autenticação?**  
   A rota aguarda a verificação da sessão e redireciona o usuário para `/login`.
5. **Qual a função de `onAuthStateChange()`?**  
   Notificar a aplicação quando a sessão muda, por exemplo, após login ou logout.
6. **Por que proteger rotas no React não basta?**  
   A interface pode ser contornada; as políticas RLS no banco precisam restringir os dados no servidor.
7. **Qual a diferença entre autenticação e autorização?**  
   Autenticação identifica quem é o usuário; autorização define quais recursos esse usuário pode acessar.
