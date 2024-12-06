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

    getJuegos() {
        return this.juegos;
    }

    getJugador(): Jugador {
        return this.jugador!;
    }

    seleccionarJuego(indice: number): Juego {
        return this.juegos[indice];
    }

    iniciarSesion() {
        console.log('Bienvenido al Casinoo del 10 \n');
        //Pedirle al usuario nombre y saldo del jugador
        let nombre: string = rls.question("Ingrese el nombre del jugador: ");
        let saldo: number = rls.questionInt("Ingrese el numero del saldo: ");

        //Luego setearlo
        this.jugador = new Jugador(nombre, saldo);

        this.mostrarJuegos();

        let juegoElegido: number = rls.questionInt("Ingrese el juego que quiera jugar: ");
        while (juegoElegido < 0 || juegoElegido > this.juegos.length - 1) {
            console.log("Error: elija un juego valido!");
            juegoElegido = rls.questionInt("Ingrese el juego que quiera jugar: ");
        }

        let juegoActual: Juego = this.juegos[juegoElegido];
        juegoActual.iniciar(this.jugador);

    }

    mostrarJuegos(): void {
        console.log('\n Que juego desea jugar?');
        this.juegos.forEach((juego, index) => {
            console.log('------------------------------------------------');
            console.log(`[${index}] ${juego.getNombre()}`);
        });
        console.log('------------------------------------------------');
    }
}