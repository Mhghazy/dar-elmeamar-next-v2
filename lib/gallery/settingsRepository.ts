/**
 * Settings Repository
 * Manages global site configuration.
 */

import { supabase } from '@/lib/supabase/client';

export interface SiteSettings {
  site_title: string;
  contact_email: string;
  phone: string;
  facebook_url?: string;
  instagram_url?: string;
  maintenance_mode: boolean;
}

const IS_SUPABASE_ENABLED = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-project-url';

const MOCK_SETTINGS_KEY = 'mock_site_settings';

const defaultSettings: SiteSettings = {
  site_title: 'Dar El Meamar',
  contact_email: 'info@darelmeamar.com',
  phone: '+201000000000',
  facebook_url: 'https://facebook.com/darelmeamar',
  instagram_url: 'https://instagram.com/darelmeamar',
  maintenance_mode: false
};

function getMockSettings(): SiteSettings {
  if (typeof window === 'undefined') return defaultSettings;
  const stored = localStorage.getItem(MOCK_SETTINGS_KEY);
  return stored ? JSON.parse(stored) : defaultSettings;
}

function saveMockSettings(settings: SiteSettings) {
  localStorage.setItem(MOCK_SETTINGS_KEY, JSON.stringify(settings));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase settings fetch failed:', err);
      return getMockSettings();
    }
  }
  return getMockSettings();
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<boolean> {
  if (IS_SUPABASE_ENABLED) {
    try {
      const { error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', 1); // Assuming a single row with ID 1
      
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase settings update failed:', err);
      return false;
    }
  }

  const current = getMockSettings();
  const updated = { ...current, ...settings };
  saveMockSettings(updated);
  return true;
}
