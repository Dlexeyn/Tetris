import FigureGenerator from "./figures.js";
export default class Tetris{
    static SIZE_Y = 20;
    static SIZE_X = 10;

    score = 0;
    lines = 0;
    field = [];
    nextFigureBlocks = [];

    activeFigure = {
        startX: 0,
        startY: 0,
        blocks: []
    };
    constructor(){
        this.generator = new FigureGenerator();
        this.field = this.createField();

        this.activeFigure.blocks = this.generator.generateNextFigure();
        this.nextFigureBlocks = this.generator.generateNextFigure();
    }

    getState(){
        let stateField = this.createField();
        const startX = this.activeFigure.startX;
        const startY = this.activeFigure.startY;

        for(let y = 0; y < this.field.length; y++){
            for(let x = 0; x < this.field[y].length; x++)
            {
                stateField[y][x] = this.field[y][x];
            }
        }

        for(let y = 0; y < this.activeFigure.blocks.length; y++){
            for(let x = 0; x < this.activeFigure.blocks[y].length; x++)
            {
                if(y + startY < Tetris.SIZE_Y && x + startX < Tetris.SIZE_X)
                    stateField[y + startY][x + startX] = this.activeFigure.blocks[y][x]
            }
        }

        return stateField;
    }

    createField(){
        let gameField = [];
        for(let y = 0; y < Tetris.SIZE_Y; y++){
            gameField[y] = [];
            for(let x = 0; x < Tetris.SIZE_X; x++){
                gameField[y][x] = 0
            }
        }
        return gameField;
    }

    rotateFigureLeft(){
        const figureBlocks = this.activeFigure.blocks;
        let length = figureBlocks.length;
        let tempBlocks = []
        for(let n = 0; n < length; n++){
            tempBlocks[n] = new Array(length).fill(0);
        }

        for(let y = 0; y < length; y++){
            for(let x = 0; x < length; x++){
                tempBlocks[x][y] = figureBlocks[length - 1 - y][x];
            }
        }

        this.activeFigure.blocks = tempBlocks;

        if(this.isCollision()){
            this.activeFigure.blocks = figureBlocks;
        }
    }

    moveFigureLeft(){
        this.activeFigure.startX -= 1;

        if(this.isCollision())
            this.activeFigure.startX += 1;
    }

    moveFigureRight(){
        this.activeFigure.startX += 1;
        if(this.isCollision())
            this.activeFigure.startX -= 1;
    }

    // moveFigureUp(){
    //     this.activeFigure.startY -= 1;
    //     if(this.isCollision())
    //         this.activeFigure.startY += 1;
    // }

    moveFigureDown(){
        this.activeFigure.startY += 1;
        if(this.isCollision()){
            this.activeFigure.startY -= 1;
        }
            
    }

    isCollision(){
        const {startY : figureY, startX : figureX, blocks } = this.activeFigure;

        for(let y = 0; y < blocks.length; y++){
            for(let x = 0; x < blocks[y].length; x++){
                if(
                    blocks[y][x] &&
                    (
                        (this.field[figureY + y] === undefined || this.field[figureY + y][figureX + x] === undefined)
                        || this.field[figureY + y][figureX + x])
                )
                    return true;
            }
        }
        return false;
    }

    addToField(){
        const {startY : figureY, startX : figureX, blocks } = this.activeFigure;

        for(let y = 0; y < blocks.length; y++){
            for(let x = 0; x < blocks[y].length; x++)
            {
                if(blocks[y][x])
                    this.field[figureY + y][figureX + x] = blocks[y][x];
            }
        }
    }
}