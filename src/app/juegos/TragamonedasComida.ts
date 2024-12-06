import { Tragamonedas } from "../abstractas/Tragamonedas";

export class TragamonedasComida extends Tragamonedas {

    private simbolos: string[];

    constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
        super(nombre, apuestaMinima, multiplicador);
        this.simbolos = ["🍉", "🍇", "🍌", "🍍"]; // Conjunto de símbolos
    }

    protected generarResultado(): string[] {
        // Generar un array de 3 símbolos aleatorios
        const resultado: string[] = [];
        for (let i = 0; i < 3; i++) {
            const indiceAleatorio = Math.floor(Math.random() * this.simbolos.length);
            resultado.push(this.simbolos[indiceAleatorio]);
        }
        return resultado;
    }

}
