import React, { useState, useEffect } from 'react';
import { DifyApp } from '../types/dify';
import { getApps, deleteApp, toggleAppStatus } from '../services/api';
import './AppList.css';

interface AppListProps {
  onEditApp: (app: DifyApp) => void;
  onRefresh: () => void;
}

const AppList: React.FC<AppListProps> = ({ onEditApp, onRefresh }) => {
  const [apps, setApps] = useState<DifyApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getApps();
      if (response.success) {
        setApps(response.data);
      } else {
        setError(response.message || '获取应用列表失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个应用吗？此操作不可撤销。')) {
      const response = await deleteApp(id);
      if (response.success) {
        setApps(apps.filter(app => app.id !== id));
        onRefresh();
      } else {
        alert(response.message || '删除失败');
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    const response = await toggleAppStatus(id);
    if (response.success) {
      setApps(apps.map(app =>
        app.id === id ? response.data : app
      ));
      onRefresh();
    } else {
      alert(response.message || '状态切换失败');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'green';
      case 'disabled': return 'gray';
      case 'maintenance': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return '正常';
      case 'disabled': return '已禁用';
      case 'maintenance': return '维护中';
      default: return '未知';
    }
  };

  const getModeText = (mode: string) => {
    switch (mode) {
      case 'chat': return '对话';
      case 'completion': return '补全';
      case 'workflow': return '工作流';
      default: return mode;
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
    <div className="app-list">
      <h2>应用列表 ({apps.length})</h2>
      {apps.length === 0 ? (
        <div className="empty-state">
          <p>暂无应用数据</p>
        </div>
      ) : (
        <div className="app-grid">
          {apps.map(app => (
            <div key={app.id} className="app-card">
              <div className="app-header">
                <div className="app-icon" style={{ backgroundColor: app.icon_background }}>
                  {app.icon || '📱'}
                </div>
                <div className="app-info">
                  <h3>{app.name}</h3>
                  <p className="app-mode">{getModeText(app.mode)}</p>
                </div>
                <div className="app-actions">
                  <button
                    className={`status-btn ${getStatusColor(app.status)}`}
                    onClick={() => handleToggleStatus(app.id)}
                  >
                    {getStatusText(app.status)}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => onEditApp(app)}
                  >
                    编辑
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(app.id)}
                  >
                    删除
                  </button>
                </div>
              </div>

              <div className="app-content">
                <div className="app-details">
                  <div className="detail-item">
                    <span className="label">租户ID:</span>
                    <span className="value">{app.tenant_id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">状态:</span>
                    <span className={`status-badge status-${getStatusColor(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">网站:</span>
                    <span className="value">{app.enable_site ? '启用' : '禁用'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">API:</span>
                    <span className="value">{app.enable_api ? '启用' : '禁用'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">API限制:</span>
                    <span className="value">{app.api_rpm} RPM / {app.api_rph} RPH</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">创建时间:</span>
                    <span className="value">{formatDate(app.created_at)}</span>
                  </div>
                </div>

                <div className="app-flags">
                  {app.is_demo && <span className="flag demo">演示</span>}
                  {app.is_public && <span className="flag public">公开</span>}
                  {app.is_universal && <span className="flag universal">通用</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppList;
