import signUpSchema from '../../schemas/signUpSchema.js';
import * as userService from '../../services/userService.js';

async function singUp(req, res) {
  // eslint-disable-next-line object-curly-newline
  const { email, password, username } = req.body;
  const isCorrectBody = signUpSchema.validate(req.body);

  if (isCorrectBody.error) {
    return res.status(400).send(`${isCorrectBody.error.details[0].message}`);
  }
  try {
    const signUp = await userService.logonService({
      email,
      password,
      username,
    });
    if (signUp.status === 1) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  } catch (erro) {
    return res.sendStatus(500);
  }
}

export default singUp;
