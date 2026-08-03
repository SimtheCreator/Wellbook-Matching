import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { Plus, X, Activity, ListTodo, CalendarClock } from 'lucide-react';

export default function TeamView() {
  const { data, updateTeamMember } = useTracker();
  const { team, tasks } = data;

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Done': return 'badge badge-done';
      case 'Doing': return 'badge badge-doing';
      case 'To do': return 'badge badge-todo';
      case 'Blocked': return 'badge badge-blocked';
      case 'Review': return 'badge badge-review';
      default: return 'badge badge-todo';
    }
  };

  const [sortByDeadline, setSortByDeadline] = useState(false);

  const getMemberTasks = (memberName) => {
    let memberTasks = tasks.filter(t => t.owner === memberName);
    if (sortByDeadline) {
      memberTasks.sort((a, b) => new Date(a.end) - new Date(b.end));
    }
    return memberTasks;
  };

  const calculateProgress = (memberTasks) => {
    if (memberTasks.length === 0) return 0;
    const doneTasks = memberTasks.filter(t => t.status === 'Done');
    return Math.round((doneTasks.length / memberTasks.length) * 100);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Team Overview 👥</h1>
          <p className="text-secondary">Manage team roles, responsibilities, and workload.</p>
        </div>
        <div>
          <button 
            onClick={() => setSortByDeadline(!sortByDeadline)}
            className={`btn ${sortByDeadline ? 'btn-primary' : 'btn-secondary'} text-sm`}
          >
            <CalendarClock size={16} />
            {sortByDeadline ? 'Sorting by Deadline' : 'Sort by Deadline'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => {
          const memberTasks = getMemberTasks(member.name);
          const progress = calculateProgress(memberTasks);
          const memberColorVar = `var(--color-${member.name.toLowerCase()})`;
          
          return (
            <div key={member.name} className="card p-0 flex flex-col shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div 
                className="team-card-header p-6 pb-4 border-b border-[var(--border-color)]"
                style={{ borderTop: `4px solid ${memberColorVar}` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="team-avatar w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm"
                    style={{ backgroundColor: `color-mix(in srgb, ${memberColorVar} 15%, transparent)` }}
                  >
                    {member.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{member.name}</h3>
                    <input 
                      type="text" 
                      value={member.role}
                      onChange={(e) => updateTeamMember(member.name, { role: e.target.value })}
                      className="text-sm text-[var(--text-secondary)] w-full font-medium"
                      style={{ background: 'transparent', border: 'none', outline: 'none', padding: 0 }}
                      placeholder="Role..."
                    />
                  </div>
                </div>
                
                <div className="form-group mb-0">
                  <label className="form-label">Title</label>
                  <input 
                    type="text" 
                    value={member.title}
                    onChange={(e) => updateTeamMember(member.name, { title: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="team-card-body p-6 pt-0 flex-1 flex flex-col gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="form-label flex items-center gap-1">
                      <ListTodo size={14} />
                      Responsibilities
                    </label>
                    <button 
                      onClick={() => updateTeamMember(member.name, { responsibilities: [...member.responsibilities, 'New Responsibility'] })}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                      title="Add Responsibility"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {member.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 group p-1 -mx-1 rounded hover:bg-[var(--bg-tertiary)] transition-colors">
                        <div 
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: memberColorVar }}
                        ></div>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => {
                            const newResp = [...member.responsibilities];
                            newResp[idx] = e.target.value;
                            updateTeamMember(member.name, { responsibilities: newResp });
                          }}
                          style={{ background: 'transparent', border: 'none', outline: 'none', padding: 0 }}
                          className="text-sm text-[var(--text-primary)] w-full flex-1"
                        />
                        <button 
                          onClick={() => {
                            const newResp = member.responsibilities.filter((_, i) => i !== idx);
                            updateTeamMember(member.name, { responsibilities: newResp });
                          }}
                          className="opacity-0 group-hover:opacity-100 text-secondary hover:text-accent-danger transition-all p-1"
                          title="Remove"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="form-label flex items-center gap-1">
                      <Activity size={14} />
                      Workload
                    </label>
                    <span className="text-xs text-[var(--text-secondary)] font-medium">
                      {memberTasks.filter(t => t.status === 'Done').length} / {memberTasks.length} Tasks
                    </span>
                  </div>
                  
                  <div className="progress-bg mb-4">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress}%`, backgroundColor: memberColorVar }}
                    ></div>
                  </div>

                  <div className="space-y-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                    {memberTasks.map(task => (
                      <div key={task.id} className="p-3 bg-[var(--bg-primary)] rounded-lg flex flex-col gap-2 border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-colors shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-mono text-[var(--text-tertiary)] shrink-0">{task.id}</span>
                          <span className="text-sm text-[var(--text-primary)] font-semibold flex-1 truncate" title={task.name}>{task.name}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className={getStatusBadgeClass(task.status)}>
                            {task.status}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] font-medium">{task.end}</span>
                        </div>
                      </div>
                    ))}
                    {memberTasks.length === 0 && (
                      <p className="text-sm text-secondary text-center py-2 italic">No tasks assigned.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
