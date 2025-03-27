import app from './index';
import { Server } from 'http';

const PORT = 5000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default server;
