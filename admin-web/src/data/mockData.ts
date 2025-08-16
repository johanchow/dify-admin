import { DifyBot } from '../types/dify';

export const mockBots: DifyBot[] = [
  {
    id: '1',
    name: '客服助手',
    description: '专业的客户服务机器人，能够回答常见问题并提供帮助',
    status: 'active',
    model: 'gpt-3.5-turbo',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:45:00Z',
    apiKey: 'sk-1234567890abcdef',
    endpoint: 'https://api.dify.ai/v1/chat-messages',
    maxTokens: 2000,
    temperature: 0.7,
    category: '客服',
    tags: ['客服', '问答', '帮助']
  },
  {
    id: '2',
    name: '代码助手',
    description: '帮助开发者编写、调试和优化代码的AI助手',
    status: 'active',
    model: 'gpt-4',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:20:00Z',
    apiKey: 'sk-abcdef1234567890',
    endpoint: 'https://api.dify.ai/v1/chat-messages',
    maxTokens: 4000,
    temperature: 0.3,
    category: '开发',
    tags: ['编程', '代码', '调试']
  },
  {
    id: '3',
    name: '翻译助手',
    description: '多语言翻译服务，支持多种语言之间的互译',
    status: 'inactive',
    model: 'gpt-3.5-turbo',
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-12T13:30:00Z',
    apiKey: 'sk-9876543210fedcba',
    endpoint: 'https://api.dify.ai/v1/chat-messages',
    maxTokens: 1500,
    temperature: 0.5,
    category: '翻译',
    tags: ['翻译', '多语言', '国际化']
  },
  {
    id: '4',
    name: '数据分析师',
    description: '智能数据分析助手，帮助解读数据趋势和洞察',
    status: 'maintenance',
    model: 'gpt-4',
    createdAt: '2024-01-08T15:45:00Z',
    updatedAt: '2024-01-19T10:15:00Z',
    apiKey: 'sk-fedcba0987654321',
    endpoint: 'https://api.dify.ai/v1/chat-messages',
    maxTokens: 3000,
    temperature: 0.4,
    category: '数据分析',
    tags: ['数据', '分析', '洞察']
  },
  {
    id: '5',
    name: '营销文案助手',
    description: '专业的营销文案创作助手，生成吸引人的广告文案',
    status: 'active',
    model: 'gpt-3.5-turbo',
    createdAt: '2024-01-12T08:30:00Z',
    updatedAt: '2024-01-21T17:00:00Z',
    apiKey: 'sk-5555666677778888',
    endpoint: 'https://api.dify.ai/v1/chat-messages',
    maxTokens: 2500,
    temperature: 0.8,
    category: '营销',
    tags: ['营销', '文案', '广告']
  }
];
