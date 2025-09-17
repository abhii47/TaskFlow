import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finish the quarterly project proposal for the client meeting',
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'high',
      coinsReward: 50,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Review team feedback',
      description: 'Go through all the feedback from the team members',
      deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      completed: false,
      priority: 'medium',
      coinsReward: 30,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Update the project documentation with latest changes',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      completed: true,
      priority: 'low',
      coinsReward: 20,
      createdAt: new Date(),
    },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simulate user login (in real app, this would come from authentication)
  useEffect(() => {
    const savedUser = localStorage.getItem('taskUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, name) => {
    const newUser = {
      id: '1',
      email,
      name,
      coins: 150,
      tasksCompleted: tasks.filter(t => t.completed).length,
      tasksTotal: tasks.length,
    };
    setUser(newUser);
    localStorage.setItem('taskUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskUser');
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    
    // Update user coins if task is completed
    if (updates.completed && user) {
      const task = tasks.find(t => t.id === id);
      if (task && !task.completed) {
        const updatedUser = {
          ...user,
          coins: user.coins + task.coinsReward,
          tasksCompleted: user.tasksCompleted + 1,
        };
        setUser(updatedUser);
        localStorage.setItem('taskUser', JSON.stringify(updatedUser));
      }
    }
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const isAuthenticated = !!user;
  const showSidebar = isAuthenticated && window.location.pathname !== '/';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!showSidebar && <Navbar user={user} onLogout={logout} />}
        
        <div className="flex">
          {showSidebar && (
            <Sidebar 
              user={user} 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              onLogout={logout}
            />
          )}
          
          <main className={`flex-1 ${showSidebar ? 'ml-0 lg:ml-30' : ''}`}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                  path="/login" 
                  element={
                    !isAuthenticated ? 
                    <LoginPage onLogin={login} /> : 
                    <Navigate to="/dashboard" replace />
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    !isAuthenticated ? 
                    <SignupPage onSignup={login} /> : 
                    <Navigate to="/dashboard" replace />
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    isAuthenticated ? 
                    <Dashboard 
                      user={user} 
                      tasks={tasks} 
                      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/tasks" 
                  element={
                    isAuthenticated ? 
                    <TasksPage 
                      tasks={tasks}
                      onAddTask={addTask}
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    isAuthenticated ? 
                    <ProfilePage 
                      user={user} 
                      tasks={tasks}
                      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;