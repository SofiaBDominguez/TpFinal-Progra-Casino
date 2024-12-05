// Importacion de la libreria ReadLine-Sync para interactuar con la consola 
import * as rls from 'readline-sync';
import { Juego } from "../abstractas/Juego";
import { Jugador } from "../Jugador";

export class Dado extends Juego {
  private dado1: number;
  private dado2: number;
  private resultadoFinal: number;
  private combinacionesGanadoras: Map<string, number>;
  private minDado: number;
  private maxDado: number;

  constructor(nombre: string) {
    super(nombre);
    this.minDado = 1;
    this.maxDado = 6;
    this.dado1 = 0;
    this.dado2 = 0;
    this.resultadoFinal = 0;
    this.combinacionesGanadoras = new Map([
      ["Juego de Paredes", 5],
      ["Juego de De Paul", 7],
      ["Juego de Messi", 10],
    ]);
  }

  public agregarValorPago(tipoApuesta: string, pago: number): void {
    this.valorPago.set(tipoApuesta, pago);
  }

  iniciar(jugador: Jugador): void {
    super.iniciar(jugador);

    let index = 0;
    let jugadas: string[] = [];

    let seguirJugando: boolean = true;

    console.log(`Bienvenido al juego de dados: ${this.nombre} \n`);

    while (seguirJugando) {

      console.log("Tipos de apuesta disponibles: \n");

      this.combinacionesGanadoras.forEach((valor, clave) => {
        jugadas.push(clave)
        console.log(`[${jugadas.length - 1}] ${clave} (Combinacion ganadora: ${valor})`);
        index++;
      });

      let juegoElegido: number = rls.questionInt("\n Seleccione el numero del juego: ");

      if (juegoElegido < 0 || juegoElegido > jugadas.length - 1) {
        console.log("Error: elija un juego valido!");
        juegoElegido = rls.questionInt("\n Seleccione el numero del juego: ");
      }

      const combinacionElegida = jugadas[juegoElegido]
      const valorGanador = this.combinacionesGanadoras.get(combinacionElegida);

      console.log(`Has seleccionado: ${combinacionElegida} (Combinacion ganadora: ${valorGanador}). \n`);

      this.solicitarApuesta();

      console.log(`Apostaste: ${this.apuesta} creditos. \n`);

      // Iniciar la ronda
      this.jugarRonda(valorGanador!, jugador);

      //ACA VER COMO SEGUIR, LE PODEMOS DECIR AL USARIO QUE ELIJA ENTRE LAS OPCIONES DE TIRADA DE NUEVO O VOLVER AL CASINO
      this.mostrarSaldo();
      let desicionJugador = rls.questionInt("Volver a jugar? : [0] NO , [1] Si \n");

      while (desicionJugador != 0 && desicionJugador != 1) {
        console.log("Error: seleccione una opcion valida!");
        desicionJugador = rls.questionInt("Volver a jugar? : [0] NO , [1] Si \n");
      }

      if (desicionJugador == 0) {
        seguirJugando = false;
      } else if (desicionJugador == 1) {
        jugadas = [];
      }

    }

    this.finalizar();
  }

  jugarRonda(valorGanador: number, jugador: Jugador) {
    // Generar números aleatorios para los dados
    this.dado1 = Math.floor(Math.random() * this.maxDado) + this.minDado;
    this.dado2 = Math.floor(Math.random() * this.maxDado) + this.minDado;
    this.resultadoFinal = this.dado1 + this.dado2;

    console.log(`Lanzaste los dados: ${this.dado1} y ${this.dado2}. Suma total: ${this.resultadoFinal}.`);


    // Verificar si ganó o perdió
    if (this.resultadoFinal === valorGanador) {
      const ganancia = this.apuesta * 2; // Ejemplo de pago
      jugador.agregarSaldo(ganancia);
      console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
    } else {
      jugador.reducirSaldo(this.apuesta);
      console.log(`Lo siento, perdiste ${this.apuesta} creditos.`);
    }
  }
}
