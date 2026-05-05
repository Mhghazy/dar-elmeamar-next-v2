/**
 * User Repository
 * Manages administrative users.
 */

import { supabase } from '@/lib/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  username?: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

const IS_SUPABASE_ENABLED = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

const MOCK_USERS_KEY = 'mock_admin_users';

function getMockUsers(): AdminUser[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(MOCK_USERS_KEY);
  if (stored) return JSON.parse(stored);
  
  const defaultUsers: AdminUser[] = [
    { id: '1', email: 'admin@demo.com', role: 'superadmin', created_at: new Date().toISOString() }
  ];
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function saveMockUsers(users: AdminUser[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

const MOCK_AUTH_KEY = 'mock_auth_store';

function saveMockAuthData(email: string, pass: string) {
  if (typeof window === 'undefined') return;
  const stored = localStorage.getItem(MOCK_AUTH_KEY);
  const data = stored ? JSON.parse(stored) : {};
  data[email.toLowerCase()] = pass;
  localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(data));
}

export function checkMockAuth(email: string, pass: string): boolean {
  if (typeof window === 'undefined') return false;
  
  // Default hardcoded admin
  if (email.toLowerCase() === 'admin' && pass === 'admin') return true;
  if (email.toLowerCase() === 'admin@demo.com' && pass === 'admin') return true;

  const stored = localStorage.getItem(MOCK_AUTH_KEY);
  if (!stored) return false;
  const data = JSON.parse(stored);
  return data[email.toLowerCase()] === pass;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Supabase users fetch failed:', err);
      return getMockUsers();
    }
  }
  return getMockUsers();
}

export async function createAdminUser(email: string, username?: string, password?: string): Promise<AdminUser | null> {
  if (IS_SUPABASE_ENABLED) {
    try {
      // In Supabase, we upsert to profiles. Password must be handled via Auth API.
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ email, username, role: 'admin' }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase user creation failed:', err);
      return null;
    }
  }

  const current = getMockUsers();
  const newUser: AdminUser = {
    id: Math.random().toString(),
    email,
    username,
    role: 'admin',
    created_at: new Date().toISOString()
  };
  
  // In mock mode, we store the password in a dedicated mock auth store.
  if (password) {
    saveMockAuthData(email, password);
  }

  const updated = [newUser, ...current];
  saveMockUsers(updated);
  return newUser;
}

export async function deleteAdminUser(id: string): Promise<boolean> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase user deletion failed:', err);
      return false;
    }
  }

  const current = getMockUsers();
  const filtered = current.filter(u => u.id !== id);
  saveMockUsers(filtered);
  return true;
}

export async function updateAdminProfile(id: string, updates: Partial<AdminUser>): Promise<boolean> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase profile update failed:', err);
      return false;
    }
  }

  const current = getMockUsers();
  const updated = current.map((u: AdminUser) => u.id === id ? { ...u, ...updates } : u);
  saveMockUsers(updated);
  return true;
}

export async function updateAdminPassword(password: string): Promise<boolean> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase password update failed:', err);
      return false;
    }
  }
  // Mock mode: password change is simulated
  console.log('Mock password updated to:', password);
  return true;
}
