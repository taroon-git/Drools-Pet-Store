# Drools Pet Store 🐾

A full-stack e-commerce application for pet food and supplies, built with React and FastAPI.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX** with Tailwind CSS and Framer Motion animations
- **Responsive Design** that works on all devices
- **Product Catalog** with search, filtering, and sorting
- **Shopping Cart** functionality
- **Customer Reviews** system with ratings
- **Photo Gallery** with masonry layout
- **Contact Form** with WhatsApp integration
- **Admin Dashboard** for product and review management
- **Authentication** for admin access

### Backend (FastAPI)
- **RESTful API** with automatic OpenAPI documentation
- **MongoDB** integration with Motor (async driver)
- **Product Management** (CRUD operations)
- **Review System** with approval workflow
- **Contact Form** submissions
- **Basic Authentication** for admin endpoints
- **CORS** support for frontend integration

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Fredoka & Quicksand fonts

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python-dotenv** - Environment variables

### Database
- **MongoDB** - NoSQL database

## 📁 Project Structure

```
drools-pet-store/
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── .env                  # Environment variables
│   └── __init__.py
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   │       └── images/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── context/         # React Context
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json         # Node.js dependencies
│   ├── .env               # Frontend environment variables
│   └── tailwind.config.js  # Tailwind configuration
├── docker-compose.yml       # Docker setup
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drools-pet-store
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   **Backend (.env):**
   ```env
   MONGODB_URI=mongodb://localhost:27017
   DATABASE_NAME=drools_pet_store
   ```
   
   **Frontend (.env):**
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # For local MongoDB
   mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   python server.py
   ```
   The API will be available at `http://localhost:8000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The application will be available at `http://localhost:3000`

## 🐳 Docker Setup

Using Docker Compose for easy deployment:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Main Endpoints

#### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

#### Categories
- `GET /api/categories` - List all categories

#### Reviews
- `GET /api/reviews` - List approved reviews
- `POST /api/reviews` - Submit new review
- `POST /api/reviews/{id}/approve` - Approve review (Admin)

#### Contact
- `POST /api/contact` - Submit contact form

#### Gallery
- `GET /api/gallery` - List gallery images

#### Admin
- `GET /api/stats` - Get dashboard statistics (Admin)

## 🔐 Admin Access

- **URL**: `http://localhost:3000/admin`
- **Username**: `admin`
- **Password**: `drools2024`

## 🎨 Design System

### Colors
- **Primary**: `#FF6B6B` (Coral Red)
- **Secondary**: `#4ECDC4` (Turquoise)
- **Background**: `#FFF7E6` (Warm White)
- **Button**: `#FFB703` (Golden Yellow)
- **Accent**: `#FF9F1C` (Orange)

### Typography
- **Headings**: Fredoka (Google Fonts)
- **Body**: Quicksand (Google Fonts)

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Hover animations, color transitions
- **Forms**: Clean, accessible design
- **Navigation**: Sticky header, mobile-responsive

## 📱 Features Overview

### Customer Experience
- Browse products by category
- Search and filter products
- View product details and reviews
- Submit reviews and ratings
- View photo gallery
- Contact the store
- WhatsApp integration

### Admin Features
- Product management (CRUD)
- Review moderation
- Dashboard statistics
- Contact form submissions
- Gallery management

## 🔧 Customization

### Adding New Products
1. Access admin dashboard
2. Go to Products tab
3. Click "Add Product"
4. Fill in product details
5. Save product

### Modifying Styles
- Edit `frontend/src/index.css` for global styles
- Modify `frontend/tailwind.config.js` for Tailwind configuration
- Component-specific styles are inline using Tailwind classes

### API Extensions
- Add new endpoints in `backend/server.py`
- Update frontend API utilities in `frontend/src/utils/api.js`
- Create corresponding React components as needed

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the application: `npm run build`
2. Deploy the `build` folder
3. Set environment variables

### Backend (Heroku/Railway)
1. Deploy the FastAPI application
2. Configure MongoDB connection
3. Set environment variables

### Database (MongoDB Atlas)
1. Create a free cluster
2. Get connection string
3. Update backend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: info@droolspetstore.com
- WhatsApp: +1 (234) 567-8900

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Shopping cart and checkout
- [ ] Payment integration
- [ ] Order tracking
- [ ] Email notifications
- [ ] Advanced search
- [ ] Product recommendations
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Inventory management
- [ ] Analytics dashboard

---

**Built with ❤️ for pet lovers everywhere!**
