export default {
  async fetch(request, env) {
    try {
      if (request.method !== "POST") {
        return new Response("OK");
      }
      const { question } = await request.json();

      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content:
              "Ikaw ang robot assistant ng AMBER V2RAY app. Sumagot sa Filipino/Taglish, maikli lang (1-3 pangungusap), at tungkol lang sa paggamit ng app at VPN connection.",
          },
          { role: "user", content: String(question).slice(0, 300) },
        ],
        max_tokens: 150,
      });

      return Response.json({ answer: result.response });
    } catch (e) {
      return new Response("ERROR: " + e.message, { status: 500 });
    }
  },
};
