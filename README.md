# Freelancer Dashboard Project

## Overview

This project is a single-page web application designed as a meeting point for freelancers and clients. The page serves as a dashboard where users can view and interact with freelancer profiles, manage saved freelancers, and simulate hiring actions.

---

## Features

### 1. **Freelancer Dashboard**
The main page of the application is built using the `Dashboard.tsx` file located in the `views` folder. It serves as the central point where all components are integrated.

### 2. **FreelancerCard Component**
- Displays essential information about freelancers on the dashboard.
- Includes:
  - **Freelancer Mock Photo**: Currently displaying mock photo from an online api.
  - **Freelancer Name**
  - **Arrow Icon**: Clicking this reveals detailed information about the freelancer.
  - **"Hire Me" Icon**: Opens a pop-up form to simulate the process of hiring the freelancer.
  - **"Save Me" Icon**: Allows users to save a freelancer. Saved freelancers can be viewed by clicking the "Show Saved Freelancers" button in the center of the dashboard.
- Saved freelancers are stored in `localStorage`.

### 3. **Hire Freelancer Pop-Up**
- The `HireFreelancer` component is located in `components/HireFreelancer/HireFreelancer.tsx`.
- This component includes a form where users can fill in relevant details to simulate hiring a freelancer. Currently, this feature is a demo and does not connect to any backend API.

### 4. **Portfolio Component**
- The `Portfolio` component, located in `components/Portfolio/Portfolio.tsx`, provides detailed information about a freelancer.
- Includes:
  - **Jobs Component**:
    - Found in `components/Jobs/Jobs.tsx`.
    - Displays the freelancer’s past jobs, comments for each job, and the count of comments.
    - Comments can be toggled (shown or hidden) using a button.

### 5. **SearchBar Component**
- Enables users to search for freelancers based on:
  - Name
  - Job count
  - City
- Integrated into the dashboard

### 6. **API Integration**
- All APIs used in the project are written as functions in `services/userService.tsx`.
- The `api.ts` file in the `services` folder sets up the base URL using `axios.create`.

### 7. **Data Types**
- Custom TypeScript interfaces are defined in the `types` folder:
  - `User.tsx`: Defines the structure of user data.
  - `Job.tsx`: Defines the structure of job data.

### 8. **Theme Management**
- A centralized theme is managed using `Theme.tsx`, ensuring consistent styling throughout the application.

---

## How to Run the Project

### Prerequisites
- Ensure you have **Node.js** and **npm** installed on your machine.

### Steps to Run
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

### Folders and Files

- **`views/Dashboard.tsx`**: The main page where all components are rendered.
- **`components/FreelancerCard`**: Displays freelancer details and includes "Hire Me" and "Save Me" functionalities.
- **`components/HireFreelancer/HireFreelancer.tsx`**: Pop-up form for hiring a freelancer.
- **`components/Portfolio/Portfolio.tsx`**: Shows detailed freelancer information, including the `Jobs` component.
- **`components/Jobs/Jobs.tsx`**: Displays past jobs and comments.
- **`components/SearchBar`**: Enables searching for freelancers.
- **`services/userService.tsx`**: Contains API functions.
- **`services/api.ts`**: Sets up the base URL for APIs using Axios.
- **`types/User.tsx` and `types/Job.tsx`**: Define TypeScript interfaces for the data structure.
- **`Theme.tsx`**: Manages the project’s theme.

---

## Additional Information

- Application has one unit test in FreelancerCard.tsx

