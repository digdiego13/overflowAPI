import * as userService from '../../services/userService.js';

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userService.loginService({ email, password });
    if (user.status === 0) {
      res.send({
        name: user.name,
        token: user.token,
        email: user.email,
        adress: user.adress,
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export default signIn;
