# FoodPrint 🌱

[slides for demo](https://docs.google.com/presentation/d/1mpJOxGHaqtE-2SGk5hCm3ixh3U18CxwrLIC75O5eTfw/edit?slide=id.g34905525097_0_3052#slide=id.g34905525097_0_3052)

**FoodPrint** is an eco-friendly food tracking application that helps users understand how their food choices impact the environment. Unlike traditional carbon footprint apps that focus on transportation, FoodPrint educates users about the hidden environmental costs of their daily meals.

## 🎯 **The Problem We're Solving**

Most people are aware that cars and transportation contribute to carbon emissions, but **few realize that food production accounts for 26% of global greenhouse gas emissions**. Our app bridges this knowledge gap by:

- 📱 **Instant food recognition** using computer vision
- 📊 **Real-time environmental impact scoring** (0-100 scale)
- 🤖 **AI-powered educational insights** about food sustainability
- 🏆 **Gamified leaderboards** to encourage sustainable choices

## ✨ **Key Features**

### 🔍 **Smart Food Scanning**
- **YOLO Computer Vision Model** for instant food recognition
- Camera-based scanning with real-time detection
- Upload images for analysis
- Support for 36+ common food items

### 📊 **Environmental Impact Scoring**
Our proprietary **Eco Score Algorithm** calculates sustainability scores based on:
- **Carbon Footprint**: 0.3-60 kg CO₂e per kg range
- **Water Usage**: Liters consumed in production
- **Sustainability Score**: 0-100 scale (higher = more eco-friendly)

**Scoring Formula:**
```
Score = 100 - ((Food's Carbon Footprint - 0.3) / (60 - 0.3)) × 100
```

*Example: Banana (0.7 kg CO₂e/kg) = 99.33 Eco Score* 🍌

### 🎓 **AI-Powered Education**
- **LLM-generated insights** about food environmental impact
- **Educational snippets** explaining sustainability factors
- **Alternative suggestions** for more eco-friendly choices
- **Personalized tips** based on scanning history

### 🏆 **Gamification & Social**
- **Real-time leaderboards** with top 10 eco champions
- **Personal dashboard** with sustainability metrics
- **Achievement system** for consistent eco-friendly choices
- **Community sharing** of sustainable food discoveries

### 🎨 **Beautiful User Experience**
- **24 animated floating food emojis** for engaging backgrounds
- **Custom design system** with eco-friendly color palette
- **Smooth animations** and haptic feedback
- **Dark/light mode** support

## 🛠️ **Tech Stack**

### Frontend (React Native/Expo)
- **React Native** with Expo for cross-platform development
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Supabase** for authentication and real-time data
- **React Native SVG** for custom icons
- **Expo Linear Gradient** for beautiful UI effects
- **AsyncStorage** for local caching

### Backend (Flask + AI)
- **Flask** web framework
- **YOLO (You Only Look Once)** computer vision model
- **OpenCV** for image processing
- **PyTorch** for deep learning inference
- **Ultralytics** for model optimization
- **Cerebras Cloud SDK** for enhanced AI capabilities

### Database & Authentication
- **Supabase** for user authentication and data storage
- **PostgreSQL** with Row Level Security (RLS)
- **Real-time subscriptions** for live updates

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Expo CLI (`npm install -g @expo/cli`)
- Supabase account

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/FoodPrint-1.git
cd FoodPrint-1/frontend

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Add your Supabase credentials to .env

# Start the development server
npm start
```

### Backend Setup
```bash
cd ../backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Configure your environment

# Start the Flask server
python run.py
```

### Database Setup
1. Create a Supabase project
2. Run the SQL schema from `frontend/supabase/schema.sql`
3. Configure authentication settings
4. Add your credentials to `frontend/.env`

## 📱 **App Screenshots**

*Screenshots coming soon!* 📸

## 🧠 **Computer Vision Integration**

### YOLO Model Implementation
Our app integrates a **YOLO (You Only Look Once)** object detection model to identify food items from camera images:

```python
# Backend food detection endpoint
@app.route('/detect-base64', methods=['POST'])
def detect_food():
    # Process base64 image
    # Run YOLO inference
    # Return food classification + environmental data
```

### Supported Food Categories
- **Fruits**: Apple, Banana, Orange, Grapes, etc.
- **Vegetables**: Carrot, Broccoli, Tomato, Lettuce, etc.
- **Proteins**: Chicken, Beef, Fish, Eggs, etc.
- **Grains**: Rice, Bread, Pasta, etc.
- **Dairy**: Milk, Cheese, Yogurt, etc.

### Model Accuracy
- **Current**: Pre-trained model with ~70-80% accuracy on common foods
- **Future**: Custom-trained model for 95%+ accuracy
- **Limitations**: Works best with clear, well-lit food images

## 📊 **Environmental Impact Data**

### Carbon Footprint Ranges
| Food Category | Carbon Footprint (kg CO₂e/kg) | Eco Score Range |
|---------------|-------------------------------|-----------------|
| **Vegetables** | 0.3 - 2.0 | 95-100 |
| **Fruits** | 0.3 - 1.5 | 95-100 |
| **Grains** | 0.4 - 1.0 | 90-100 |
| **Dairy** | 1.0 - 3.2 | 85-95 |
| **Poultry** | 3.5 - 6.0 | 70-85 |
| **Pork** | 7.2 - 12.1 | 50-70 |
| **Beef** | 27.0 - 60.0 | 0-30 |

### Water Usage Data
- **Beef**: 15,400 L/kg
- **Pork**: 5,990 L/kg
- **Chicken**: 4,325 L/kg
- **Vegetables**: 287 L/kg average

## 🎨 **Design System**

### Color Palette
- **Deep Forest Green**: `#1B4332` → `#2D6A4F` (Primary)
- **Fresh Mint Green**: `#52B788` → `#74C69D` (Secondary)
- **Bright Orange**: `#F77F00` (Accent)
- **Soft Green Gradient**: `#E8F5E8` → `#D4F1D4` → `#C1EDC1` (Backgrounds)

### Typography
- **Primary Font**: Mona Sans
- **Weights**: Light (300) to ExtraBold (800)
- **Responsive sizing** for all screen sizes

## 🏗️ **Project Structure**

```
FoodPrint-1/
├── frontend/                 # React Native/Expo app
│   ├── app/                  # Screen components
│   │   ├── landing.tsx       # Welcome screen
│   │   ├── dashboard.tsx     # Main dashboard
│   │   ├── scanning.tsx      # Camera scanning
│   │   ├── leaderboard.tsx   # User rankings
│   │   └── ...
│   ├── components/           # Reusable UI components
│   │   ├── foodprint-text.tsx
│   │   ├── foodprint-button.tsx
│   │   ├── foodprint-logo.tsx
│   │   └── [24 custom SVG icons]
│   ├── contexts/             # React Context providers
│   │   ├── AuthContext.tsx   # Authentication
│   │   └── ScanHistoryContext.tsx # Data management
│   ├── supabase/             # Database schema & types
│   └── constants/            # Theme & configuration
├── backend/                  # Flask API server
│   ├── app/                  # Flask application
│   │   ├── routes/           # API endpoints
│   │   └── models/           # Data models
│   ├── yolov8n.pt           # YOLO model weights
│   └── requirements.txt      # Python dependencies
└── docs/                     # Documentation
```

## 🔮 **Future Roadmap**

### Phase 1: Model Optimization (Next 3 months)
- [ ] **Custom YOLO training** with food-specific dataset
- [ ] **Improved accuracy** to 95%+ for 100+ food items
- [ ] **Real-time processing** optimization
- [ ] **Offline mode** for basic food recognition

### Phase 2: Enhanced Features (6 months)
- [ ] **Barcode scanning** for packaged foods
- [ ] **Recipe suggestions** based on eco-friendly ingredients
- [ ] **Meal planning** with environmental impact tracking
- [ ] **Social sharing** of sustainable food choices

### Phase 3: Scale & Deploy (12 months)
- [ ] **iOS App Store** and **Google Play Store** releases
- [ ] **Restaurant partnerships** for menu impact scoring
- [ ] **API for third-party** food apps
- [ ] **Corporate sustainability** tracking tools

### Advanced Features
- [ ] **AR food scanning** with environmental overlays
- [ ] **Voice-activated** food logging
- [ ] **Smart home integration** (refrigerator cameras)
- [ ] **Carbon offset** purchasing integration

## 🤝 **Contributing**

We welcome contributions to make FoodPrint even better! Here's how you can help:

### Development
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Test thoroughly** on both iOS and Android
5. **Submit a pull request** with a clear description

### Areas for Contribution
- 🧠 **Computer Vision**: Improve YOLO model accuracy
- 📊 **Data Science**: Enhance environmental impact algorithms
- 🎨 **UI/UX**: Design new features and animations
- 📱 **Mobile Development**: Optimize performance and add features
- 🌍 **Environmental Data**: Contribute to our food impact database

### Code Standards
- **TypeScript** for frontend development
- **PEP 8** for Python backend
- **ESLint** and **Prettier** for code formatting
- **Comprehensive testing** for all new features

## 📈 **Impact & Metrics**

### Environmental Impact
- **Target**: Help users reduce food carbon footprint by 20%
- **Current**: 100+ food items with environmental data
- **Goal**: 1000+ food items by end of 2024

### User Engagement
- **Gamification**: Leaderboards encourage sustainable choices
- **Education**: AI insights increase environmental awareness
- **Community**: Social features promote sustainable eating habits

## 🏆 **Hackathon Achievements**

- ⚡ **36-hour development** sprint
- 🧠 **Computer vision integration** with YOLO
- 📊 **Real-time environmental scoring** algorithm
- 🎨 **Beautiful, animated UI** with 24 floating elements
- 🔐 **Complete authentication** and data persistence
- 📱 **Cross-platform** React Native app

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **YOLO/Ultralytics** for computer vision capabilities
- **Supabase** for backend infrastructure
- **Expo** for React Native development platform
- **Environmental research** data from various sustainability studies

## 🌱 **About the Team**

Built with ❤️ by passionate developers who believe that **every food choice matters** for our planet's future.

---

**Ready to make your food choices count? Download FoodPrint and start your sustainable eating journey today!** 🌍✨

*"The greatest threat to our planet is the belief that someone else will save it."* - Robert Swan
