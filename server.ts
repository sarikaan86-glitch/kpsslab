import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Search Grounded 2026 KPSS Güncel Bilgiler API
app.post('/api/grounded-kpss-news', async (req, res) => {
  try {
    if (!ai) {
      return res.json({
        success: false,
        error: 'API anahtarı bulunamadı',
      });
    }

    const topicQuery = req.body.topic || '2024 2025 2026 Türkiye uzay misyonları, UNESCO listesi, uluslararası örgüt başkanlıkları, uluslararası ödüller ve KPSS güncel bilgiler';

    const prompt = `Sen uzman bir ÖSYM KPSS Genel Kültür ve Güncel Bilgiler soru yazarı komisyon başkanısın.
Google Arama verilerini kullanarak en güncel (2024, 2025 ve 2026) olaylara dair 3 adet yüksek ihtimalli özgün KPSS Güncel Bilgiler sorusu hazırla.
Konu: ${topicQuery}

Her soru için:
1. Soru metni
2. A, B, C, D, E seçenekleri
3. Doğru cevap (harf ve indeks)
4. Google Arama verilerine dayalı ayrıntılı tarihsel/güncel açıklama ve kaynak bilgisi sağla.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    res.json({
      success: true,
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata,
    });
  } catch (err: any) {
    console.error('Search grounding error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
