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

        // 640px * 1/2 = 320px
        // и учитываем рамку с двух сторон по ширине и высоте
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

    setStyle(color, font, textAlign, textBaseLine){
        this.context.fillStyle = color;
        this.context.font = font;
        this.context.textAlign = textAlign;
        this.context.textBaseline = textBaseLine;
    }

    paintPause(){
        this.context.fillStyle = 'rgba(0,0,0,0.7)';
        this.context.fillRect(0, 0, this.width, this.height);
        this.setStyle('#f38319', "bold 30px Righteous", 'center', 'middle');
        this.context.fillText('Pause', this.width / 2, this.height / 2);
    }

    paintGameOverScreen(score){
        this.clearScreen();
        this.context.fillStyle = 'rgba(0,0,0,0)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.setStyle('#f38319', "bold 30px Righteous", 'center', 'middle');

        this.context.fillText('Игра окончена', this.width / 2, this.height / 2);
        this.context.fillText(`Счёт: ${score}`, this.width / 2, this.height / 2 + 48);
        this.context.fillText(`Нажмите enter, чтобы продолжить`, this.width / 2, this.height / 2 + 96);
    }

    paintField(gameState){
        const {score, level, player, nextFigureBlocks: nextFigure, isGameOver, stateField} = gameState;
        this.clearScreen();

        this.context.fillStyle = '#f38319';
        this.context.fillRect(0, 0, this.width * 1/2, this.height);
        this.context.clearRect(this.fieldX, this.fieldY, this.fieldInnerWidth, this.fieldInnerHeight);

        this.paintStatusPanel(player, level, score, nextFigure);

        for(let y = 0; y < stateField.length; y++){
            for(let x = 0; x < stateField[y].length; x++){
                if(stateField[y][x]){
                    this.paintCell(
                        this.fieldX,
                        this.fieldY,
                        x,
                        y,
                        this.figureColor.colors[stateField[y][x] + '']
                    );
                }
            }
        }
    }

    paintStatusPanel(player, level, score, nextFigure){
        let step = 20;

        this.setStyle('#f38319', "bold 18px Righteous", 'start', 'top');

        this.context.fillText(`Игрок: ${player}`, this.statusX, this.statusY);
        this.context.fillText(`Текущий уровень: ${level}`, this.statusX, this.statusY + step);
        this.context.fillText(`Очки: ${score}`, this.statusX, this.statusY + step * 2);
        this.context.fillText(`Следующая фигура:`, this.statusX, this.statusY + step * 3);

        for(let y = 0; y < nextFigure.length; y++){
            for(let x = 0; x < nextFigure[y].length; x++){
                if(nextFigure[y][x]){
                    this.paintCell(
                        this.statusX + 20,
                        this.statusY + step * 5,
                        x,
                        y,
                        this.figureColor.colors[nextFigure[y][x] + '']
                    );
                }
            }
        }
    }

    paintCell(startX, startY, x, y, fillColor){
        this.context.fillStyle = fillColor;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(
            startX + x * this.cellWidth,
            startY + y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );
        this.context.strokeRect(
            startX + x * this.cellWidth,
            startY + y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
        );
    }
}