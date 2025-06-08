function Prescriptions() {
    // Sample prescription data
    const prescriptions = [
      {
        id: 1,
        patientName: 'John Doe',
        doctorName: 'Dr. Sarah Smith',
        date: '2024-01-10',
        medications: [
          {
            name: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3 times daily',
            duration: '7 days',
            instructions: 'Take with food'
          },
          {
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'As needed',
            duration: '5 days',
            instructions: 'For pain relief, maximum 3 times daily'
          }
        ],
        diagnosis: 'Upper respiratory tract infection'
      },
      {
        id: 2,
        patientName: 'John Doe',
        doctorName: 'Dr. Michael Johnson',
        date: '2023-12-15',
        medications: [
          {
            name: 'Hydrocortisone Cream',
            dosage: '1%',
            frequency: '2 times daily',
            duration: '14 days',
            instructions: 'Apply thin layer to affected area'
          }
        ],
        diagnosis: 'Eczema'
      }
    ]
  
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
  
    return (
      <div className="prescription-container">
        <div className="prescription-header">
          <h1>My Prescriptions</h1>
          <p>View and manage your medical prescriptions</p>
        </div>
  
        {prescriptions.length === 0 ? (
          <div className="prescription-card">
            <p style={{textAlign: 'center', color: '#6b7280'}}>
              No prescriptions found. Visit a doctor to get started.
            </p>
          </div>
        ) : (
          <div className="prescription-list">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-card">
                <h3>Prescription #{prescription.id.toString().padStart(4, '0')}</h3>
                
                <div className="prescription-details">
                  <div className="detail-item">
                    <div className="detail-label">Patient Name</div>
                    <div className="detail-value">{prescription.patientName}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Prescribed by</div>
                    <div className="detail-value">{prescription.doctorName}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Date Prescribed</div>
                    <div className="detail-value">{formatDate(prescription.date)}</div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-label">Diagnosis</div>
                    <div className="detail-value">{prescription.diagnosis}</div>
                  </div>
                </div>
  
                <div style={{marginTop: '1.5rem'}}>
                  <h4 style={{color: '#1e40af', marginBottom: '1rem'}}>Medications:</h4>
                  
                  {prescription.medications.map((med, index) => (
                    <div key={index} style={{
                      backgroundColor: '#f8fafc',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div className="prescription-details">
                        <div className="detail-item">
                          <div className="detail-label">Medication</div>
                          <div className="detail-value" style={{fontWeight: '600'}}>
                            {med.name}
                          </div>
                        </div>
                        
                        <div className="detail-item">
                          <div className="detail-label">Dosage</div>
                          <div className="detail-value">{med.dosage}</div>
                        </div>
                        
                        <div className="detail-item">
                          <div className="detail-label">Frequency</div>
                          <div className="detail-value">{med.frequency}</div>
                        </div>
                        
                        <div className="detail-item">
                          <div className="detail-label">Duration</div>
                          <div className="detail-value">{med.duration}</div>
                        </div>
                      </div>
                      
                      {med.instructions && (
                        <div style={{marginTop: '0.5rem'}}>
                          <div className="detail-label">Special Instructions</div>
                          <div className="detail-value" style={{fontStyle: 'italic'}}>
                            {med.instructions}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
  
                <div style={{marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => alert('Download prescription functionality would be implemented here')}
                  >
                    Download PDF
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => alert('Refill request functionality would be implemented here')}
                  >
                    Request Refill
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
  
        <div style={{
          backgroundColor: '#eff6ff',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginTop: '2rem',
          border: '1px solid #dbeafe'
        }}>
          <h4 style={{color: '#1e40af', marginBottom: '0.5rem'}}>
            Important Reminders:
          </h4>
          <ul style={{color: '#6b7280', lineHeight: '1.6'}}>
            <li>Always take medications as prescribed by your doctor</li>
            <li>Complete the full course of antibiotics even if you feel better</li>
            <li>Contact your doctor if you experience any adverse reactions</li>
            <li>Keep prescriptions in a safe, dry place away from children</li>
            <li>Check expiration dates before taking any medication</li>
          </ul>
        </div>
      </div>
    )
  }
  
  export default Prescriptions