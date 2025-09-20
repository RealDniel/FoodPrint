# FoodPrint 🌱

An eco-friendly food tracking application that helps users track their food's environmental impact and make sustainable choices.

## 🏗️ Project Structure

```
FoodPrint-1/
├── frontend/          # React Native/Expo app
│   ├── app/           # App screens and navigation
│   ├── components/    # Reusable UI components
│   ├── constants/     # Theme, colors, and configuration
│   ├── hooks/         # Custom React hooks
│   ├── assets/        # Images, fonts, and static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Flask API server
│   ├── app/           # Flask application
│   │   ├── models/    # Database models
│   │   ├── routes/    # API endpoints
│   │   └── utils/     # Utility functions
│   ├── tests/         # Backend tests
│   └── requirements.txt # Backend dependencies
├── docs/              # Documentation
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Expo CLI (`npm install -g @expo/cli`)

### Frontend Setup (React Native/Expo)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on specific platforms:**
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

### Backend Setup (Flask API)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize database:**
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. **Start the API server:**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

## 🎨 Design System

### Color Palette
- **Deep Forest Green**: `#1B4332` → `#2D6A4F` (Headers, primary navigation)
- **Fresh/Mint Green**: `#52B788` → `#74C69D` (Secondary buttons, stat cards)
- **Bright Orange**: `#F77F00` (Call-to-action scan button)
- **Soft Green Gradient**: `#E8F5E8` → `#D4F1D4` → `#C1EDC1` (Backgrounds)

### Typography
- **Primary Font**: Mona Sans
- **Font Weights**: light (300), regular (400), medium (500), semiBold (600), bold (700), extraBold (800)

## 🛠️ Tech Stack

### Frontend
- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Custom theme system** with light/dark mode
- **Mona Sans** font family

### Backend
- **Flask** web framework
- **SQLAlchemy** for database ORM
- **Flask-Migrate** for database migrations
- **Flask-CORS** for cross-origin requests
- **Marshmallow** for serialization

## 📱 Features

### Current Features
- ✅ Custom theme system with brand colors
- ✅ Light/dark mode support
- ✅ Typography system with Mona Sans
- ✅ Custom UI components (FoodPrintText, FoodPrintButton)
- ✅ File-based routing with Expo Router
- ✅ Flask API structure with models and routes

### Planned Features
- 🔄 Food scanning with camera
- 📊 Environmental impact calculation
- 👤 User authentication and profiles
- 📈 Sustainability metrics and tracking
- 🍽️ Eco-friendly recipe suggestions
- 📱 Push notifications for sustainability tips

## 🔧 Development

### Frontend Development
- Use `FoodPrintText` and `FoodPrintButton` components
- Follow the color palette in `constants/theme.ts`
- Support both light and dark modes
- Use TypeScript for all components

### Backend Development
- Follow RESTful API conventions
- Use SQLAlchemy models for database operations
- Implement proper error handling
- Add API documentation

### Code Quality
- Use TypeScript for frontend
- Follow PEP 8 for Python backend
- Write tests for both frontend and backend
- Use proper git commit messages

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Health Check
```
GET /health
```

#### Food API
```
GET    /api/food/           # Get all foods
POST   /api/food/scan       # Scan food item
POST   /api/food/impact     # Calculate impact
GET    /api/food/recipes    # Get eco-friendly recipes
```

#### User API
```
GET    /api/users/          # Get users (admin)
GET    /api/users/profile   # Get user profile
PUT    /api/users/profile   # Update user profile
GET    /api/users/stats     # Get user statistics
POST   /api/users/register  # Register new user
POST   /api/users/login     # User login
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌱 About FoodPrint

FoodPrint is designed to help users make more sustainable food choices by providing:
- Real-time environmental impact tracking
- Educational content about sustainable eating
- Personalized recommendations for eco-friendly alternatives
- Community features for sharing sustainable practices

---

**Made with 🌱 for a sustainable future**