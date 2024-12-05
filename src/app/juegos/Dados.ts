import { Juego } from "../abstractas/Juego";

export class Dado extends Juego {
  private dado1: number;
  private dado2: number;
  private resultadoFinal: number;
  private combinaciones: Map<string, number>;

  constructor( nombre: string, dado1: number, dado2: number, resultadoFinal: number) {
    super(nombre);
    this.dado1 = 0;
    this.dado2 = 0;
    this.resultadoFinal = 0;
    this.combinaciones = new Map([
      ["Juego de 7", 7],
      ["Juego de 11 ", 11],
      ["Juego de Messi", 10],
    ]);
  }

  public agregarValorPago(tipoApuesta: string, pago: number): void {
    this.valorPago.set(tipoApuesta, pago);
  }

  jugarRonda(): void {
   
  }
}
