// Importacion de la libreria ReadLine-Sync para interactuar con la consola
import * as rls from "readline-sync";
import { Juego } from "../abstractas/Juego";
import { Jugador } from "../Jugador";

export class Dado extends Juego {
  private dado1: number;
  private dado2: number;
  private resultadoFinal: number;
  private combinacionesGanadoras: Map<string, number>;
  private minDado: number;
  private maxDado: number;

  constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
    super(nombre, apuestaMinima, multiplicador);
    this.minDado = 1;
    this.maxDado = 6;
    this.dado1 = 0;
    this.dado2 = 0;
    this.resultadoFinal = 0;
    //Se le asigna una clave (string) y un valor (number)
    this.combinacionesGanadoras = new Map([
      ["Juego de Paredes", 5],
      ["Juego de De Paul", 7],
      ["Juego de Messi", 10],
    ]);
  }

  comoJugar(): void {
    console.log("\n 🎲 Dado");
    console.log("Descripcion:");
    console.log(
      "1- Coloca tu apuesta y lanza un dado. \n" +
      "2- Como ganar: Si el numero que sale coincide con tu prediccion, ganas! \n" +
      "3- Tipos de jugadas disponibles: \n" +
      "   a- Juego de Paredes (5): Gana si la suma de los dados es 5. \n" +
      "   b- Juego de De Paul (7): Gana si la suma de los dados es 7. \n" +
      "   c- Juego de Messi (10): Gana si la suma de los dados es 10."
    );
  }

  iniciar(jugador: Jugador): void {
    //Implicitamente seteamos el atributo jugador y mostramos las instrucciones
    super.iniciar(jugador);

    let index = 0;
    let jugadas: string[] = [];
    //Bandera para controlar al bucle
    let seguirJugando: boolean = true;

    console.log(
      `Bienvenido al juego de dados: ${this.nombre} - Apuesta Minima: ${this.apuestaMinima} \n`
    );
    //Verificamos que el saldo sea suficiente, si no lo es finalizamos el juego
    if (this.jugador.getSaldo() < this.getApuestaMinima()) {
      console.log(
        "Tu saldo es insuficiente para jugar este juego - Saldo: " +
        this.jugador.getSaldo()
      );
      this.finalizar();
    }
    //Iniciamos el bucle verificando la bandera y tambien verificamos que el saldo sea suficiente partida a partida
    while (
      seguirJugando &&
      this.jugador.getSaldo() >= this.getApuestaMinima()
    ) {
      console.log("Tipos de apuesta disponibles: \n");
      //Le mostramos al usuario las combinaciones a apostar
      this.combinacionesGanadoras.forEach((valor, clave) => {
        jugadas.push(clave);
        console.log(
          `[${jugadas.length - 1}] ${clave} (Combinacion ganadora: ${valor})`
        );
        index++;
      });

      //Le pedimos al usuario que seleccione su combinacion ganadora
      let juegoElegido: number = rls.questionInt(
        "\n Seleccione el numero del juego: "
      );

      //Verificamos que el usuario ingrese una opcion valida
      if (juegoElegido < 0 || juegoElegido > jugadas.length - 1) {
        console.log("Error: elija un juego valido!");
        juegoElegido = rls.questionInt("\n Seleccione el numero del juego: ");
      }
      //Guardamos la combinacion ganadora y el valor correspondiente
      const combinacionElegida = jugadas[juegoElegido];
      const valorGanador = this.combinacionesGanadoras.get(combinacionElegida);

      console.log(
        `Has seleccionado: ${combinacionElegida} (Combinacion ganadora: ${valorGanador}). \n`
      );

      this.solicitarApuesta();

      console.log(`Apostaste: ${this.apuesta} creditos. \n`);

      // Iniciar la ronda
      this.jugarRonda(valorGanador!, jugador);

      this.mostrarSaldo();

      //Verificamos que el saldo sea suficiente
      if (this.jugador.getSaldo() < this.getApuestaMinima()) {
        console.log(
          "Tu saldo es insuficiente para jugar este juego - Saldo: " +
          this.jugador.getSaldo()
        );
        this.finalizar();
      } else {
        //Le ofrecemos al usuario volver a jugar
        let decisionJugador = rls.questionInt(
          "Volver a jugar? : [0] NO , [1] Si \n"
        );

        //Iniciamos el bucle hasta que el jugador ingrese la opcion correcta
        while (decisionJugador != 0 && decisionJugador != 1) {
          console.log("Error: seleccione una opcion valida!");
          decisionJugador = rls.questionInt(
            "Volver a jugar? : [0] NO , [1] Si \n"
          );
        }
        //Verificamos la decision del jugador
        if (decisionJugador == 0) {
          //Cortamos la bandera para finalizar el bucle
          seguirJugando = false;
        } else if (decisionJugador == 1) {
          //Reiniciamos las variables de control del juego
          jugadas = [];
        }
      }
    }
    //Si llegamos hasta aca finalizamos el juego
    this.finalizar();
  }
  /**
   * Metodo encargado de implementar la logica del juego y comunicar el resultado de la apuesta
   * @param valorGanador number
   * @param jugador Jugador
   */
  jugarRonda(valorGanador: number, jugador: Jugador) {
    // Generar números aleatorios para los dados
    this.dado1 = Math.floor(Math.random() * this.maxDado) + this.minDado;
    this.dado2 = Math.floor(Math.random() * this.maxDado) + this.minDado;
    this.resultadoFinal = this.dado1 + this.dado2;

    console.log(
      `Lanzaste los dados: ${this.dado1} y ${this.dado2}. Suma total: ${this.resultadoFinal}.`
    );

    // Verificar si ganó o perdió
    if (this.resultadoFinal === valorGanador) {
      //Creamos la ganancia a partir de la apuesta y el multiplicador
      const ganancia = this.apuesta * this.multiplicador;
      jugador.agregarSaldo(ganancia);
      console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
    } else {
      console.log(`Lo siento, perdiste ${this.apuesta} creditos.`);
    }
  }
}
