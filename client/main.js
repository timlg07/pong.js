document.addEventListener('DOMContentLoaded', e => {
    let isRunning = false
    const canvasNode = document.querySelector('canvas')
    const s = new RectangularDimensions(800, 400)
    const canvasManager = new Canvas(canvasNode, s)
    const keyListener = new KeyInputListener()
    const camera = new Camera()
    const upperwall = new Wall(new Position(), new RectangularDimensions(s.width, 20), Color.black)
    const lowerwall = new Wall(new Position(0, s.height - 20), new RectangularDimensions(s.width, 20), Color.black)
    const ball = new Ball(s.mid, new RectangularDimensions(10, 10), Color.black)
    const playerHeight = s.height / 4, playerMargin = 5, playerWidth = 20
    const player1 = new LocalPlayer(new Position(playerMargin, s.mid.y - playerHeight / 2), new RectangularDimensions(playerWidth, playerHeight), new Color(10, 20, 70, 255))
    const player2 = new Enemy(new Position(s.width - playerMargin - playerWidth, s.mid.y - playerHeight / 2), new RectangularDimensions(playerWidth, playerHeight), new Color(70, 20, 10, 255))
    const trigger1 = new LossTrigger(lose("Player 1"), new Position(), new RectangularDimensions(2, s.height), Color.black)
    const trigger2 = new LossTrigger(lose("Player 2"), new Position(s.width - 2, 0), new RectangularDimensions(2, s.height), Color.black)

    camera.appendChild(upperwall)
    camera.appendChild(lowerwall)
    camera.appendChild(ball)
    camera.appendChild(player1)
    camera.appendChild(player2)
    camera.appendChild(trigger1)
    camera.appendChild(trigger2)
    keyListener.appendChild(camera)
    canvasManager.appendChild(keyListener)
    canvasManager.appendChild(new FPSVisualizer())
    canvasManager.run()
    keyListener.listen()

    isRunning = true
    ball.velocity = new Vector2(s.width / 5, s.width / 5)

    function lose(player) {
        return function(o) {
            if (o instanceof Ball && isRunning) {
                camera.performScreenshake(new Vector2(5, 1), 200)
                console.log(player + " loses")
                isRunning = false
                ball.isVisible = false
                ball.isActive = false
            }
        }
    }
})