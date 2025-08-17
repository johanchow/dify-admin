export interface DifyApp {
  id: string;
  tenant_id: string;
  name: string;
  mode: string;
  icon?: string;
  icon_background?: string;
  app_model_config_id?: string;
  status: string;
  enable_site: boolean;
  enable_api: boolean;
  api_rpm: number;
  api_rph: number;
  is_demo: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  is_universal: boolean;
}

export interface CreateAppRequest {
  tenant_id: string;
  name: string;
  mode: string;
  icon?: string;
  icon_background?: string;
  app_model_config_id?: string;
  status?: string;
  enable_site?: boolean;
  enable_api?: boolean;
  api_rpm?: number;
  api_rph?: number;
  is_demo?: boolean;
  is_public?: boolean;
  is_universal?: boolean;
}

export interface UpdateAppRequest extends Partial<CreateAppRequest> {
  id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
