import React, { useState } from 'react';

function App() {
  const [studentName, setStudentName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData create pandrom (Files anuppa idhu dhaan venum)
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('regNumber', regNumber);
    formData.append('subject', subject);
    formData.append('assignmentFile', file); // 'assignmentFile' name backend logic kooda match aaganum

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Success! " + data.message);
      } else {
        alert("Upload Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server connect aagala! Check if Backend is running.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>🎓 Assignment Portal</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" placeholder="Full Name" style={styles.input} onChange={(e) => setStudentName(e.target.value)} required />
          <input type="text" placeholder="Reg Number" style={styles.input} onChange={(e) => setRegNumber(e.target.value)} required />
          <select style={styles.input} onChange={(e) => setSubject(e.target.value)} required>
            <option value="">Select Subject</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
          </select>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit" style={styles.button}>Submit Assignment</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
};

export default App;