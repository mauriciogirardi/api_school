import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => ({
          error: e.message,
          value: e.value,
        })),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ['Usuário não foi encontrado'] });
      }

      const updateUser = await user.update(req.body);
      const { id, name, email } = updateUser;

      return res.json({ id, name, email });
    } catch (err) {
      return res.status(400).json({ errors: [{ error: err.message }] });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não foi encontrado'] });
      }

      await user.destroy(user);

      return res.status(200).json();
    } catch (err) {
      return res.status(404).json({ errors: [{ error: err.message }] });
    }
  }
}

export default new UserController();
