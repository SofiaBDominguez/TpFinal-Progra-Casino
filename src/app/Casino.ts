// Importacion de la libreria ReadLine-Sync para interactuar con la consola 
import * as rls from 'readline-sync';

import { Juego } from "./abstractas/Juego";
import { Jugador } from "./Jugador";


export class Casino {

    protected juegos: Array<Juego>;

    protected jugador: Jugador | undefined;

    constructor() {
        this.juegos = [];
    }

    agregarJuego(juego: Juego) {
        this.juegos.push(juego);
    }

    seleccionarJuego(indice: number): Juego {
        return this.juegos[indice];
    }

    iniciarSesion() {

        //Pedirle al usuario nombre y saldo del jugador
        let nombre: string = rls.question("Ingrese el nombre del jugador: ");
        let saldo: number = rls.questionInt("Ingrese el numero del saldo: ");

        //Luego setearlo
        this.jugador = new Jugador(nombre, saldo);
    }
}