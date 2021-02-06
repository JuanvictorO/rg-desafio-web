import * as Yup from 'yup';

export const addRecipeValidation = Yup.object().shape({
  nome: Yup.string().required('Nome obrigatório'),
  tempo_preparo: Yup.number(),
  porcoes: Yup.number(),
  modo_preparo: Yup.string().required('Obrigatório'),
});
