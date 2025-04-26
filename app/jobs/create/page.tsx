"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Textarea, Button, Card, Title } from "@tremor/react"; // or your HeroUI component setup

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

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

    window.console.log("New job created:", newJob);

    // Simulate navigation back to jobs list
    router.push("/jobs");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Title className="text-2xl mb-4">Add New Job</Title>

      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextInput
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">Add Job</Button>
        </form>
      </Card>
    </div>
  );
}
