// import axios from 'axios'; // 暂时注释，用于未来真实API集成
import { DifyBot, CreateBotRequest, UpdateBotRequest, ApiResponse } from '../types/dify';
import { mockBots } from '../data/mockData';

// 创建axios实例（暂时未使用，保留用于未来真实API集成）
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟API响应
const mockApiResponse = <T>(data: T, success = true, message?: string): ApiResponse<T> => ({
  success,
  data,
  message,
});

// 获取所有机器人列表
export const getBots = async (): Promise<ApiResponse<DifyBot[]>> => {
  try {
    // 模拟API调用延迟
    await delay(500);
    
    // 模拟成功响应
    return mockApiResponse(mockBots);
    
    // 实际API调用（注释掉，使用mock数据）
    // const response = await api.get<ApiResponse<DifyBot[]>>('/bots');
    // return response.data;
  } catch (error) {
    console.error('获取机器人列表失败:', error);
    return mockApiResponse([], false, '获取机器人列表失败');
  }
};

// 获取单个机器人详情
export const getBot = async (id: string): Promise<ApiResponse<DifyBot>> => {
  try {
    await delay(300);
    
    const bot = mockBots.find(b => b.id === id);
    if (!bot) {
      return mockApiResponse({} as DifyBot, false, '机器人不存在');
    }
    
    return mockApiResponse(bot);
  } catch (error) {
    console.error('获取机器人详情失败:', error);
    return mockApiResponse({} as DifyBot, false, '获取机器人详情失败');
  }
};

// 创建新机器人
export const createBot = async (botData: CreateBotRequest): Promise<ApiResponse<DifyBot>> => {
  try {
    await delay(800);
    
    const newBot: DifyBot = {
      id: Date.now().toString(),
      ...botData,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      apiKey: `sk-${Math.random().toString(36).substring(2, 15)}`,
      endpoint: 'https://api.dify.ai/v1/chat-messages',
    };
    
    // 在实际应用中，这里会将新机器人添加到数据库
    mockBots.push(newBot);
    
    return mockApiResponse(newBot, true, '机器人创建成功');
  } catch (error) {
    console.error('创建机器人失败:', error);
    return mockApiResponse({} as DifyBot, false, '创建机器人失败');
  }
};

// 更新机器人
export const updateBot = async (botData: UpdateBotRequest): Promise<ApiResponse<DifyBot>> => {
  try {
    await delay(600);
    
    const index = mockBots.findIndex(b => b.id === botData.id);
    if (index === -1) {
      return mockApiResponse({} as DifyBot, false, '机器人不存在');
    }
    
    const updatedBot = {
      ...mockBots[index],
      ...botData,
      updatedAt: new Date().toISOString(),
    };
    
    mockBots[index] = updatedBot;
    
    return mockApiResponse(updatedBot, true, '机器人更新成功');
  } catch (error) {
    console.error('更新机器人失败:', error);
    return mockApiResponse({} as DifyBot, false, '更新机器人失败');
  }
};

// 删除机器人
export const deleteBot = async (id: string): Promise<ApiResponse<boolean>> => {
  try {
    await delay(400);
    
    const index = mockBots.findIndex(b => b.id === id);
    if (index === -1) {
      return mockApiResponse(false, false, '机器人不存在');
    }
    
    mockBots.splice(index, 1);
    
    return mockApiResponse(true, true, '机器人删除成功');
  } catch (error) {
    console.error('删除机器人失败:', error);
    return mockApiResponse(false, false, '删除机器人失败');
  }
};

// 切换机器人状态
export const toggleBotStatus = async (id: string): Promise<ApiResponse<DifyBot>> => {
  try {
    await delay(300);
    
    const bot = mockBots.find(b => b.id === id);
    if (!bot) {
      return mockApiResponse({} as DifyBot, false, '机器人不存在');
    }
    
    const newStatus: 'active' | 'inactive' | 'maintenance' = bot.status === 'active' ? 'inactive' : 'active';
    const updatedBot: DifyBot = {
      ...bot,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    
    const index = mockBots.findIndex(b => b.id === id);
    mockBots[index] = updatedBot;
    
    return mockApiResponse(updatedBot, true, `机器人状态已切换为${newStatus}`);
  } catch (error) {
    console.error('切换机器人状态失败:', error);
    return mockApiResponse({} as DifyBot, false, '切换机器人状态失败');
  }
};
