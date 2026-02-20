export default defineEventHandler((event) => {
    // 1. Set headers for streaming
    setResponseHeaders(event, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
        'Connection': 'keep-alive',
    })

    // 2. Create a ReadableStream
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()

            // Simulate 10 log entries with a delay
            for (let i = 1; i <= 1000; i++) {
                const logEntry = `[${new Date().toLocaleTimeString()}] System Task #${i} completed...\n`
                controller.enqueue(encoder.encode(logEntry))

                // Artificial delay
                await new Promise(resolve => setTimeout(resolve, 500))
            }

            controller.close()
        },
        cancel() {
            console.log('Stream cancelled by client')
        }
    })

    // 3. Send the stream using Nitro helper
    return sendStream(event, stream)
})