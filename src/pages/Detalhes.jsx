import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { supabase } from '../services/supabase.js';

function formatarPreco(valor) {
  if (valor === null || valor === undefined || valor === '') {
    return 'Não informado';
  }

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function Detalhes() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function carregarProduto() {
      setCarregando(true);
      setErro(null);
      setProduto(null);

      try {
        const { data, error } = await supabase
          .from('Estoque')
          .select('id_produto, nome_produto, categoria_produto, quantidade_produto, valor_produto, validade_produto')
          .eq('id_produto', id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!cancelado) {
          setProduto(data);
          setCarregando(false);
        }
      } catch (error) {
        if (!cancelado) {
          setErro(error.message || 'Ocorreu um erro inesperado.');
          setCarregando(false);
        }
      }
    }

    carregarProduto();

    return () => {
      cancelado = true;
    };
  }, [id]);

  return (
    <main className="detalhes">
      <Link to="/registros" className="detalhes-voltar">
        <span aria-hidden="true">←</span> Voltar para produtos
      </Link>

      {carregando ? (
        <section className="detalhes-painel">
          <p className="registros-aviso" role="status">Carregando produto...</p>
        </section>
      ) : erro ? (
        <section className="detalhes-painel">
          <p className="registros-aviso registros-erro" role="alert">
            Não foi possível carregar o produto: {erro}
          </p>
        </section>
      ) : !produto ? (
        <section className="detalhes-painel">
          <h1 className="detalhes-nao-encontrado">Produto não encontrado</h1>
          <p className="detalhes-descricao">
            Esse produto não existe ou foi removido do estoque.
          </p>
        </section>
      ) : (
        <>
          <header className="detalhes-cabecalho">
            <div>
              <span className="registros-sobretitulo">DETALHES DO ESTOQUE</span>
              <h1>{produto.nome_produto || 'Produto sem nome'}</h1>
              <p className="detalhes-descricao">
                Confira as informações cadastradas para este produto.
              </p>
            </div>
            <span className="detalhes-codigo">Código #{produto.id_produto}</span>
          </header>

          <section className="detalhes-painel" aria-label="Informações do produto">
            <div className="detalhes-grade">
              <article className="detalhes-campo">
                <span className="detalhes-rotulo">Categoria</span>
                <span className="registros-categoria">
                  {produto.categoria_produto || 'Sem categoria'}
                </span>
              </article>

              <article className="detalhes-campo">
                <span className="detalhes-rotulo">Quantidade em estoque</span>
                <strong className="detalhes-valor">
                  {produto.quantidade_produto ?? 'Não informada'}
                  {produto.quantidade_produto !== null && produto.quantidade_produto !== undefined
                    ? ' unidades'
                    : ''}
                </strong>
              </article>

              <article className="detalhes-campo">
                <span className="detalhes-rotulo">Preço</span>
                <strong className="detalhes-valor detalhes-preco">
                  {formatarPreco(produto.valor_produto)}
                </strong>
              </article>

              <article className="detalhes-campo">
                <span className="detalhes-rotulo">Validade</span>
                <span
                  className={`detalhes-status ${
                    produto.validade_produto ? 'detalhes-status-valido' : 'detalhes-status-invalido'
                  }`}
                >
                  <span aria-hidden="true">●</span>
                  {produto.validade_produto ? 'Dentro da validade' : 'Fora da validade'}
                </span>
              </article>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Detalhes;
