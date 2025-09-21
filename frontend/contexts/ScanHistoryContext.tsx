import { supabase } from '@/supabase/client';
import { NewScanHistory, ScanHistory } from '@/supabase/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface DashboardData {
  totalScans: number;
  averageEcoScore: number;
  recentScans: ScanHistory[];
}

interface ScanHistoryContextType {
  scans: ScanHistory[];
  loading: boolean;
  dashboardData: DashboardData | null;
  dashboardLoading: boolean;
  addScan: (scanData: Omit<NewScanHistory, 'user_id'>) => Promise<{ error: any }>;
  getScansByDateRange: (startDate: string, endDate: string) => ScanHistory[];
  getScansByPeriod: (period: 'daily' | 'weekly' | 'monthly') => ScanHistory[];
  refreshScans: () => Promise<void>;
  refreshDashboardData: () => Promise<void>;
  getDashboardData: () => DashboardData | null;
}

const ScanHistoryContext = createContext<ScanHistoryContextType | undefined>(undefined);

export function ScanHistoryProvider({ children }: { children: React.ReactNode }) {
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchScans();
      loadDashboardDataFromCache();
      refreshDashboardData();
    } else {
      setScans([]);
      setDashboardData(null);
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
      
      // Update dashboard data cache immediately for fast UI updates
      const updatedScans = [data, ...scans];
      const newDashboardData = createDashboardData(updatedScans);
      setDashboardData(newDashboardData);
      await saveDashboardDataToCache(newDashboardData);
      
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

  // Dashboard data functions
  const calculateAverageEcoScore = (scans: ScanHistory[]): number => {
    if (scans.length === 0) return 100; // Default to 100% for empty state
    const total = scans.reduce((sum, scan) => sum + scan.sustainability_score, 0);
    return Math.round(total / scans.length);
  };

  const getRecentScans = (scans: ScanHistory[], limit: number = 3): ScanHistory[] => {
    return scans
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  };

  const createDashboardData = (scans: ScanHistory[]): DashboardData => {
    return {
      totalScans: scans.length,
      averageEcoScore: calculateAverageEcoScore(scans),
      recentScans: getRecentScans(scans, 3),
    };
  };

  const loadDashboardDataFromCache = async () => {
    if (!user) return;
    
    try {
      const cachedData = await AsyncStorage.getItem(`dashboard_data_${user.id}`);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setDashboardData(parsedData);
      }
    } catch (error) {
      console.log('Error loading dashboard data from cache:', error);
    }
  };

  const saveDashboardDataToCache = async (data: DashboardData) => {
    if (!user) return;
    
    try {
      await AsyncStorage.setItem(`dashboard_data_${user.id}`, JSON.stringify(data));
    } catch (error) {
      console.log('Error saving dashboard data to cache:', error);
    }
  };

  const refreshDashboardData = async () => {
    if (!user) return;

    setDashboardLoading(true);
    try {
      // Fetch fresh data from database
      const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching dashboard data:', error);
        return;
      }

      const freshScans = data || [];
      const dashboardData = createDashboardData(freshScans);
      
      // Update state and cache
      setDashboardData(dashboardData);
      await saveDashboardDataToCache(dashboardData);
      
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
    } finally {
      setDashboardLoading(false);
    }
  };

  const getDashboardData = (): DashboardData | null => {
    return dashboardData;
  };

  const value = {
    scans,
    loading,
    dashboardData,
    dashboardLoading,
    addScan,
    getScansByDateRange,
    getScansByPeriod,
    refreshScans,
    refreshDashboardData,
    getDashboardData,
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
