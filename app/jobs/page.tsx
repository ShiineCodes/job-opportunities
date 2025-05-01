'use client';

import type { Job } from './types';

import { useRef, useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';

import { JobIcon } from '@/components/icons/JobIcon';
import jobsData from '@/app/mocks/jobsData.json';

type JobItem = Job & { id: number };

const STATIC_JOBS_LIST = jobsData as JobItem[];

function generateRandomValue(): string {
  const number = Math.floor(Math.random() * 1000) + 1;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const suffix =
    letters.charAt(Math.floor(Math.random() * letters.length)) +
    letters.charAt(Math.floor(Math.random() * letters.length));

  return `${number}${suffix}`;
}

const getStaticAndLocallyAddedJobsList = () => {
  const jobsList = localStorage.getItem('jobs');
  const jobs = jobsList ? JSON.parse(jobsList) : [];

  return [...STATIC_JOBS_LIST, ...jobs].map((job) => ({
    ...job,
    id: job.id ?? generateRandomValue(),
  })) as JobItem[];
};

function CreateJobButton() {
  return (
    <Button
      as={Link}
      color='secondary'
      href='/jobs/create'
      startContent={<JobIcon />}
      variant='bordered'
    >
      Create job
    </Button>
  );
}

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(
    STATIC_JOBS_LIST[0]
  );

  const { current: jobsList } = useRef(getStaticAndLocallyAddedJobsList());

  return (
    <div className='flex h-screen'>
      {/* Left Column */}
      <div className='w-1/3 border-r overflow-y-auto'>
        <div className='w-full flex justify-end px-[15px] my-[10px]'>
          <CreateJobButton />
        </div>
        <Divider />
        <div className='p-4 space-y-3'>
          {jobsList.map((job) => (
            <Card
              key={job.id}
              isPressable
              className={`cursor-pointer w-full ${
                selectedJob?.id === job.id
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : ''
              }`}
              onPress={() => setSelectedJob(job)}
            >
              <CardBody className='p-4'>
                <h2 className='text-lg font-semibold'>{job.title}</h2>
                <p className='text-sm text-gray-600'>{job.company}</p>
                <p className='text-sm text-gray-500'>{job.location}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className='flex-1 overflow-y-auto'>
        {selectedJob ? (
          <div className='p-8 space-y-4' style={{ paddingTop: '5.5rem' }}>
            <h1 className='text-2xl font-bold'>{selectedJob.title}</h1>
            <p className='text-lg text-gray-700 heroui-secondary-color'>
              {selectedJob.company}
            </p>
            <p className='text-white-500'>{selectedJob.location}</p>
            <div className='mt-6'>
              <p className='text-white-800 whitespace-pre-wrap'>
                {selectedJob.description}
              </p>
            </div>
            <Button className='mt-4'>Apply Now</Button>
          </div>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            Select a job to see details
          </div>
        )}
      </div>
    </div>
  );
}
