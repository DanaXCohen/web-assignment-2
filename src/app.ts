import express, { Express } from "express";
import { config } from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import errorHandler from './middleware/errorHandler';
import swaggerSetup from './swagger';
import routes from "./routes";

config();
const app: Express = express();

const port: string | undefined = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT as string, {
    useNewUrlParser: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
    console.log("Connected to the database");
});
// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

// Swagger
swaggerSetup(app)

app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

