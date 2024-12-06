import { Jugador } from "../Jugador";

export interface IJuego {
    /**
     * Metodo para dar inicio al juego 
     * @param jugador Jugador 
     */
    iniciar(jugador: Jugador): void;
    /**
     * Metodo que muestra las instrucciones del juego 
     */
    comoJugar(): void;
    /**
     * Metodo para ingresar apuesta
     * @param apuesta number
     */
    insertarApuesta(apuesta: number): void;
    /**
     * Metodo para finalizar el juego 
     */
    finalizar(): Jugador;
}