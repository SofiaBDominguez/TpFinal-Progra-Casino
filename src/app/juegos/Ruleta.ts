import { Juego } from "../abstractas/Juego";
import { Jugador } from "../Jugador";
import * as rls from "readline-sync";

export class Ruleta extends Juego {
  protected casillas: Map<number, string>;
  protected colorElegido: string;
  protected numeroElegido: number;
  protected numeroGanador: number;

  constructor(nombre: string, apuestaMinima: number, multiplicador: number) {
    super(nombre, apuestaMinima, multiplicador);
    this.casillas = new Map<number, string>();
    this.setCasillas();
    this.numeroElegido = 0;
    this.numeroGanador = 0;
    this.colorElegido = "";
  }

  public iniciar(jugador: Jugador): void {
    super.iniciar(jugador);
    console.log(
      `Bienvenido al juego de ruleta: ${this.nombre
      } - Apuesta Minima: ${this.getApuestaMinima()} \n`
    );

    // Mostrar la ruleta
    console.log("Números de la ruleta y sus colores:");
    this.mostrarRuleta();

    let seguirJugando: boolean = true;

    if (this.jugador.getSaldo() < this.getApuestaMinima()) {
      console.log("Tu saldo es insuficiente para jugar este juego - Saldo: " + this.jugador.getSaldo());
      this.finalizar();
    }

    while (seguirJugando && this.jugador.getSaldo() >= this.getApuestaMinima()
    ) {
      console.log("Tipos de apuesta disponibles: \n");
      console.log("[0] Apostar a un numero");
      console.log("[1] Apostar a un color");

      let juegoElegido = rls.questionInt("\n Seleccione el numero del juego: ");
      while (juegoElegido < 0 || juegoElegido > 1) {
        console.log("Error: elija un juego valido!");
        juegoElegido = rls.questionInt("\n Seleccione el numero del juego: ");
      }

      switch (juegoElegido) {
        case 0:
          console.log("Puede elegir numeros del 0 al 36");
          this.numeroElegido = rls.questionInt(
            "\n Elija el numero que desea jugar: "
          );

          while (this.getNumeroElegido() < 0 || this.getNumeroElegido() > 36) {
            console.log("Error: elija un numero valido!");
            this.numeroElegido = rls.questionInt("\n Seleccione el numero: ");
          }

          this.solicitarApuesta();
          console.log(`Apostaste: ${this.apuesta} creditos. \n`);
          this.jugarRonda(juegoElegido);
          break;
        case 1:
          console.log("Seleccione un color entre [0]rojo y [1]negro");
          this.numeroElegido = rls.questionInt(
            "\n Seleccione el numero del color: "
          );

          while (this.getNumeroElegido() < 0 || this.getNumeroElegido() > 1) {
            console.log("Error: elija un numero valido!");
            this.numeroElegido = rls.questionInt("\n Seleccione el numero: ");
          }

          if (this.numeroElegido === 0) this.colorElegido = "rojo";
          else this.colorElegido = "negro";

          this.solicitarApuesta();
          console.log(`Apostaste: ${this.apuesta} creditos. \n`);
          this.jugarRonda(juegoElegido);
          break;
      }

      this.mostrarSaldo();
      if (this.jugador.getSaldo() < this.getApuestaMinima()) {
        console.log("Tu saldo es insuficiente para jugar este juego - Saldo: " + this.jugador.getSaldo());

        this.finalizar();
      } else {
        let desicionJugador = rls.questionInt(
          "Volver a jugar? : [0] NO , [1] Si \n"
        );

        while (desicionJugador != 0 && desicionJugador != 1) {
          console.log("Error: seleccione una opcion valida!");
          desicionJugador = rls.questionInt(
            "Volver a jugar? : [0] NO , [1] Si \n"
          );
        }

        if (desicionJugador == 0) {
          seguirJugando = false;
        } else if (desicionJugador == 1) {
          this.numeroElegido = -1;
          this.numeroGanador = -1;
          this.colorElegido = "";
        }
      }
    }

  }
  public mostrarRuleta(): void {
    let tablero: string = "";
    let contador = 0;

    console.log("Tablero de la ruleta: \n");
    this.casillas.forEach((color, numero) => {
      if (color === "rojo" && numero < 10) {
        tablero += `${numero} (${color})  | \t`;
      } else if (color === "rojo" && numero >= 10) {
        tablero += `${numero} (${color}) | \t`;
      } else if (color === "negro" && numero >= 10) {
        tablero += `${numero} (${color})| \t`;
      } else if (color === "negro" && numero < 10) {
        tablero += `${numero} (${color}) | \t`;
      } else if (numero == 0) {
        tablero += `\t        ${numero} (${color})`;
      }
      // Cada 3 números, hacemos un salto de línea
      if (contador % 3 === 0) {
        tablero += "\n";
      }
      contador++;
    });

    console.log(tablero);
  }
  public jugarRonda(juegoElegido: number) {
    // Generar un número ganador aleatorio
    this.numeroGanador = Math.floor(Math.random() * 37); // 0-36
    const colorGanador = this.casillas.get(this.numeroGanador);

    console.log(`Número ganador: ${this.numeroGanador} (${colorGanador})`);

    // Verificación de apuestas
    if (juegoElegido === 0) {
      // si juega a los numeros
      if (this.numeroElegido === this.numeroGanador) {
        const ganancia = this.apuesta * this.multiplicador;
        this.jugador.agregarSaldo(ganancia);
        console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
      } else {
        console.log(`Lo siento, perdiste ${this.apuesta} creditos.`);
      }
    } else if (juegoElegido === 1) {
      // si juega a los colores
      if (this.colorElegido === colorGanador) {
        const ganancia = this.apuesta * 2;
        this.jugador.agregarSaldo(ganancia);
        console.log(`¡Felicidades! Has ganado ${ganancia} creditos.`);
      } else {
        console.log("Lo siento, has perdido apostando al color.");
      }
    }

    // Resetear elecciones después de jugar una ronda
    this.numeroElegido = 0;
    this.colorElegido = "";
  }

  private setCasillas() {
    // Añadiendo el cero
    this.casillas.set(0, "verde");

    // Colores disponibles
    const colores = ["rojo", "negro"];

    // Función para generar un índice aleatorio
    const obtenerColorAleatorio = () => {
      return colores[Math.floor(Math.random() * colores.length)];
    };

    // Asignar colores aleatorios a los números del 1 al 36
    for (let i = 1; i <= 36; i++) {
      this.casillas.set(i, obtenerColorAleatorio());
    }
  }

  public getNumeroElegido(): number {
    return this.numeroElegido;
  }

  public setNumeroElegido(numero: number): void {
    this.numeroElegido = numero;
  }

  public getNumeroGanador(): number {
    return this.numeroElegido;
  }

}
