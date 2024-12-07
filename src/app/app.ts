import * as rls from "readline-sync";

import { Casino } from "./Casino";
import { Dado } from "./juegos/Dados";
import { Ruleta } from "./juegos/Ruleta";
import { TragamonedasComida } from "./juegos/TragamonedasComida";
import { TragamonedasSeleccion } from "./juegos/TragamonedasSeleccion";

function main() {
    // Crear el casino
    const casino = new Casino();

    // Agregar juegos al casino
    casino.agregarJuego(new Dado("Dados Seleccion Argentina", 50, 2));
    casino.agregarJuego(new Ruleta("Ruleta Clásica", 100, 36));
    casino.agregarJuego(new TragamonedasComida("Tragamonedas de Comida", 25, 5));
    casino.agregarJuego(new TragamonedasSeleccion("Tragamonedas de la seleccion", 50, 25));

    // Iniciar sesion del jugador
    casino.iniciarSesion();

    // Bucle para permitir que el jugador siga jugando o salga del casino
    let seguirJugando = true;

    while (seguirJugando) {
        console.log("\n ¿Que deseas hacer?");
        console.log("[1] Jugar otro juego");
        console.log("[0] Salir del casino");

        const opcion = rls.questionInt("Selecciona una opcion: ");

        switch (opcion) {
            case 1:
                casino.mostrarJuegos();

                const juegoElegido = rls.questionInt("Ingresa el numero del juego que deseas jugar: ");

                if (juegoElegido >= 0 && juegoElegido < casino.getJuegos().length) {
                    const juegoActual = casino.getJuegos()[juegoElegido];
                    juegoActual.iniciar(casino.getJugador()!); // Usamos el operador de no-null porque sabemos que el jugador ya esta definido
                } else {
                    console.log("Opcion invalida. Intenta de nuevo.");
                }

                break;

            case 0:
                console.log(`Gracias por visitar el Casino del 10 ${casino.getJugador().getNombre()}. ¡Hasta la proxima!`);
                seguirJugando = false;
                break;

            default:
                console.log("Opcion no valida. Intenta de nuevo.");
        }
    }
}

// Ejecutar el programa
main();