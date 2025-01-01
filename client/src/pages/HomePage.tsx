import { useSearchStore } from "@/store/search-store";
import PromptCard from "@/components/prompt-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCallback } from "react";
import { useDebounce } from "@/hooks/use-debounce";

// Mock data for demonstration
const mockPrompts = [
  {
    title: "GPT-4 Story Writer",
    description: "Create engaging stories with complex characters",
    content: "You are a professional story writer...",
    price: 50,
    categories: ["Creative Writing", "Fiction"],
  },
  // Add more mock prompts...
];

export const HomePage = () => {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const searchQuery = useSearchStore((state) => state.searchQuery);

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
    <div className='container flex flex-col gap-4 py-4 px-8'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Search Prompts</h2>
        <div className='relative max-w-xl'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            className='w-full pl-8'
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
