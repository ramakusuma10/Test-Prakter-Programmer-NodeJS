import express from 'express';
import authControllers from './controllers/auth.controller';
import userController from './controllers/user.controller';
import bannerController from './controllers/banner.controller';
import serviceController from './controllers/service.controller';
import transactionController from './controllers/transaction.controller';
import cors from 'cors'

import { authenticate } from './middlewares/authenticate.middleware';
import { errorHandler } from './utils/errorHandling';



const app = express();
const port = 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use(cors())

app.post('/registration', authControllers.registerUser);
app.post('/login', authControllers.loginUser);

app.get('/banner', bannerController.getBanners);
app.get('/profile', authenticate,userController.getProfile);
app.get('/services',authenticate,serviceController.getServices);
app.get('/balance',authenticate,userController.getBalance);
app.get('/transaction/history',authenticate,transactionController.handleGetTransactionHistory);

app.post('/topup',authenticate,transactionController.transaksiTopup);
app.post('/transaction',authenticate,transactionController.transactionPayment);

app.put('/profile/update',authenticate,userController.updateProfile);
app.put('/profile/image',authenticate,userController.updateProfileImage);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
