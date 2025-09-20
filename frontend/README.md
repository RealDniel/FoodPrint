# FoodPrint Frontend 📱

React Native/Expo frontend for the FoodPrint eco-friendly food tracking application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on specific platforms:**
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

## 🎨 Design System

### Color Palette
- **Deep Forest Green**: `#1B4332` → `#2D6A4F` (Headers, primary navigation)
- **Fresh/Mint Green**: `#52B788` → `#74C69D` (Secondary buttons, stat cards)
- **Bright Orange**: `#F77F00` (Call-to-action scan button)
- **Soft Green Gradient**: `#E8F5E8` → `#D4F1D4` → `#C1EDC1` (Backgrounds)

### Typography
- **Primary Font**: Mona Sans
- **Font Weights**: light (300), regular (400), medium (500), semiBold (600), bold (700), extraBold (800)

### Custom Components

#### FoodPrintText
```typescript
import { FoodPrintText } from '@/components/foodprint-text';

<FoodPrintText variant="title" color="primary">
  Welcome to FoodPrint
</FoodPrintText>
```

**Props:**
- `variant`: 'title' | 'subtitle' | 'body' | 'caption' | 'button'
- `weight`: 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold'
- `color`: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error'
- `size`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

#### FoodPrintButton
```typescript
import { FoodPrintButton } from '@/components/foodprint-button';

<FoodPrintButton variant="accent" size="lg">
  📸 Scan Food
</FoodPrintButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'

## 📁 Project Structure

```
frontend/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── explore.tsx    # Explore screen
│   │   └── _layout.tsx    # Tab layout
│   ├── modal.tsx          # Modal screen
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── foodprint-text.tsx # Custom text component
│   ├── foodprint-button.tsx # Custom button component
│   ├── foodprint-demo.tsx # Demo component
│   └── ui/               # UI-specific components
├── constants/            # Theme and configuration
│   └── theme.ts          # Colors, fonts, and theme
├── hooks/               # Custom React hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
├── assets/              # Images, fonts, and static assets
│   ├── images/          # App images and icons
│   └── fonts/           # Mona Sans font files
└── package.json         # Dependencies and scripts
```

## 🎯 Development Guidelines

### Component Development
1. **Use custom components** - FoodPrintText, FoodPrintButton
2. **Follow the theme system** - Import colors from `@/constants/theme`
3. **Support light/dark mode** - Use `useColorScheme` hook
4. **Use TypeScript** - Define proper interfaces for props

### Styling
1. **Use StyleSheet.create()** for all styles
2. **Access colors through theme**: `const colors = Colors[colorScheme ?? 'light']`
3. **Use semantic color names**: `colors.primary`, `colors.secondary`, `colors.accent`
4. **Support dark mode**: Always consider both light and dark color schemes

### Navigation
- **Tab screens**: Add to `app/(tabs)/` directory
- **Stack screens**: Add to `app/` directory
- **Modal screens**: Add to `app/` directory
- **Update tab layout**: Modify `app/(tabs)/_layout.tsx` for new tabs

## 🔧 Available Scripts

```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web browser
npm run lint       # Run ESLint
npm run reset-project # Reset to clean project state
```

## 📱 Platform Support

- ✅ **iOS** - Native iOS app
- ✅ **Android** - Native Android app
- ✅ **Web** - Progressive Web App
- ✅ **Expo Go** - Development and testing

## 🌱 FoodPrint Features

### Current Features
- ✅ Custom theme system with brand colors
- ✅ Light/dark mode support
- ✅ Typography system with Mona Sans
- ✅ Custom UI components
- ✅ File-based routing with Expo Router
- ✅ Tab-based navigation

### Planned Features
- 🔄 Food scanning with camera
- 📊 Environmental impact dashboard
- 👤 User authentication
- 📈 Sustainability metrics
- 🍽️ Recipe suggestions
- 📱 Push notifications

## 🔗 Backend Integration

The frontend connects to the Flask backend API:

```typescript
// Example API call
const API_BASE_URL = 'http://localhost:5000';

const scanFood = async (imageData: string) => {
  const response = await fetch(`${API_BASE_URL}/api/food/scan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageData }),
  });
  return response.json();
};
```

## 🎨 Theme Usage

### Using Colors
```typescript
import { Colors, BrandColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MyComponent = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.primary }}>
        Hello FoodPrint!
      </Text>
    </View>
  );
};
```

### Using Fonts
```typescript
import { Fonts, FontWeights, FontSizes } from '@/constants/theme';

const textStyle = {
  fontFamily: Fonts.sans,
  fontWeight: FontWeights.bold,
  fontSize: FontSizes.xl,
};
```

## 🚀 Deployment

### Expo Build
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform all
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
- [Mona Sans Font](https://github.com/github/mona-sans)

---

**Built with ❤️ for a sustainable future**
