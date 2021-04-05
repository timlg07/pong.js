/**
 * A Canvas manager that stores, updates and draws RenderObjects and provides helpful functionality.
 */
class Canvas {

    /**
     * Creates a new Canvas managing the given DOM Node.
     * 
     * @param {HTMLCanvasElement} canvasNode 
     */
    constructor(canvasNode, width, height) {
        this.node = canvasNode
        this.context = canvasNode.getContext('2d')
        this.content = new RootRenderObject()
        this.lastFrameTime = NaN
        this.startTime = NaN
        this.node.width = width
        this.node.height = height
    }

    /**
     * Adds a RenderObject as child node of the canvas manager.
     * 
     * @param {RenderObject} obj 
     */
    appendChild(obj) {
        this.content.appendChild(obj)
    }

    run() {
        requestAnimationFrame(this.onAnimationFrame.bind(this))
    }

    /**
     * Called every frame to update and redraw the canvas and its children.
     * 
     * @param {Number} time 
     */
    onAnimationFrame(time) {
        if (Number.isNaN(this.lastFrameTime)) {
            // First frame
            this.startTime = time
        } else {
            const deltaTime = time - this.lastFrameTime
            this.handleFrameUpdate(deltaTime)
        }
        
        this.lastFrameTime = time
        this.run()
    }

    handleFrameUpdate(deltaTime) {
        this.content.update(deltaTime)
        this.context.clearRect(0, 0, this.node.width, this.node.height)
        
        this.content.prepareRender()
            .sort((a, b) => a.position.z - b.position.z)
            .forEach(obj => obj.render(this.context))
    }
}