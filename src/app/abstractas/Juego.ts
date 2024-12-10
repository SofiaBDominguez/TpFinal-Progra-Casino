// Importacion de la libreria ReadLine-Sync para interactuar con la consola 
import * as rls from 'readline-sync';
import { IJuego } from "../interfaces/IJuego";
import { Jugador } from "../Jugador";

export abstract class Juego implements IJuego {
  protected nombre: string;
  protected apuestaMinima: number;
  protected multiplicador: number;
  protected apuesta: number;
  protected jugador: Jugador;

  constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
    this.nombre = nombre;
    this.apuestaMinima = apuestaMinima;
    this.multiplicador = multiplicador;
    this.apuesta = 0;
    //Aca los instanciamos para no usar el jugador: Jugador | Undefined;
    this.jugador = new Jugador("Mario Bross", 0);
  }
  /**
   * Metodo que solicita al usuario el monto de la apuesta teniendo en cuenta los posibles errores
   */
  solicitarApuesta() {
    this.mostrarSaldo();
    let apuesta: number = rls.questionInt("Cuanto va a apostar? ");
    //Se buscan todos los errores posibles 
    while (apuesta < 0 || apuesta > this.jugador.getSaldo() || apuesta < this.apuestaMinima) {
      console.log("Error: elija un monto valido!");
      apuesta = rls.questionInt("Cuanto va a apostar? ");
    }
    this.jugador.reducirSaldo(apuesta);
    this.apuesta = apuesta;
  }

  mostrarSaldo(): void {
    console.log("El saldo es: ", this.jugador.getSaldo());
  }

  modificarApuesta(apuesta: number) {
    this.apuesta = apuesta;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getApuestaMinima(): number {
    return this.apuestaMinima;
  }

  setApuestaMinima(apuestaMinima: number): void {
    this.apuestaMinima = apuestaMinima;
  }

  getApuesta() {
    return this.apuesta;
  }

  // METODOS DE LA INTERFACE IJUEGO
  /**
   * Metodo para dar inicio al juego 
   * Implicitamente seteamos el atributo jugador y mostramos las instrucciones
   * @param jugador Jugador
   */
  iniciar(jugador: Jugador) {
    console.log("Iniciando juego")
    this.jugador = jugador;
    this.comoJugar();
  }
  comoJugar() {
    console.log("Las reglas son...")
  }

  finalizar(): Jugador {
    return this.jugador;
  }
}
