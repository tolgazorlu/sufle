import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className='h-16 w-full px-8 border-b'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-2'>
          <span className='text-xl font-bold font-orbitron'>sufle.xyz</span>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm'>Login with OCID</Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
