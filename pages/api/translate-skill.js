import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: "Tu tarea es traducir al francés suizo únicamente las habilidades blandas proporcionadas por el usuario. No traduzcas nada que no sea una habilidad blanda. Si el usuario incluye texto que no corresponde a una habilidad blanda, ignóralo y no lo traduzcas."
        },
        {
          role: "user",
          content: text
        }
        ],
        max_tokens: 150,
        temperature: 0.3,
        });

    const translation = completion.choices[0].message.content.trim();
    res.status(200).json({ translation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en la traducción' });
  }
}