import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../../../assets/logo.svg';
// import { useToast } from '../../../../hooks';
import { useAuth } from '../../../../hooks/auth';
import Button from '../../../../shared/components/Button';
import Input from '../../../../shared/components/Input';

import { Container, Content, FormContainer } from './styles';

interface SignInFormData {
  login: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { signIn } = useAuth();
  // const { addToast } = useToast();

  // Essa validação vai para um arquivo separado depois
  const signInValidation = Yup.object().shape({
    login: Yup.string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    senha: Yup.string().required('A senha é obrigatória'),
  });

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        await signIn({
          login: data.login,
          senha: data.senha,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
        /* addToast({
          type: 'error',
          title: 'Erro ao realizar login',
          description: 'Credenciais incorretas',
        }); */
      }
      setLoading(false);
    },
    [signIn, history /* , addToast, */],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="Ponteflix" />
          <Formik
            initialValues={{ login: '', senha: '' }}
            onSubmit={handleSubmit}
            // eslint-disable-next-line prettier/prettier
            validationSchema={signInValidation}
          >
            {({ values, errors }) => (
              <Form>
                <h1>Faça seu login</h1>
                <Input
                  name="login"
                  value={values.login}
                  error={errors.login}
                  type="text"
                  placeholder="Login"
                />
                <Input
                  value={values.senha}
                  name="senha"
                  error={errors.senha}
                  type="senha"
                  placeholder="Senha"
                />
                <Button type="submit" loading={loading}>
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
