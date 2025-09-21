import { supabase } from '@/supabase/client';
import { NewScanHistory, ScanHistory } from '@/supabase/types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface ScanHistoryContextType {
  scans: ScanHistory[];
  loading: boolean;
  addScan: (scanData: Omit<NewScanHistory, 'user_id'>) => Promise<{ error: any }>;
  getScansByDateRange: (startDate: string, endDate: string) => ScanHistory[];
  getScansByPeriod: (period: 'daily' | 'weekly' | 'monthly') => ScanHistory[];
  refreshScans: () => Promise<void>;
}

const ScanHistoryContext = createContext<ScanHistoryContextType | undefined>(undefined);

export function ScanHistoryProvider({ children }: { children: React.ReactNode }) {
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchScans();
    } else {
      setScans([]);
    }
  }, [user]);

  const fetchScans = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .eq('user_id', user.id)
        .order('scan_date', { ascending: false });

      if (error) {
        console.error('Error fetching scans:', error);
      } else {
        setScans(data || []);
      }
    } catch (error) {
      console.error('Error fetching scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const addScan = async (scanData: Omit<NewScanHistory, 'user_id'>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('scan_history')
        .insert({
          ...scanData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) {
        return { error };
      }

      // Add to local state
      setScans(prev => [data, ...prev]);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const getScansByDateRange = (startDate: string, endDate: string) => {
    return scans.filter(scan => 
      scan.scan_date >= startDate && scan.scan_date <= endDate
    );
  };

  const getScansByPeriod = (period: 'daily' | 'weekly' | 'monthly') => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    return scans.filter(scan => 
      new Date(scan.scan_date) >= startDate
    );
  };

  const refreshScans = async () => {
    await fetchScans();
  };

  const value = {
    scans,
    loading,
    addScan,
    getScansByDateRange,
    getScansByPeriod,
    refreshScans,
  };

  return (
    <ScanHistoryContext.Provider value={value}>
      {children}
    </ScanHistoryContext.Provider>
  );
}

export function useScanHistory() {
  const context = useContext(ScanHistoryContext);
  if (context === undefined) {
    throw new Error('useScanHistory must be used within a ScanHistoryProvider');
  }
  return context;
}
