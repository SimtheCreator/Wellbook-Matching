import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { Clock } from 'lucide-react';

export default function Dashboard() {
  const { data } = useTracker();
  const { tasks, projectInfo, team } = data;

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'Done').length;
  const doingTasks = tasks.filter(t => t.status === 'Doing').length;
  const todoTasks = tasks.filter(t => t.status === 'To do').length;
  const blockedTasks = tasks.filter(t => t.status === 'Blocked').length;
  const reviewTasks = tasks.filter(t => t.status === 'Review').length;

  const progressPercent = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const currentPhase = 2; // Jul
  const today = new Date('2026-07-30');
  
  let daysUntilNextMilestone = 0;
  const upcomingMilestones = tasks
    .filter(t => t.isMilestone && t.status !== 'Done')
    .map(t => ({ ...t, dateObj: new Date(t.end) }))
    .filter(t => t.dateObj >= today)
    .sort((a, b) => a.dateObj - b.dateObj);
  
  if (upcomingMilestones.length > 0) {
    const diffTime = Math.abs(upcomingMilestones[0].dateObj - today);
    daysUntilNextMilestone = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="dashboard-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>แดชบอร์ดโครงการ</h1>
      
      <div className="card" style={{ padding: '20px' }}>
        <h2 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>{projectInfo?.name || 'Wellnista App'}</h2>
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <div className="stat-label">งบประมาณ</div>
            <div className="stat-value">{projectInfo?.budget ? projectInfo.budget.toLocaleString() : '150,000'} บาท</div>
          </div>
          <div>
            <div className="stat-label">ระยะเวลา</div>
            <div className="stat-value">{projectInfo?.startDate} - {projectInfo?.endDate}</div>
          </div>
          <div>
            <div className="stat-label">โครงการ</div>
            <div className="stat-value">{projectInfo?.program || 'TED Youth Startup'}</div>
          </div>
          <div>
            <div className="stat-label">ความคืบหน้า ({progressPercent}%)</div>
            <div className="progress-bg" style={{ marginTop: '8px' }}>
              <div className="progress-fill" style={{ width: `${progressPercent}%`, background: 'var(--accent-primary)' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="stat-card" style={{ borderTop: '4px solid var(--text-secondary)' }}>
          <div className="stat-label">งานทั้งหมด</div>
          <div className="stat-value">{totalTasks}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--accent-success)' }}>
          <div className="stat-label">เสร็จสิ้น (Done)</div>
          <div className="stat-value">{doneTasks}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--accent-primary)' }}>
          <div className="stat-label">กำลังทำ (Doing)</div>
          <div className="stat-value">{doingTasks}</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid var(--accent-warning)' }}>
          <div className="stat-label">รอดำเนินการ (To do)</div>
          <div className="stat-value">{todoTasks}</div>
        </div>
      </div>

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>สถานะเฟสปัจจุบัน</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 1, name: 'Idea Validation' },
              { id: 2, name: 'Prototyping' },
              { id: 3, name: 'Testing' },
              { id: 4, name: 'Wrap-up' }
            ].map(phase => (
              <div key={phase.id} className="phase-step" style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                background: currentPhase === phase.id ? 'var(--bg-glass)' : 'transparent',
                border: currentPhase === phase.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                opacity: currentPhase < phase.id ? 0.5 : 1
              }}>
                <div style={{ fontSize: '12px', color: currentPhase === phase.id ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Phase {phase.id}</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{phase.name}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: '8px' }}>
             <Clock className="icon" style={{ color: 'var(--accent-warning)' }} />
             <div>
               <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ถัดไป: ไมล์สโตนที่ยังไม่เสร็จ</div>
               <div style={{ fontSize: '18px', fontWeight: '600' }}>
                  {upcomingMilestones.length > 0 ? `เหลืออีก ${daysUntilNextMilestone} วัน` : 'ไม่มีไมล์สโตนที่รอดำเนินการ'}
               </div>
             </div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>ภาระงานทีม</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {team.map(member => {
               const memberTasks = tasks.filter(t => t.owner === member.name);
               const mTotal = memberTasks.length;
               const mDone = memberTasks.filter(t => t.status === 'Done').length;
               const mPercent = mTotal === 0 ? 0 : Math.round((mDone / mTotal) * 100);
               return (
                 <div key={member.name}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span>{member.emoji}</span>
                       <span style={{ fontSize: '14px' }}>{member.name}</span>
                     </div>
                     <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{mDone}/{mTotal} ({mPercent}%)</span>
                   </div>
                   <div className="progress-bg">
                     <div className="progress-fill" style={{ width: `${mPercent}%`, background: `var(${member.colorVar})` }}></div>
                   </div>
                 </div>
               );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
