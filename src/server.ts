import cors from 'cors';
import 'dotenv/config';
import express  from 'express';
import { CriminalsRoutes } from './routes/criminal.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/delegacia", CriminalsRoutes.execute());

app.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
    
})