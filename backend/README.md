# FoodPrint Backend 🌱

Flask API backend for the FoodPrint eco-friendly food tracking application.

## 🚀 Quick Start

### Prerequisites
- Python (v3.8 or higher)
- pip (Python package installer)

### Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize database:**
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

5. **Start the API server:**
   ```bash
   python run.py
   ```

The API will be available at `http://localhost:5000`

## 🏗️ Project Structure

```
backend/
├── app/                    # Flask application
│   ├── __init__.py        # App factory
│   ├── models/            # Database models
│   │   ├── __init__.py
│   │   ├── user.py        # User model
│   │   ├── food.py        # Food and FoodItem models
│   │   └── impact.py      # Environmental impact model
│   ├── routes/            # API endpoints
│   │   ├── __init__.py
│   │   ├── main.py        # Main API routes
│   │   ├── food.py        # Food-related endpoints
│   │   └── users.py       # User-related endpoints
│   └── utils/             # Utility functions
├── tests/                 # Backend tests
├── requirements.txt       # Python dependencies
├── run.py                 # Application entry point
└── env.example            # Environment variables template
```

## 🛠️ Tech Stack

- **Flask** - Web framework
- **SQLAlchemy** - Database ORM
- **Flask-Migrate** - Database migrations
- **Flask-CORS** - Cross-origin resource sharing
- **Marshmallow** - Object serialization
- **python-dotenv** - Environment variable management

## 📊 Database Models

### User Model
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    # ... additional fields
```

### Food Model
```python
class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    carbon_footprint = db.Column(db.Float)  # kg CO2 per 100g
    water_usage = db.Column(db.Float)       # liters per 100g
    sustainability_score = db.Column(db.Integer)  # 0-100
    # ... additional fields
```

### Environmental Impact Model
```python
class EnvironmentalImpact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    date = db.Column(db.Date, nullable=False)
    total_carbon_footprint = db.Column(db.Float, default=0.0)
    total_water_usage = db.Column(db.Float, default=0.0)
    eco_score = db.Column(db.Integer)
    # ... additional fields
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:5000
```

### Health Check
```
GET /health
```
Returns API health status.

### Main API
```
GET /                    # API root
GET /api                 # API information
```

### Food API
```
GET    /api/food/           # Get all foods
POST   /api/food/scan       # Scan food item
POST   /api/food/impact     # Calculate environmental impact
GET    /api/food/recipes    # Get eco-friendly recipes
```

### User API
```
GET    /api/users/          # Get users (admin)
GET    /api/users/profile   # Get user profile
PUT    /api/users/profile   # Update user profile
GET    /api/users/stats     # Get user statistics
POST   /api/users/register  # Register new user
POST   /api/users/login     # User login
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Flask Configuration
FLASK_APP=run.py
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here

# Database Configuration
DATABASE_URL=sqlite:///foodprint.db

# Server Configuration
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
```

### Database Configuration

#### SQLite (Development)
```bash
DATABASE_URL=sqlite:///foodprint.db
```

#### PostgreSQL (Production)
```bash
DATABASE_URL=postgresql://username:password@localhost/foodprint
```

#### MySQL (Production)
```bash
DATABASE_URL=mysql://username:password@localhost/foodprint
```

## 🗄️ Database Operations

### Initialize Database
```bash
flask db init
```

### Create Migration
```bash
flask db migrate -m "Description of changes"
```

### Apply Migration
```bash
flask db upgrade
```

### Rollback Migration
```bash
flask db downgrade
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
python -m pytest

# Run with coverage
python -m pytest --cov=app

# Run specific test file
python -m pytest tests/test_models.py
```

### Test Structure
```
tests/
├── test_models.py      # Model tests
├── test_routes.py      # API endpoint tests
└── test_utils.py       # Utility function tests
```

## 🚀 Deployment

### Development
```bash
python run.py
```

### Production with Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "run:app"]
```

## 🔒 Security Considerations

### Authentication
- Implement JWT tokens for user authentication
- Use bcrypt for password hashing
- Add rate limiting for API endpoints

### CORS Configuration
```python
CORS(app, origins=[
    'http://localhost:3000',  # Expo web
    'http://localhost:8081',  # Expo dev server
    'exp://localhost:19000',  # Expo development
])
```

### Environment Variables
- Never commit `.env` files
- Use strong secret keys in production
- Rotate API keys regularly

## 📈 Performance Optimization

### Database
- Add database indexes for frequently queried fields
- Use database connection pooling
- Implement query optimization

### Caching
- Add Redis for session storage
- Implement API response caching
- Use database query caching

### Monitoring
- Add logging for API requests
- Implement health check endpoints
- Monitor database performance

## 🔧 Development Tools

### Code Quality
```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

### Database Management
```bash
# Flask shell
flask shell

# Database shell
sqlite3 foodprint.db
```

## 📚 API Documentation

### Request/Response Examples

#### Scan Food Item
```bash
POST /api/food/scan
Content-Type: application/json

{
  "image": "base64_encoded_image_data"
}
```

#### Calculate Impact
```bash
POST /api/food/impact
Content-Type: application/json

{
  "food_items": [
    {
      "food_id": 1,
      "quantity": 150
    }
  ]
}
```

#### User Registration
```bash
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "username": "foodie_user"
}
```

## 🌱 FoodPrint Features

### Current Features
- ✅ Flask API structure
- ✅ Database models for users, foods, and environmental impact
- ✅ CORS configuration for React Native frontend
- ✅ Environment-based configuration
- ✅ Database migrations

### Planned Features
- 🔄 Food recognition API integration
- 📊 Environmental impact calculation algorithms
- 👤 User authentication with JWT
- 📈 Advanced analytics and reporting
- 🍽️ Recipe recommendation engine
- 📱 Push notification service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for a sustainable future**
