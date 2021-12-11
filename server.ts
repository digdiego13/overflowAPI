import './src/setup';
import app from './src/app';

app.listen(process.env.PORT, () => {
  console.log(`Server running on port "${process.env.PORT}"`);
});
