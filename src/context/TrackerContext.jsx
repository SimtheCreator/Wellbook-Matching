import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import seedData from '../data/seed.json';
import { isConfigured } from '../lib/firebase';
import { saveData, loadData, subscribeToData } from '../lib/firestore';

const TrackerContext = createContext();
export const useTracker = () => useContext(TrackerContext);

const STORAGE_KEY = 'wellbook-pm-data';

function loadFromLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse localStorage', e);
  }
  return null;
}

function saveToLocal(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

/* ─── Reducer ─── */
function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...action.payload };

    case 'UPDATE_TASK': {
      const { taskId, updates } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      };
    }

    case 'UPDATE_TASK_STATUS': {
      const { taskId, newStatus } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        ),
      };
    }

    case 'ADD_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };
    }

    case 'ADD_EXPENSE': {
      return {
        ...state,
        expenses: [...(state.expenses || []), action.payload],
      };
    }

    case 'UPDATE_EXPENSE': {
      const { expenseId, updates } = action.payload;
      return {
        ...state,
        expenses: (state.expenses || []).map((e) =>
          e.id === expenseId ? { ...e, ...updates } : e
        ),
      };
    }

    case 'DELETE_EXPENSE': {
      return {
        ...state,
        expenses: (state.expenses || []).filter((e) => e.id !== action.payload),
      };
    }

    case 'TOGGLE_MILESTONE_CHECK': {
      const { milestoneId, checkIndex } = action.payload;
      const checklist = { ...(state.milestoneChecklist || {}) };
      if (checklist[milestoneId]) {
        checklist[milestoneId] = checklist[milestoneId].map((item, i) =>
          i === checkIndex ? { ...item, checked: !item.checked } : item
        );
      }
      return { ...state, milestoneChecklist: checklist };
    }

    case 'UPDATE_TEAM_MEMBER': {
      const { memberName, updates } = action.payload;
      return {
        ...state,
        team: (state.team || []).map((m) =>
          m.name === memberName ? { ...m, ...updates } : m
        ),
      };
    }

    case 'UPDATE_PROJECT_INFO': {
      return {
        ...state,
        projectInfo: { ...state.projectInfo, ...action.payload },
      };
    }

    default:
      return state;
  }
}

export const TrackerProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, null, () => {
    return loadFromLocal() || seedData;
  });

  const skipNextFirestoreSync = useRef(false);

  /* Persist to localStorage on every change */
  useEffect(() => {
    if (data) {
      saveToLocal(data);

      /* Also push to Firestore if configured */
      if (isConfigured && !skipNextFirestoreSync.current) {
        saveData(data);
      }
      skipNextFirestoreSync.current = false;
    }
  }, [data]);

  /* Subscribe to Firestore real-time updates */
  useEffect(() => {
    if (!isConfigured) return;

    let initialLoad = true;

    /* Try loading from Firestore on first mount */
    loadData().then((remoteData) => {
      if (remoteData && remoteData.tasks) {
        skipNextFirestoreSync.current = true;
        dispatch({ type: 'SET_DATA', payload: remoteData });
      } else {
        /* First time: push seed data to Firestore */
        saveData(data);
      }
      initialLoad = false;
    });

    /* Listen for real-time changes from other users */
    const unsub = subscribeToData((remoteData) => {
      if (!initialLoad && remoteData && remoteData.tasks) {
        skipNextFirestoreSync.current = true;
        dispatch({ type: 'SET_DATA', payload: remoteData });
      }
    });

    return unsub;
  }, []);

  /* ─── Action helpers ─── */
  const updateTask = (taskId, updates) =>
    dispatch({ type: 'UPDATE_TASK', payload: { taskId, updates } });

  const updateTaskStatus = (taskId, newStatus) =>
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { taskId, newStatus } });

  const addTask = (task) => dispatch({ type: 'ADD_TASK', payload: task });

  const deleteTask = (taskId) =>
    dispatch({ type: 'DELETE_TASK', payload: taskId });

  const addExpense = (expense) =>
    dispatch({ type: 'ADD_EXPENSE', payload: expense });

  const updateExpense = (expenseId, updates) =>
    dispatch({ type: 'UPDATE_EXPENSE', payload: { expenseId, updates } });

  const deleteExpense = (expenseId) =>
    dispatch({ type: 'DELETE_EXPENSE', payload: expenseId });

  const toggleMilestoneCheck = (milestoneId, checkIndex) =>
    dispatch({
      type: 'TOGGLE_MILESTONE_CHECK',
      payload: { milestoneId, checkIndex },
    });

  const updateTeamMember = (memberName, updates) =>
    dispatch({
      type: 'UPDATE_TEAM_MEMBER',
      payload: { memberName, updates },
    });

  const updateProjectInfo = (updates) =>
    dispatch({ type: 'UPDATE_PROJECT_INFO', payload: updates });

  const importData = (jsonData) =>
    dispatch({ type: 'SET_DATA', payload: jsonData });

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wellbook_pm_export_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const resetData = () =>
    dispatch({ type: 'SET_DATA', payload: seedData });

  const value = {
    data,
    updateTask,
    updateTaskStatus,
    addTask,
    deleteTask,
    addExpense,
    updateExpense,
    deleteExpense,
    toggleMilestoneCheck,
    updateTeamMember,
    updateProjectInfo,
    importData,
    exportData,
    resetData,
  };

  return (
    <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
  );
};
