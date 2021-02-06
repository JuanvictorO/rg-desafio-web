import React, { useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer, DivBox } from './styles';

interface Recipe {
  nome: string;
  id_categorias: number;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
}

interface Category {
  id: number;
  nome: string;
}

const ShowRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadData(): Promise<void> {
      setLoading(true);

      try {
        const response = await api.get('recipe/id');

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
              <div>
                <p>Nome:</p>
                <input
                  name="nome"
                  value=""
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
                  name="id_categorias"
                  // eslint-disable-next-line react/jsx-closing-bracket-location
                >
                  <option value="1">Teste</option>
                </select>
              </div>
              <div>
                <p>Tempo de Preparo:</p>
                <input
                  name="tempo_preparo_minutos"
                  value=""
                  type="number"
                  placeholder="Tempo de preparo"
                  readOnly
                />
              </div>
              <div>
                <p>Porções:</p>
                <input
                  name="porcoes"
                  value=""
                  type="number"
                  placeholder="Porções"
                  readOnly
                />
              </div>

              <div>
                <p>Modo de Preparo:</p>
                <textarea
                  name="modo_preparo"
                  placeholder="Modo de Preparo"
                  value="a"
                  readOnly
                />
              </div>

              <div>
                <p>Ingredientes:</p>
                <textarea
                  name="ingredientes"
                  value="a"
                  placeholder="Ingredientes"
                  readOnly
                />
              </div>

              <DivBox>
                <Link to="/">
                  <BiChevronLeft size="24" />
                  Voltar
                </Link>
                <Button type="submit" loading={loading}>
                  Enviar
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
