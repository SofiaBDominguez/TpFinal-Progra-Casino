import { Jugador } from "../Jugador";
import { Juego } from "./Juego";
import * as rls from "readline-sync";

export abstract class Tragamonedas extends Juego {
  protected items: Array<String>;
  protected itemsGanadores: Array<String>;

  constructor(nombre: string, apuestaMinima: number) {
    //super() === Juego() por lo que tengo que respetar los parametros del padre
    super(nombre, apuestaMinima);
    this.items = new Array<String>();
    this.itemsGanadores = new Array<String>();
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
      console.log("¡Felicidades, has ganado!");
      this.jugador.agregarSaldo(this.apuesta * 5); // Ganancia fija por ejemplo
    } else {
      console.log("Lo siento, no has ganado esta vez.");
    }
  }

  protected verificarGanador(resultado: string[]): boolean {
    //metodo json.stringify para pasar a texto plano un atributo
    // return JSON.stringify(resultado) === JSON.stringify(this.itemsGanadores);
    let bandera = true;
    let index = 0; 
    while (bandera == true && index < resultado.length){
        if (resultado[index] != resultado[index+1] ){
            return false 
        }
        index++;
    }
    return true; 
  }
}
