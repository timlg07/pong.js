const http = require('http')
const ws = require('ws')

const wss = new ws.Server({ noServer: true })
const players = []
const maxPlayers = 2

function accept(req, res) {
    const isWebsocket = req.headers.upgrade.toLowerCase() === 'websocket'
    const isUpgradeOrKeepAlive = req.headers.upgrade && req.headers.connection.match(/\bupgrade\b/i)

    if (isWebsocket && isUpgradeOrKeepAlive) {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect)
    } else {
        res.end()
    }
}

function onConnect(wsc, ireq) {
    wsc.on('message', message => {
        const data = JSON.parse(message)
        console.log(message)
        if (data.type === 'connect') {
            if (players.length < maxPlayers && !players.includes(wsc)) {
                wsc.send(JSON.stringify({
                    type: 'login',
                    user: players.length
                }))
                players.push(wsc)
                if (players.length === maxPlayers) {
                    wss.clients.forEach(c => void c.send(JSON.stringify({
                        type: 'start'
                    })))
                }
            } else {
                wsc.send(JSON.stringify({
                    type: 'error',
                    message: 'The lobby is already full'
                }))
            }
        } else {
            if (players.includes(wsc)) {
                wss.clients.forEach(c => {
                    if (c !== wsc) c.send(message)
                })
            }
        }
    })
}

if (!module.parent) {
    http.createServer(accept).listen(8080)
} else {
    exports.accept = accept
}