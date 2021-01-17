const BandList = require("./bandList");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log('Cliente conectado: ');

      //Emitir al cliente conectado todas las bandas
      socket.emit("current-bands", this.bandList.getBands());

      socket.on("votar-banda", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("borrar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("cambiar-nombre-banda", (data) => {
        this.bandList.changeName(data.id, data.nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("nueva-banda", (nombreBanda) => {
          this.bandList.addband(nombreBanda);
          this.io.emit("current-bands", this.bandList.getBands());
      })
    });
  }
}

module.exports = Sockets;
