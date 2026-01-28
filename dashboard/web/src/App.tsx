import { useEffect, useState } from 'react'
import { hc } from 'hono/client'
import type { AppType } from '../../api/src/server'

function App() {
  const client = hc<AppType>('/');
  const [jobs, setJobs] = useState<any | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await client.api.jobs.$get();
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Active Scraper Jobs</h1>

      {/* Display a loading message while waiting */}
      {!jobs && <p>Loading data from D1...</p>}

      {/* "Print" the data to the window as a formatted string */}
      {jobs && (
        <pre style={{ background: '#f4f4f4', padding: '15px' }}>
          {JSON.stringify(jobs, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default App