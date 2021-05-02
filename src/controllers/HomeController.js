class HomeController {
  async index(rep, res) {
    res.json('home');
  }
}

export default new HomeController();
