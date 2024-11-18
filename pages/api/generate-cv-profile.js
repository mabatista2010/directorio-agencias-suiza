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
          content: "Tu tarea es crear una descripción profesional breve y concisa en francés suizo para un CV, utilizando la información proporcionada por el usuario. La descripción no debe exceder las 2 frases. El texto debe ser formal, profesional y adaptado al mercado laboral suizo. Mantén un tono positivo y enfócate en los logros y habilidades relevantes. Si el usuario proporciona poca información, completa los detalles para hacer una descripción adecuada. Si el usuario hace una pregunta o proporciona contenido que no es relevante para el CV, responde: 'Lo siento, solo puedo ayudarte a mejorar el texto de tu CV.'"
        },
        {
          role: "user",
          content: text
        }
        ],
        max_tokens: 100, // Ajusta este valor según sea necesario
        temperature: 0.5, // Reduce la temperatura para respuestas más concisas
        });


    const generatedText = completion.choices[0].message.content;
    res.status(200).json({ generatedText });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
}