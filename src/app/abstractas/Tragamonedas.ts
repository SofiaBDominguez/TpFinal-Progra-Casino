import { Juego } from "./Juego";

export abstract class Tragamonedas extends Juego{
    protected  items : Array<String>; 
    protected  itemsGanadores : Array<String>; 

    constructor(nombre : string, apuestaMinima : number){
        super(nombre, apuestaMinima);
        this.items = new Array<String>();
        this.itemsGanadores = new Array<String>();
    }
    
    protected abstract generarResultado(): string[];

    jugarRonda(): void {
        console.log("Girando los rodillos...");
        const resultado = this.generarResultado();
        console.log(`Resultado: ${resultado.join(" | ")}`);

        if (this.verificarGanador(resultado)) {
            console.log("¡Felicidades, has ganado!");
            this.jugador.agregarSaldo(this.apuesta * 5); // Ganancia fija por ejemplo
        } else {
            console.log("Lo siento, no has ganado esta vez.");
        }
    }

    protected verificarGanador(resultado: string[]): boolean {
        return JSON.stringify(resultado) === JSON.stringify(this.itemsGanadores);
    }
}