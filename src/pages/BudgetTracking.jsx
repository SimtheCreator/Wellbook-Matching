import React, { useState } from 'react';
import { useTracker } from '../context/TrackerContext';
import { DollarSign, Plus, Trash2, PieChart, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function BudgetTracking() {
  const { data, addExpense, deleteExpense } = useTracker();
  const { projectInfo, expenses, milestoneChecklist } = data;
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    category: 'การวิจัย',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['การวิจัย', 'เทคโนโลยี', 'การตลาด', 'บริหารจัดการ', 'อื่นๆ'];
  
  const totalBudget = projectInfo.budget || 150000;
  const spent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const remaining = totalBudget - spent;
  const spentPercent = Math.min((spent / totalBudget) * 100, 100);

  const m1Done = milestoneChecklist?.M01?.every(item => item.checked) || false;
  const m2Done = milestoneChecklist?.M02?.every(item => item.checked) || false;

  const expensesByCategory = categories.map(cat => ({
    name: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + Number(e.amount), 0)
  })).filter(c => c.total > 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.name || !newExpense.amount) return;
    
    addExpense({
      ...newExpense,
      amount: Number(newExpense.amount),
      id: `EXP-${Date.now().toString().slice(-6)}`
    });
    
    setNewExpense({
      name: '',
      amount: '',
      category: 'การวิจัย',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Budget Tracking 💰</h1>
          <p className="text-secondary">Track project expenses and funding tranches.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/80 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm font-medium">Total Budget</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(totalBudget)}</h3>
            </div>
          </div>
        </div>
        
        <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-danger/10 text-accent-danger flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm font-medium">Spent</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(spent)}</h3>
            </div>
          </div>
        </div>

        <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-success/10 text-accent-success flex items-center justify-center">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm font-medium">Remaining</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(remaining)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-primary">Budget Usage</h3>
          <span className="text-sm font-medium text-secondary">{spentPercent.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-tertiary rounded-full h-4 mb-2 overflow-hidden border border-white/5">
          <div 
            className={`h-4 rounded-full transition-all duration-1000 ${spentPercent > 90 ? 'bg-accent-danger' : spentPercent > 75 ? 'bg-accent-warning' : 'bg-accent-primary'}`}
            style={{ width: `${spentPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-secondary text-right">{formatCurrency(remaining)} available</p>
      </div>

      {/* Tranches and Add Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showAddForm && (
            <div className="card bg-secondary p-6 rounded-2xl border border-accent-primary/50 shadow-lg animate-fade-in">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Plus size={18} className="text-accent-primary" /> 
                New Expense
              </h3>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Description</label>
                  <input 
                    type="text" required
                    value={newExpense.name} onChange={e => setNewExpense({...newExpense, name: e.target.value})}
                    className="w-full bg-tertiary border border-white/10 rounded-lg p-2 text-primary focus:border-accent-primary outline-none"
                    placeholder="e.g. Server Hosting"
                  />
                </div>
                <div className="form-group">
                  <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Amount (THB)</label>
                  <input 
                    type="number" required min="0" step="0.01"
                    value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                    className="w-full bg-tertiary border border-white/10 rounded-lg p-2 text-primary focus:border-accent-primary outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group">
                  <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Category</label>
                  <select 
                    value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full bg-tertiary border border-white/10 rounded-lg p-2 text-primary focus:border-accent-primary outline-none appearance-none"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1 block">Date</label>
                  <input 
                    type="date" required
                    value={newExpense.date} onChange={e => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full bg-tertiary border border-white/10 rounded-lg p-2 text-primary focus:border-accent-primary outline-none [color-scheme:dark]"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg text-secondary hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-lg transition-colors font-medium shadow-lg shadow-accent-primary/20">
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Expenses List */}
          <div className="card bg-secondary rounded-2xl border border-white/5 shadow-lg overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-semibold text-primary">Recent Expenses</h3>
            </div>
            {expenses.length === 0 ? (
              <div className="p-8 text-center text-secondary">
                <p>No expenses recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-tertiary/50 border-b border-white/5">
                      <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Date</th>
                      <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Description</th>
                      <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider">Category</th>
                      <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Amount</th>
                      <th className="p-4 text-xs font-semibold text-secondary uppercase tracking-wider text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).map(exp => (
                      <tr key={exp.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-sm text-secondary">{new Date(exp.date).toLocaleDateString('th-TH')}</td>
                        <td className="p-4 text-sm text-primary font-medium">{exp.name}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-tertiary border border-white/10 rounded-full text-xs text-secondary whitespace-nowrap">
                            {exp.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-primary font-bold text-right">{formatCurrency(exp.amount)}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => {
                              if(window.confirm('Delete this expense?')) deleteExpense(exp.id);
                            }}
                            className="p-1.5 text-secondary hover:text-accent-danger hover:bg-accent-danger/10 rounded-lg transition-colors inline-flex"
                            title="Delete Expense"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel: Tranches & Category Breakdown */}
        <div className="space-y-6">
          <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">Funding Tranches</h3>
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${m1Done ? 'border-accent-success/30 bg-accent-success/5' : 'border-white/10 bg-tertiary'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary">Tranche 1</h4>
                  {m1Done ? <CheckCircle2 size={18} className="text-accent-success" /> : <AlertCircle size={18} className="text-accent-warning" />}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{formatCurrency(75000)}</p>
                <p className="text-xs text-secondary">Depends on M01 completion</p>
              </div>

              <div className={`p-4 rounded-xl border ${m2Done ? 'border-accent-success/30 bg-accent-success/5' : 'border-white/10 bg-tertiary'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-primary">Tranche 2</h4>
                  {m2Done ? <CheckCircle2 size={18} className="text-accent-success" /> : <AlertCircle size={18} className="text-accent-warning" />}
                </div>
                <p className="text-2xl font-bold text-primary mb-1">{formatCurrency(75000)}</p>
                <p className="text-xs text-secondary">Depends on M02 completion</p>
              </div>
            </div>
          </div>

          <div className="card bg-secondary p-6 rounded-2xl border border-white/5 shadow-lg">
            <h3 className="text-lg font-semibold text-primary mb-4">Category Breakdown</h3>
            {expensesByCategory.length === 0 ? (
              <p className="text-sm text-secondary">No data available.</p>
            ) : (
              <div className="space-y-4">
                {expensesByCategory.sort((a,b) => b.total - a.total).map(cat => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-secondary">{cat.name}</span>
                      <span className="text-primary font-medium">{formatCurrency(cat.total)}</span>
                    </div>
                    <div className="w-full bg-tertiary rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-1.5 rounded-full bg-accent-primary opacity-80"
                        style={{ width: `${(cat.total / spent) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
