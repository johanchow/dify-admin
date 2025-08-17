import React, { useState, useEffect } from 'react';
import { DifyApp, CreateAppRequest } from '../types/dify';
import { createApp, updateApp } from '../services/api';
import './AppForm.css';

interface AppFormProps {
  app?: DifyApp | null;
  onSave: () => void;
  onCancel: () => void;
}

const AppForm: React.FC<AppFormProps> = ({ app, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CreateAppRequest>({
    tenant_id: '',
    name: '',
    mode: 'chat',
    icon: '',
    icon_background: '#4CAF50',
    app_model_config_id: '',
    status: 'normal',
    enable_site: false,
    enable_api: false,
    api_rpm: 0,
    api_rph: 0,
    is_demo: false,
    is_public: false,
    is_universal: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!app;

  useEffect(() => {
    if (app) {
      setFormData({
        tenant_id: app.tenant_id,
        name: app.name,
        mode: app.mode,
        icon: app.icon || '',
        icon_background: app.icon_background || '#4CAF50',
        app_model_config_id: app.app_model_config_id || '',
        status: app.status,
        enable_site: app.enable_site,
        enable_api: app.enable_api,
        api_rpm: app.api_rpm,
        api_rph: app.api_rph,
        is_demo: app.is_demo,
        is_public: app.is_public,
        is_universal: app.is_universal
      });
    }
  }, [app]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.tenant_id.trim()) {
      newErrors.tenant_id = '租户ID不能为空';
    }

    if (!formData.name.trim()) {
      newErrors.name = '应用名称不能为空';
    }

    if (!formData.mode.trim()) {
      newErrors.mode = '模式不能为空';
    }

    const apiRpm = formData.api_rpm ?? 0;
    const apiRph = formData.api_rph ?? 0;

    if (apiRpm < 0) {
      newErrors.api_rpm = 'API RPM不能为负数';
    }

    if (apiRph < 0) {
      newErrors.api_rph = 'API RPH不能为负数';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let response;

      if (isEditing && app) {
        response = await updateApp({
          id: app.id,
          ...formData
        });
      } else {
        response = await createApp(formData);
      }

      if (response.success) {
        alert(response.message || (isEditing ? '更新成功' : '创建成功'));
        onSave();
      } else {
        alert(response.message || '操作失败');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseInt(value, 10);

    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{isEditing ? '编辑应用' : '创建新应用'}</h2>

        <form onSubmit={handleSubmit} className="app-form">
          <div className="form-group">
            <label htmlFor="tenant_id">租户ID *</label>
            <input
              type="text"
              id="tenant_id"
              name="tenant_id"
              value={formData.tenant_id}
              onChange={handleInputChange}
              className={errors.tenant_id ? 'error' : ''}
              disabled={isEditing}
            />
            {errors.tenant_id && <span className="error-message">{errors.tenant_id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">应用名称 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mode">模式 *</label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              className={errors.mode ? 'error' : ''}
            >
              <option value="chat">对话</option>
              <option value="completion">补全</option>
              <option value="workflow">工作流</option>
            </select>
            {errors.mode && <span className="error-message">{errors.mode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="icon">图标</label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="🤖"
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon_background">图标背景色</label>
            <input
              type="color"
              id="icon_background"
              name="icon_background"
              value={formData.icon_background}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="app_model_config_id">模型配置ID</label>
            <input
              type="text"
              id="app_model_config_id"
              name="app_model_config_id"
              value={formData.app_model_config_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">状态</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="normal">正常</option>
              <option value="disabled">禁用</option>
              <option value="maintenance">维护中</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="enable_site"
                checked={formData.enable_site}
                onChange={handleInputChange}
              />
              启用网站
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="enable_api"
                checked={formData.enable_api}
                onChange={handleInputChange}
              />
              启用API
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="api_rpm">API RPM</label>
            <input
              type="number"
              id="api_rpm"
              name="api_rpm"
              value={formData.api_rpm}
              onChange={handleNumberChange}
              min="0"
              className={errors.api_rpm ? 'error' : ''}
            />
            {errors.api_rpm && <span className="error-message">{errors.api_rpm}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="api_rph">API RPH</label>
            <input
              type="number"
              id="api_rph"
              name="api_rph"
              value={formData.api_rph}
              onChange={handleNumberChange}
              min="0"
              className={errors.api_rph ? 'error' : ''}
            />
            {errors.api_rph && <span className="error-message">{errors.api_rph}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_demo"
                checked={formData.is_demo}
                onChange={handleInputChange}
              />
              演示应用
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_public"
                checked={formData.is_public}
                onChange={handleInputChange}
              />
              公开应用
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="is_universal"
                checked={formData.is_universal}
                onChange={handleInputChange}
              />
              通用应用
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '保存中...' : (isEditing ? '更新' : '创建')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppForm;
