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
     * Metodo para finalizar el juego 
     */
    finalizar(): Jugador;

    /**
    * Metodo para solicitar al jugador su apuesta
    */
    solicitarApuesta(): void;
}