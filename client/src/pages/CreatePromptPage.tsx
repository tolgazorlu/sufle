import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export const CreatePromptPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement prompt creation logic
    console.log("Creating prompt...");
  };

  return (
    <div className='flex items-center justify-center py-4'>
      <Card className='w-full max-w-lg shadow-none border-none'>
        <CardHeader className='space-y-1 text-center flex items-center justify-center gap-2'>
          <BrainCircuit />
          <CardTitle className='text-2xl'>Create New Prompt</CardTitle>
          <CardDescription>
            Share your prompt with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input id='title' placeholder='GPT-4 Story Writer' required />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Input
                id='description'
                placeholder='Create engaging stories with complex characters'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='content'>Prompt Content</Label>
              <textarea
                id='content'
                className='w-full min-h-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                placeholder='You are a professional story writer...'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='price'>Price (EDU)</Label>
              <Input
                id='price'
                type='number'
                min='0'
                step='1'
                placeholder='50'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='categories'>Categories</Label>
              <Input
                id='categories'
                placeholder='Creative Writing, Fiction (comma separated)'
                required
              />
            </div>

            <Button type='submit' className='w-full'>
              Create Prompt
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
