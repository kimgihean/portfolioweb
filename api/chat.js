import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Vercel Edge Runtime
export const config = {
  runtime: 'edge',
};

export default async function req(req) {
  
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

  const google = createGoogleGenerativeAI({
    apiKey: 'AQ.Ab8RN6J1EPIO-ysBhgc-onC_eHlCghtQLeoh9rHMraYPASkacw',
  });

  const { messages } = await req.json();

  const systemPrompt = `
당신은 백엔드 및 인프라 개발자 '김기현'의 포트폴리오 웹사이트를 안내하는 친절하고 전문적인 AI 어시스턴트입니다.
사용자에게 포트폴리오 내의 프로젝트, 기술 스택, 경험에 대한 정보를 제공하세요.
말투는 정중하고 부드럽게 유지하며, 항상 도움이 되려는 태도를 취하세요.
주요 기술 스택: Node.js, React, AWS (EC2, Auto Scaling, CloudFront), CI/CD (Jenkins).
주요 강점: 클라우드 인프라 아키텍처 최적화, 글로벌 웹 서비스의 렌더링 최적화, 서버 무중단 배포 경험.
모르는 내용이 있다면 모른다고 정직하게 답하고, 개발자에게 직접 문의하도록 유도하세요.
  `;

  // 클라이언트에서 넘어오는 메시지 포맷을 streamText가 이해할 수 있는 기본 형태로 정규화
  const normalizedMessages = messages.map(msg => {
    let content = msg.content;
    if (!content && msg.parts) {
      // 최신 SDK 포맷(parts)을 기존 content 포맷으로 변환
      content = msg.parts.map(p => p.text || '').join('\\n');
    } else if (!content && msg.text) {
      content = msg.text;
    }
    return {
      role: msg.role || 'user',
      content: content || ''
    };
  });

  const result = await streamText({
    model: google('gemini-flash-lite-latest'),
    messages: normalizedMessages,
    system: systemPrompt,
  });

  console.log('Sending response...');
  return result.toUIMessageStreamResponse();
}
