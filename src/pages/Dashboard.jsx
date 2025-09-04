import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { format, isToday, isTomorrow, differenceInHours} from 'date-fns';

const Dashboard = ({ user, tasks, onToggleSidebar }) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const urgentTasks = pendingTasks.filter(task => differenceInHours(new Date(task.deadline), new Date()) <= 24 && new Date(task.deadline) > new Date());
  const todayTasks = tasks.filter(task => isToday(new Date(task.deadline)));

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const stats = [
    {
      title: 'Total Coins',
      value: user.coins,
      icon: CurrencyDollarIcon,
      color: 'green',
      description: 'Earned from completed tasks'
    },
    {
      title: 'Tasks Completed',
      value: completedTasks.length,
      icon: CheckCircleIcon,
      color: 'blue',
      description: `Out of ${tasks.length} total tasks`
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks.length,
      icon: ClockIcon,
      color: 'yellow',
      description: 'Tasks remaining to complete'
    },
    {
      title: 'Urgent Tasks',
      value: urgentTasks.length,
      icon: ExclamationTriangleIcon,
      color: 'red',
      description: 'Due within 24 hours'
    },
  ];

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskDeadlineText = (deadline) => {
    if (isToday(deadline)) return 'Due today';
    if (isTomorrow(deadline)) return 'Due tomorrow';
    return `Due ${format(deadline, 'MMM dd')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div></div>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your tasks today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Progress Overview</h2>
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Completion</span>
                  <span className="text-sm text-gray-500">{completionRate.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{urgentTasks.length}</p>
                  <p className="text-sm text-gray-600">Urgent</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {todayTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">No tasks due today</p>
              ) : (
                todayTasks.slice(0, 4).map(task => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      task.completed ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getTaskPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-gray-500">+{task.coinsReward} coins</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <div className="text-sm text-gray-500">{tasks.length} total tasks</div>
          </div>
          
          <div className="space-y-4">
            {tasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}>
                  {task.completed && (
                    <CheckCircleIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${
                      task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getTaskPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <div className="flex items-center text-green-600">
                        <CurrencyDollarIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{task.coinsReward}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500 truncate">{task.description}</p>
                    <p className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {getTaskDeadlineText(new Date(task.deadline))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;