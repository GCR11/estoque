# Controle de Estoque

Aplicação web para consultar produtos cadastrados no Supabase.

## Requisitos

- Node.js e npm
- Um projeto Supabase com a tabela `Estoque`

## Configuração do Supabase

O Vite está configurado para carregar as variáveis de ambiente da pasta imediatamente acima de `estoque`. Crie nessa pasta um arquivo `.env` com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_ou_publishable
```

Obtenha a URL e a chave `anon`/publishable nas configurações de API do seu projeto Supabase. A chave `anon`/publishable é usada pelo cliente no navegador; proteja os dados configurando as políticas de Row Level Security (RLS) adequadas na tabela.

**Nunca coloque uma chave privada, como `service_role` ou `secret`, em variáveis `VITE_*`, no código do cliente ou no repositório.** Não versione nem compartilhe seu arquivo `.env`.

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
