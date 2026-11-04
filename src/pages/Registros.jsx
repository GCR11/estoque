import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '../services/supabase.js';

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function Registros() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      // Busca só as colunas necessárias para a listagem
      const { data, error } = await supabase
        .from('Estoque')
        .select('id_produto, nome_produto, categoria_produto, valor_produto')
        .order('id_produto', { ascending: true });

      if (error) {
        setErro(error.message);
      } else {
        setProdutos(data);
      }
      setCarregando(false);
    }

    carregarProdutos();
  }, []);

  return (
    <main className="registros">
      <header className="registros-cabecalho">
        <div>
          <span className="registros-sobretitulo">SEU ESTOQUE, EM ORDEM</span>
          <h1>Produtos</h1>
          <p>Acompanhe os produtos cadastrados no seu estoque.</p>
        </div>
        {!carregando && !erro && (
          <span className="registros-contagem">
            <strong>{produtos.length}</strong>
            {produtos.length === 1 ? ' produto cadastrado' : ' produtos cadastrados'}
          </span>
        )}
      </header>

      <section className="registros-painel" aria-label="Lista de produtos">
        {carregando ? (
          <p className="registros-aviso" role="status">Carregando produtos...</p>
        ) : erro ? (
          <p className="registros-aviso registros-erro" role="alert">
            Não foi possível carregar os produtos: {erro}
          </p>
        ) : produtos.length === 0 ? (
          <p className="registros-aviso">Nenhum produto cadastrado.</p>
        ) : (
          <div className="registros-tabela-container">
            <table className="registros-tabela">
              <thead>
                <tr>
                  <th scope="col">Código</th>
                  <th scope="col">Produto</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Preço</th>
                  <th scope="col"><span className="visually-hidden">Ação</span></th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id_produto}>
                    <td className="registros-codigo">#{produto.id_produto}</td>
                    <td className="registros-nome">{produto.nome_produto}</td>
                    <td>
                      <span className="registros-categoria">
                        {produto.categoria_produto || 'Sem categoria'}
                      </span>
                    </td>
                    <td className="registros-preco">
                      {formatarPreco(produto.valor_produto)}
                    </td>
                    <td className="registros-acao">
                      <Link
                        to={`/registros/${produto.id_produto}`}
                        className="registros-link"
                        aria-label={`Ver detalhes de ${produto.nome_produto}`}
                      >
                        Ver detalhes <span aria-hidden="true">→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Registros;
