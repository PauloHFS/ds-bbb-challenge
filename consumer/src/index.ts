import amqplib from 'amqplib';

const queue = 'votacao';

const apuracao = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
};

(async () => {
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, message => {
    if (!message) return;
    console.log(' [%s] Received %s ', new Date(), message.content.toString());
    try {
      const { candidato }: { candidato: keyof typeof apuracao } = JSON.parse(
        message.content.toString()
      );
      apuracao[candidato] += 1;
      console.log(apuracao);
      channel.ack(message);
    } catch (error) {
      console.log(error);
    }
  });
})();
