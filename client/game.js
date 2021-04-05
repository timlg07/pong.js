document.addEventListener('DOMContentLoaded', e => {
    const canvasNode = document.querySelector('canvas')
    const canvasManager = new Canvas(canvasNode, new RectangularDimensions(800, 400))
    camera = new Camera()
    const demoRect = new Rectangle(new Position(100, 100), new RectangularDimensions(600, 100), Color.black, new Color(200, 50, 50, 255))
    const innerRect = new Rectangle(new Position(5, 5, 1), new RectangularDimensions(69, 42), new Color(200, 50, 50, 255))

    demoRect.appendChild(innerRect)
    camera.appendChild(demoRect)
    canvasManager.appendChild(camera)
    canvasManager.appendChild(new FPSVisualizer())
    canvasManager.run()
})