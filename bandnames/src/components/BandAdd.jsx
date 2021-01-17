import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const { socket } = useContext( SocketContext )
  const [valor, setValor] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    
    if (valor.trim().length > 0) {
      socket.emit( 'nueva-banda', valor )
      console.log(valor);
      setValor('')
    }
  };

  return (
    <div>
      <h3>Agregar Banda</h3>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre"
          onChange={(ev) => setValor(ev.target.value)}
        />
      </form>
    </div>
  );
};