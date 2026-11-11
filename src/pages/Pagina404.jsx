import { Link } from 'react-router';

export default function Pagina404() {
  return (
    <main className="not-found-page">
      <span className="auth-eyebrow">ERRO 404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe.</p>
      <Link className="auth-submit not-found-link" to="/">Voltar ao início</Link>
    </main>
  );
}
