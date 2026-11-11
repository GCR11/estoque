import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { supabase } from '../services/supabase.js';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authError } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(event) {
    event.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      });

      if (error) {
        setErro(error.message);
        return;
      }

      const destino = location.state?.from?.pathname || '/dashboard';
      navigate(destino, { replace: true });
    } catch (error) {
      setErro(error.message || 'Não foi possível realizar o login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-titulo">
        <span className="auth-eyebrow">CONTROLE DE ESTOQUE</span>
        <h1 id="login-titulo">Acesse sua conta</h1>
        <p className="auth-description">Entre para consultar e gerenciar seus produtos.</p>

        {(erro || authError) && (
          <p className="auth-message auth-message-error" role="alert">{erro || authError}</p>
        )}

        <form className="auth-form" onSubmit={entrar}>
          <label htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="login-senha">Senha</label>
          <input
            id="login-senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />

          <button className="auth-submit" type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-switch">
          Ainda não tem conta? <Link to="/registro">Criar conta</Link>
        </p>
      </section>
    </main>
  );
}
