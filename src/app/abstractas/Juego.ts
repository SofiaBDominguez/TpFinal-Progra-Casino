// Importacion de la libreria ReadLine-Sync para interactuar con la consola 
import * as rls from 'readline-sync';
import { IJuego } from "../interfaces/IJuego";
import { Jugador } from "../Jugador";

export abstract class Juego implements IJuego {
  protected nombre: string;
  protected apuestaMinima: number;
  protected apuesta: number;
  protected tipoApuesta: string;
  protected valorPago: Map<string, number>;
  protected jugador: Jugador;

  constructor(nombre: string, apuestaMinima: number) {
    this.nombre = nombre;
    this.tipoApuesta = "";
    this.apuesta = 0;
    this.apuestaMinima = apuestaMinima;
    this.valorPago = new Map<string, number>();
    this.jugador = new Jugador("Mario Bross", 0);
  }

  public abstract agregarValorPago(tipoApuesta: string, pago: number): void;

  solicitarApuesta() {
    this.mostrarSaldo();
    let apuesta: number = rls.questionInt("Cuanto va a apostar? ");
  
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
  agregarApuesta(apuesta: number): void {
    this.apuesta += apuesta;
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

  getApuesta(apuesta: number) {
    return this.apuesta;
  }

  getTipoDeApuesta(): string {
    return this.tipoApuesta;
  }

  setTipoDeApuesta(tipoApuesta: string): void {
    this.tipoApuesta = tipoApuesta;
  }

  // METODOS DE LA INTERFACE IJUEGO

  iniciar(jugador: Jugador) {
    console.log("Iniciando juego")
    this.jugador = jugador;
    this.comoJugar();
  }
  comoJugar() {
    console.log("Las reglas son...")
  }
  insertarApuesta(apuesta: number) {
    this.apuesta = apuesta;
  }

  finalizar(): Jugador {
    return this.jugador;
  }
  tipoDeApuesta() {
    throw new Error("Method not implemented.");
  }
}
