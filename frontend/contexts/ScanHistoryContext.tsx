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

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  total_scans: number;
  average_eco_score: number;
  rank: number;
}

interface ScanHistoryContextType {
  scans: ScanHistory[];
  loading: boolean;
  dashboardData: DashboardData | null;
  dashboardLoading: boolean;
  leaderboardData: LeaderboardEntry[];
  leaderboardLoading: boolean;
  addScan: (scanData: Omit<NewScanHistory, 'user_id'>) => Promise<{ error: any }>;
  getScansByDateRange: (startDate: string, endDate: string) => ScanHistory[];
  getScansByPeriod: (period: 'daily' | 'weekly' | 'monthly') => ScanHistory[];
  refreshScans: () => Promise<void>;
  refreshDashboardData: () => Promise<void>;
  getDashboardData: () => DashboardData | null;
  fetchLeaderboard: () => Promise<void>;
}

const ScanHistoryContext = createContext<ScanHistoryContextType | undefined>(undefined);

export function ScanHistoryProvider({ children }: { children: React.ReactNode }) {
  const [scans, setScans] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
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
    if (!user) {
      console.error('addScan: No user logged in');
      return { error: new Error('No user logged in') };
    }

    console.log('addScan: Attempting to save scan data:', { ...scanData, user_id: user.id });
    console.log('addScan: Current user:', user);
    console.log('addScan: User ID:', user.id);

    try {
      const insertData = {
        ...scanData,
        user_id: user.id,
      };
      console.log('addScan: Insert data:', insertData);
      
      const { data, error } = await supabase
        .from('scan_history')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('addScan: Supabase error:', error);
        console.error('addScan: Error details:', JSON.stringify(error, null, 2));
        console.error('addScan: Error message:', error.message);
        console.error('addScan: Error code:', error.code);
        return { error };
      }

      console.log('addScan: Successfully saved scan:', data);

      // Add to local state and update dashboard data cache immediately for fast UI updates
      setScans(prev => {
        const updatedScans = [data, ...prev];
        const newDashboardData = createDashboardData(updatedScans);
        setDashboardData(newDashboardData);
        saveDashboardDataToCache(newDashboardData); // Don't await to avoid blocking
        return updatedScans;
      });
      
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

  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true);
    try {
      console.log('Fetching leaderboard data from all users...');
      
      // Fetch ALL scan history from the scan_history table
      const { data: scanData, error: scanError } = await supabase
        .from('scan_history')
        .select(`
          user_id,
          sustainability_score
        `)
        .order('created_at', { ascending: false }); // Get all scans, not just recent ones

      if (scanError) {
        console.error('Error fetching scan data:', scanError);
        return;
      }

      if (!scanData || scanData.length === 0) {
        console.log('No scan data found in scan_history table');
        setLeaderboardData([]);
        return;
      }

      console.log(`Found ${scanData.length} total scans from all users`);

      // Get unique user IDs from scan data
      const uniqueUserIds = [...new Set(scanData.map((scan: any) => scan.user_id))];
      console.log(`Found ${uniqueUserIds.length} unique users`);

      // Fetch user profiles for all users who have scans
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', uniqueUserIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return;
      }

      // Create a map of user_id to user_name
      const userNamesMap = new Map<string, string>();
      profilesData?.forEach((profile: any) => {
        userNamesMap.set(profile.id, profile.full_name || 'Anonymous User');
      });

      // Group by user and calculate averages
      const userStats = new Map<string, { 
        user_name: string; 
        scores: number[]; 
        total_scans: number 
      }>();

      scanData.forEach((scan: any) => {
        const userId = scan.user_id;
        const score = parseFloat(scan.sustainability_score);
        const userName = userNamesMap.get(userId) || 'Anonymous User';

        if (!userStats.has(userId)) {
          userStats.set(userId, {
            user_name: userName,
            scores: [],
            total_scans: 0
          });
        }

        const userStat = userStats.get(userId)!;
        userStat.scores.push(score);
        userStat.total_scans++;
      });

      console.log(`Found ${userStats.size} unique users with scan data`);

      // Calculate averages and create leaderboard entries
      const leaderboardEntries: LeaderboardEntry[] = Array.from(userStats.entries())
        .map(([userId, stats]) => ({
          user_id: userId,
          user_name: stats.user_name,
          total_scans: stats.total_scans,
          average_eco_score: stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length,
          rank: 0 // Will be set after sorting
        }))
        .sort((a, b) => b.average_eco_score - a.average_eco_score) // Sort by highest average score first
        .slice(0, 10) // Get TOP 10 users only
        .map((entry, index) => ({
          ...entry,
          rank: index + 1
        }));

      console.log('Top 10 leaderboard data:', leaderboardEntries);
      setLeaderboardData(leaderboardEntries);

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const value = {
    scans,
    loading,
    dashboardData,
    dashboardLoading,
    leaderboardData,
    leaderboardLoading,
    addScan,
    getScansByDateRange,
    getScansByPeriod,
    refreshScans,
    refreshDashboardData,
    getDashboardData,
    fetchLeaderboard,
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
