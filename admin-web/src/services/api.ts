// import axios from 'axios'; // 暂时注释，用于未来真实API集成
import { DifyApp, CreateAppRequest, UpdateAppRequest, ApiResponse } from '../types/dify';
import { mockApps } from '../data/mockData';

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

// 获取所有应用列表
export const getApps = async (): Promise<ApiResponse<DifyApp[]>> => {
  try {
    // 模拟API调用延迟
    await delay(500);

    // 模拟成功响应
    return mockApiResponse(mockApps);

    // 实际API调用（注释掉，使用mock数据）
    // const response = await api.get<ApiResponse<DifyApp[]>>('/apps');
    // return response.data;
  } catch (error) {
    console.error('获取应用列表失败:', error);
    return mockApiResponse([], false, '获取应用列表失败');
  }
};

// 获取单个应用详情
export const getApp = async (id: string): Promise<ApiResponse<DifyApp>> => {
  try {
    await delay(300);

    const app = mockApps.find(a => a.id === id);
    if (!app) {
      return mockApiResponse({} as DifyApp, false, '应用不存在');
    }

    return mockApiResponse(app);
  } catch (error) {
    console.error('获取应用详情失败:', error);
    return mockApiResponse({} as DifyApp, false, '获取应用详情失败');
  }
};

// 创建新应用
export const createApp = async (appData: CreateAppRequest): Promise<ApiResponse<DifyApp>> => {
  try {
    await delay(800);

    const newApp: DifyApp = {
      id: Date.now().toString(),
      ...appData,
      status: appData.status || 'normal',
      enable_site: appData.enable_site || false,
      enable_api: appData.enable_api || false,
      api_rpm: appData.api_rpm || 0,
      api_rph: appData.api_rph || 0,
      is_demo: appData.is_demo || false,
      is_public: appData.is_public || false,
      is_universal: appData.is_universal || false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 在实际应用中，这里会将新应用添加到数据库
    mockApps.push(newApp);

    return mockApiResponse(newApp, true, '应用创建成功');
  } catch (error) {
    console.error('创建应用失败:', error);
    return mockApiResponse({} as DifyApp, false, '创建应用失败');
  }
};

// 更新应用
export const updateApp = async (appData: UpdateAppRequest): Promise<ApiResponse<DifyApp>> => {
  try {
    await delay(600);

    const index = mockApps.findIndex(a => a.id === appData.id);
    if (index === -1) {
      return mockApiResponse({} as DifyApp, false, '应用不存在');
    }

    const updatedApp = {
      ...mockApps[index],
      ...appData,
      updated_at: new Date().toISOString(),
    };

    mockApps[index] = updatedApp;

    return mockApiResponse(updatedApp, true, '应用更新成功');
  } catch (error) {
    console.error('更新应用失败:', error);
    return mockApiResponse({} as DifyApp, false, '更新应用失败');
  }
};

// 删除应用
export const deleteApp = async (id: string): Promise<ApiResponse<boolean>> => {
  try {
    await delay(400);

    const index = mockApps.findIndex(a => a.id === id);
    if (index === -1) {
      return mockApiResponse(false, false, '应用不存在');
    }

    mockApps.splice(index, 1);

    return mockApiResponse(true, true, '应用删除成功');
  } catch (error) {
    console.error('删除应用失败:', error);
    return mockApiResponse(false, false, '删除应用失败');
  }
};

// 切换应用状态
export const toggleAppStatus = async (id: string): Promise<ApiResponse<DifyApp>> => {
  try {
    await delay(300);

    const app = mockApps.find(a => a.id === id);
    if (!app) {
      return mockApiResponse({} as DifyApp, false, '应用不存在');
    }

    const newStatus = app.status === 'normal' ? 'disabled' : 'normal';
    const updatedApp: DifyApp = {
      ...app,
      status: newStatus,
      updated_at: new Date().toISOString(),
    };

    const index = mockApps.findIndex(a => a.id === id);
    mockApps[index] = updatedApp;

    return mockApiResponse(updatedApp, true, `应用状态已切换为${newStatus}`);
  } catch (error) {
    console.error('切换应用状态失败:', error);
    return mockApiResponse({} as DifyApp, false, '切换应用状态失败');
  }
};
