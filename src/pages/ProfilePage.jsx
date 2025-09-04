import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  UserCircleIcon, 
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWithinInterval } from 'date-fns';

const ProfilePage = ({ user, tasks, onToggleSidebar }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const totalCoinsEarned = completedTasks.reduce((sum, task) => sum + task.coinsReward, 0);
  
  // Calculate streak (consecutive days with completed tasks)
  const calculateStreak = () => {
    // This is a simplified streak calculation for demo purposes
    return 5; // Demo value
  };

  // Get monthly task completion data
  const getMonthlyData = () => {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    return daysInMonth.map(day => {
      const tasksOnDay = tasks.filter(task => {
        const taskDate = new Date(task.createdAt);
        return taskDate.toDateString() === day.toDateString();
      });
      
      return {
        date: day,
        tasks: tasksOnDay.length,
        completed: tasksOnDay.filter(t => t.completed).length
      };
    });
  };

  const monthlyData = getMonthlyData();
  const streak = calculateStreak();
  const averageTasksPerWeek = Math.round(tasks.length / 4); // Simplified calculation

  const achievements = [
    {
      title: 'Task Master',
      description: 'Completed 10 tasks',
      earned: completedTasks.length >= 10,
      icon: TrophyIcon,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      title: 'Coin Collector',
      description: 'Earned 100 coins',
      earned: totalCoinsEarned >= 100,
      icon: CurrencyDollarIcon,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Consistent',
      description: '5-day streak',
      earned: streak >= 5,
      icon: CalendarDaysIcon,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Efficient',
      description: '90% completion rate',
      earned: (completedTasks.length / Math.max(tasks.length, 1)) >= 0.9,
      icon: ChartBarIcon,
      color: 'text-purple-600 bg-purple-100'
    },
  ];

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: CheckCircleIcon,
      color: 'text-blue-600'
    },
    {
      label: 'Completed',
      value: completedTasks.length,
      icon: CheckCircleIcon,
      color: 'text-green-600'
    },
    {
      label: 'In Progress',
      value: pendingTasks.length,
      icon: ClockIcon,
      color: 'text-yellow-600'
    },
    {
      label: 'Coins Earned',
      value: totalCoinsEarned,
      icon: CurrencyDollarIcon,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="text-gray-600 hover:text-gray-900 lg:hidden mr-4"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCircleIcon className="h-12 w-12 text-blue-600" />
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 mb-4">{user.email}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mb-2`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                  <span className="ml-1 text-2xl font-bold text-green-600">{user.coins}</span>
                  <span className="ml-1 text-sm text-gray-500">coins</span>
                </div>
                <p className="text-sm text-gray-600">Current Balance</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <TrophyIcon className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.earned ? achievement.color : 'text-gray-400 bg-gray-100'
                  }`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <h4 className={`font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      {achievement.earned && (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 ml-2" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center mb-6">
              <ChartBarIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Activity Stats</h3>
            </div>
            
            <div className="space-y-6">
              {/* Completion Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm text-gray-500">
                    {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{streak}</p>
                  <p className="text-sm text-gray-600">Day Streak</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{averageTasksPerWeek}</p>
                  <p className="text-sm text-gray-600">Avg/Week</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>
                <div className="space-y-2">
                  {tasks.slice(0, 3).map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          task.completed ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className={`text-sm ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-700'
                        }`}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {format(new Date(task.createdAt), 'MMM dd')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Task History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Task History</h3>
            <span className="text-sm text-gray-500">{tasks.length} total tasks</span>
          </div>
          
          <div className="space-y-3">
            {tasks.slice(0, 8).map((task, index) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.completed ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className={`font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{task.coinsReward}</span>
                  </div>
                  <p className="text-xs text-gray-500 capitalize">{task.priority}</p>
                </div>
              </div>
            ))}
          </div>
          
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <CheckCircleIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tasks created yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;