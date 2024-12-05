import { IJuego } from "../interfaces/IJuego";
import { Jugador } from "../Jugador";

export abstract class Juego implements IJuego {
  protected nombre: string;
  protected tipoApuesta: string;
  protected apuestaMinima: number;
  protected apuesta: number;
  protected valorPago: Map<string, number>;
  protected jugador: Jugador;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.tipoApuesta = "";
    this.apuesta = 0;
    this.apuestaMinima = 0;
    this.valorPago = new Map<string, number>();
    this.jugador = new Jugador("Mario Bross", 0);
  }

  public abstract agregarValorPago(tipoApuesta: string, pago: number): void;

  modificarApuesta(apuesta: number) {
    this.apuesta = apuesta;
  }
  agregarApuesta(apuesta: number): void {
    this.apuesta += apuesta;
  }

  getNombre() : string {
    return this.nombre;
  }

  setNombre(nombre: string) : void{
    this.nombre = nombre;
  }
   
  getApuestaMinima() : number {
    return this.apuestaMinima;
  }

  setApuestaMinima(apuestaMinima: number) : void{
    this.apuestaMinima = apuestaMinima;
  }

  getApuesta(apuesta : number){
    return this.apuesta;
  }

  getTipoDeApuesta() : string {
    return this.tipoApuesta;
  }

  setTipoDeApuesta(tipoApuesta : string) : void {
    this.tipoApuesta = tipoApuesta;
  }

  // METODOS DE LA INTERFACE IJUEGO

  iniciar(jugador: Jugador) {
    console.log()
    
    this.comoJugar();
  }
  comoJugar() {
    throw new Error("Method not implemented.");
  }
  insertarApuesta(apuesta: number) {
    this.apuesta = apuesta;  
  }
  jugarRonda() {
    throw new Error("Method not implemented.");
  }
  finalizar(): Jugador {
    return this.jugador;
  }
  tipoDeApuesta() {
    throw new Error("Method not implemented.");
  }
}
