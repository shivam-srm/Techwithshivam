
async function test() {
    console.log('Starting test...');
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        console.log('Fetching...');
        const response = await fetch('http://127.0.0.1:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello' }]
            }),
            signal: controller.signal
        });
        clearTimeout(timeout);

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response:', text);
    } catch (err) {
        console.error('Test error:', err);
    }
}

test();
