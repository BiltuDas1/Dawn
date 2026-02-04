import { useState } from 'react';
import { hc } from 'hono/client';
import type { AppType } from '../../../api/src/server';
import type { JobsDataResponse } from '../types/jobs';


export function useJobsList() {
  const client = hc<AppType>('/');
  const [result, setResult] = useState<JobsDataResponse | null>(null);
  const [error, setError] = useState<any | null>(null);

  async function fetchJobs(otp: string) {
    try {
      const response = await client.api.jobs.$get({
        header: {
          'X-OTP': otp
        }
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error);
    }
  }

  return { fetchJobs, result, error };
}