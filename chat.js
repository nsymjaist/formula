import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // POST通信（データ送信）以外は弾く
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // ユーザーからのメッセージを受け取る
    const { prompt } = req.body;

    // 環境変数からAPIキーを読み込む（コードには直接書きません！）
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // AIに処理を依頼
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 結果をブラウザに送り返す
    res.status(200).json({ text: responseText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AIの処理中にエラーが発生しました。' });
  }
}
