import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import responseTime from "response-time";
import requestHeaders from "./middleware/requestHeaders";
import errorHandler from "./middleware/requestErrorHandle";
import { pageNotFound } from "./middleware/404Page";
import userRouter from "./routes/users.route";
dotenv.config();

const app: Application = express();

// convert request to json using express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// active cors policy for client accessibility
app.use(cors({ credentials: true, origin: "*" }));

app.options("*", cors());

app.use(compression());

// client request headers
app.use(requestHeaders);

app.use(responseTime());

app.use("v1/api/", userRouter);

// page not found
app.use(pageNotFound);

// express client error handle
app.use(errorHandler);

// connecting server
(async function startConnection() {
  try {
    app.listen(process.env.PORT! || 8000, () => {
      console.log(`App running on port ${process.env.PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
})();
