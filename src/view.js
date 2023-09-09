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


        this.fieldBorderWidth = 4;
        this.fieldX = 4;
        this.fieldY = 4;

        // 560px * 2/3 = 360px
        // учитываем рамку с двух сторон по ширине и высоте
        this.fieldInnerWidth = this.width * 1 / 2 - this.fieldBorderWidth * 2;
        this.fieldInnerHeight = this.height - this.fieldBorderWidth * 2;

        this.cellWidth = this.fieldInnerWidth / columns;
        this.cellHeight = this.fieldInnerHeight / rows;
        this.figureColor = new FigureColor();

        this.statusX = this.fieldInnerWidth + 20;
        this.statusY = this.fieldY;

        this.element.appendChild(this.canvas);
    }

    clearScreen(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    paintPause(){
        this.context.fillStyle = 'rgba(0,0,0,0.7)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = '#f38319';
        this.context.font = "bold 30px Righteous";
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Pause', this.width / 2, this.height / 2);
    }

    paintField(gameState){
        const {score, level, player, nextFigureBlocks: nextFigure, stateField} = gameState;
        this.clearScreen();

        this.context.fillStyle = '#f38319';
        this.context.fillRect(0, 0, this.width * 1/2, this.height);
        this.context.clearRect(this.fieldX, this.fieldY, this.fieldInnerWidth, this.fieldInnerHeight);

        this.paintStatusPanel(player, level, score, nextFigure);

        for(let y = 0; y < stateField.length; y++){
            for(let x = 0; x < stateField[y].length; x++){
                if(stateField[y][x]){
                    this.paintCell(x, y, this.figureColor.colors[stateField[y][x] + '']);
                }
            }
        }
    }

    paintStatusPanel(player, level, score, nextFigure){
        let step = 20;

        this.context.fillStyle = '#f38319';
        this.context.font = "bold 18px Righteous";
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';

        this.context.fillText(`Игрок: ${player}`, this.statusX, this.statusY);
        this.context.fillText(`Текущий уровень: ${level}`, this.statusX, this.statusY + step);
        this.context.fillText(`Очки: ${score}`, this.statusX, this.statusY + step * 2);
        this.context.fillText(`Следующая фигура:`, this.statusX, this.statusY + step * 3);
    }

    paintCell(x, y, fillColor){
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(this.fieldX + x * this.cellWidth, this.fieldY + y * this.cellHeight,
                                this.cellWidth, this.cellHeight);
        this.context.strokeRect(this.fieldX + x * this.cellWidth, this.fieldY + y * this.cellHeight,
                                this.cellWidth, this.cellHeight);
    }
}