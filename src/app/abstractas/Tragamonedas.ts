export abstract class Tragamonedas {
    protected  items : Array<String>; 
    protected  itemsGanadores : Array<String>; 

    constructor(){
        this.items = new Array<String>();
        this.itemsGanadores = new Array<String>();
    }
    
    protected abstract generarResultado() : Array<String>;
}