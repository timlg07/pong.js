class Rectangle extends RenderObject {

    /**
     * 
     * @param {Position} position 
     * @param {Number} width 
     * @param {Number} height 
     * @param {Color} color 
     */
    constructor(position, width, height, fillcolor = Color.transparent, strokecolor = Color.transparent) {
        super()
        this.position = position
        this.width = width
        this.height = height
        this.fillcolor = fillcolor
        this.strokecolor = strokecolor
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        context.fillStyle = this.fillcolor.toString()
        context.strokeStyle = this.strokecolor.toString()

        context.fillRect(this.relativePosition.x, this.relativePosition.y, this.width, this.height)
        context.strokeRect(this.relativePosition.x, this.relativePosition.y, this.width, this.height)
    }

}