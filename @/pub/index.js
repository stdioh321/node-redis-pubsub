import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import Redis from "ioredis";

const app = new App();
const redis = new Redis();

app.use(json());

app.post("/", (req, res) => {
  redis.publish("send-user-data", JSON.stringify({ ...req.body }));
  return res.sendStatus(200);
});

const port = process.env.PORT || 3000
app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});