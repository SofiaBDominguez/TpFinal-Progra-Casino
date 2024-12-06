export class Jugador {
  private nombre: string;
  private saldo: number;

  constructor(nombre: string, saldo: number) {
    this.nombre = nombre;
    this.saldo = saldo;
  }
  /**
   * Agrega el saldo que viene por parametro al atributo this.saldo
   * @param saldo number
   */
  agregarSaldo(saldo: number) {
    this.saldo += saldo;
  }
  /**
   * Modifica el saldo que viene por parametro al this.saldo
   * @param saldo number
   */
  modificarSaldo(saldo: number) {
    this.saldo = saldo;
  }

  getNombre(): string {
    return this.nombre;
  }

  /**
   * Resta el saldo segun la apuesta ingresada por parametro
   * @param apuesta number
   */
  reducirSaldo(apuesta: number): void {
    this.saldo -= apuesta;
  }

  getSaldo() {
    return this.saldo;
  }
}
