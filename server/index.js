import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine';
import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';

import joiningAGamingRoom from './ioEvents/joiningAGamingRoom.js';
import opponentSquareHasMoved from './ioEvents/opponentSquareHasMoved.js';
import aiMoveNextToPlayerMove from './ioEvents/aiMoveNextToPlayerMove.js';


const app = express();
const httpServer = createServer(app);

// parse json data
app.use(express.json());

const io = new Server(httpServer, {
    cors: {
        origin: "https://localhost:3000",
        allowedHeaders: ["userId"],
        credentials: true
    }
});
io.on("connection", (socket) => {
    joiningAGamingRoom(io, socket);
    opponentSquareHasMoved(io, socket);
    aiMoveNextToPlayerMove(io, socket)
});

app.get('/allowedMoves', (req, res, next) => {
    if (req.body) {
        const jsonFromFen = status(req.body.fen);
        const piecePossibleMovesFromJSON = JSON.parse(jsonFromFen)[req.body.square.toUpperCase()];
        res.json({ piecePossibleMovesFromJSON, ok: true });
    } else {
        res.json({ ok: false });
    }
})

app.get('/allowedMoves', (req, res, next) => {
    if (req.body) {
        const jsonFromFen = status(req.body.fen);
        const piecePossibleMovesFromJSON = JSON.parse(jsonFromFen)[req.body.square.toUpperCase()];
        res.json({ piecePossibleMovesFromJSON, ok: true });
    } else {
        res.json({ ok: false });
    }
})

// create new game for two players;
const game = new Game()
const { move } = jsChessEngine;
game.moves(from);
game.move(from, to);
const newFen = move(currentFen);
game.setPiece(currentLocation, replacingLocation);
game.removePiece(location);
game.aiMove(level);



httpServer.listen(3000);










