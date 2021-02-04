import React, { useCallback, useState } from 'react';
import { FiUserPlus, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../../../assets/logo.svg';
import { useAuth } from '../../../../hooks/auth';
import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Input from '../../../../shared/components/Input';

import { Container, Content, FormContainer } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  // Essa validação vai para um arquivo separado depois
  const signInValidation = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao realizar login',
          description: 'Credenciais incorretas',
        });
      }
      setLoading(false);
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="Ponteflix" />
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={signInValidation}
          >
            {({ values, errors }) => (
              <Form>
                <h1>Faça seu login</h1>
                <Input
                  name="email"
                  value={values.email}
                  icon={FiMail}
                  error={errors.email}
                  type="text"
                  placeholder="E-mail"
                />
                <Input
                  value={values.password}
                  name="password"
                  icon={FiLock}
                  error={errors.password}
                  type="password"
                  placeholder="Senha"
                />
                <Button type="submit" loading={loading}>
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>

          <Link to="/signup">
            <FiUserPlus size={18} />
            Criar conta
          </Link>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
