import React, { useCallback, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../../../assets/logo.png';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer, DivBox } from './styles';

interface SignUpFormData {
  nome: string;
  login: string;
  senha: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToast();
  const history = useHistory();

  // Essa validação vai para um arquivo separado depois
  const signInValidation = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    login: Yup.string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    senha: Yup.string()
      .required('A senha é obrigatória')
      .min(8, 'Senha muito curta'),
  });

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true);
      try {
        await api.post('users', data);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro de registro',
          description: 'Ocorreu um erro ao registrar, tente novamente!',
        });
      }
      setLoading(false);
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="Ponteflix" />
          <Formik
            initialValues={{ nome: '', login: '', senha: '' }}
            onSubmit={handleSubmit}
            // eslint-disable-next-line prettier/prettier
            validationSchema={signInValidation}
          >
            {({ values, errors }) => (
              <Form>
                <h1>Cadastre-se</h1>
                <Input
                  name="nome"
                  value={values.nome}
                  error={errors.nome}
                  type="text"
                  label="Nome"
                />
                <Input
                  name="login"
                  value={values.login}
                  error={errors.login}
                  type="text"
                  label="Email"
                />
                <Input
                  value={values.senha}
                  name="senha"
                  error={errors.senha}
                  type="senha"
                  label="Senha"
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
  );
};

export default SignUp;
