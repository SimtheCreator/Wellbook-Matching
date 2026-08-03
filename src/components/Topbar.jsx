import React, { useRef } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Download, Upload } from 'lucide-react';

const Topbar = ({ title, subtitle, children }) => {
  const { exportData, importData } = useTracker();
  const fileInputRef = useRef(null);

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (json.projectInfo && json.tasks) {
          importData(json);
        } else {
          alert('รูปแบบ JSON ไม่ถูกต้อง — ต้องมี projectInfo และ tasks');
        }
      } catch {
        alert('ไม่สามารถอ่านไฟล์ JSON ได้');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <div className="page-title">{title}</div>
          {subtitle && <div className="page-subtitle">{subtitle}</div>}
        </div>
      </div>
      <div className="topbar-actions">
        {children}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileChange}
        />
        <button className="btn btn-ghost btn-sm" onClick={handleImportClick} title="Import JSON">
          <Upload size={15} />
        </button>
        <button className="btn btn-ghost btn-sm" onClick={exportData} title="Export JSON">
          <Download size={15} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
