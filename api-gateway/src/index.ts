import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/route';

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "9152");
const host = process.env.HOST || "localhost";
const web_host =  process.env.WEB_HOST;

const allowHeaders = function(req: Request, res: Response, next: any){
  res.header('Access-Control-Allow-Headers','*')
  res.header('Access-Control-Allow-Origin','*')
  next()
}

app.use(express.json())
app.use(express.urlencoded())
app.use(allowHeaders)

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong! :3');
});

// Cors
app.use(cors({
  origin: [web_host + ''],
  credentials: true
}))

// Rotas
app.use('/api', router)

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
  res.status(404)
})

app.listen(port, host, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});