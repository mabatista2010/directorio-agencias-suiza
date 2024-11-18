import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Plantillas de sistema según el tipo de contenido
const SYSTEM_PROMPTS = {
  experience: "Tu tarea es traducir al francés suizo la descripción de experiencia laboral proporcionada. Mantén el formato original. La traducción debe ser profesional y adecuada para un CV en Suiza. Mejora si necesario la estructura y el nivel de detalle. Si el usuario hace una pregunta o proporciona contenido que no es relevante, responde: 'Lo siento, solo puedo ayudarte a mejorar el texto de tu CV.",
  education: "Tu tarea es traducir al francés suizo la descripción de formación académica proporcionada, manteniendo un formato profesional. Analiza el texto y mejoralo para darle una correcta estructura si necesario. La traducción debe enfatizar los logros académicos y ser adecuada para el mercado laboral suizo.Si el usuario hace una pregunta o proporciona contenido que no es relevante, no contestes, simplemente traducelo."
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, type = 'experience' } = req.body;
    // Agregar un log para verificar el tipo que se está recibiendo
    console.log('Tipo recibido:', type);

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.experience;
    // Agregar un log para verificar qué prompt se está usando
      console.log('Usando prompt para:', type);
      console.log('Prompt:', systemPrompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const translation = completion.choices[0].message.content.trim();
    res.status(200).json({ translation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error en la traducción' });
  }
}