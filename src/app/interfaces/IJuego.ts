import { Jugador } from "../Jugador";

export interface IJuego {
    iniciar(jugador: Jugador): void;
    comoJugar(): void;
    insertarApuesta(apuesta: number): void;
    jugarRonda(): void;
    finalizar(): Jugador;
    tipoDeApuesta(): void;

}