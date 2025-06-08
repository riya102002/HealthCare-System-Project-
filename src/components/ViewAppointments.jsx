function ViewAppointments({ appointments }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  
    const getStatusClass = (status) => {
      switch(status.toLowerCase()) {
        case 'confirmed':
          return 'status confirmed'
        case 'pending':
          return 'status pending'
        case 'cancelled':
          return 'status cancelled'
        default:
          return 'status'
      }
    }
  
    if (appointments.length === 0) {
      return (
        <div className="table-container">
          <h1>My Appointments</h1>
          <div style={{padding: '2rem', textAlign: 'center'}}>
            <p style={{color: '#6b7280', fontSize: '1.1rem'}}>
              You don't have any appointments scheduled yet.
            </p>
            <p style={{color: '#9ca3af', marginTop: '0.5rem'}}>
              Book your first appointment to get started with your healthcare journey.
            </p>
          </div>
        </div>
      )
    }
  
    return (
      <div className="table-container">
        <h1>My Appointments ({appointments.length})</h1>
        
        <table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>#{appointment.id.toString().padStart(4, '0')}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.specialty}</td>
                <td>{formatDate(appointment.date)}</td>
                <td>{appointment.time}</td>
                <td>
                  <span className={getStatusClass(appointment.status)}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    {appointment.status.toLowerCase() === 'pending' && (
                      <>
                        <button 
                          className="btn btn-primary" 
                          style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
                          onClick={() => alert('Reschedule functionality would be implemented here')}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
                          onClick={() => alert('Cancel functionality would be implemented here')}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status.toLowerCase() === 'confirmed' && (
                      <button 
                        className="btn btn-primary" 
                        style={{fontSize: '0.75rem', padding: '0.25rem 0.5rem'}}
                        onClick={() => alert('View details functionality would be implemented here')}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{padding: '1rem', backgroundColor: '#f8fafc', fontSize: '0.875rem', color: '#6b7280'}}>
          <p><strong>Legend:</strong></p>
          <p>• <span className="status confirmed">Confirmed</span> - Your appointment is confirmed</p>
          <p>• <span className="status pending">Pending</span> - Waiting for doctor's confirmation</p>
          <p>• <span className="status cancelled">Cancelled</span> - Appointment has been cancelled</p>
        </div>
      </div>
    )
  }
  
  export default ViewAppointments