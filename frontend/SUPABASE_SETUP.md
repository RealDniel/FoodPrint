# Supabase Setup Guide for FoodPrint

## 🚀 Quick Setup Steps

### 1. Create Your .env File
Create a `.env` file in the frontend directory with your Supabase credentials:

```bash
# Copy from env.example
cp env.example .env
```

Then edit `.env` with your actual Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Set Up Database Schema
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to create the tables and policies

### 3. Configure Authentication
1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Enable **Email** authentication
3. Configure your site URL (for development: `exp://localhost:19000`)

## 📊 Database Schema

### Tables Created:
- **`profiles`** - User profile information
- **`scan_history`** - User's food scan history with environmental data

### Features:
- ✅ Row Level Security (RLS) enabled
- ✅ Automatic profile creation on signup
- ✅ User can only access their own data
- ✅ Optimized indexes for performance

## 🔐 Authentication Flow

### User Registration:
1. User signs up with email/password + full name
2. Supabase creates auth user
3. Trigger automatically creates profile
4. User receives email verification

### User Login:
1. User enters email/password
2. Supabase authenticates
3. App fetches user profile
4. User can access their scan history

## 📱 App Integration

### Context Providers:
- **`AuthProvider`** - Manages authentication state
- **`ScanHistoryProvider`** - Manages scan history data

### Available Hooks:
- **`useAuth()`** - Access user, profile, sign in/out functions
- **`useScanHistory()`** - Access scan history, add scans, filter by date

### Screens Created:
- **`/login`** - Sign in screen
- **`/signup`** - Registration screen
- **Updated landing page** - Now has Sign In/Create Account buttons

## 🧪 Testing Your Setup

### 1. Test Authentication:
1. Run your app: `npm start`
2. Go to landing page
3. Tap "Create Account"
4. Fill in the form and submit
5. Check your email for verification
6. Try signing in

### 2. Test Scan History:
1. Sign in to your app
2. Go to scanning screen
3. Tap "Scan Food" (simulated)
4. In the modal, tap "Add To List"
5. Check Supabase dashboard → Table Editor → `scan_history`

## 🔧 Environment Variables

Make sure your `.env` file has:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** 
- Use `EXPO_PUBLIC_` prefix for client-side variables
- Never commit your `.env` file to git
- The anon key is safe to use in client-side code

## 🚨 Troubleshooting

### Common Issues:

**1. "Invalid API key" error:**
- Check your `.env` file has correct values
- Make sure you're using the anon key, not the service role key

**2. "Row Level Security" errors:**
- Make sure you ran the schema.sql file
- Check that RLS policies are created

**3. "User not found" errors:**
- Make sure the trigger function is created
- Check that profiles are being created on signup

**4. Network errors:**
- Check your Supabase URL is correct
- Make sure your project is not paused

## 📈 Next Steps

Once setup is complete, you can:
1. **Add real camera integration** to the scanning screen
2. **Connect to your Flask backend** for food recognition
3. **Add more user profile fields** (avatar, preferences)
4. **Implement push notifications** for sustainability tips
5. **Add social features** (leaderboards, sharing)

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Native Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Your FoodPrint app now has full authentication and data persistence! 🌱**
