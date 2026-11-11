import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export default function Perfil() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const nome = user.user_metadata?.full_name || user.email;

  async function sair() {
    setErro('');
    setCarregando(true);

    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      setErro(error.message || 'Não foi possível encerrar a sessão.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="profile-page">
      <header className="dashboard-heading">
        <span className="auth-eyebrow">SUA CONTA</span>
        <h1>Meu perfil</h1>
        <p>Informações da conta autenticada.</p>
      </header>

      <section className="profile-card" aria-label="Dados do usuário">
        <dl>
          <div>
            <dt>Nome completo</dt>
            <dd>{nome}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt>Identificador</dt>
            <dd className="profile-id">{user.id}</dd>
          </div>
        </dl>

        {erro && <p className="auth-message auth-message-error" role="alert">{erro}</p>}
        <button className="auth-submit profile-logout" type="button" onClick={sair} disabled={carregando}>
          {carregando ? 'Saindo...' : 'Encerrar sessão'}
        </button>
      </section>
    </main>
  );
}
