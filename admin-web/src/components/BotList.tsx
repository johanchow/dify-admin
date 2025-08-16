import React, { useState, useEffect } from 'react';
import { DifyBot } from '../types/dify';
import { getBots, deleteBot, toggleBotStatus } from '../services/api';
import './BotList.css';

interface BotListProps {
  onEditBot: (bot: DifyBot) => void;
  onRefresh: () => void;
}

const BotList: React.FC<BotListProps> = ({ onEditBot, onRefresh }) => {
  const [bots, setBots] = useState<DifyBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBots();
      if (response.success) {
        setBots(response.data);
      } else {
        setError(response.message || '获取机器人列表失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个机器人吗？此操作不可撤销。')) {
      const response = await deleteBot(id);
      if (response.success) {
        setBots(bots.filter(bot => bot.id !== id));
        onRefresh();
      } else {
        alert(response.message || '删除失败');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    const response = await toggleBotStatus(id);
    if (response.success) {
      setBots(bots.map(bot => 
        bot.id === id ? response.data : bot
      ));
      onRefresh();
    } else {
      alert(response.message || '状态切换失败');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'maintenance': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '运行中';
      case 'inactive': return '已停用';
      case 'maintenance': return '维护中';
      default: return '未知';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">错误: {error}</div>;
  }

  return (
    <div className="bot-list">
      <h2>机器人列表 ({bots.length})</h2>
      {bots.length === 0 ? (
        <div className="empty-state">
          <p>暂无机器人数据</p>
        </div>
      ) : (
        <div className="bot-grid">
          {bots.map(bot => (
            <div key={bot.id} className="bot-card">
              <div className="bot-header">
                <h3>{bot.name}</h3>
                <span 
                  className={`status-badge status-${getStatusColor(bot.status)}`}
                >
                  {getStatusText(bot.status)}
                </span>
              </div>
              
              <div className="bot-content">
                <p className="description">{bot.description}</p>
                
                <div className="bot-details">
                  <div className="detail-item">
                    <span className="label">模型:</span>
                    <span className="value">{bot.model}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">分类:</span>
                    <span className="value">{bot.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">最大Token:</span>
                    <span className="value">{bot.maxTokens}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">温度:</span>
                    <span className="value">{bot.temperature}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">创建时间:</span>
                    <span className="value">{formatDate(bot.createdAt)}</span>
                  </div>
                </div>

                <div className="tags">
                  {bot.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="bot-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => onEditBot(bot)}
                >
                  编辑
                </button>
                <button 
                  className={`btn ${bot.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => handleToggleStatus(bot.id)}
                >
                  {bot.status === 'active' ? '停用' : '启用'}
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDelete(bot.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BotList;
