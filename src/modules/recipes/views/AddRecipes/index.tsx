import React, { useCallback, useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Header from '../../../../shared/components/Header';
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer, DivBox } from './styles';

interface addRecipeFormData {
  nome: string;
  tempo_preparo_minutos: number;
  porcoes: number;
}

interface Category {
  id: number;
  nome: string;
}

const AddRecipe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categories, setCategories] = useState<Category[] | null>(null);

  const { addToast } = useToast();

  // Essa validação vai para um arquivo separado depois
  const addRecipeValidation = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    tempo_preparo: Yup.number(),
    porcoes: Yup.number(),
  });

  const handleSubmit = useCallback(
    async (data: addRecipeFormData) => {
      setLoading(true);
      try {
        await api.post('recipes', data);

        addToast({
          type: 'success',
          title: 'Receita cadastrada',
        });

        window.location.reload();
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
    [addToast],
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
                tempo_preparo_minutos: 30,
                porcoes: 1,
              }}
              onSubmit={handleSubmit}
              // eslint-disable-next-line prettier/prettier
              validationSchema={addRecipeValidation}
            >
              {({ values, errors }) => (
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
                    <select id="categoria" name="id_categorias">
                      <option value="1">Teste</option>
                    </select>
                  </div>

                  <Input
                    name="tempo_preparo_minutos"
                    defaultValue=""
                    error={errors.tempo_preparo_minutos}
                    type="number"
                    label="Tempo de preparo"
                  />
                  <Input
                    name="porcoes"
                    defaultValue=""
                    error={errors.porcoes}
                    type="number"
                    label="Quantidade de porçôes"
                  />

                  <textarea name="modo_preparo" placeholder="Modo de Preparo" />

                  <textarea name="ingredientes" placeholder="Ingredientes" />

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
