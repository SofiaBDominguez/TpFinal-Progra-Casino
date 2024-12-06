import { Tragamonedas } from "../abstractas/Tragamonedas";

export class TragamonedasSeleccion extends Tragamonedas {


    constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
        super(nombre, apuestaMinima, multiplicador);
        this.items = ["10", "11", "23"]; // Conjunto de símbolos
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
