import { IJuego } from "../interfaces/IJuego";
import { Jugador } from "../Jugador";

export abstract class Juego implements IJuego {

    protected nombre: string;
    protected tipoApuesta: string;
    protected apuestaMinima: number;
    protected apuesta: number;
    protected valorPago: Map<string, number>;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.tipoApuesta = "";
        this.apuesta = 0;
        this.apuestaMinima = 0;
        this.valorPago = new Map<string, number>
    }

    public abstract agregarValorPago(tipoApuesta: string, pago: number): void;

    modificarApuesta(apuesta: number) {
        this.apuesta = apuesta;
    };
    agregarApuesta(apuesta: number): void {
        this.apuesta += apuesta;
    };

    // METODOS DE LA INTERFACE IJUEGO

    iniciar(jugador: Jugador) {
        throw new Error("Method not implemented.");
    }
    comoJugar() {
        throw new Error("Method not implemented.");
    }
    insertarApuesta(apuesta: number) {
        throw new Error("Method not implemented.");
    }
    jugarRonda() {
        throw new Error("Method not implemented.");
    }
    finalizar() {
        throw new Error("Method not implemented.");
    }
    tipoDeApuesta() {
        throw new Error("Method not implemented.");
    }
}