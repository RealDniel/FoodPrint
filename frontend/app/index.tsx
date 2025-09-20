import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to landing page on app start
  return <Redirect href="/landing" />;
}
