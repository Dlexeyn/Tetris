export default class FigureGenerator{
    figures = {
        0: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        1: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        2: [
            [0, 1, 1],
            [0, 1, 1],
            [0, 0, 0]
        ],
        3: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        4: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        5: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        6: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ],
    }

    generateNextFigure(){
        let index = Math.floor(Math.random() * 7);
        return this.figures[index.toString()];
    }
}