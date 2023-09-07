import Tetris from "./src/tetris.js";
import View from "./src/view.js";

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

const root = document.querySelector('.root')

const game = new Tetris();
const view = new View(root, 320, 640, Tetris.SIZE_Y, Tetris.SIZE_X);

window.game = game;
window.view = view;

view.paintField(game.getState());

document.addEventListener('keydown', event => {
    switch(event.keyCode){
        case LEFT_ARROW:
            game.moveFigureLeft();
            view.paintField(game.getState());
            break;
        case RIGHT_ARROW:
            game.moveFigureRight();
            view.paintField(game.getState());
            break;
        case UP_ARROW:
            game.rotateFigureLeft()
            view.paintField(game.getState());
            break;
        case DOWN_ARROW:
            game.moveFigureDown();
            view.paintField(game.getState());
            break;
    }
});