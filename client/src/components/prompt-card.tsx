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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PromptCardProps {
  title: string;
  description: string;
  content: string;
  price: number;
  categories: string[];
  user: {
    name: string;
    avatar: string;
    job: string;
  };
}

const PromptCard = ({
  title,
  description,
  content,
  price,
  categories,
  user,
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
      <CardHeader className='px-2 py-2 border-b bg-secondary/20 rounded-t-xl'>
        <div className='flex gap-1 justify-between items-center flex-row'>
          <div className='flex gap-1 items-center justify-start'>
            {categories.map((category, index) => (
              <Badge
                className='bg-secondary text-secondary-foreground shadow-none'
                key={index}
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className='flex gap-1'>
            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6'
              onClick={handleCopy}
            >
              <Copy
                className={`h-2 w-2 ${
                  copied ? "text-green-500" : "text-gray-500"
                }`}
              />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline' size='icon' className='h-6 w-6'>
                  <Expand className='h-2 w-2 text-gray-500' />
                </Button>
              </DialogTrigger>
              <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className='mt-4'>
                  <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='text-sm font-medium'>{user.name}</span>
                        <span className='text-xs text-muted-foreground'>
                          {user.job}
                        </span>
                      </div>
                    </div>
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
      </CardHeader>

      <CardContent className='px-4'>
        <CardTitle className='text-lg text-secondary-foreground font-bold mt-4'>
          {title}
        </CardTitle>
        <CardDescription className='text-sm text-secondary-foreground/60 font-medium'>
          {description}
        </CardDescription>
        <div className='space-y-2 mt-2'>
          <div className='text-sm bg-secondary/20 rounded-lg border-secondary text-secondary-foreground/60 p-3 overflow-y-auto max-h-48 whitespace-pre-wrap h-48 hover:bg-secondary transition-all duration-300 font-serif'>
            {content}
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex gap-4 px-4 justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>{user.name}</span>
            <span className='text-xs text-muted-foreground'>{user.job}</span>
          </div>
        </div>
        <Button onClick={handleBuy} variant='default'>
          Buy for {price} EDU
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
