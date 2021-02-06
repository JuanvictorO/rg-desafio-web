import React, { useCallback, useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer, DivBox } from './styles';

interface UpdateRecipeFormData {
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

const UpdateRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recipe, setRecipe] = useState<UpdateRecipeFormData | null>(null);
  const history = useHistory();

  const { addToast } = useToast();

  // Essa validação vai para um arquivo separado depois
  const updateRecipeValidation = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    id_categorias: Yup.number().required('Categoria obrigatória'),
    tempo_preparo: Yup.number(),
    porcoes: Yup.number(),
  });

  const handleSubmit = useCallback(
    async (data: UpdateRecipeFormData) => {
      setLoading(true);
      try {
        await api.put('recipes/id', data);

        addToast({
          type: 'success',
          title: 'Receita alterada',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar',
          description: 'Ocorreu um erro ao atualizar a receita',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

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
            <Formik
              initialValues={{
                nome: 'Teste',
                id_categorias: 1,
                tempo_preparo_minutos: 45,
                porcoes: 1,
                modo_preparo: 'Asdfasf asf ',
                ingredientes: 'a sdf sad f',
              }}
              onSubmit={handleSubmit}
              // eslint-disable-next-line prettier/prettier
              validationSchema={updateRecipeValidation}
            >
              {({ values, errors }) => (
                <Form id="Addreceita">
                  <h1>Alterar receita</h1>
                  <div>
                    <p>Nome:</p>
                    <Input
                      name="nome"
                      value={values.nome}
                      error={errors.nome}
                      type="text"
                      placeholder="Nome"
                    />
                  </div>

                  <div className="divSelect">
                    <p>Categoria: </p>
                    <select
                      id="categoria"
                      value={values.id_categorias}
                      // eslint-disable-next-line react/jsx-closing-bracket-location
                      name="id_categorias">
                      <option value="1">Teste</option>
                    </select>
                  </div>
                  <div>
                    <p>Tempo de Preparo:</p>
                    <Input
                      name="tempo_preparo_minutos"
                      defaultValue=""
                      error={errors.tempo_preparo_minutos}
                      value={values.tempo_preparo_minutos}
                      type="number"
                      placeholder="Tempo de preparo"
                    />
                  </div>
                  <div>
                    <p>Porções:</p>
                    <Input
                      name="porcoes"
                      defaultValue=""
                      error={errors.porcoes}
                      value={values.porcoes}
                      type="number"
                      placeholder="Porções"
                    />
                  </div>

                  <div>
                    <p>Modo de Preparo:</p>
                    <textarea
                      name="modo_preparo"
                      placeholder="Modo de Preparo"
                      value={values.modo_preparo}
                    />
                  </div>

                  <div>
                    <p>Ingredientes:</p>
                    <textarea
                      name="ingredientes"
                      value={values.ingredientes}
                      placeholder="Ingredientes"
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
                </Form>
              )}
            </Formik>
          </FormContainer>
        </Content>
      </Container>
    </>
  );
};

export default UpdateRecipe;
