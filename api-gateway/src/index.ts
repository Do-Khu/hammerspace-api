import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;
const web_host =  process.env.WEB_HOST;

app.use(express.json())
app.use(express.urlencoded())

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong! :3');
});

// Cors
app.use(cors({
  origin: [web_host + '']
}))

// Rotas
app.use('/api', router)

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
  res.status(404)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});