import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

async function test() {
  const google = createGoogleGenerativeAI({ apiKey: 'test' });
  const result = await streamText({
    model: google('gemini-flash-lite-latest'),
    messages: [{ role: 'user', content: 'hi' }]
  });
  console.log(Object.keys(result).filter(k => typeof result[k] === 'function'));
  console.log('Methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(result)));
}
test();
