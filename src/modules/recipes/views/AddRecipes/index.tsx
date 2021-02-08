import React, { useCallback, useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

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

interface addRecipeFormData {
  nome: string;
  id_categorias: number;
  tempo_preparo_minutos: string;
  porcoes: string;
  modo_preparo: string;
  ingredientes: string;
}

interface Category {
  id: number;
  nome: string;
}

const AddRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: addRecipeFormData) => {
      setLoading(true);
      try {
        await api.post('recipes', data);

        addToast({
          type: 'success',
          title: 'Receita cadastrada',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar',
          description: 'Ocorreu um erro ao cadastrar uma receita',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  useEffect(() => {
    async function loadData(): Promise<void> {
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
                nome: '',
                id_categorias: 1,
                tempo_preparo_minutos: '',
                porcoes: '',
                modo_preparo: '',
                ingredientes: '',
              }}
              onSubmit={handleSubmit}
              // eslint-disable-next-line prettier/prettier
              validationSchema={addRecipeValidation}
            >
              {({ values, errors, handleChange, handleBlur }) => (
                <Form id="Addreceita">
                  <h1>Adicione uma receita</h1>
                  <Input
                    name="nome"
                    value={values.nome}
                    error={errors.nome}
                    type="text"
                    label="Nome"
                  />
                  <div className="divSelect">
                    <p>Categoria: </p>
                    <select
                      id="categoria"
                      name="id_categorias"
                      value={values.id_categorias}
                      // eslint-disable-next-line prettier/prettier
                      onChange={handleChange}
                    >
                      {!loading &&
                        categories &&
                        categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.nome}
                          </option>
                        ))}
                    </select>
                  </div>

                  <Input
                    name="tempo_preparo_minutos"
                    value={values.tempo_preparo_minutos}
                    error={errors.tempo_preparo_minutos}
                    type="number"
                    label="Tempo de preparo"
                  />
                  <Input
                    name="porcoes"
                    value={values.porcoes}
                    error={errors.porcoes}
                    type="number"
                    label="Quantidade de porçôes"
                  />

                  <Textarea
                    id="ingredientes"
                    name="ingredientes"
                    defaultValue={values.ingredientes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.ingredientes}
                    placeholder="Ingredientes"
                  />

                  <Textarea
                    id="preparo"
                    name="modo_preparo"
                    defaultValue={values.modo_preparo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.modo_preparo}
                    placeholder="Modo de Preparo"
                  />

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

export default AddRecipe;
