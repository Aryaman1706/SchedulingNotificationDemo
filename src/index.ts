import express from "express";
import "./notification/subscriber";
import notification from "./notification/routes";

const app = express();
app.use(express.json());

app.use("/api/notification", notification);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server Started."));
