import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export default function Dashboard() {
  const { user } = useAuth();
  const nome = user.user_metadata?.full_name || user.email;

  return (
    <main className="dashboard-page">
      <header className="dashboard-heading">
        <span className="auth-eyebrow">ÁREA AUTENTICADA</span>
        <h1>Olá, {nome}!</h1>
        <p>Bem-vindo ao seu controle de estoque.</p>
      </header>

      <section className="dashboard-cards" aria-label="Acesso rápido">
        <Link className="dashboard-card" to="/registros">
          <span className="dashboard-card-icon" aria-hidden="true">▦</span>
          <strong>Produtos</strong>
          <span>Consulte os produtos cadastrados no estoque.</span>
          <span className="dashboard-card-link">Ver produtos →</span>
        </Link>
        <Link className="dashboard-card" to="/perfil">
          <span className="dashboard-card-icon" aria-hidden="true">◉</span>
          <strong>Meu perfil</strong>
          <span>Confira os dados da sua conta.</span>
          <span className="dashboard-card-link">Ver perfil →</span>
        </Link>
      </section>
    </main>
  );
}
