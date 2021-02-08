import React, { useCallback, useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import Input from '../../../../shared/components/Input';
import Textarea from '../../../../shared/components/Textarea';
import api from '../../../../shared/services/api';
import { addRecipeValidation } from '../../validations/addRecipeValidation';

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

interface ParamsRoute {
  id: string | undefined;
}

const UpdateRecipe: React.FC = () => {
  const { id } = useParams<ParamsRoute>();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [recipe, setRecipe] = useState<UpdateRecipeFormData | null>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: UpdateRecipeFormData) => {
      setLoading(true);
      try {
        await api.put(`recipes/${id}`, data);

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
    [addToast, history],
  );

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      setLoading(true);

      try {
        const response = await api.get('categories');

        setCategories(response.data);
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

    loadCategories();
    loadData();
  }, [addToast, id]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <FormContainer>
            {!loading && recipe && categories && (
              <Formik
                key={recipe.id_categorias}
                initialValues={{
                  nome: recipe.nome,
                  id_categorias: Number(recipe.id_categorias),
                  tempo_preparo_minutos: recipe.tempo_preparo_minutos,
                  porcoes: recipe.porcoes,
                  modo_preparo: recipe.modo_preparo,
                  ingredientes: recipe.ingredientes,
                }}
                onSubmit={handleSubmit}
                // eslint-disable-next-line prettier/prettier
                validationSchema={addRecipeValidation}
              >
                {({ values, errors, handleChange, handleBlur }) => (
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
                        onChange={handleChange}
                        value={values.id_categorias}
                        // eslint-disable-next-line prettier/prettier
                        name="id_categorias"
                      >

                        {categories &&
                          categories.map((category) => (
                            <option value={category.id} selected>
                              {category.nome}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <p>Tempo de Preparo:</p>
                      <Input
                        name="tempo_preparo_minutos"
                        error={errors.tempo_preparo_minutos}
                        defaultValue={values.tempo_preparo_minutos}
                        type="number"
                        placeholder="Tempo de preparo"
                      />
                    </div>
                    <div>
                      <p>Porções:</p>
                      <Input
                        name="porcoes"
                        error={errors.porcoes}
                        defaultValue={values.porcoes}
                        type="number"
                        placeholder="Porções"
                      />
                    </div>

                    <div>
                      <p>Modo de Preparo:</p>
                      <Textarea
                        id="modo_preparo"
                        name="modo_preparo"
                        placeholder="Modo de Preparo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.modo_preparo}
                        error={errors.modo_preparo}
                      />
                    </div>

                    <div>
                      <p>Ingredientes:</p>
                      <Textarea
                        id="ingredientes"
                        name="ingredientes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.ingredientes}
                        error={errors.ingredientes}
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
            )}
          </FormContainer>
        </Content>
      </Container>
    </>
  );
};

export default UpdateRecipe;
