import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'lastname', 'email', 'height', 'weight'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['filename', 'url'],
      },
    });
    res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ errors: ['Not send ID'] });
      }

      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'email', 'height', 'weight'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['filename', 'url'],
        },
      });

      if (!student) {
        return res.status(404).json({ errors: ['Aluno não existe.'] });
      }

      return res.json(student);
    } catch (err) {
      return res.status(404).json({ errors: err.errors.map((e) => e.message) });
    }
  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body);
      return res.json(student);
    } catch (err) {
      return res.status(404).json({ errors: err.errors.map((e) => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ errors: ['Not send ID'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ errors: ['Aluno não existe.'] });
      }

      await student.destroy(id);
      return res.json('Aluno apagado com sucesso.');
    } catch (err) {
      return res.status(404).json({ errors: err.errors.map((e) => e.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({ errors: ['Not send ID'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ errors: ['Aluno não existe.'] });
      }

      const updateStudent = await student.update(req.body);

      return res.json(updateStudent);
    } catch (err) {
      return res.status(404).json({ errors: err.errors.map((e) => e.message) });
    }
  }
}

export default new StudentController();
