import { Copy, Expand } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";

interface PromptCardProps {
  title: string;
  description: string;
  content: string;
  price: number;
  categories: string[];
}

const PromptCard = ({
  title,
  description,
  content,
  price,
  categories,
}: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleBuy = async () => {
    // TODO: Implement buy functionality
    console.log("Buy prompt");
  };

  return (
    <div className='border rounded-md p-4 flex flex-col gap-2 relative'>
      <div className='absolute right-2 top-2 flex gap-2 z-10'>
        <Button
          variant='ghost'
          size='icon'
          className='hover:bg-muted'
          onClick={handleCopy}
        >
          <Copy
            className={`h-4 w-4 ${copied ? "text-green-500" : "text-gray-500"}`}
          />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' size='icon' className='hover:bg-muted'>
              <Expand className='h-4 w-4 text-gray-500' />
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className='mt-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='font-semibold'>Description</h3>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-muted-foreground'>
                    Price:
                  </span>
                  <span className='font-bold text-primary'>{price} EDU</span>
                </div>
              </div>
              <p className='text-sm text-muted-foreground mb-4'>
                {description}
              </p>

              <h3 className='font-semibold mb-2'>Example Prompt</h3>
              <div className='bg-muted rounded-lg p-4 whitespace-pre-wrap font-mono text-sm'>
                {content}
              </div>
            </div>
            <DialogFooter className='mt-6'>
              <Button onClick={handleBuy} className='w-full sm:w-auto'>
                Buy for {price} EDU
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category, index) => (
            <span
              key={index}
              className='text-xs px-2 py-1 rounded bg-foreground/10 text-muted-foreground font-medium'
            >
              {category}
            </span>
          ))}
        </div>
        <h2 className='text-lg font-bold text-gray-400'>{title}</h2>
      </div>
      <p className='text-sm text-gray-500'>{description}</p>
      <h3 className='text-sm text-gray-500'>Example Prompt:</h3>
      <article
        className='text-sm text-gray-500 px-4 py-2 border bg-muted rounded
          hover:text-white transition-all duration-300 
          overflow-y-auto max-h-48
          whitespace-pre-wrap font-mono'
      >
        {content}
      </article>
      <Button onClick={handleBuy} className='mt-4' variant='outline'>
        Buy for {price} EDU
      </Button>
    </div>
  );
};

export default PromptCard;