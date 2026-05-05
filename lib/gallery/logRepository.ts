/**
 * Log Repository
 * Tracks administrative actions across the platform.
 */

import { supabase } from '@/lib/supabase/client';

export interface ActivityLog {
  id: string;
  user_email: string;
  action: string;
  target: string;
  created_at: string;
  type: 'create' | 'update' | 'delete' | 'auth' | 'view' | 'interaction';
}

const IS_SUPABASE_ENABLED = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

const MOCK_LOGS_KEY = 'mock_activity_logs';

function getMockLogs(): ActivityLog[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(MOCK_LOGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMockLogs(logs: ActivityLog[]) {
  localStorage.setItem(MOCK_LOGS_KEY, JSON.stringify(logs.slice(0, 100))); // Keep last 100 logs
}

export async function getLogs(): Promise<ActivityLog[]> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Supabase logs fetch failed:', err);
      return getMockLogs();
    }
  }
  return getMockLogs();
}

export async function createLog(log: Omit<ActivityLog, 'id' | 'created_at'>): Promise<void> {
  if (IS_SUPABASE_ENABLED) {
    try {
      await supabase.from('activity_logs').insert([log]);
    } catch (err) {
      console.error('Supabase log creation failed:', err);
    }
    return;
  }

  const current = getMockLogs();
  const newLog: ActivityLog = {
    ...log,
    id: Math.random().toString(),
    created_at: new Date().toISOString()
  };
  saveMockLogs([newLog, ...current]);
}
