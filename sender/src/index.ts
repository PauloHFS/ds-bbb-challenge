import amqplib from 'amqplib';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(express.json());

const queue = 'votacao';

(async () => {
  const conn = await amqplib.connect('amqp://localhost');

  const channel = await conn.createChannel();
  await channel.assertQueue(queue);

  app.post(
    '/votacao',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.body?.candidato || ![1, 2, 3, 4].includes(req.body?.candidato))
          return res.sendStatus(400);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
        return res.sendStatus(202);
      } catch (err) {
        next(err);
      }
    }
  );

  app.listen('3000', () => {
    console.log('Server is running on port 3000');
  });
})();
