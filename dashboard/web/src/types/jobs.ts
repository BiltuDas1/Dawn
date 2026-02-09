import type { Job } from "../../../api/src/types/job";

interface FailedJobsData {
  result: false;
  message: string;
}

interface SuccessJobsData {
  result: true;
  message: string;
  data: Job[];
  secret: string;
}

export type JobsDataResponse = SuccessJobsData | FailedJobsData;
