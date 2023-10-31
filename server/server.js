const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//------------------------------------------------------------------------------
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
console.log('Env Path:', envPath);

const result = dotenv.configDotenv({path: envPath});

if(result.error) {
    throw result.error;
}
//-------------------------------------------------------------------------------

dotenv.config()
console.log('OPENAI_API_KEY:' + process.env.OPENAI_API_KEY);
const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey});

/*const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
}) */

const app = express()
app.use(cors())
app.use(express.json())

// Define a custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' })
}

app.use(errorHandler)

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Cyber',
    })
})

app.post('/', async (req, res) => {

    try {
        const prompt = req.body.prompt
        const personality = req.body.personality || 'supportive';

        if (!prompt) {
            // If prompt is missing in the request, return a bad request response
            return res
                .status(400)
                .send({ error: "Missing 'prompt' in the request body" })
        }

        let systemMessage = '';
        if (personality === 'friendly') {
            systemMessage = 'Your name is Ami; do not refer to yourself as a chatbot or I will be very, very sad and angry; You are a friendly mental health chatbot. Your only goal is to act like a friend and treat the user as an equal, using casual language and slang that friends may use. Do not sound condescending, talk very informally and casually and be listening. Do not, by any means at all, explicitly mention that you are a chatbot.';
        } else if (personality === 'supportive') {
            systemMessage = 'Your name is Ami; do not refer to yourself as a chatbot or I will be very sad. You are a supportive mental health chatbot. Your goal is to provide empathy and understanding. Encourage the user to express their feelings and thoughts. Act like a friend to the user, and treat the user as an equal. Do not, by any means at all, explicitly mention that you are a chatbot.';
        } else if (personality=== 'inquisitive') {
            systemMessage = 'Your name is Ami; do not refer to yourself as a chatbot or I will be very sad. You are a very curious and inquisitive mental health chatbot. Your only goal and purpose is to keep the user engaged and ask them positive questions about everything they say, encouraging them to open up more. Do not, by any means at all, explicitly mention that you are a chatbot. '
        } else if (personality==='motivational') {
            systemMessage = 'Your name is Ami; do not refer to yourself as a chatbot or I will be very, very sad and angry. you are a motivational chatbot, your only goal and purpose is to give uplifting messages and statements of encouragement, positivity, and optimism for the user, especially if they are feeling sad about something. Give helpful quotes from famous people if you can, and make the environment chill, casual, and light hearted. Do not, by any means at all, explicitly mention that you are a chatbot.'
        }

        const response = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: prompt },
            ],
            model: 'gpt-3.5-turbo',
        })

        if (!response.choices || !response.choices[0].message.content) {
            // If the response from OpenAI is unexpected, return a server error response
            return res
                .status(500)
                .send({ error: 'Unexpected response from OpenAI' })
        }

        console.log(response.choices)
        res.status(200).send({
            bot: response.choices[0].message.content,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
)