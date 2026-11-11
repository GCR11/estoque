import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../services/supabase.js';

export default function Registro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(event) {
    event.preventDefault();
    setErro('');
    setMensagem('');

    if (senha !== confirmacao) {
      setErro('A confirmação de senha não corresponde à senha informada.');
      return;
    }

    setCarregando(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: { data: { full_name: nome.trim() } },
      });

      if (error) {
        setErro(error.message);
        return;
      }

      if (data.session) {
        navigate('/dashboard', { replace: true });
      } else {
        setMensagem(
          'Cadastro realizado. Verifique seu e-mail para confirmar a conta antes de entrar.',
        );
      }
    } catch (error) {
      setErro(error.message || 'Não foi possível realizar o cadastro.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="registro-titulo">
        <span className="auth-eyebrow">CONTROLE DE ESTOQUE</span>
        <h1 id="registro-titulo">Crie sua conta</h1>
        <p className="auth-description">Cadastre-se para acessar seus produtos.</p>

        {erro && <p className="auth-message auth-message-error" role="alert">{erro}</p>}
        {mensagem && <p className="auth-message auth-message-success" role="status">{mensagem}</p>}

        <form className="auth-form" onSubmit={cadastrar}>
          <label htmlFor="registro-nome">Nome completo</label>
          <input
            id="registro-nome"
            type="text"
            autoComplete="name"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />

          <label htmlFor="registro-email">E-mail</label>
          <input
            id="registro-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="registro-senha">Senha</label>
          <input
            id="registro-senha"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />

          <label htmlFor="registro-confirmacao">Confirme a senha</label>
          <input
            id="registro-confirmacao"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={confirmacao}
            onChange={(event) => setConfirmacao(event.target.value)}
            required
          />

          <button className="auth-submit" type="submit" disabled={carregando}>
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
