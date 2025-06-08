import { useState, useEffect } from 'react'
import './App.css'

// Import components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Homepage from './components/Homepage'
import Registration from './components/Registration'
import Login from './components/Login'
import AppointmentBooking from './components/AppointmentBooking'
import ViewAppointments from './components/ViewAppointments'
import Prescriptions from './components/Prescriptions'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: 'Dr. Smith',
      specialty: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      doctorName: 'Dr. Johnson',
      specialty: 'Dermatology',
      date: '2024-01-20',
      time: '2:30 PM',
      status: 'Pending'
    }
  ])

  // Load registered users from localStorage on app start
  useEffect(() => {
    const savedUsers = localStorage.getItem('healthtrack_users')
    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers))
    }
    
    // Add demo user if not already present
    const demoUser = {
      id: 'demo',
      name: 'Demo User',
      email: 'demo@healthtrack.com',
      password: 'demo123',
      age: '30',
      gender: 'prefer-not-to-say',
      phone: '+1-555-0123',
      address: '123 Demo Street, Demo City, DC 12345'
    }
    
    setRegisteredUsers(prev => {
      const existingUsers = savedUsers ? JSON.parse(savedUsers) : []
      const demoExists = existingUsers.some(user => user.email === demoUser.email)
      
      if (!demoExists) {
        const updatedUsers = [...existingUsers, demoUser]
        localStorage.setItem('healthtrack_users', JSON.stringify(updatedUsers))
        return updatedUsers
      }
      
      return existingUsers
    })
  }, [])

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('home')
  }

  const handleRegister = (userData) => {
    // Add new user to registered users list
    const newUser = {
      ...userData,
      id: Date.now().toString() // Simple ID generation
    }
    
    const updatedUsers = [...registeredUsers, newUser]
    setRegisteredUsers(updatedUsers)
    
    // Save to localStorage
    localStorage.setItem('healthtrack_users', JSON.stringify(updatedUsers))
    
    // Log the user in
    setUser(newUser)
    setCurrentPage('home')
  }

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: appointments.length + 1,
      status: 'Pending'
    }
    setAppointments([...appointments, newAppointment])
    setCurrentPage('appointments')
  }

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home':
        return <Homepage navigateTo={navigateTo} user={user} />
      case 'register':
        return <Registration onRegister={handleRegister} navigateTo={navigateTo} registeredUsers={registeredUsers} />
      case 'login':
        return <Login onLogin={handleLogin} navigateTo={navigateTo} registeredUsers={registeredUsers} />
      case 'booking':
        return <AppointmentBooking onBook={addAppointment} navigateTo={navigateTo} />
      case 'appointments':
        return <ViewAppointments appointments={appointments} />
      case 'prescriptions':
        return <Prescriptions />
      default:
        return <Homepage navigateTo={navigateTo} user={user} />
    }
  }

  return (
    <div className="App">
      <Navigation 
        currentPage={currentPage} 
        navigateTo={navigateTo} 
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  )
}

export default App