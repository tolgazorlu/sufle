import { BrainCircuit } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='h-16 w-full px-8 border-b'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='text-xl font-bold font-orbitron text-primary hover:opacity-80 transition-opacity flex items-center gap-2'
          >
            <BrainCircuit />
            sufle
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm' variant='secondary'>
            Login with OCID
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
