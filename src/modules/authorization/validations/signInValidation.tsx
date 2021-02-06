import * as Yup from 'yup';

export const signInValidation = Yup.object().shape({
  login: Yup.string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  senha: Yup.string()
    .required('A senha é obrigatória')
    .min(8, 'Senha muito curta'),
});
