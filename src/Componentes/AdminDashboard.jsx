import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSun, FaMoon, FaChartLine, FaUsers, FaComments, 
  FaCog, FaBell, FaSignOutAlt, FaSearch, FaEllipsisV,
  FaArrowUp, FaArrowDown, FaTimes, FaUserCircle, FaEnvelope, FaPhone, FaEdit, FaArrowLeft
} from 'react-icons/fa';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import './AdminDashboard.css';
import { useTheme } from '../context/ThemeContext';

const AdminDashboard = ({ onClose }) => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Add profileData
  const [profileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    role: 'Admin',
    joinDate: 'Jan 2024'
  });

  // Update notifications state with initial data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      text: 'New message from customer support',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'alert',
      text: 'System update completed successfully',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      text: 'Weekly report is now available',
      time: '2 hours ago',
      unread: false
    }
  ]);

  // Dummy data for charts
  const chartData = [
    { name: 'Mon', conversations: 120, responses: 100, satisfaction: 85 },
    { name: 'Tue', conversations: 150, responses: 130, satisfaction: 88 },
    { name: 'Wed', conversations: 180, responses: 160, satisfaction: 92 },
    { name: 'Thu', conversations: 160, responses: 140, satisfaction: 87 },
    { name: 'Fri', conversations: 200, responses: 180, satisfaction: 90 },
    { name: 'Sat', conversations: 140, responses: 120, satisfaction: 86 },
    { name: 'Sun', conversations: 130, responses: 110, satisfaction: 89 }
  ];

  const pieData = [
    { name: 'Product Inquiries', value: 35 },
    { name: 'Support', value: 25 },
    { name: 'Feedback', value: 20 },
    { name: 'Other', value: 20 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderOverview = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-header">
            <h3>Total Conversations</h3>
            <FaComments className="stat-icon" />
          </div>
          <div className="stat-value">1,234</div>
          <div className="stat-change positive">
            <FaArrowUp /> +15% from last week
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-header">
            <h3>Active Users</h3>
            <FaUsers className="stat-icon" />
          </div>
          <div className="stat-value">856</div>
          <div className="stat-change positive">
            <FaArrowUp /> +8% from last week
          </div>
        </motion.div>

        <motion.div 
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-header">
            <h3>Response Rate</h3>
            <FaChartLine className="stat-icon" />
          </div>
          <div className="stat-value">92%</div>
          <div className="stat-change negative">
            <FaArrowDown /> -2% from last week
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3>Conversation Analytics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="conversations" stroke="#8884d8" />
            <Line type="monotone" dataKey="responses" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="charts-row">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Satisfaction Rate</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="satisfaction" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Conversation Types</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );

  const renderHeaderRight = () => (
    <div className="header-right">
      <button className="theme-toggle" onClick={() => {}}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      
      <div className="notification-wrapper">
        <button 
          className="notification-btn"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell />
          <span className="notification-badge">3</span>
        </button>

        {showNotifications && (
          <motion.div 
            className="notifications-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="popup-header">
              <h3>Notifications</h3>
              <button 
                className="close-btn"
                onClick={() => setShowNotifications(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="notifications-list">
              {notifications.map(notification => (
                <motion.div 
                  key={notification.id}
                  className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="notification-content">
                    <p>{notification.text}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="profile-wrapper">
        <button 
          className="profile-btn"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img src="https://via.placeholder.com/32" alt="Profile" />
        </button>

        <button 
          className="menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FaEllipsisV />
        </button>

        {showProfile && (
          <motion.div 
            className="profile-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="popup-header">
              <h3>Profile</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProfile(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="profile-content">
              <div className="profile-avatar">
                <img src="https://via.placeholder.com/80" alt="Profile" />
                <button className="edit-avatar">
                  <FaEdit />
                </button>
              </div>
              <div className="profile-info">
                <div className="info-item">
                  <FaUserCircle />
                  <span>{profileData.name}</span>
                </div>
                <div className="info-item">
                  <FaEnvelope />
                  <span>{profileData.email}</span>
                </div>
                <div className="info-item">
                  <FaPhone />
                  <span>{profileData.phone}</span>
                </div>
              </div>
              <button className="edit-profile-btn">
                <FaEdit /> Edit Profile
              </button>
            </div>
          </motion.div>
        )}

        {showMenu && (
          <motion.div 
            className="menu-popup"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="menu-items">
              <button>
                <FaCog /> Settings
              </button>
              <button>
                <FaUserCircle /> Account
              </button>
              <button>
                <FaEnvelope /> Messages
              </button>
              <button className="logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div 
      className={`admin-dashboard ${darkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard-header">
        <div className="header-left">
          <motion.button 
            className="back-button"
            onClick={onClose}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
          </motion.button>
          <h2>Admin Dashboard</h2>
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        {renderHeaderRight()}
      </div>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'conversations' ? 'active' : ''}
            onClick={() => setActiveTab('conversations')}
          >
            Conversations
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>

        <AnimatePresence mode="wait">
          {renderOverview()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminDashboard; 