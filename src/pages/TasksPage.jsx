import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  PlusIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { format, isToday, isTomorrow } from 'date-fns';

const TasksPage = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleSidebar,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    coinsReward: 30,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      coinsReward: 30,
    });
    setShowAddForm(false);
    setEditingTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) return;

    const taskData = {
      title: formData.title,
      description: formData.description,
      deadline: new Date(formData.deadline),
      priority: formData.priority,
      coinsReward: formData.coinsReward,
      completed: false,
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    resetForm();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      deadline: format(new Date(task.deadline), 'yyyy-MM-dd\'T\'HH:mm'),
      priority: task.priority,
      coinsReward: task.coinsReward,
    });
    setShowAddForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed': return task.completed;
      case 'pending': return !task.completed;
      case 'urgent': return !task.completed && new Date(task.deadline) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
      default: return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTaskDeadlineText = (deadline) => {
    if (isToday(deadline)) return 'Today';
    if (isTomorrow(deadline)) return 'Tomorrow';
    return format(deadline, 'MMM dd, yyyy');
  };

  const getTaskUrgencyColor = (task) => {
    if (task.completed) return 'border-green-200 bg-green-50';
    const now = new Date();
    const deadline = new Date(task.deadline);
    const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntilDeadline < 0) return 'border-red-300 bg-red-50';
    if (hoursUntilDeadline < 24) return 'border-orange-300 bg-orange-50';
    if (hoursUntilDeadline < 72) return 'border-yellow-300 bg-yellow-50';
    return 'border-gray-200 bg-white';
  };

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
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Task Management</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="urgent">Urgent</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="priority">Sort by Priority</option>
                <option value="created">Sort by Created</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {sortedTasks.length} of {tasks.length} tasks
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-lg border-2 p-6 hover:shadow-md transition-all duration-200 ${getTaskUrgencyColor(task)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onUpdateTask(task.id, { completed: !task.completed })}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {task.completed && <CheckCircleIcon className="w-4 h-4" />}
                    </button>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getTaskPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className={`font-semibold text-lg mb-2 ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {getTaskDeadlineText(new Date(task.deadline))}
                    </div>
                    <div className="flex items-center text-green-600">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {task.coinsReward}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {sortedTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ClockIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' ? 'Get started by creating your first task!' : `No ${filter} tasks at the moment.`}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Task
            </button>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Task Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Task Title *
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coins" className="block text-sm font-medium text-gray-700 mb-1">
                      Coins Reward
                    </label>
                    <input
                      id="coins"
                      type="number"
                      min="10"
                      max="100"
                      step="10"
                      value={formData.coinsReward}
                      onChange={(e) => setFormData(prev => ({ ...prev, coinsReward: parseInt(e.target.value) || 30 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline *
                  </label>
                  <input
                    id="deadline"
                    type="datetime-local"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;