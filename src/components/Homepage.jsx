function Homepage({ navigateTo, user }) {
    return (
      <div className="homepage">
        <section className="hero-section">
          <h1>Welcome to HealthTrack Pro</h1>
          <p>
            Your comprehensive healthcare management system. Book appointments, 
            track prescriptions, and manage your health records all in one place.
          </p>
          
          {!user ? (
            <div className="cta-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => navigateTo('register')}
              >
                Get Started
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => navigateTo('login')}
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="cta-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => navigateTo('booking')}
              >
                Book Appointment
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => navigateTo('appointments')}
              >
                View Appointments
              </button>
            </div>
          )}
        </section>
  
        <section className="features-grid">
          <div className="feature-card">
            <h3>📅 Easy Appointment Booking</h3>
            <p>
              Schedule appointments with your preferred doctors quickly and easily. 
              Choose from available time slots that work for your schedule.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>💊 Prescription Management</h3>
            <p>
              Keep track of all your prescriptions in one place. Get reminders 
              for medication schedules and refill dates.
            </p>
          </div>
          
          <div className="feature-card">
            <h3>📋 Health Records</h3>
            <p>
              Maintain comprehensive health records including appointment history, 
              test results, and medical notes for better healthcare management.
            </p>
          </div>
        </section>
      </div>
    )
  }
  
  export default Homepage