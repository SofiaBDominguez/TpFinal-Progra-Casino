export abstract class Juego {

    protected nombre : string;
    protected tipoApuesta : string;
    protected apuestaMinima: number;
    protected apuesta : number;
    protected valorPago : Map<string, number>;

    agregarValorPago(tipoApuesta : string, pago : number );  
    modificarApuesta(apuesta : number);
    agregarApuesta(apuesta : number);
}