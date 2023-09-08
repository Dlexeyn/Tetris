const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;

export default class Controller{
    constructor(game, view){
        this.game = game;
        this.view = view;

        view.paintField(game.getState());

        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        setInterval(() => {
            this.moveDownUpdate();
        }, 1000);
    }
    
    moveDownUpdate(){
        game.moveFigureDown();
        view.paintField(game.getState());
    }

    handleKeyDown(event){
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
    }

}