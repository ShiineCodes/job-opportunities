import { NextRequest, NextResponse } from 'next/server';

type Job = {
  title: string;
  location: string;
  description: string;
  company: string;
};

async function createJob(req: NextRequest) {
  const body = await req.json();
  const { title, location, description, company } = body as Job;

  if (!title || !location || !description || !company) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  // ⚠️ This is where you'd normally write to a database or a JSON file on the server.
  // In this static demo, we'll just log it.
  /*   window.console.log('New job received:', body);

  const jobsList = localStorage.getItem('jobs');
  const jobs = jobsList ? JSON.parse(jobsList) : [];
  const jobExists = jobs.some(
    (job: Job) =>
      job.title === title &&
      job.location === location &&
      job.company === company
  );

  if (jobExists) {
    return NextResponse.json({ error: 'Job already exists' }, { status: 409 });
  }

  const updatedJobs = [...jobs, body];

  localStorage.setItem('jobs', JSON.stringify(updatedJobs)); */

  return NextResponse.json(
    { ...body, message: 'Job added successfully' },
    { status: 200 }
  );
}

export const POST = createJob;
