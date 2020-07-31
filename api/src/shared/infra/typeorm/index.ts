import { createConnection, Connection } from 'typeorm';

async function createConnections(): Promise<Connection> {
  const connections = await createConnection();

  return connections;
}
createConnections();
