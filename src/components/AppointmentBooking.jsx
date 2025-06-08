import { useState } from 'react'

function AppointmentBooking({ onBook, navigateTo }) {
  const [formData, setFormData] = useState({
    doctorName: '',
    specialty: '',
    date: '',
    time: '',
    reason: '',
    urgency: 'normal'
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingMessage, setBookingMessage] = useState('')

  // Sample doctors data
  const doctors = [
    { name: 'Dr. Sarah Smith', specialty: 'Cardiology' },
    { name: 'Dr. Michael Johnson', specialty: 'Dermatology' },
    { name: 'Dr. Emily Brown', specialty: 'Pediatrics' },
    { name: 'Dr. David Wilson', specialty: 'Orthopedics' },
    { name: 'Dr. Lisa Anderson', specialty: 'Neurology' },
    { name: 'Dr. Robert Taylor', specialty: 'General Medicine' }
  ]

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.doctorName) {
      newErrors.doctorName = 'Please select a doctor'
    }

    if (!formData.date) {
      newErrors.date = 'Please select an appointment date'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date'
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select an appointment time'
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please provide the reason for your visit'
    }

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Update specialty when doctor is selected
    if (name === 'doctorName') {
      const selectedDoctor = doctors.find(doc => doc.name === value)
      setFormData(prev => ({
        ...prev,
        specialty: selectedDoctor ? selectedDoctor.specialty : ''
      }))
    }

    // Clear error when user makes changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Clear booking message
    if (bookingMessage) {
      setBookingMessage('')
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

    // Simulate booking process
    setTimeout(() => {
      onBook({
        doctorName: formData.doctorName,
        specialty: formData.specialty,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        urgency: formData.urgency
      })
      setBookingMessage('Appointment booked successfully! Redirecting to your appointments...')
      
      // Redirect after showing success message
      setTimeout(() => {
        navigateTo('appointments')
      }, 2000)
      
      setIsSubmitting(false)
    }, 1000)
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="form-container">
      <h1>Book an Appointment</h1>
      
      {bookingMessage && (
        <div className="success-message">
          {bookingMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.doctorName ? 'error' : ''}`}>
          <label htmlFor="doctorName">Select Doctor *</label>
          <select
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
          >
            <option value="">Choose a doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor.name}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
          {errors.doctorName && <div className="error-message">{errors.doctorName}</div>}
        </div>

        {formData.specialty && (
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              readOnly
              style={{backgroundColor: '#f9fafb', color: '#6b7280'}}
            />
          </div>
        )}

        <div className={`form-group ${errors.date ? 'error' : ''}`}>
          <label htmlFor="date">Appointment Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
          />
          {errors.date && <div className="error-message">{errors.date}</div>}
        </div>

        <div className={`form-group ${errors.time ? 'error' : ''}`}>
          <label htmlFor="time">Preferred Time *</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          >
            <option value="">Select time slot</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <div className="error-message">{errors.time}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div className={`form-group ${errors.reason ? 'error' : ''}`}>
          <label htmlFor="reason">Reason for Visit *</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Please describe the reason for your appointment"
            rows="4"
          />
          {errors.reason && <div className="error-message">{errors.reason}</div>}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigateTo('home')}
            style={{marginTop: '0.5rem'}}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AppointmentBooking