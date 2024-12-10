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
  /**
   * Metodo abstracto donde cada hijo definira sus propios resultados 
   */
  protected abstract generarResultado(): string[];

  iniciar(jugador: Jugador): void {
    super.iniciar(jugador);
    //Bandera para controlar el bucle del juego 
    let seguirJugando: boolean = true;

    console.log(
      `Bienvenido al juego de tragamonedas: ${this.nombre} - Apuesta Minima: ${this.apuestaMinima} \n`
    );

    //Verificamos que el saldo sea valido 
    if (this.jugador.getSaldo() < this.getApuestaMinima()) {
      console.log(
        "Tu saldo es insuficiente para jugar este juego - Saldo: " + this.jugador.getSaldo()
      );
      //Si no es valido finalizamos el juego 
      this.finalizar();
    }

    //Iniciamos el bucle verificando la bandera y que el saldo sea suficiente 
    while (seguirJugando && this.jugador.getSaldo() >= this.getApuestaMinima()) {

      this.solicitarApuesta();
      this.jugarRonda();
      this.mostrarSaldo();

      //Verificamos el saldo del jugador con la apuesta minima
      if (this.jugador.getSaldo() < this.getApuestaMinima()) {
        console.log("Tu saldo es insuficiente para jugar este juego - Saldo: " + this.jugador.getSaldo());
        this.finalizar();
      } else {
        //Si tiene saldo disponible se le ofrece volver a jugar 
        let desicionJugador = rls.questionInt(
          "Volver a jugar? : [0] NO , [1] Si \n"
        );

        //Iniciamos el bucle hasta que el jugador ingrese la opcion correcta 
        while (desicionJugador != 0 && desicionJugador != 1) {
          console.log("Error: seleccione una opcion valida!");
          desicionJugador = rls.questionInt(
            "Volver a jugar? : [0] NO , [1] Si \n"
          );
        }
        //Si el jugador lo desea, se cierra el bucle 
        if (desicionJugador == 0) {
          seguirJugando = false;
        }
      }
    }
  }
  
/**
 * Metodo encargado de implementar la logica del juego y comunicar el resultado de la apuesta 
 */
  jugarRonda(): void {
    console.log("Girando los rodillos...");
    const resultado = this.generarResultado();

    console.log(`Resultado: ${resultado.join(" | ")}`);

    if (this.verificarGanador(resultado)) {
      let ganancia = this.apuesta * this.multiplicador;
      console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
      this.jugador.agregarSaldo(ganancia); 
    } else {
      console.log(`Lo siento, perdiste ${this.apuesta} creditos.`);
    }
  }

  /**
   *Metodo para verificar que los items sean iguales entre si 
   * @param resultado string[]
   * @returns true | false 
   */
  protected verificarGanador(resultado: string[]): boolean {
    return resultado.every(item => item === resultado[0]);
  }
}
