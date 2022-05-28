export default class Game {
    static instance = undefined;
    constructor() {

    }

    getInstance() {
        if (Game.instance === undefined) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}