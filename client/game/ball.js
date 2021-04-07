class Ball extends MovingRectangle {
    isCollider = true

    onCollision(other) {
        if (other instanceof Wall) {
            this.velocity.scaleY(-1)
        }

        if (other instanceof Player) {
            this.velocity.scaleX(-1)
        }
    }
}