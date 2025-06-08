import { useState } from 'react'

function Login({ onLogin, navigateTo, registeredUsers }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  const findUser = (email, password) => {
    return registeredUsers.find(user => 
      user.email.toLowerCase().trim() === email.toLowerCase().trim() && 
      user.password === password
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear login message
    if (loginMessage) {
      setLoginMessage('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formErrors = validateForm()
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate login process
    setTimeout(() => {
      const user = findUser(formData.email, formData.password)
      
      if (user) {
        onLogin({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          phone: user.phone,
          address: user.address
        })
        setLoginMessage('Login successful! Redirecting...')
        
        // Redirect after showing success message
        setTimeout(() => {
          // The onLogin already handles navigation, but we can add this for safety
        }, 1500)
      } else {
        setLoginMessage('Invalid email or password. Please check your credentials or register for a new account.')
        setErrors({
          email: 'Invalid credentials',
          password: 'Invalid credentials'
        })
      }
      setIsSubmitting(false)
    }, 1000)
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@healthtrack.com',
      password: 'demo123'
    })
    setErrors({})
    setLoginMessage('')
  }

  return (
    <div className="form-container">
      <h1>Sign In to Your Account</h1>
      
      {/* Demo credentials info box */}
      <div style={{
        backgroundColor: '#eff6ff',
        border: '1px solid #dbeafe',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{color: '#1e40af', margin: '0 0 0.5rem 0', fontSize: '1rem'}}>
          Demo Account Available
        </h3>
        <p style={{margin: '0.25rem 0', color: '#374151', fontSize: '0.9rem'}}>
          <strong>Email:</strong> demo@healthtrack.com
        </p>
        <p style={{margin: '0.25rem 0', color: '#374151', fontSize: '0.9rem'}}>
          <strong>Password:</strong> demo123
        </p>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={handleDemoLogin}
          style={{marginTop: '0.5rem', fontSize: '0.875rem', padding: '0.5rem 1rem'}}
        >
          Fill Demo Credentials
        </button>
        <p style={{margin: '0.5rem 0 0 0', color: '#6b7280', fontSize: '0.8rem'}}>
          Or use your own registered account below
        </p>
      </div>
      
      {loginMessage && (
        <div className={`${loginMessage.includes('successful') ? 'success-message' : 'error-message'}`} style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
          backgroundColor: loginMessage.includes('successful') ? '#dcfce7' : '#fee2e2',
          color: loginMessage.includes('successful') ? '#16a34a' : '#dc2626'
        }}>
          {loginMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className={`form-group ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
          
          <p>
            Don't have an account? 
            <a href="#" onClick={() => navigateTo('register')}> Create one here</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login