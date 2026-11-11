import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="home-page">
      <section className="home-hero">
        <span className="auth-eyebrow">ORGANIZE SEU ESTOQUE</span>
        <h1>Seu estoque, sob controle.</h1>
        <p>Acesse seus produtos e acompanhe as informações em um só lugar.</p>
        <Link className="auth-submit home-action" to={user ? '/dashboard' : '/login'}>
          {user ? 'Ir para o dashboard' : 'Acessar minha conta'}
        </Link>
      </section>
    </main>
  );
}