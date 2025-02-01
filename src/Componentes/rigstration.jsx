import React, { useState, useRef } from 'react';
import { FaGoogle, FaArrowLeft, FaSpinner, FaCheck, FaGlobe, FaExternalLinkAlt, FaCode, FaEnvelope, FaRobot, FaTimes, FaComments, FaFacebook, FaTwitter, FaLinkedin, FaCog, FaComment, FaCheckDouble, FaSun, FaMoon } from "react-icons/fa";
import './registration.css';
import { motion, AnimatePresence } from 'framer-motion';
import AdminDashboard from './AdminDashboard';
import { useTheme } from '../context/ThemeContext';

const Registration = () => {
  const { darkMode, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [validations, setValidations] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpVerified, setOtpVerified] = useState(false);
  const [step, setStep] = useState('registration');
  const [orgData, setOrgData] = useState({
    companyName: '',
    websiteUrl: '',
    description: '',
  });
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [scrapedPages, setScrapedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'ai', 
      text: 'Hello! 👋 I am your AI assistant. How can I help you today?',
      time: new Date()
    },
    {
      type: 'ai',
      text: 'You can ask me anything about our services, products, or any other questions you have!',
      time: new Date()
    }
  ]);
  const [integrationSuccess, setIntegrationSuccess] = useState(false);
  const [showIntegrationOptions, setShowIntegrationOptions] = useState(false);
  const [showFeedbackBar, setShowFeedbackBar] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({ email: '', message: '' });
  const [emailSent, setEmailSent] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Dummy data for scraped pages
  const dummyPages = [
    {
      url: '/about',
      status: 'completed',
      chunks: [
        'Company overview and mission statement',
        'Team information and leadership',
        'Company values and culture'
      ]
    },
    {
      url: '/services',
      status: 'scraping',
      chunks: []
    },
    {
      url: '/contact',
      status: 'pending',
      chunks: []
    }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length >= 2;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return value.length >= 6;
      default:
        return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setValidations(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setShowOTP(true);
      startOtpTimer();
      setTimeout(() => {
        simulateAutoFillOTP();
      }, 1000);
    }, 1500);
  };

  const startOtpTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 3) {
        otpRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleResendOTP = () => {
    startOtpTimer();
    console.log('Resending OTP...');
  };

  const handleBack = () => {
    setShowOTP(false);
    setOtp(['', '', '', '']);
    setTimer(60);
  };

  const simulateAutoFillOTP = () => {
    const mockOTP = ['1', '2', '3', '4'];
    
    mockOTP.forEach((digit, index) => {
      setTimeout(() => {
        setOtp(prev => {
          const newOtp = [...prev];
          newOtp[index] = digit;
          
          if (index === 3) {
            setTimeout(() => {
              handleOtpVerification();
            }, 500);
          }
          
          return newOtp;
        });
      }, index * 500);
    });
  };

  const handleOtpVerification = () => {
    setOtpVerified(true);
    
    setTimeout(() => {
      setShowOTP(false);
      setStep('organization');
      // Initialize scraping simulation
      setScrapedPages(dummyPages);
    }, 1500);
  };

  // Add URL meta description fetching
  const fetchMetaDescription = async (url) => {
    setIsFetchingMeta(true);
    try {
      // Simulate API call to fetch meta description
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOrgData(prev => ({
        ...prev,
        description: 'Automatically fetched description: Leading provider of innovative solutions...'
      }));
    } catch (error) {
      console.error('Failed to fetch meta description:', error);
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setOrgData(prev => ({ ...prev, websiteUrl: url }));
    
    if (url) {
      fetchMetaDescription(url);
    }
  };

  // Update the handleChatMessage function
  const handleChatMessage = (message) => {
    const newMessage = {
      type: 'user',
      text: message,
      time: new Date(),
      status: 'sent'
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate "delivered" status
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg === newMessage ? { ...msg, status: 'delivered' } : msg
      ));
    }, 500);

    // Simulate AI typing
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'ai',
        text: '...',
        time: new Date(),
        isTyping: true
      }]);
    }, 1000);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, {
          type: 'ai',
          text: getAIResponse(message),
          time: new Date()
        }];
      });
    }, 2500);
  };

  // Add AI response generator
  const getAIResponse = (message) => {
    const responses = [
      "I understand. Can you tell me more about that?",
      "That's interesting! Let me help you with that.",
      "I see what you mean. Here's what I think...",
      "Thanks for sharing. Is there anything specific you'd like to know?",
      "I'm here to help! What would you like to know more about?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Modify the handleIntegrationSuccess function
  const handleIntegrationSuccess = () => {
    setIntegrationSuccess(true);
    setShowSuccessModal(true);
  };

  // Add copy code function
  const handleCopyCode = () => {
    const code = `<script src="https://beyondchats.ai/widget.js"></script>
<script>
  BeyondChats.init({
    apiKey: 'your-api-key'
  });
</script>`;
    
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Add email handling functions
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simulate sending email
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailModal(false);
      setEmailData({ email: '', message: '' });
    }, 2000);
  };

  // Add organization setup render function
  const renderOrganizationSetup = () => (
    <div className="main-container">
      <div className="form-container organization-setup">
        <h2>Setup Your Organization</h2>
        <p>Configure your chatbot settings</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Company Name"
              value={orgData.companyName}
              onChange={(e) => setOrgData(prev => ({ ...prev, companyName: e.target.value }))}
              className="company-name-field"
            />
          </div>

          <div className="input-group url-input-group">
            <input
              type="url"
              placeholder="Website URL"
              value={orgData.websiteUrl}
              onChange={handleUrlChange}
              className={`url-field ${isFetchingMeta ? 'fetching' : ''}`}
            />
            {isFetchingMeta && (
              <div className="fetch-indicator">
                <FaSpinner className="spinning" />
                <span>Fetching data...</span>
              </div>
            )}
          </div>

          <div className="input-group">
            <textarea
              placeholder="Company Description"
              value={orgData.description}
              onChange={(e) => setOrgData(prev => ({ ...prev, description: e.target.value }))}
              className="description-field"
            />
          </div>
        </form>

        {scrapedPages.length > 0 && (
          <div className="scraping-status">
            <h3>Website Analysis</h3>
            <div className="pages-list">
              {scrapedPages.map((page, index) => (
                <div 
                  key={index}
                  className={`page-item ${page.status} ${selectedPage === index ? 'selected' : ''}`}
                  onClick={() => setSelectedPage(selectedPage === index ? null : index)}
                >
                  <div className="page-info">
                    <FaGlobe className="page-icon" />
                    <span className="page-url">{page.url}</span>
                  </div>
                  <div className="page-status">
                    {page.status === 'completed' && <FaCheck className="status-icon completed" />}
                    {page.status === 'scraping' && <FaSpinner className="status-icon spinning" />}
                    {page.status === 'pending' && <span className="status-dot" />}
                  </div>
                  {selectedPage === index && page.chunks.length > 0 && (
                    <div className="page-chunks">
                      {page.chunks.map((chunk, i) => (
                        <div key={i} className="chunk">
                          {chunk}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          className="continue-button"
          onClick={() => setStep('integration')}
        >
          Continue to Integration
          <FaExternalLinkAlt className="button-icon" />
        </button>
      </div>
    </div>
  );

  // Add the missing render functions
  const renderRegistrationForm = () => (
    <div className="main-container">
      <div className="form-container">
        <h2>Welcome to BeyondChats</h2>
        <p>Create your account to get started</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={validations.name ? 'valid' : ''}
            />
            {validations.name && <span className="check-mark">✓</span>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={validations.email ? 'valid' : ''}
            />
            {validations.email && <span className="check-mark">✓</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={validations.password ? 'valid' : ''}
            />
            {validations.password && <span className="check-mark">✓</span>}
          </div>

          <button 
            type="submit" 
            disabled={!Object.values(validations).every(Boolean) || loading}
            className={loading ? 'loading' : ''}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-button">
          <FaGoogle className="google-icon" />
          Continue with Google
        </button>
      </div>
    </div>
  );

  const renderOTPVerification = () => (
    <div className="main-container">
      <div className="form-container">
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h2>Verify Your Email</h2>
        <p>Enter the 4-digit code sent to {formData.email}</p>
        
        <div className={`otp-container ${otpVerified ? 'verified' : ''}`}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={otpRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`otp-input ${otpVerified ? 'verified' : ''}`}
              disabled={otpVerified}
            />
          ))}
          {otpVerified && (
            <div className="verification-success">
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="resend-container">
          {!otpVerified && timer > 0 && <p>Resend code in {timer}s</p>}
          {!otpVerified && timer === 0 && (
            <button 
              onClick={handleResendOTP}
              className="resend-button"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderChatbot = () => (
    <motion.div 
      className="chatbot-widget"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <FaRobot className="chatbot-avatar" />
          <div className="chatbot-title">
            <h4>AI Assistant</h4>
            <span className="online-status">Online</span>
          </div>
        </div>
        <button onClick={() => setShowChatbot(false)}>
          <FaTimes />
        </button>
      </div>
      <div className="chat-messages" id="chat-messages">
        {chatMessages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={`message ${msg.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.isTyping ? (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <>
                <div className="message-content">{msg.text}</div>
                {msg.type === 'user' && (
                  <div className="message-status">
                    {msg.status === 'delivered' && (
                      <FaCheckDouble className="check-icon delivered" />
                    )}
                  </div>
                )}
                <div className="message-time">
                  {new Date(msg.time).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
      <form 
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.message;
          if (input.value.trim()) {
            handleChatMessage(input.value);
            input.value = '';
          }
        }}
      >
        <input 
          name="message"
          placeholder="Type something to chat with AI..."
          autoComplete="off"
        />
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send
        </motion.button>
      </form>
    </motion.div>
  );

  const renderChatbotIntegration = () => (
    <motion.div 
      className="main-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="form-container integration-container">
        <motion.button 
          className="integration-back-button"
          onClick={() => setStep('organization')}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          <span>Back to Organization Setup</span>
        </motion.button>

        <h2><FaRobot className="title-icon" /> Chatbot Integration & Testing</h2>
        <p>Test and integrate your AI chatbot</p>

        <div className="integration-actions">
          <motion.button
            className="action-button test-button"
            onClick={() => setShowChatbot(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="button-icon-wrapper">
              <FaComment className="action-icon" />
            </div>
            <div className="button-text-group">
              <span className="primary-text">Test Chatbot</span>
              <span className="secondary-text">Preview your chatbot</span>
            </div>
          </motion.button>

          <motion.button
            className="action-button integrate-button"
            onClick={() => setShowIntegrationOptions(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="button-icon-wrapper">
              <FaCode className="action-icon" />
            </div>
            <div className="button-text-group">
              <span className="primary-text">Integrate on Website</span>
              <span className="secondary-text">Get integration code</span>
            </div>
          </motion.button>

          <motion.button
            className="action-button test-integration-button"
            onClick={handleIntegrationSuccess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="button-icon-wrapper">
              <FaCog className="action-icon" />
            </div>
            <div className="button-text-group">
              <span className="primary-text">Test Integration</span>
              <span className="secondary-text">Verify setup</span>
            </div>
          </motion.button>
        </div>

        {showFeedbackBar && (
          <motion.div 
            className="feedback-bar"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span>Chatbot not working as intended? Share feedback</span>
            <button onClick={() => setShowFeedbackBar(false)}>
              <FaTimes />
            </button>
          </motion.div>
        )}

        {showIntegrationOptions && (
          <motion.div 
            className="integration-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button 
              className="close-modal-button"
              onClick={() => setShowIntegrationOptions(false)}
            >
              <FaTimes />
            </button>
            <h3>Choose Integration Method</h3>
            <div className="integration-methods">
              <div className="method-card">
                <h4>Copy Integration Code</h4>
                <pre className="code-snippet">
                  {`<script src="https://beyondchats.ai/widget.js"></script>
<script>
  BeyondChats.init({
    apiKey: 'your-api-key'
  });
</script>`}
                </pre>
                <motion.button 
                  className={`copy-button ${copySuccess ? 'success' : ''}`}
                  onClick={handleCopyCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copySuccess ? (
                    <>
                      <FaCheck className="copy-success-icon" />
                      Copied!
                    </>
                  ) : (
                    'Copy Code'
                  )}
                </motion.button>
              </div>

              <div className="method-card">
                <h4>Email to Developer</h4>
                <p>Send integration instructions to your development team</p>
                <motion.button 
                  className="email-button"
                  onClick={() => setShowEmailModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEnvelope /> Send Email
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {integrationSuccess && showSuccessModal && (
          <motion.div 
            className="success-screen show-confetti"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="success-content">
              <button 
                className="close-modal-button"
                onClick={() => setShowSuccessModal(false)}
              >
                <FaTimes />
              </button>
              <h3>
                <FaCheck className="success-icon" />
                Integration Successful!
              </h3>
              <p>Your chatbot is ready to engage with visitors</p>
              
              <div className="success-actions">
                <motion.button 
                  className="admin-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAdminDashboard(true)}
                >
                  <FaCog className="button-icon" />
                  Explore Admin Panel
                </motion.button>
                <motion.button 
                  className="chat-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowChatbot(true)}
                >
                  <FaComment className="button-icon" />
                  Start Talking to Chatbot
                </motion.button>
              </div>

              <div className="social-sharing">
                <motion.button 
                  className="share-button facebook"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook />
                </motion.button>
                <motion.button 
                  className="share-button twitter"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </motion.button>
                <motion.button 
                  className="share-button linkedin"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {showChatbot && renderChatbot()}
      </div>
    </motion.div>
  );

  // Add Email Modal
  const renderEmailModal = () => (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="email-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button 
          className="close-modal-button"
          onClick={() => setShowEmailModal(false)}
        >
          <FaTimes />
        </button>
        {!emailSent ? (
          <>
            <h3>Send Integration Instructions</h3>
            <form onSubmit={handleEmailSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Developer's Email"
                  value={emailData.email}
                  onChange={(e) => setEmailData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="input-group">
                <textarea
                  placeholder="Additional Message (optional)"
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Instructions
              </motion.button>
            </form>
          </>
        ) : (
          <div className="email-success">
            <FaCheck className="success-icon" />
            <h3>Email Sent Successfully!</h3>
            <p>Integration instructions have been sent to the developer.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  // Update the renderContent function
  const renderContent = () => {
    switch(step) {
      case 'organization':
        return renderOrganizationSetup();
      case 'integration':
        return renderChatbotIntegration();
      default:
        if (showOTP) {
          return renderOTPVerification();
        }
        return renderRegistrationForm();
    }
  };

  const renderThemeToggle = () => (
    <motion.button
      className="theme-toggle-button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
    </motion.button>
  );

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      {renderThemeToggle()}
      {renderContent()}
      {showEmailModal && renderEmailModal()}
      {showAdminDashboard && (
        <AdminDashboard onClose={() => setShowAdminDashboard(false)} />
      )}
    </div>
  );
};

export default Registration;