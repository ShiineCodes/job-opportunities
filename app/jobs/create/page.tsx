/* eslint-disable jsx-a11y/label-has-associated-control */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { addToast } from '@heroui/toast';

export default function JobForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [loading, setLoading] = useState(false);

  const jobTypes = [
    { label: 'Full time', value: 'full-time' },
    { label: 'Part time', value: 'part-time' },
    { label: 'Remote', value: 'remote' },
    { label: 'Internship', value: 'internship' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const shouldThrow = localStorage.getItem('jobCreateError') === 'true';
    const newJob = {
      title,
      company,
      location,
      description,
      jobType,
      shouldThrow,
    };

    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.message) {
        setLoading(false);
        addToast({
          title: 'Success',
          description: 'Job created successfully',
          color: 'success',
        });
        setTimeout(() => router.push('/'), 1500);
      }
    } else {
      setLoading(false);
      addToast({
        title: 'Error',
        description: response.statusText,
        color: 'danger',
      });
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-semibold'>Add New Job</h1>

      <form className='space-y-4' onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <label
            className='block text-sm font-medium text-gray-700'
            htmlFor='job-title'
          >
            Job Title
          </label>
          <Input
            isRequired
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            id='job-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Company */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Company
          </label>
          <Input
            isRequired
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type='text'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <Input
            isRequired
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Job Type Dropdown */}
        <div>
          <label
            id='job-type'
            htmlFor='job-type-select'
            className='block text-sm font-medium text-gray-700'
          >
            Job Type
          </label>
          <Autocomplete
            aria-labelledby='job-type'
            isRequired
            inputProps={{ id: 'job-type-select' }}
            defaultSelectedKey={'full-time'}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            value={jobType}
            onSelectionChange={(key) => {
              setJobType(key as string);
            }}
          >
            {jobTypes.map((job) => (
              <AutocompleteItem key={job.value}>{job.label}</AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <Textarea
            isRequired
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
            disabled={loading}
            type='submit'
          >
            {loading ? 'Adding...' : 'Add Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
