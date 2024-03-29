import React, { useCallback, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../../../assets/logo.png';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Input from '../../../../shared/components/Input';
import { signInValidation } from '../../validations/signInValidation';

import { Container, Content, FormContainer, DivBox } from './styles';

interface SignInFormData {
  login: string;
  senha: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  // Essa validação vai para um arquivo separado depois

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
        addToast({
          type: 'error',
          title: 'Erro ao logar',
          description: 'Creddenciais incorretas',
        });
      }
      setLoading(false);
    },
    [signIn, history, addToast],
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
                  label="Email"
                />
                <Input
                  value={values.senha}
                  name="senha"
                  error={errors.senha}
                  type="password"
                  label="Senha"
                />

                <DivBox>
                  <Link to="/cadastro">
                    Criar conta
                    <BiChevronRight size="24" />
                  </Link>
                  <Button type="submit" loading={loading}>
                    Entrar
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

export default SignIn;
