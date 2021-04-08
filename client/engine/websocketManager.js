class WebsocketManager extends EventEmitter {
    /** @type {WebSocket} */
    socket = null

    listen(url = 'ws://localhost:8080') {
        this.socket = new WebSocket(url)
        
        this.socket.onopen = event => {
            this.send({type: 'connect'})
            console.log('WS [open] Connection established with ' + url)
        }
    
        this.socket.onmessage = event => {
            const data = JSON.parse(event.data)
            this.onWebsocketMessage(data)
        }
    
        this.socket.onclose = event => {
            if (event.wasClean) {
                console.log(`WS [close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
            } else {
                console.log('WS [close] Connection died')
            }
        }
    
        this.socket.onerror = error => {
            console.log(`WS [error] ${error.message}`)
        }
    }

    send(data) {
        this.socket.send(JSON.stringify(data))
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    onKeyDown(event) {
        super.onKeyDown(event)
        this.send({type: 'keyDown', key: event.key})
    }

     /**
     * 
     * @param {KeyboardEvent} event 
     */
    onKeyUp(event) {
        super.onKeyUp(event)
        this.send({type: 'keyUp', key: event.key})
    }
}