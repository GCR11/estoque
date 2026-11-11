import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');

  async function sair() {
    setErro('');

    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      setErro(error.message || 'Não foi possível encerrar a sessão.');
    }
  }

  return (
    <>
      <nav className="navbar" aria-label="Navegação principal">
        <Link className="navbar-brand" to="/">Controle de Estoque</Link>
        <div className="navbar-links">
          <Link to="/">Início</Link>
          {!loading && user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/registros">Produtos</Link>
              <Link to="/perfil">Meu perfil</Link>
              <button className="navbar-logout" type="button" onClick={sair}>Sair</button>
            </>
          )}
          {!loading && !user && (
            <>
              <Link to="/login">Entrar</Link>
              <Link className="navbar-register" to="/registro">Criar conta</Link>
            </>
          )}
        </div>
      </nav>
      {erro && <p className="navbar-error" role="alert">{erro}</p>}
    </>
  );
}
