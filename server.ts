import express from 'express';
import { registerApiRoutes } from './server-api';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Register JSON body parser & checkout / orders backend endpoints
  registerApiRoutes(app);

  if (process.env.NODE_ENV === 'production') {
    // Production static serving
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: process.cwd() });
    });
  } else {
    // Dynamically import vite only in development so production has zero runtime dependency on vite
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
