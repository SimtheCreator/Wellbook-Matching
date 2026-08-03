import React, { useState, useRef } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Save, Download, Upload, RotateCcw, Database, Settings as SettingsIcon, Info, Server } from 'lucide-react';
import { isConfigured } from '../lib/firebase';

export default function Settings() {
  const { data, updateProjectInfo, exportData, importData, resetData } = useTracker();
  const { projectInfo } = data;
  const fileInputRef = useRef(null);
  
  const [localInfo, setLocalInfo] = useState({
    name: projectInfo.name || '',
    budget: projectInfo.budget || 150000,
    startDate: projectInfo.startDate || '',
    endDate: projectInfo.endDate || '',
    program: projectInfo.program || 'Wellnista Program'
  });

  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateProjectInfo(localInfo);
    setSaveMessage('Project settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        importData(jsonData);
        alert('Data imported successfully!');
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

  const handleReset = () => {
    if (window.confirm('Are you absolutely sure? This will wipe all current data and restore defaults. This action cannot be undone.')) {
      resetData();
      alert('Data reset to defaults.');
    }
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Settings ⚙️</h1>
          <p className="text-secondary">Configure project details and manage your data.</p>
        </div>
      </div>

      {/* Project Settings */}
      <div className="card bg-secondary rounded-2xl border border-white/5 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-tertiary/30 flex items-center gap-3">
          <SettingsIcon className="text-accent-primary" size={20} />
          <h2 className="text-xl font-semibold text-primary">Project Settings</h2>
        </div>
        <form onSubmit={handleSaveInfo} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Project Name</label>
              <input 
                type="text" required
                value={localInfo.name} onChange={e => setLocalInfo({...localInfo, name: e.target.value})}
                className="w-full bg-tertiary border border-white/10 rounded-lg p-2.5 text-primary focus:border-accent-primary outline-none transition-colors"
              />
            </div>
            <div className="form-group">
              <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Program / Cohort</label>
              <input 
                type="text"
                value={localInfo.program} onChange={e => setLocalInfo({...localInfo, program: e.target.value})}
                className="w-full bg-tertiary border border-white/10 rounded-lg p-2.5 text-primary focus:border-accent-primary outline-none transition-colors"
              />
            </div>
            <div className="form-group">
              <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Total Budget (THB)</label>
              <input 
                type="number" required min="0"
                value={localInfo.budget} onChange={e => setLocalInfo({...localInfo, budget: Number(e.target.value)})}
                className="w-full bg-tertiary border border-white/10 rounded-lg p-2.5 text-primary focus:border-accent-primary outline-none transition-colors"
              />
            </div>
            <div className="form-group grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Start Date</label>
                <input 
                  type="date" required
                  value={localInfo.startDate} onChange={e => setLocalInfo({...localInfo, startDate: e.target.value})}
                  className="w-full bg-tertiary border border-white/10 rounded-lg p-2.5 text-primary focus:border-accent-primary outline-none [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">End Date</label>
                <input 
                  type="date" required
                  value={localInfo.endDate} onChange={e => setLocalInfo({...localInfo, endDate: e.target.value})}
                  className="w-full bg-tertiary border border-white/10 rounded-lg p-2.5 text-primary focus:border-accent-primary outline-none [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-6">
            <span className="text-accent-success text-sm font-medium">{saveMessage}</span>
            <button type="submit" className="flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/80 text-white px-5 py-2.5 rounded-lg transition-colors font-medium">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Data Management */}
      <div className="card bg-secondary rounded-2xl border border-white/5 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-tertiary/30 flex items-center gap-3">
          <Database className="text-accent-primary" size={20} />
          <h2 className="text-xl font-semibold text-primary">Data Management</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-white/10 rounded-xl bg-tertiary/50 text-center space-y-3">
            <div className="w-10 h-10 mx-auto bg-accent-primary/10 text-accent-primary rounded-full flex items-center justify-center">
              <Download size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Export Data</h3>
              <p className="text-xs text-secondary mb-4">Download all project data as a JSON file for backup.</p>
              <button onClick={exportData} className="w-full py-2 bg-white/5 hover:bg-white/10 text-primary rounded-lg transition-colors text-sm font-medium border border-white/10">
                Export JSON
              </button>
            </div>
          </div>

          <div className="p-5 border border-white/10 rounded-xl bg-tertiary/50 text-center space-y-3">
            <div className="w-10 h-10 mx-auto bg-accent-success/10 text-accent-success rounded-full flex items-center justify-center">
              <Upload size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Import Data</h3>
              <p className="text-xs text-secondary mb-4">Restore project data from a previously exported JSON file.</p>
              <input type="file" accept=".json" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 bg-white/5 hover:bg-white/10 text-primary rounded-lg transition-colors text-sm font-medium border border-white/10">
                Import JSON
              </button>
            </div>
          </div>

          <div className="p-5 border border-accent-danger/20 rounded-xl bg-accent-danger/5 text-center space-y-3">
            <div className="w-10 h-10 mx-auto bg-accent-danger/10 text-accent-danger rounded-full flex items-center justify-center">
              <RotateCcw size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-accent-danger mb-1">Reset App</h3>
              <p className="text-xs text-secondary mb-4">Wipe all current data and restore to default template state.</p>
              <button onClick={handleReset} className="w-full py-2 bg-accent-danger/10 hover:bg-accent-danger/20 text-accent-danger rounded-lg transition-colors text-sm font-medium border border-accent-danger/20">
                Factory Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-secondary rounded-2xl border border-white/5 shadow-lg overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <Server className="text-secondary" size={18} />
            <h3 className="font-semibold text-primary">Database Connection</h3>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 rounded-full ${isConfigured ? 'bg-accent-success animate-pulse' : 'bg-accent-warning'}`}></div>
              <div>
                <p className="text-sm font-medium text-primary">
                  {isConfigured ? 'Firebase Connected' : 'Local Storage Mode'}
                </p>
                <p className="text-xs text-secondary">
                  {isConfigured ? 'Data is syncing to the cloud in real-time.' : 'Data is saved locally in this browser only.'}
                </p>
              </div>
            </div>
            {!isConfigured && (
              <div className="bg-tertiary p-3 rounded-lg border border-white/5">
                <p className="text-xs text-secondary mb-2">To enable cloud sync, add your Firebase config to <code className="bg-primary px-1 py-0.5 rounded text-accent-primary">.env</code>:</p>
                <pre className="text-[10px] text-secondary font-mono bg-primary p-2 rounded overflow-x-auto">
                  VITE_FIREBASE_API_KEY="..."{'\n'}
                  VITE_FIREBASE_PROJECT_ID="..."
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="card bg-secondary rounded-2xl border border-white/5 shadow-lg overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <Info className="text-secondary" size={18} />
            <h3 className="font-semibold text-primary">App Information</h3>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-sm text-secondary">Version</span>
              <span className="text-sm font-medium text-primary">v1.2.0</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-sm text-secondary">Framework</span>
              <span className="text-sm font-medium text-primary">React 18 + Vite</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-secondary">Styling</span>
              <span className="text-sm font-medium text-primary">Tailwind CSS</span>
            </div>
            <div className="mt-4 pt-2 text-center">
              <p className="text-xs text-secondary/50">Built for WellBook Project Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
