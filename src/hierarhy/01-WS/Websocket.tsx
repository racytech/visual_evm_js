import React, { useEffect } from "react";


export function WS() {

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:12345/ws')

        ws.onopen = (event) => {
            ws.send("some text")
        }

    }, [])

    return (
        <div>
            Websocket layer
        </div>
    )
}