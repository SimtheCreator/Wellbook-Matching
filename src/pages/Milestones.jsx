import React from 'react';
import { useTracker } from '../context/TrackerContext';
import { Check, Circle } from 'lucide-react';

export default function Milestones() {
  const { data, toggleMilestoneCheck } = useTracker();
  const { milestoneChecklist, tasks } = data;

  const m01Task = tasks.find(t => t.id === 'T05') || { status: 'Done' }; 
  const m02Task = tasks.find(t => t.id === 'T15') || { status: 'To do' };

  const milestones = [
    {
      id: 'M01',
      title: 'เบิกทุนงวดที่ 1 (75,000 บาท)',
      dateStr: 'June 15-22, 2026',
      status: m01Task.status,
      amount: 75000,
      checklist: milestoneChecklist?.M01 || []
    },
    {
      id: 'M02',
      title: 'เบิกทุนงวดที่ 2 (75,000 บาท) + ปิดโครงการ',
      dateStr: 'Nov 15-22, 2026',
      status: m02Task.status,
      amount: 75000,
      checklist: milestoneChecklist?.M02 || []
    }
  ];

  const totalFund = 150000;
  const disbursedFund = milestones.filter(m => m.status === 'Done').reduce((acc, curr) => acc + curr.amount, 0);
  const fundPercent = (disbursedFund / totalFund) * 100;

  return (
    <div className="milestones-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>แผนไมล์สโตนและการเบิกจ่าย</h1>

      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>ไทม์ไลน์ 4 เฟสหลัก</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { id: 1, name: 'Idea Validation', date: 'May - Jun 2026' },
            { id: 2, name: 'Prototyping', date: 'Jul 2026' },
            { id: 3, name: 'Testing', date: 'Aug - Sep 2026' },
            { id: 4, name: 'Wrap-up', date: 'Oct - Nov 2026' }
          ].map(phase => (
            <div key={phase.id} className="phase-step" style={{ flex: 1, padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '12px', color: 'var(--accent-primary)', marginBottom: '4px' }}>Phase {phase.id}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{phase.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{phase.date}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px' }}>สถานะการเบิกจ่ายทุน</span>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>{disbursedFund.toLocaleString()} / {totalFund.toLocaleString()} บาท</span>
        </div>
        <div className="progress-bg" style={{ height: '8px', borderRadius: '4px' }}>
          <div className="progress-fill" style={{ width: `${fundPercent}%`, background: 'var(--accent-success)', height: '100%', borderRadius: '4px' }}></div>
        </div>
      </div>

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {milestones.map(m => (
          <div key={m.id} className="card milestone-card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)' }}>
            <div className="milestone-card-header" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', borderTopLeftRadius: 'var(--radius)', borderTopRightRadius: 'var(--radius)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--accent-warning)' }}>{m.id}</h2>
                <span className={`badge badge-${m.status.toLowerCase().replace(' ', '')}`} style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '12px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)' }}>
                  {m.status}
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{m.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{m.dateStr}</div>
            </div>
            <div className="milestone-card-body" style={{ padding: '20px', flex: 1 }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {m.checklist.map((item, idx) => (
                  <div key={idx} className="milestone-check-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }} onClick={() => toggleMilestoneCheck(m.id, idx)}>
                    <div className="milestone-checkbox" style={{ marginTop: '2px', color: item.checked ? 'var(--accent-success)' : 'var(--text-secondary)' }}>
                      {item.checked ? <Check size={18} /> : <Circle size={18} />}
                    </div>
                    <div className="milestone-check-label" style={{ fontSize: '14px', textDecoration: item.checked ? 'line-through' : 'none', color: item.checked ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
