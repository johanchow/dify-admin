import React, { useState, useEffect } from 'react';
import { DifyBot, CreateBotRequest } from '../types/dify';
import { createBot, updateBot } from '../services/api';
import './BotForm.css';

interface BotFormProps {
  bot?: DifyBot | null;
  onSave: () => void;
  onCancel: () => void;
}

const BotForm: React.FC<BotFormProps> = ({ bot, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CreateBotRequest>({
    name: '',
    description: '',
    model: 'gpt-3.5-turbo',
    maxTokens: 2000,
    temperature: 0.7,
    category: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!bot;

  useEffect(() => {
    if (bot) {
      setFormData({
        name: bot.name,
        description: bot.description,
        model: bot.model,
        maxTokens: bot.maxTokens,
        temperature: bot.temperature,
        category: bot.category,
        tags: [...bot.tags]
      });
    }
  }, [bot]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '机器人名称不能为空';
    }

    if (!formData.description.trim()) {
      newErrors.description = '机器人描述不能为空';
    }

    if (!formData.category.trim()) {
      newErrors.category = '分类不能为空';
    }

    if (formData.maxTokens < 100 || formData.maxTokens > 8000) {
      newErrors.maxTokens = '最大Token数应在100-8000之间';
    }

    if (formData.temperature < 0 || formData.temperature > 2) {
      newErrors.temperature = '温度值应在0-2之间';
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
      
      if (isEditing && bot) {
        response = await updateBot({
          id: bot.id,
          ...formData
        });
      } else {
        response = await createBot(formData);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxTokens' || name === 'temperature' ? parseFloat(value) : value
    }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bot-form-overlay">
      <div className="bot-form-modal">
        <div className="form-header">
          <h2>{isEditing ? '编辑机器人' : '创建新机器人'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="bot-form">
          <div className="form-group">
            <label htmlFor="name">机器人名称 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="请输入机器人名称"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">描述 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="请输入机器人描述"
              rows={3}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="model">模型</label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="claude-3-sonnet">Claude-3 Sonnet</option>
                <option value="claude-3-opus">Claude-3 Opus</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category">分类 *</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={errors.category ? 'error' : ''}
                placeholder="如：客服、开发、营销等"
              />
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="maxTokens">最大Token数 *</label>
              <input
                type="number"
                id="maxTokens"
                name="maxTokens"
                value={formData.maxTokens}
                onChange={handleInputChange}
                className={errors.maxTokens ? 'error' : ''}
                min="100"
                max="8000"
                step="100"
              />
              {errors.maxTokens && <span className="error-message">{errors.maxTokens}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="temperature">温度 *</label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className={errors.temperature ? 'error' : ''}
                min="0"
                max="2"
                step="0.1"
              />
              {errors.temperature && <span className="error-message">{errors.temperature}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>标签</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入标签后按回车添加"
              />
              <button type="button" onClick={handleAddTag} className="add-tag-btn">
                添加
              </button>
            </div>
            <div className="tags-container">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="remove-tag-btn"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              取消
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '保存中...' : (isEditing ? '更新' : '创建')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BotForm;
