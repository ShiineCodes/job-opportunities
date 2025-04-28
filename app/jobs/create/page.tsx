'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ Since we're using static JSON, this would typically POST to an API or write to a file.
    // In this demo we'll just log it.
    const newJob = {
      id: Math.floor(Math.random() * 10000),
      title,
      location,
      description,
    };

    window.console.log('New job created:', newJob);

    // Simulate navigation back to jobs list
    router.push('/jobs');
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      <Card className='max-w-[400px]'>
        <CardHeader className='flex gap-3'>
          <div className='flex flex-col'>
            <p className='text-md'>HeroUI</p>
            <p className='text-small text-default-500'>heroui.com</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>This is footer. Action buttons go here.</CardFooter>
      </Card>
    </div>
  );
}
