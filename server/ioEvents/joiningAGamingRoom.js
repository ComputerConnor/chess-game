import crypto from 'crypto';
export default (io, socket) => {
    socket.on('openAGame', (userId) => {
        socket.join(crypto.randomUUID());
    });
}