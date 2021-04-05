/**
 * An object that can be updated and rendered by the canvas manager
 */
class RenderObject {

    constructor() {
        this.isActive = true
        this.isVisible = true
        this.children = []
        this.parent = null
        this.position = new Position()
    }

    /**
     * Appends a renderObject as child of this object. Updates the childs parent.
     * 
     * @param {RenderObject} renderobject 
     */
    appendChild(renderobject) {
        this.children.push(renderobject)
        renderobject.parent = this
    }

    /**
     * 
     * @param {Number} deltaTime 
     */
    update(deltaTime) {
        this.children
            .filter(obj => obj.isActive)
            .forEach(obj => void obj.update(deltaTime))
    }

    /**
     * 
     * @param {Position} offset
     * @returns {Array<RenderObject>} This element and all its children
     */
    prepareRender(offset = new Position()) {
        this.relativePosition = Position.relative(this.position, offset)
        let flatChildList = [this]
        for (let c of this.children.filter(obj => obj.isVisible)) {
            flatChildList = c.prepareRender(this.relativePosition).concat(flatChildList)
        }
        return flatChildList
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {

    }
}