import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Plus, Star } from 'lucide-react';
import TaskModal from '../components/TaskModal';

export default function KanbanBoard() {
  const { data, updateTaskStatus, addTask, updateTask, deleteTask } = useTracker();
  const { tasks, team } = data;
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');

  const [viewMode, setViewMode] = useState('board');

  const columns = [
    { id: 'To do', label: 'To do', color: 'var(--text-secondary)' },
    { id: 'Doing', label: 'Doing', color: 'var(--accent-primary)' },
    { id: 'Blocked', label: 'Blocked', color: 'var(--accent-danger)' },
    { id: 'Review', label: 'Review', color: 'var(--accent-warning)' },
    { id: 'Done', label: 'Done', color: 'var(--accent-success)' }
  ];

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTaskStatus(taskId, status);
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (ownerFilter !== 'All' && t.owner !== ownerFilter) return false;
    if (phaseFilter !== 'All' && t.phase.toString() !== phaseFilter) return false;
    return true;
  });

  const getOwnerColor = (ownerName) => {
    const member = team.find(m => m.name === ownerName);
    return member ? `var(${member.colorVar})` : 'var(--text-secondary)';
  };

  const openNewTaskModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (id, updates) => {
    if (id) {
      updateTask(id, updates);
    } else {
      const newId = 'T' + (tasks.length + 1).toString().padStart(2, '0');
      addTask({ id: newId, ...updates });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="kanban-page" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Task Board</h1>
          
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px' }}>
            <button 
              className={`btn btn-sm ${viewMode === 'board' ? 'btn-primary' : 'btn-ghost'}`} 
              onClick={() => setViewMode('board')}
              style={{ borderRadius: '6px' }}
            >
              Board
            </button>
            <button 
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}`} 
              onClick={() => setViewMode('table')}
              style={{ borderRadius: '6px' }}
            >
              Table
            </button>
          </div>
        </div>
        
        <button className="btn btn-primary" onClick={openNewTaskModal} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={16} /> เพิ่มงานใหม่
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>ผู้รับผิดชอบ:</span>
          {['All', ...team.map(m => m.name)].map(opt => (
            <button key={opt} onClick={() => setOwnerFilter(opt)} style={{
              padding: '4px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: ownerFilter === opt ? 'var(--bg-tertiary)' : 'transparent',
              color: ownerFilter === opt ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              {opt}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>เฟส:</span>
          {['All', '1', '2', '3', '4'].map(opt => (
            <button key={opt} onClick={() => setPhaseFilter(opt)} style={{
              padding: '4px 12px',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              background: phaseFilter === opt ? 'var(--bg-tertiary)' : 'transparent',
              color: phaseFilter === opt ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer'
            }}>
              {opt === 'All' ? 'All' : `Phase ${opt}`}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'board' ? (
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', flex: 1, minHeight: 0 }}>
          {columns.map(col => (
            <div key={col.id} className="kanban-column" style={{ minWidth: '280px', flex: 1, background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column' }} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, col.id)}>
              <div className="kanban-column-header" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }}></div>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>{col.label}</h3>
                <span style={{ marginLeft: 'auto', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
                  {filteredTasks.filter(t => t.status === col.id).length}
                </span>
              </div>
              
              <div className="kanban-cards" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1 }}>
                {filteredTasks.filter(t => t.status === col.id).map(task => (
                  <div key={task.id} className="kanban-card" draggable onDragStart={(e) => handleDragStart(e, task.id)} onClick={() => { setSelectedTask(task); setIsModalOpen(true); }} style={{ background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'grab' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div className="kanban-card-id" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{task.id}</div>
                      {task.isMilestone && <Star size={14} style={{ color: 'var(--accent-warning)' }} />}
                    </div>
                    <div className="kanban-card-name" style={{ fontSize: '14px', marginBottom: '12px', fontWeight: '500' }}>
                      {task.name}
                    </div>
                    <div className="kanban-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={`badge badge-${task.status.toLowerCase().replace(' ', '')}`} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-glass)', color: 'var(--text-secondary)' }}>
                        Phase {task.phase}
                      </div>
                      <div className="owner-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                        <div className="owner-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: getOwnerColor(task.owner) }}></div>
                        <span>{task.owner}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>ID</th>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>ชื่องาน (คลิกเพื่อแก้)</th>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>สถานะ</th>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>ผู้รับผิดชอบ</th>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>Phase</th>
                <th style={{ padding: '12px 16px', fontWeight: '500', fontSize: '12px', color: 'var(--text-secondary)' }}>วันที่</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }} onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    {task.id} {task.isMilestone && <Star size={12} style={{ color: 'var(--accent-warning)', display: 'inline-block', marginLeft: '4px' }} />}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500' }}>{task.name}</td>
                  <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                    <select 
                      className="form-select" 
                      style={{ padding: '4px 8px', fontSize: '12px', minWidth: '100px', height: 'auto' }}
                      value={task.status}
                      onChange={e => updateTaskStatus(task.id, e.target.value)}
                    >
                      {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px' }} onClick={e => e.stopPropagation()}>
                    <select 
                      className="form-select" 
                      style={{ padding: '4px 8px', fontSize: '12px', minWidth: '80px', height: 'auto' }}
                      value={task.owner}
                      onChange={e => updateTask(task.id, { owner: e.target.value })}
                    >
                      {['Ice', 'Sim', 'Tao'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>Phase {task.phase}</td>
                  <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {task.start} — {task.end}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => { setIsModalOpen(false); setSelectedTask(null); }} 
          onSave={handleSaveTask}
          onDelete={(id) => { deleteTask(id); setIsModalOpen(false); setSelectedTask(null); }}
        />
      )}
    </div>
  );
}
