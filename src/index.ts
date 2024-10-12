import express from 'express';
import AuthControllers from './controllers/auth.controller';

const app = express();
const port = 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/registration', AuthControllers.registerUser);
app.post('/login', AuthControllers.loginUser);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
