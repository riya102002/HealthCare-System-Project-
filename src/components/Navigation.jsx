import { useState } from 'react'

function Navigation({ currentPage, navigateTo, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <a href="#" onClick={() => navigateTo('home')} className="logo">
          HealthTrack Pro
        </a>
        
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <a 
              href="#" 
              onClick={() => navigateTo('home')}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Home
            </a>
          </li>
          
          {!user ? (
            <>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigateTo('register')}
                  className={currentPage === 'register' ? 'active' : ''}
                >
                  Register
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigateTo('login')}
                  className={currentPage === 'login' ? 'active' : ''}
                >
                  Login
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigateTo('booking')}
                  className={currentPage === 'booking' ? 'active' : ''}
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigateTo('appointments')}
                  className={currentPage === 'appointments' ? 'active' : ''}
                >
                  My Appointments
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={() => navigateTo('prescriptions')}
                  className={currentPage === 'prescriptions' ? 'active' : ''}
                >
                  Prescriptions
                </a>
              </li>
              <li className="user-info">
                <span>Welcome, {user.name}</span>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation