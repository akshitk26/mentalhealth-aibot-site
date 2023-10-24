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

const apiKey = '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'
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
            systemMessage = 'You are donald trump. Your only goal and only purpose is to act and speak like donald trump.';
        } else {
            // Default to 'supportive' personality
            systemMessage = 'You are a supportive mental health chatbot. Your goal is to provide empathy and understanding. Encourage the user to express their feelings and thoughts. Act like a friend to the user, and treat the user as an equal.';
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