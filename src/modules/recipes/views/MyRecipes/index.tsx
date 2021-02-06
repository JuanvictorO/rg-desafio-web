import React, { useCallback, useState, useEffect } from 'react';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineFolderView,
  AiOutlineSearch,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';

import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import api from '../../../../shared/services/api';

import { Container, Content, Table } from './styles';

interface SearchFormData {
  search: string;
}

interface Recipe {
  id: number;
  name: string;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  // const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SearchFormData) => {
      setLoading(true);
      try {
        const response = await api.get(`/recipes/search?search=${data.search}`);
        console.log(response.data);
        return;
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

  useEffect(() => {
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

    loadData();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <div>
            <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
              <Form>
                <input
                  name="search"
                  defaultValue=""
                  type="text"
                  placeholder="Pesquisar..."
                />
                <button type="submit">
                  <AiOutlineSearch />
                </button>
              </Form>
            </Formik>
            <Link to="/add">
              <Button>Adicionar receitas</Button>
            </Link>
          </div>

          <Table>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
            <tr>
              <td>Teste</td>
              <td>Teste</td>
              <td className="acoes">
                <AiOutlineFolderView />

                <Link to="/update">
                  <AiFillEdit />
                </Link>
                <AiFillDelete />
              </td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>Teste</td>
              <td>Teste</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>Teste</td>
              <td>Teste</td>
            </tr>
            <tr>
              <td>Teste</td>
              <td>Teste</td>
              <td>Teste</td>
            </tr>
          </Table>
        </Content>
      </Container>
    </>
  );
};

export default MyRecipes;
