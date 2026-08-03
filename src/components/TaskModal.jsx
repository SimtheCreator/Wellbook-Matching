import React, { useState, useEffect } from 'react';
import { X, Trash2, Star } from 'lucide-react';

const STATUSES = ['To do', 'Doing', 'Blocked', 'Review', 'Done'];
const OWNERS = ['Ice', 'Sim', 'Tao'];
const PHASES = [1, 2, 3, 4];

const emptyTask = {
  id: '',
  name: '',
  owner: 'Ice',
  start: '',
  end: '',
  status: 'To do',
  phase: 1,
  isMilestone: false,
  description: '',
};

const TaskModal = ({ task, onClose, onSave, onDelete }) => {
  const isNew = !task;
  const [form, setForm] = useState(task || { ...emptyTask });

  useEffect(() => {
    setForm(task || { ...emptyTask });
  }, [task]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form.id, form);
  };

  const handleDelete = () => {
    if (window.confirm(`ลบงาน "${form.name}" ?`)) {
      onDelete(form.id);
    }
  };

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isNew ? '➕ เพิ่มงานใหม่' : `✏️ แก้ไข ${form.id}`}</h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Task Name */}
            <div className="form-group">
              <label className="form-label">ชื่องาน</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="ระบุชื่องาน..."
                autoFocus
              />
            </div>

            {/* Owner & Status */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">ผู้รับผิดชอบ</label>
                <select
                  className="form-select"
                  value={form.owner}
                  onChange={(e) => handleChange('owner', e.target.value)}
                >
                  {OWNERS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">สถานะ</label>
                <select
                  className="form-select"
                  value={form.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dates */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">วันเริ่ม</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.start}
                  onChange={(e) => handleChange('start', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">วันสิ้นสุด</label>
                <input
                  className="form-input"
                  type="date"
                  value={form.end}
                  onChange={(e) => handleChange('end', e.target.value)}
                />
              </div>
            </div>

            {/* Phase & Milestone */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phase</label>
                <select
                  className="form-select"
                  value={form.phase}
                  onChange={(e) =>
                    handleChange('phase', parseInt(e.target.value))
                  }
                >
                  {PHASES.map((p) => (
                    <option key={p} value={p}>
                      Phase {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Milestone</label>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 0',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.isMilestone || false}
                    onChange={(e) =>
                      handleChange('isMilestone', e.target.checked)
                    }
                    style={{ width: 16, height: 16 }}
                  />
                  <Star
                    size={14}
                    style={{
                      color: form.isMilestone
                        ? 'var(--accent-warning)'
                        : 'var(--text-tertiary)',
                    }}
                  />
                  งาน Milestone
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">รายละเอียด</label>
              <textarea
                className="form-textarea"
                value={form.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="รายละเอียดเพิ่มเติม..."
                rows={3}
              />
            </div>
          </div>

          <div className="modal-footer">
            <div>
              {!isNew && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  <Trash2 size={14} />
                  ลบงาน
                </button>
              )}
            </div>
            <div className="modal-footer-right">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onClose}
              >
                ยกเลิก
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                {isNew ? 'เพิ่มงาน' : 'บันทึก'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
