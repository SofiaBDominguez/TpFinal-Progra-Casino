import { Jugador } from "../Jugador";
import { Juego } from "./Juego";
import * as rls from "readline-sync";

export abstract class Tragamonedas extends Juego {
  protected items: Array<String>;

  constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
    //super() === Juego() por lo que tengo que respetar los parametros del padre
    super(nombre, apuestaMinima, multiplicador);
    this.items = new Array<String>();
  }

  protected abstract generarResultado(): string[];

  iniciar(jugador: Jugador): void {
    super.iniciar(jugador);

    let seguirJugando: boolean = true;

    console.log(
      `Bienvenido al juego de tragamonedas: ${this.nombre} - Apuesta Minima: ${this.apuestaMinima} \n`
    );

    if (this.jugador.getSaldo() < this.getApuestaMinima()) {
      console.log(
        "Tu saldo es insuficiente para jugar este juego - Saldo: " +
        this.jugador.getSaldo()
      );
      this.finalizar();
    }

    while (seguirJugando && this.jugador.getSaldo() >= this.getApuestaMinima()) {
      this.solicitarApuesta();
      this.jugarRonda();

      this.mostrarSaldo();
      if (this.jugador.getSaldo() < this.getApuestaMinima()) {
        console.log("Tu saldo es insuficiente para jugar este juego - Saldo: " + this.jugador.getSaldo());
        this.finalizar();
      } else {
        let desicionJugador = rls.questionInt(
          "Volver a jugar? : [0] NO , [1] Si \n"
        );

        while (desicionJugador != 0 && desicionJugador != 1) {
          console.log("Error: seleccione una opcion valida!");
          desicionJugador = rls.questionInt(
            "Volver a jugar? : [0] NO , [1] Si \n"
          );
        }

        if (desicionJugador == 0) {
          seguirJugando = false;
        }
      }
    }
  }

  jugarRonda(): void {
    console.log("Girando los rodillos...");
    const resultado = this.generarResultado();

    console.log(`Resultado: ${resultado.join(" | ")}`);

    if (this.verificarGanador(resultado)) {
      let ganancia = this.apuesta * this.multiplicador;
      console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
      this.jugador.agregarSaldo(ganancia); // Ganancia fija por ejemplo
    } else {
      console.log(`Lo siento, perdiste ${this.apuesta} creditos.`);
    }
  }

  protected verificarGanador(resultado: string[]): boolean {
    //metodo json.stringify para pasar a texto plano un atributo
    // return JSON.stringify(resultado) === JSON.stringify(this.itemsGanadores);
    return resultado.every(item => item === resultado[0]);
  }
}
