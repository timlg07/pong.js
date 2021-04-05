document.addEventListener('DOMContentLoaded', e => {
    const canvasNode = document.querySelector('canvas')
    const canvasManager = new Canvas(canvasNode, 800, 300)
    const demoRect = new Rectangle(new Position(100, 100), 600, 100, Color.black, new Color(200, 50, 50, 255))
    const innerRect = new Rectangle(new Position(5, 5, 1), 69, 42, new Color(200, 50, 50, 255))

    demoRect.appendChild(innerRect)
    canvasManager.appendChild(demoRect)
    canvasManager.appendChild(new FPSVisualizer())
    canvasManager.run()
})