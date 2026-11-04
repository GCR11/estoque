
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <h2>Controle de Estoque</h2>

      <div>
        <Link to="/">Início</Link>
        {' | '}
        <Link to="/registros">Produtos</Link>
      </div>
    </nav>
  );
}
