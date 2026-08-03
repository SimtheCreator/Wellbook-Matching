import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import TaskModal from '../components/TaskModal';
import { Star } from 'lucide-react';

export default function GanttChart() {
  const { data, updateTask, deleteTask } = useTracker();
  const { tasks, team } = data;
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerFilter, setOwnerFilter] = useState('All');

  const projectStart = new Date('2026-05-01').getTime();
  const projectEnd = new Date('2026-11-30').getTime();
  const totalDuration = projectEnd - projectStart;

  const today = new Date('2026-07-30').getTime();
  const todayLeft = Math.max(0, Math.min(100, ((today - projectStart) / totalDuration) * 100));

  const months = ['พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.'];

  const getOwnerColor = (ownerName) => {
    const member = team.find(m => m.name === ownerName);
    return member ? `var(${member.colorVar})` : 'var(--text-secondary)';
  };

  const getPosition = (startStr, endStr) => {
    const s = new Date(startStr).getTime();
    const e = new Date(endStr).getTime();
    const left = Math.max(0, ((s - projectStart) / totalDuration) * 100);
    const right = Math.min(100, ((e - projectStart) / totalDuration) * 100);
    const width = Math.max(0.5, right - left); 
    return { left: `${left}%`, width: `${width}%` };
  };

  const filteredTasks = tasks.filter(t => {
    if (ownerFilter !== 'All' && t.owner !== ownerFilter) return false;
    return true;
  }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const shiftDate = (dateStr, days) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const handleShiftTask = (task, e, days) => {
    e.stopPropagation();
    updateTask(task.id, {
      start: shiftDate(task.start, days),
      end: shiftDate(task.end, days)
    });
  };

  return (
    <div className="gantt-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Gantt Chart</h1>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          💡 คลิกที่ชื่อเพื่อแก้ไขรายละเอียด หรือใช้ปุ่ม ◀ ▶ เลื่อนวัน
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px' }}>
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

      <div className="card gantt-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="gantt-header" style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '320px', padding: '16px', borderRight: '1px solid var(--border-color)', flexShrink: 0, fontWeight: '600' }}>
            งาน (คลิกเพื่อแก้ไข)
          </div>
          <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
            {months.map((m, i) => (
              <div key={i} className="gantt-month" style={{ flex: 1, padding: '16px 8px', textAlign: 'center', borderRight: '1px solid var(--border-color)', fontSize: '14px' }}>
                {m}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <div className="gantt-today-line" style={{ position: 'absolute', top: 0, bottom: 0, left: `calc(320px + ${todayLeft}%)`, width: '2px', background: 'var(--accent-danger)', zIndex: 1 }}></div>
          <div className="gantt-today-label" style={{ position: 'absolute', top: '8px', left: `calc(320px + ${todayLeft}%)`, transform: 'translateX(-50%)', background: 'var(--accent-danger)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', zIndex: 2 }}>
            วันนี้
          </div>
          
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '320px', right: 0, display: 'flex', pointerEvents: 'none' }}>
            {months.map((_, i) => (
              <div key={i} style={{ flex: 1, borderRight: '1px solid var(--border-color)', opacity: 0.2 }}></div>
            ))}
          </div>

          <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column' }}>
            {filteredTasks.map(task => {
              const pos = getPosition(task.start, task.end);
              return (
                <div key={task.id} className="gantt-row" style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-color)', minHeight: '48px' }}>
                  <div className="gantt-label" style={{ width: '320px', padding: '8px 16px', borderRight: '1px solid var(--border-color)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="gantt-label-id" style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '32px' }}>{task.id}</span>
                    <span 
                      style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, cursor: 'pointer' }}
                      onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}
                      title="คลิกเพื่อแก้ไขรายละเอียด"
                    >
                      {task.name}
                    </span>
                    {task.isMilestone && <Star size={12} style={{ color: 'var(--accent-warning)', flexShrink: 0 }} />}
                    
                    {/* Quick Edit Controls */}
                    <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                      <button 
                        className="btn btn-ghost btn-sm" 
                        style={{ padding: '2px 6px', fontSize: '10px' }}
                        onClick={(e) => handleShiftTask(task, e, -1)}
                        title="เลื่อนขึ้น 1 วัน"
                      >
                        ◀
                      </button>
                      <button 
                        className="btn btn-ghost btn-sm" 
                        style={{ padding: '2px 6px', fontSize: '10px' }}
                        onClick={(e) => handleShiftTask(task, e, 1)}
                        title="เลื่อนลง 1 วัน"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                  <div className="gantt-timeline" style={{ flex: 1, position: 'relative', height: '100%', padding: '12px 0' }}>
                    <div className="gantt-bar" style={{
                      position: 'absolute',
                      left: pos.left,
                      width: pos.width,
                      height: '24px',
                      background: getOwnerColor(task.owner),
                      borderRadius: '4px',
                      opacity: task.status === 'Done' ? 0.5 : 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 8px',
                      color: '#fff',
                      fontSize: '10px',
                      overflow: 'hidden'
                    }}
                    onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}>
                      {task.isMilestone ? '💎' : ''}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => { setIsModalOpen(false); setSelectedTask(null); }} 
          onSave={(id, updates) => { updateTask(id, updates); setIsModalOpen(false); setSelectedTask(null); }}
          onDelete={(id) => { deleteTask(id); setIsModalOpen(false); setSelectedTask(null); }}
        />
      )}
    </div>
  );
}
