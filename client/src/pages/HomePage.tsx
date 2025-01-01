import { useSearchStore } from "@/store/search-store";
import PromptCard from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockPrompts = [
  {
    title: "GPT-4 Story Writer",
    description: "Create engaging stories with complex characters",
    content: "You are a professional story writer...",
    price: 50,
    categories: ["Creative Writing", "Fiction"],
  },
  {
    title: "Technical Documentation Expert",
    description: "Generate clear and concise technical documentation",
    content: "As a technical writer with expertise in...",
    price: 35,
    categories: ["Technical Writing", "Documentation"],
  },
  {
    title: "SEO Content Optimizer",
    description: "Enhance your content for better search engine rankings",
    content: "Analyze and optimize content following SEO best practices...",
    price: 45,
    categories: ["Marketing", "SEO"],
  },
  {
    title: "Product Description Writer",
    description: "Compelling product descriptions that convert",
    content: "Create persuasive product descriptions that highlight...",
    price: 30,
    categories: ["E-commerce", "Copywriting"],
  },
  {
    title: "Academic Essay Assistant",
    description: "Help with structuring and writing academic papers",
    content: "Guide students through the process of writing...",
    price: 55,
    categories: ["Academic", "Education"],
  },
  {
    title: "Social Media Manager",
    description: "Create engaging social media content and captions",
    content: "Generate creative and trending social media posts...",
    price: 40,
    categories: ["Social Media", "Marketing"],
  },
  {
    title: "Code Documentation Generator",
    description: "Generate comprehensive code documentation",
    content: "Create detailed documentation for your codebase...",
    price: 60,
    categories: ["Programming", "Documentation"],
  },
];

export const HomePage = () => {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const navigate = useNavigate();

  const debouncedSearch = useDebounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  const filteredPrompts = mockPrompts.filter((prompt) => {
    const search = searchQuery.toLowerCase();
    return (
      prompt.title.toLowerCase().includes(search) ||
      prompt.description.toLowerCase().includes(search) ||
      prompt.categories.some((category) =>
        category.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className=' flex flex-col gap-4 py-4 px-8'>
      <div className='flex flex-col gap-4 w-full'>
        <div className='flex items-center justify-between w-full'>
          <h2 className='text-xl font-bold'>Search Prompts</h2>
          <Button onClick={() => navigate("/create-prompt")}>
            <Plus className='h-4 w-4 mr-2' />
            Create Prompt
          </Button>
        </div>
        <div className='relative max-w-xl'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='w-full pl-8 rounded-xl'
            placeholder='Search prompts...'
            type='search'
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredPrompts.map((prompt, index) => (
          <PromptCard key={index} {...prompt} />
        ))}
      </div>
    </div>
  );
};
