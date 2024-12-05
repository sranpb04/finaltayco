import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
const supabaseUrl = 'https://lyptuladwzfxpqzpkmut.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cHR1bGFkd3pmeHBxenBrbXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1Mzk2MzEsImV4cCI6MjA0NDExNTYzMX0.rh7rQFV1SoHRQN2EgiEiybz6ftdo35EMtsiTn0T97K0';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});