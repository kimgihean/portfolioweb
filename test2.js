import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: 'test' });
  const result = await streamText({
    model: google('gemini-flash-lite-latest'),
    messages: [{ role: 'user', content: 'hi' }]
  });
  console.log('toDataStreamResponse exists?', typeof result.toDataStreamResponse);
}
test();
