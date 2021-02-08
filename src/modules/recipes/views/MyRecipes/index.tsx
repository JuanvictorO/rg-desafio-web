import React, { useCallback, useState, useEffect } from 'react';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineFolderView,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/services/api';

import { Container, Content, Table } from './styles';

interface SearchFormData {
  search: string;
}

interface Recipe {
  id: number;
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
  modo_preparo: string;
  ingredientes: string;
  categoria: {
    id: number;
    nome: string;
  };
}

const MyRecipes: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      setLoading(true);
      try {
        const response = await api.get(`/recipes/search/${data.search}`);

        setRecipes(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description: 'Tente novamente',
        });
      }
      setLoading(false);
    },
    [addToast],
  );

  async function cleanSearch(): Promise<void> {
    loadData();
  }

  async function deleteRecipe(id: number): Promise<void> {
    try {
      await api.delete(`recipes/${id}`);

      window.location.reload();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Algo deu errado',
        description: 'Tente novamente',
      });
    }
  }

  async function loadData(): Promise<void> {
    setLoading(true);

    try {
      const response = await api.get<Recipe[]>('recipes/index');

      setRecipes(response.data);
    } catch (err) {
      setRecipes(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <div>
            <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
              {({ values, errors }) => (
                <Form>
                  <Input
                    name="search"
                    value={values.search}
                    error={errors.search}
                    type="text"
                    placeholder="Pesquisar..."
                  />
                  <button type="submit">
                    <AiOutlineSearch />
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/add">
              <Button>Adicionar receitas</Button>
            </Link>
          </div>
          <div className="div-btn">
            <button onClick={cleanSearch}>Limpar pesquisa</button>
          </div>

          <Table>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
            {!loading &&
              recipes &&
              recipes.map((recipe) => (
                <tr>
                  <td>{recipe.nome}</td>
                  <td>{recipe.categoria.nome}</td>
                  <td className="acoes">
                    <Link to={`/show/${recipe.id}`}>
                      <AiOutlineFolderView />
                    </Link>

                    <Link to={`/update/${recipe.id}`}>
                      <AiFillEdit />
                    </Link>

                    <button
                      onClick={() => {
                        deleteRecipe(recipe.id);
                        // eslint-disable-next-line prettier/prettier
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && recipes?.length === 0 && (
              <tr id="error">
                <td colSpan={3}>Não há nenhuma receita cadastrada!</td>
              </tr>
            )}
          </Table>
        </Content>
      </Container>
    </>
  );
};

export default MyRecipes;
