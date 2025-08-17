import React, { useState } from 'react';
import './App.css';
import AppList from './components/AppList';
import AppForm from './components/AppForm';
import { DifyApp } from './types/dify';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState<DifyApp | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateApp = () => {
    setEditingApp(null);
    setShowForm(true);
  };

  const handleEditApp = (app: DifyApp) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingApp(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingApp(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Dify 应用管理系统</h1>
          <button
            className="create-btn"
            onClick={handleCreateApp}
          >
            + 创建应用
          </button>
        </div>
      </header>

      <main className="app-main">
        <AppList
          key={refreshKey}
          onEditApp={handleEditApp}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      </main>

      {showForm && (
        <AppForm
          app={editingApp}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;
