import { Tragamonedas } from "../abstractas/Tragamonedas";

export class TragamonedasSeleccion extends Tragamonedas {
  constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
    super(nombre, apuestaMinima, multiplicador);
    this.items = ["10", "11", "23"]; // Conjunto de símbolos
  }

comoJugar(): void {
    console.log("🎰 Tragamonedas: Selección");
    console.log("Descripcion:");
    console.log(
      "1- Selecciona tu apuesta y gira para obtener 4 simbolos numericos. \n" +
        "2- Simbolos posibles: 10 (Messi), 11 (Di Maria), 23 (Dibu). \n" +
        "3- Como ganar: Si los 4 simbolos coinciden, ganas creditos! \n" +
        "4- Ejemplo de victoria: (11 | 11 | 11 | 11)."
    );
  }

  protected generarResultado(): string[] {
    // Generar un array de 4 items aleatorios
    const resultado: string[] = [];
    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * this.items.length);
      resultado.push(this.items[indiceAleatorio].toString());
    }
    return resultado;
  }
}
