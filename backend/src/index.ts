// Importing the required dependencies into the application
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { environment } from './utils/constants';
import { connectDB } from './mongodb/connect';
import { errorHandler } from './middlewares/errorMiddleware';
import userRoutes from './routes/users';

// Initializing the application
const app: Express = express();

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/v1/users', userRoutes);

// Setting up the port and database connection url
const port = environment.APP_PORT || 3000;
const mongoDbURI = `mongodb+srv://${environment.DB_USERNAME}:${environment.DB_PASSWORD}@simple-paytm.d2o2q0r.mongodb.net/`;

// Restrict all miscellaneous routes
app.get('*', (_: Request, res: Response) => res.status(404).send('Not found'));

// Global Error catch handler
app.use(errorHandler);

// Server started on the required port
app.listen(port, async () => {
  console.log(`[server]: The port is listening on ${port}`);
  // Connecting to the database
  await connectDB(mongoDbURI);
});
