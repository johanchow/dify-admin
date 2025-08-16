export interface DifyBot {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  model: string;
  createdAt: string;
  updatedAt: string;
  apiKey: string;
  endpoint: string;
  maxTokens: number;
  temperature: number;
  category: string;
  tags: string[];
}

export interface CreateBotRequest {
  name: string;
  description: string;
  model: string;
  maxTokens: number;
  temperature: number;
  category: string;
  tags: string[];
}

export interface UpdateBotRequest extends Partial<CreateBotRequest> {
  id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
