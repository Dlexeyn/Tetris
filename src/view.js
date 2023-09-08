import FigureColor from "./figureColor.js";

export default class View{
    constructor(element, width, height, rows, columns){
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);

        this.cellWidth = this.width / columns;
        this.cellHeight = this.height / rows;
        this.figureColor = new FigureColor();
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    paintField(gameField){
        this.clearScreen();
        for(let y = 0; y < gameField.length; y++){
            for(let x = 0; x < gameField[y].length; x++){
                if(gameField[y][x]){
                    this.paintCell(x, y, this.figureColor.colors[gameField[y][x] + '']);
                }
            }
        }
    }

    paintCell(offsetX, offsetY, fillColor){
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(offsetX * this.cellWidth, offsetY * this.cellHeight, this.cellWidth, this.cellHeight);
        this.context.strokeRect(offsetX * this.cellWidth, offsetY * this.cellHeight, this.cellWidth, this.cellHeight);
    }
}