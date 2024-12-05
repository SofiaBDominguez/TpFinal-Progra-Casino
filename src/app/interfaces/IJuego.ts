export interface IJuego {
    iniciar(jugador : Jugador); 
    comoJugar();
    insertarApuesta(apuesta : number);
    jugarRonda();
    finalizar() : Jugador;
    tipoDeApuesta();

}