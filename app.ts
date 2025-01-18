import express, { Express } from "express";
import { config } from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler";
import swaggerSetup from "./swagger";
import routes from "./routes";

config();
const app: Express = express();

const port: string | undefined = process.env.PORT;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// Swagger
swaggerSetup(app);

app.use(errorHandler as unknown as express.ErrorRequestHandler);

export const startServer = async (): Promise<ReturnType<
  Express["listen"]
> | null> => {
  try {
    console.log("\nTrying to connect to MongoDB...");
    await mongoose.connect(process.env.DB_CONNECT!);
    console.log("MongoDB connected successfully");
  } catch (exception: any) {
    console.error(exception.message);
    console.error(exception.stack);
    throw exception;
  }

  return app.listen(port, () => {
    console.log(`\nServer is listening on port: ${port} \n`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
  });
};

export const startServerInProd = (): void => {
  if (process.env.NODE_ENV !== "test") {
    startServer();
  }
};

startServerInProd();
export default app;
