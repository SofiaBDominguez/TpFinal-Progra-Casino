export class Jugador {
    private nombre : string;
    private saldo : number; 

    constructor(nombre : string , saldo : number){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    agregarSaldo(saldo : number){
        this.saldo += saldo; 
    }

    modificarSaldo(saldo : number){
        this.saldo = saldo; 
    }

}