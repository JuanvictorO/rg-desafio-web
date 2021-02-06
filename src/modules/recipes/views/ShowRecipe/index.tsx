import React, { useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import Loading from '../../../../shared/components/Loading';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer, DivBox } from './styles';

interface Recipe {
  nome: string;
  id_categorias: number;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
  categoria: {
    id: number;
    nome: string;
  };
}

interface ParamsRoute {
  id: string | undefined;
}

const ShowRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const { addToast } = useToast();

  const { id } = useParams<ParamsRoute>();

  const print: () => void = () => {
    setTimeout(() => {
      window.print();
    }, 0);
  };

  useEffect(() => {
    async function loadData(): Promise<void> {
      setLoading(true);

      try {
        const response = await api.get(`recipes/${id}`);

        setRecipe(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na API',
          description: 'Ocorreu um erro, tente novamente mais tarde',
        });
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            <section>
              <h1>Visualizar e imprimir</h1>
              {loading && <Loading color="blue" />}
              {!loading && recipe && (
                <>
                  <div>
                    <p>Nome:</p>
                    <input
                      name="nome"
                      value={recipe.nome}
                      type="text"
                      placeholder="Nome"
                      readOnly
                    />
                  </div>

                  <div className="divSelect">
                    <p>Categoria: </p>
                    <select
                      id="categoria"
                      value=""
                      disabled
                      name="id_categorias"
                      // eslint-disable-next-line react/jsx-closing-bracket-location
                    >
                      <option value={recipe.id_categorias}>
                        {recipe.categoria.nome}
                      </option>
                    </select>
                  </div>
                  <div>
                    <p>Tempo de Preparo:</p>
                    <input
                      name="tempo_preparo_minutos"
                      value={recipe.tempo_preparo_minutos}
                      type="number"
                      placeholder="Tempo de preparo"
                      readOnly
                    />
                  </div>
                  <div>
                    <p>Porções:</p>
                    <input
                      name="porcoes"
                      value={recipe.porcoes}
                      type="number"
                      placeholder="Porções"
                      readOnly
                    />
                  </div>

                  <div>
                    <p>Modo de Preparo:</p>
                    <textarea
                      name="modo_preparo"
                      placeholder={recipe.modo_preparo}
                      // eslint-disable-next-line prettier/prettier
                      readOnly
                    />
                  </div>

                  <div>
                    <p>Ingredientes:</p>
                    <textarea
                      name="ingredientes"
                      placeholder={recipe.ingredientes}
                      // eslint-disable-next-line prettier/prettier
                      readOnly
                    />
                  </div>
                </>
              )}

              <DivBox>
                <Link to="/">
                  <BiChevronLeft size="24" />
                  Voltar
                </Link>
                <Button onClick={print} type="button">
                  Imprimir
                </Button>
              </DivBox>
            </section>
          </FormContainer>
        </Content>
      </Container>
    </>
  );
};

export default ShowRecipe;
