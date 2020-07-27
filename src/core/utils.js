export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'E-mail não pode estar vazio';
  if (!re.test(email)) return 'Ops! É necessário passar um email válido';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Senha não pode estar vazia';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Nome não pode estar vazio';

  return '';
};
