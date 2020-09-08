import * as express from "express";
// @ts-ignore
import * as http from "http";
import * as socketio from "socket.io";
import generateList from "./game_functions/generateList";
import Timer from "./game_functions/timer";
import generateLetter from "./game_functions/randomLetter";

const expressServer = express();

// @ts-ignore
expressServer.use(express.static("../main/public"));

// @ts-ignore
expressServer.get("/hello", (req, res) => {
  res.send("World");
});

const httpServer = http.createServer(expressServer);
const io = socketio.listen(httpServer, {});

const lobbyIO = io.of("/lobby");

lobbyIO.on("connection", (client) => {
  console.log("user joined!");

  client.on("generate_list", () => {
    lobbyIO.emit("list_generated", generateList());
    Timer().then(() => {
      lobbyIO.emit("timer_ended");
    });
  });

  client.on("generate_letter", () => {
    lobbyIO.emit("letter_generated", generateLetter());
  });

  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// @ts-ignore
const port = process.env.PORT || 8080

httpServer.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
