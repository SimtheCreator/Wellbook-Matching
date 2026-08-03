import React from 'react';
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  KanbanSquare,
  GanttChart,
  Flag,
  Users,
  Wallet,
  Settings,
} from 'lucide-react';

const navItems = [
  { section: 'ภาพรวม' },
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Gantt Chart', path: '/gantt', icon: GanttChart },
  { section: 'จัดการงาน' },
  { name: 'Task Board', path: '/board', icon: KanbanSquare },
  { name: 'Milestones', path: '/milestones', icon: Flag },
  { section: 'ทีมงาน' },
  { name: 'Team & Roles', path: '/team', icon: Users },
  { name: 'Budget', path: '/budget', icon: Wallet },
  { section: 'ระบบ' },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">W</div>
        <div className="sidebar-title">
          <h1>WellBook PM</h1>
          <span>TED Fund Tracker</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={`s-${i}`} className="nav-section-label">
                {item.section}
              </div>
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div
            className="sidebar-user-avatar"
            style={{ background: 'var(--accent-primary)', color: '#fff' }}
          >
            🧊
          </div>
          <div className="sidebar-user-info">
            <span className="name">WellBook Team</span>
            <span className="role">TED IDEATION FY2569</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
