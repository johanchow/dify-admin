import React, { useState } from 'react';
import './App.css';
import BotList from './components/BotList';
import BotForm from './components/BotForm';
import { DifyBot } from './types/dify';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingBot, setEditingBot] = useState<DifyBot | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateBot = () => {
    setEditingBot(null);
    setShowForm(true);
  };

  const handleEditBot = (bot: DifyBot) => {
    setEditingBot(bot);
    setShowForm(true);
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingBot(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBot(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Dify 机器人管理系统</h1>
          <button 
            className="create-btn"
            onClick={handleCreateBot}
          >
            + 创建机器人
          </button>
        </div>
      </header>

      <main className="app-main">
        <BotList 
          key={refreshKey}
          onEditBot={handleEditBot}
          onRefresh={() => setRefreshKey(prev => prev + 1)}
        />
      </main>

      {showForm && (
        <BotForm
          bot={editingBot}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;
