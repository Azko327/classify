
# Course Recommendation System

This is a web-based application that provides personalized **course recommendations** and suggests **external courses** from platforms like Coursera, Udemy, and GitHub. Users can view their recommended courses, check schedules, and access external course links directly.

## Features

- **Recommended Courses**: Displays personalized course recommendations including course number, name, difficulty, description, schedule, and credits.
- **External Courses**: Provides external course recommendations from platforms such as Coursera, Udemy, and GitHub, with a "Get the link" button to access them.
- **Dynamic Schedule**: Shows your course schedule and allows users to view the recommended courses.
- **Error Handling**: Proper error handling is implemented to catch and display issues during the data fetching process.
  
## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/course-recommendation-system.git
   cd course-recommendation-system
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Run the application**:
   To start the development server, run:
   ```bash
   npm start
   ```
   This will launch the app in development mode on `http://localhost:3000`.

## Usage

Once the application is running:

1. View the **recommended courses** based on your profile. The page will show details such as the course name, description, and difficulty.
2. See your **total credits** for the recommended courses.
3. Browse through **external course recommendations** from different platforms, and use the "Get the link" button to access the course directly.
4. You can view your **course schedule** and dynamically add courses to it.

### Error Handling
- If there are any issues with fetching data, an error message will be displayed on the page.

## Technologies

The project is built using the following technologies:

- **React**: Frontend framework for building the UI.
- **React Bootstrap**: UI component library to make the design responsive and modern.
- **React Big Calendar**: Used to display the user’s course schedule dynamically.
- **ESLint**: Linting to maintain code quality.
- **Node.js**: Backend (if applicable) or just the environment for running the app locally.

## Project Structure

```
course-recommendation-system/
│
├── public/                  # Public assets like index.html, favicon, etc.
│
├── src/                     # Main source code
│   ├── components/          # React components
│   ├── pages/               # Page components like RecommendationPage.js
│   ├── styles/              # CSS/SCSS styles
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point for the React app
│   ├── SharedStyles.css     # Shared styles for components
│   └── RecommendationPage.js # Main course recommendation logic
│
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Commit your changes** (`git commit -am 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature`)
5. **Create a Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
