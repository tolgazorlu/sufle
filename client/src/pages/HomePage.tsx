import { useSearchStore } from "@/store/search-store";
import PromptCard from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

// Mock data for demonstration
const mockPrompts = [
  {
    title: "GPT-4 Story Writer",
    description: "Create engaging stories with complex characters",
    content: "You are a professional story writer...",
    price: 50,
    categories: ["Creative Writing", "Fiction"],
    user: {
      name: "Alice Cooper",
      avatar: "/avatars/alice.jpg",
      job: "Creative Writer",
    },
  },
  {
    title: "Technical Documentation Expert",
    description: "Generate clear and concise technical documentation",
    content: "As a technical writer with expertise in...",
    price: 35,
    categories: ["Technical Writing", "Documentation"],
    user: {
      name: "Bob Smith",
      avatar: "/avatars/bob.jpg",
      job: "Technical Writer",
    },
  },
  {
    title: "SEO Content Optimizer",
    description: "Enhance your content for better search engine rankings",
    content: "Analyze and optimize content following SEO best practices...",
    price: 45,
    categories: ["Marketing", "SEO"],
    user: {
      name: "Charlie Davis",
      avatar: "/avatars/charlie.jpg",
      job: "SEO Specialist",
    },
  },
  {
    title: "Product Description Writer",
    description: "Compelling product descriptions that convert",
    content: "Create persuasive product descriptions that highlight...",
    price: 30,
    categories: ["E-commerce", "Copywriting"],
    user: {
      name: "Eve Adams",
      avatar: "/avatars/eve.jpg",
      job: "Copywriter",
    },
  },
  {
    title: "Academic Essay Assistant",
    description: "Help with structuring and writing academic papers",
    content: "Guide students through the process of writing...",
    price: 55,
    categories: ["Academic", "Education"],
    user: {
      name: "Grace Evans",
      avatar: "/avatars/grace.jpg",
      job: "Educator",
    },
  },
  {
    title: "Social Media Manager",
    description: "Create engaging social media content and captions",
    content: "Generate creative and trending social media posts...",
    price: 40,
    categories: ["Social Media", "Marketing"],
    user: {
      name: "Hank Harris",
      avatar: "/avatars/hank.jpg",
      job: "Social Media Manager",
    },
  },
  {
    title: "Code Documentation Generator",
    description: "Generate comprehensive code documentation",
    content: "Create detailed documentation for your codebase...",
    price: 60,
    categories: ["Programming", "Documentation"],
    user: {
      name: "Ivy Johnson",
      avatar: "/avatars/ivy.jpg",
      job: "Software Developer",
    },
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
    <div className='flex flex-col gap-4 '>
      <div className='flex flex-col gap-2 items-start py-4 px-8'>
        <span className='text-sm text-secondary-foreground/80'>
          Check out our new AI Agents
        </span>
        <div className='flex flex-col gap-1'>
          <span className='text-4xl font-bold'>AI Prompt Marketplace</span>
          <span className='text-lg text-secondary-foreground/80'>
            Find AI Prompts for professional projects like AI Agents, Chatbots,
            and more
          </span>
        </div>
        <div className='flex gap-2'>
          <Button onClick={() => navigate("/create-prompt")}>
            Create Prompt
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => navigate("/create-prompt")}
          >
            Github
          </Button>
        </div>
      </div>
      <DropdownMenuSeparator className='w-full bg-secondary-foreground/10' />
      <div className='px-8 flex flex-col gap-2'>
        <Label className='text-lg font-semibold'>Search Prompts</Label>
        <div className='relative lg:w-1/2'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='w-full pl-8 rounded-lg bg-muted '
            placeholder='Search prompts...'
            type='search'
            onChange={handleSearch}
          />
        </div>
      </div>
      <DropdownMenuSeparator className='w-full bg-secondary-foreground/10' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 px-8'>
        {filteredPrompts.map((prompt, index) => (
          <PromptCard key={index} {...prompt} />
        ))}
      </div>
    </div>
  );
};
