// createHash es una función que recibe un password como argumento
// y genera un hash de ese password usando el algoritmo bcrypt
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// isValidPassword es una función que compara un password dado con un password hasheado (almacenado en un objeto user)
export const isValidPassword = (user, passwordSinHashear) =>
  bcrypt.compareSync(passwordSinHashear, user.password);
