# 🛍️ Viorra - Mobile E-commerce App

A modern, responsive mobile e-commerce application built with React Native CLI, featuring a beautiful UI design and seamless shopping experience.

## 📱 App Screenshots

### Onboarding Screen
![Onboarding Screen](assets/app-ss/onboarding.jpeg)

### Login Screen
![Login Screen](assets/app-ss/login.jpeg)

### Registration Screen
![Registration Screen](assets/app-ss/register.jpeg)

### Home Screen
![Home Screen](assets/app-ss/home.jpeg)

### Product Details Part 1
![Product Details](assets/app-ss/product-1.jpeg)

### Product Details Part 2
![Product Details](assets/app-ss/product-2.jpeg)

### Profile Screen
![Profile Screen](assets/app-ss/profile.jpeg)



## 🎥 Demo Video

📹 **[Watch Demo Video](https://www.youtube.com/shorts/fUZwQO5A_BM)** *(Replace with your actual demo video link)*

## ✨ Features

### 🎨 **Beautiful UI/UX**
- Modern, minimalist design with custom fonts
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Custom color scheme (#FCEDEA, #B84953)

### 🔍 **Advanced Search & Filtering**
- Real-time search with debouncing (500ms)
- Search across product title, description, and category
- Comprehensive filter system:
  - Category selection (Smartphones, Laptops, Beauty, Furniture)
  - Price range filtering (Min/Max)
  - Sort options (Name, Price, Rating)
  - Sort order (Low to High, High to Low)

### 📱 **Product Management**
- Dynamic product grid with pagination
- Infinite scrolling (10 products per page)
- Product cards with images, prices, and categories
- Like/unlike functionality for products
- Product detail pages with full information

### 📊 **API Integration**
- **DummyJSON API** fully integrated for dynamic content
- Real-time product data fetching
- Search API integration (`/products/search?q=`)
- Category-based filtering
- Pagination support with `limit` and `skip` parameters

## 🛠️ Tech Stack

- **Frontend**: React Native CLI
- **Navigation**: React Navigation v6
- **State Management**: React Hooks (useState, useEffect, useCallback, useMemo)
- **API**: DummyJSON REST API
- **Icons**: React Native Vector Icons
- **Fonts**: Custom TTF fonts (Inter Light, Playfair Display ExtraBold)
- **Styling**: StyleSheet with responsive design
- **Build Tool**: React Native CLI + Gradle

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android builds)
- [Android SDK](https://developer.android.com/studio#command-tools)
- [Java Development Kit (JDK)](https://adoptium.net/) (v11 or higher)
- [Xcode](https://developer.apple.com/xcode/) (for iOS builds - macOS only)

## 🚀 Setup Instructions

### 1. **Clone the Repository**
```bash
git clone <your-repository-url>
cd viorra
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Install React Native CLI Globally**
```bash
npm install -g react-native-cli
```

### 4. **Install iOS Dependencies (macOS only)**
```bash
cd ios && pod install && cd ..
```

### 5. **Start Metro Bundler**
```bash
npx react-native start
```

### 6. **Run on Device/Emulator**

#### **Android**
```bash
npx react-native run-android
```

#### **iOS (macOS only)**
```bash
npx react-native run-ios
```

## 🔌 API Integration Details

### **DummyJSON API Endpoints Used**
- **Products**: `https://dummyjson.com/products`
- **Search**: `https://dummyjson.com/products/search?q={query}`
- **Categories**: `https://dummyjson.com/products/categories`
- **Single Product**: `https://dummyjson.com/products/{id}`

### **API Features**
- **Pagination**: `limit=10&skip={page}`
- **Search**: Real-time search across multiple fields
- **Filtering**: Category-based and price range filtering
- **Sorting**: By name, price, or rating
- **Dynamic Content**: All product data fetched from API

## 📁 Project Structure

```
viorra/
├── src/                    # Source code directory
│   ├── components/        # Reusable components
│   ├── screens/          # App screens
│   │   ├── HomeScreen.tsx   # Home screen with products
│   │   ├── OnboardingScreen.tsx # Onboarding screen
│   │   ├── LoginScreen.tsx      # Login screen
│   │   ├── RegisterScreen.tsx   # Registration screen
│   │   ├── ProfileScreen.tsx    # User profile screen
│   │   └── ProductDetailScreen.tsx # Product detail screen
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services
│   ├── utils/           # Utility functions
│   ├── constants/       # App constants
│   └── types/           # TypeScript type definitions
├── assets/              # Static assets
│   ├── fonts/          # Custom font files
│   │   ├── Inter-Light.ttf
│   │   └── PlayfairDisplay-ExtraBold.ttf
│   └── images/         # App images and icons
├── android/            # Android native code
├── ios/               # iOS native code
└── components/        # Shared components
    ├── ItalianaText.tsx   # Custom text component
    ├── InterText.tsx      # Inter font component
    └── PlayfairText.tsx   # Playfair font component
```

## 🎨 Custom Components

### **Font Components**
- **`ItalianaText`**: Italiana font for brand elements
- **`InterText`**: Inter Light font for body text
- **`PlayfairText`**: Playfair Display ExtraBold for headings

### **UI Components**
- **Product Cards**: Responsive grid layout with images and details
- **Search Bar**: Debounced search with clear functionality
- **Filter Modal**: Comprehensive filtering system
- **Loading States**: Optimized loading indicators

## 🔧 Configuration

### **Android Configuration (android/app/build.gradle)**
```gradle
android {
    compileSdkVersion 33
    
    defaultConfig {
        applicationId "com.viorrarn"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
}
```

### **iOS Configuration (ios/ViorraRN/Info.plist)**
```xml
<key>CFBundleDisplayName</key>
<string>Viorra</string>
<key>CFBundleIdentifier</key>
<string>com.viorrarn</string>
```

## 🚀 Performance Features

- **Infinite Scrolling**: Efficient pagination with FlatList
- **Image Optimization**: Optimized product images
- **Debounced Search**: 500ms delay for better performance
- **Lazy Loading**: Components load only when needed
- **Memory Management**: Proper cleanup of timeouts and listeners

## 🐛 Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Clean build directory
cd android && ./gradlew clean
# For iOS
cd ios && xcodebuild clean
```

#### **Metro Cache Issues**
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### **Font Loading Issues**
```bash
# Link assets (if using React Native < 0.60)
npx react-native link
# For newer versions, fonts should auto-link via react-native.config.js
```

#### **Android Build Issues**
```bash
# Check Android SDK path
echo $ANDROID_HOME
# Rebuild
cd android && ./gradlew clean && ./gradlew assembleDebug
```

#### **iOS Build Issues (macOS)**
```bash
# Clean and rebuild pods
cd ios && rm -rf Pods && pod install
```

#### **Development Server Issues**
```bash
# Kill Metro process
lsof -ti:8081 | xargs kill -9
# Restart Metro
npx react-native start
```

## 📱 Supported Platforms

- ✅ **Android**: 6.0 (API level 23) and higher
- ✅ **iOS**: 12.0 and higher

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DummyJSON** for providing the product API
- **React Native** community for continuous improvements
- **React Navigation** for navigation solutions
- **Google Fonts** for the beautiful typography

## 📞 Support

If you encounter any issues or have questions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/viorra/issues)
- **Email**: your.email@example.com
- **Documentation**: [React Native Docs](https://reactnative.dev/docs/getting-started)

---

**Made with ❤️ using React Native CLI**

*Last updated: December 2024*