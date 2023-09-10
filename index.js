import Controller from "./src/controller.js";
import Tetris from "./src/tetris.js";
import View from "./src/view.js";

const root = document.querySelector('.root')

let username = localStorage.getItem("username");

const game = new Tetris(username);
const view = new View(root, 640, 640, Tetris.SIZE_Y, Tetris.SIZE_X);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;