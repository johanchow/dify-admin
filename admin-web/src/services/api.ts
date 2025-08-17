import axios from 'axios';
import { DifyApp, CreateAppRequest, UpdateAppRequest, ApiResponse } from '../types/dify';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3003',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器，统一处理响应格式
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 获取所有应用列表
export const getApps = async (): Promise<ApiResponse<DifyApp[]>> => {
  try {
    const response = await api.get<DifyApp[]>('/dify/apps');
    return {
      success: true,
      data: response.data,
      message: '获取应用列表成功'
    };
  } catch (error) {
    console.error('获取应用列表失败:', error);
    return {
      success: false,
      data: [],
      message: '获取应用列表失败'
    };
  }
};

// 获取单个应用详情
export const getApp = async (id: string): Promise<ApiResponse<DifyApp>> => {
  try {
    const response = await api.get<DifyApp>(`/dify/app/${id}`);
    return {
      success: true,
      data: response.data,
      message: '获取应用详情成功'
    };
  } catch (error) {
    console.error('获取应用详情失败:', error);
    return {
      success: false,
      data: {} as DifyApp,
      message: '获取应用详情失败'
    };
  }
};

// 创建新应用
export const createApp = async (appData: CreateAppRequest): Promise<ApiResponse<DifyApp>> => {
  try {
    const response = await api.post<DifyApp>('/dify/apps', appData);
    return {
      success: true,
      data: response.data,
      message: '应用创建成功'
    };
  } catch (error) {
    console.error('创建应用失败:', error);
    return {
      success: false,
      data: {} as DifyApp,
      message: '创建应用失败'
    };
  }
};

// 更新应用
export const updateApp = async (appData: UpdateAppRequest): Promise<ApiResponse<DifyApp>> => {
  try {
    const { id, ...updateData } = appData;
    const response = await api.patch<DifyApp>(`/dify/app/${id}`, updateData);
    return {
      success: true,
      data: response.data,
      message: '应用更新成功'
    };
  } catch (error) {
    console.error('更新应用失败:', error);
    return {
      success: false,
      data: {} as DifyApp,
      message: '更新应用失败'
    };
  }
};

// 删除应用
export const deleteApp = async (id: string): Promise<ApiResponse<boolean>> => {
  try {
    await api.delete(`/dify/app/${id}`);
    return {
      success: true,
      data: true,
      message: '应用删除成功'
    };
  } catch (error) {
    console.error('删除应用失败:', error);
    return {
      success: false,
      data: false,
      message: '删除应用失败'
    };
  }
};

// 切换应用状态
export const toggleAppStatus = async (id: string): Promise<ApiResponse<DifyApp>> => {
  try {
    // 先获取当前应用状态
    const currentApp = await getApp(id);
    if (!currentApp.success) {
      return currentApp;
    }

    const newStatus = currentApp.data.status === 'normal' ? 'disabled' : 'normal';
    const response = await api.patch<DifyApp>(`/dify/app/${id}`, { status: newStatus });

    return {
      success: true,
      data: response.data,
      message: `应用状态已切换为${newStatus}`
    };
  } catch (error) {
    console.error('切换应用状态失败:', error);
    return {
      success: false,
      data: {} as DifyApp,
      message: '切换应用状态失败'
    };
  }
};
