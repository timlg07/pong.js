/**
 * A 2-dimensional vector.
 */
class Vector2 {

    static get zero() {
        return new Vector2(0, 0)
    }

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    negate() {
        this.x = -this.x
        this.y = -this.y
    }

    /**
     * @param {Vector2} vector 
     */
     add(vector) {
        this.x += vector.x
        this.y += vector.y
    }

    clone() {
        return new Vector2(this.x, this.y)
    }
}