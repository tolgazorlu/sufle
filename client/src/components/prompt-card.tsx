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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

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
    <Card>
      <CardHeader className='px-2 py-2 '>
        <div className='flex gap-1 justify-between items-center flex-row'>
          <div className='flex gap-1 items-center justify-start'>
            {categories.map((category, index) => (
              <Badge variant={"secondary"} key={index}>
                {category}
              </Badge>
            ))}
          </div>
          <div className='flex gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8'
              onClick={handleCopy}
            >
              <Copy
                className={`h-4 w-4 ${
                  copied ? "text-green-500" : "text-gray-500"
                }`}
              />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
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
                      <span className='font-bold text-primary'>
                        {price} EDU
                      </span>
                    </div>
                  </div>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {description}
                  </p>

                  <h3 className='font-semibold mb-2'>Example Output:</h3>
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
        </div>

        <DropdownMenuSeparator />
      </CardHeader>

      <CardContent className='py-4'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className='space-y-2 mt-4'>
          <h3 className='text-sm font-medium'>Example Output:</h3>
          <div className='text-sm bg-muted rounded-lg p-4 overflow-y-auto max-h-48 whitespace-pre-wrap font-mono min-h-32'>
            {content}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleBuy} className='w-full'>
          Buy Prompt
        </Button>
      </CardFooter>

      {/* Action buttons in the top-right corner */}
    </Card>
  );
};

export default PromptCard;
