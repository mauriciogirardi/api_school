import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Você não tem autorização'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = user;

    const checkUserDB = await User.findOne({ where: { id, email } });

    if (!checkUserDB) {
      return res.status(401).json({ errors: ['Usuário inválido'] });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (err) {
    return res.status(401).json({ errors: ['Token exprirado faça login novamente'] });
  }
};
