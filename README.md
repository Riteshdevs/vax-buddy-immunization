# 🩺 Vax Buddy - Immunization Tracker

A modern, user-friendly web application to help parents track their children's vaccination schedules and never miss an immunization dose.

## ✨ Features

- **👩 Mother Profile Management**: Register mother's information securely with Adhaar verification
- **👶 Multi-Child Support**: Track vaccination schedules for multiple children in one dashboard
- **📅 Personalized Schedules**: Automatically generates age-appropriate vaccination timelines based on child's date of birth
- **🔔 Smart Reminders**: Visual status indicators for upcoming, overdue, and completed vaccinations
- **📊 Comprehensive Records**: View detailed vaccination history and status for all family members
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Local Storage**: All data stored locally in the browser for privacy

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for running local server) or any static file server

### Installation

1. **Clone or download** this repository to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd "vax buddy immunization"
   ```

3. **Start a local server**:
   - Using Python:
     ```bash
     python -m http.server 8000
     ```
   - Using Node.js (with `http-server`):
     ```bash
     npx http-server -p 8000
     ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
/
├── index.html               # Landing page (home)
├── mother-info.html         # Mother registration form
├── child-info.html          # Child registration form
├── dashboard.html           # Main dashboard (view all children)
├── records.html             # View all records
├── vaccine-chart.html       # Standard immunization chart
├── README.md                # Project documentation
└── assets/
    ├── css/
    │   └── styles.css       # Unified stylesheet
    ├── js/
    │   └── script.js        # Application logic
    └── img/
        └── logo.jpg         # Application logo
```

## 🎯 Usage

### 1. Register Mother Information
- Navigate to the landing page
- Click "Get Started Now" or "Login/Start"
- Fill in mother's details (Name, Phone, Adhaar Number)
- Submit the form

### 2. Add Child Information
- Enter child's name, date of birth, and gender
- Vaccination schedule is automatically generated
- Submit to view the dashboard

### 3. Manage Vaccinations
- View all children grouped by mother
- Click on a mother's card to expand and see children
- Mark vaccinations as complete
- Visual badges show status (Upcoming, Overdue, Completed)

### 4. View Records
- Navigate to "Records" to see all stored data
- View mother profiles and child vaccination details

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables
- **JavaScript (ES6+)**: Application logic and state management
- **LocalStorage API**: Client-side data persistence
- **Google Fonts (Poppins)**: Professional typography

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth transitions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Color-Coded Status**: Clear visual indicators for vaccine status
- **Responsive Layout**: Adapts to all screen sizes
- **Micro-Interactions**: Hover effects and smooth animations

## 📊 Vaccination Schedule

The application follows the standard immunization schedule recommended for children, including:
- Birth vaccines (BCG, Hepatitis-B, OPV-0)
- 6-14 weeks vaccines (DPT, Rotavirus, PCV)
- 9-24 months vaccines (Measles, MMR, Typhoid)
- And more...

## 🔒 Privacy & Data

- **Local Storage Only**: All data is stored in your browser's local storage
- **No Server Required**: Works completely offline after initial load
- **No Data Collection**: No personal information is sent to any server
- **User Control**: You can clear all data by clearing browser storage

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 License

This project is open-source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for families everywhere**
