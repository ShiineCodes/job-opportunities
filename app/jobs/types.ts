export type Job = {
  title: string;
  location: string;
  description: string;
  company: string;
  jobType: "full-time" | "part-time" | "remote" | "internship";
};

export type JobRequest = Job & {
  shouldThrow?: boolean;
};
