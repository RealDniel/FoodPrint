# Mona Sans Font Setup for FoodPrint

## Download Mona Sans Font

1. **Visit GitHub Fonts**: Go to [https://github.com/github/mona-sans](https://github.com/github/mona-sans)
2. **Download the font files**: Download the following font files:
   - `MonaSans-Regular.ttf`
   - `MonaSans-Medium.ttf`
   - `MonaSans-SemiBold.ttf`
   - `MonaSans-Bold.ttf`

## Install Font Files

1. **Create fonts directory** (already created): `assets/fonts/`
2. **Copy font files**: Place the downloaded `.ttf` files in the `assets/fonts/` directory
3. **Rename files** (optional but recommended for consistency):
   - `MonaSans-Regular.ttf` → `Mona-Sans-Regular.ttf`
   - `MonaSans-Medium.ttf` → `Mona-Sans-Medium.ttf`
   - `MonaSans-SemiBold.ttf` → `Mona-Sans-SemiBold.ttf`
   - `MonaSans-Bold.ttf` → `Mona-Sans-Bold.ttf`

## Update Font Loading

After adding the font files, you'll need to load them in your app. Update your `app/_layout.tsx`:

```typescript
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Mona-Sans-Regular': require('@/assets/fonts/Mona-Sans-Regular.ttf'),
    'Mona-Sans-Medium': require('@/assets/fonts/Mona-Sans-Medium.ttf'),
    'Mona-Sans-SemiBold': require('@/assets/fonts/Mona-Sans-SemiBold.ttf'),
    'Mona-Sans-Bold': require('@/assets/fonts/Mona-Sans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  // ... rest of your component
}
```

## Usage

The theme has been updated with your FoodPrint color palette and Mona Sans font configuration. You can now use:

### Colors
```typescript
import { Colors, BrandColors } from '@/constants/theme';

// Use brand colors
const primaryColor = BrandColors.deepForest.primary; // #1B4332
const accentColor = BrandColors.brightOrange; // #F77F00

// Use theme colors (adapts to light/dark mode)
const textColor = Colors.light.text; // or Colors.dark.text
```

### Custom Components
```typescript
import { FoodPrintText, FoodPrintButton } from '@/components/foodprint-text';

// Text component with variants
<FoodPrintText variant="title" color="primary">
  Welcome to FoodPrint
</FoodPrintText>

// Button component with variants
<FoodPrintButton variant="accent" size="lg">
  Scan Food
</FoodPrintButton>
```

## Color Palette

- **Deep Forest Green**: `#1B4332` → `#2D6A4F` (Header and primary navigation)
- **Fresh/Mint Green**: `#52B788` → `#74C69D` (Secondary buttons and stat cards)
- **Bright Orange**: `#F77F00` (Call-to-action scan button)
- **Soft Green Gradient**: `#E8F5E8` → `#D4F1D4` → `#C1EDC1` (Background)

## Next Steps

1. Download and add the Mona Sans font files
2. Update your app layout to load the fonts
3. Start using the new `FoodPrintText` and `FoodPrintButton` components
4. Customize the theme further as needed for your specific screens
