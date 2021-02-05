import React, { useCallback, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../../../assets/logo.svg';
// import { useToast } from '../../../../hooks/toast';
import Button from '../../../../shared/components/Button';
import Input from '../../../../shared/components/Input';
import api from '../../../../shared/services/api';

import { Container, Content, FormContainer } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // const { addToast } = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      setLoading(true);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('users', data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          return;
        }
      }
      setLoading(false);
    },

    [history],
  );

  return (
    <Container>
      <Content>
        <FormContainer>
          <img src={logoImg} alt="Ponteflix" />
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            onSubmit={handleSubmit}>
            <form onSubmit={() => handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" type="text" placeholder="Nome" />
              <Input name="email" type="email" placeholder="E-mail" />
              <Input name="password" type="password" placeholder="Senha" />

              <Button type="submit" loading={loading}>
                Cadastrar
              </Button>
            </form>
          </Formik>

          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
