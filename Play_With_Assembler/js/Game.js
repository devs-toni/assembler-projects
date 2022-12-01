class Game {
    constructor() {
        this.game = {};
        this.user = {};
        this.words = ['silla', 'sofa', 'portaviones', 'ejercito', 'televisión', 'mueble', 'mochila'];
    }

    setUser() {
        //Añadir el usuario introducido al user de GAME pasandole el nombre como parametro

        //Actualizar scores

        //Escoger palabra random y pintar escenario con cambio de div
    }

    winner() {
        //Evaluar si el div con la palabra esta completo

        //Devolver resultado para seguir jugando o terminar partida

    }

    chooseLetter() {
        //Lectura de letra

        //Comprobar numero de intentos

        //Comprobar si es valida y actuar en consecuencia
    }

    paintDoll() {
        //Pintar al muñeco cuando fallas
    }

    showFinalGame() {
        //Añadir puntuación al usuario
        //Pintar pantalla ganador o perdedor
        //Actualizar scores
    }
}