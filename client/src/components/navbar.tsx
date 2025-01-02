import {
  BrainCircuit,
  LifeBuoy,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Laptop,
  PanelRight,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "./ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const { ocAuth, OCId } = useOCAuth();
  const { setTheme } = useTheme();

  const handleLogin = async () => {
    await ocAuth.signInWithRedirect({
      state: "opencampus",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className='h-16 w-full px-8'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='text-xl font-bold font-orbitron text-primary hover:opacity-80 transition-opacity flex items-center gap-2'
          >
            <BrainCircuit strokeWidth={1.5} />
            sufle
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          {OCId ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' side='bottom' align='end'>
                <DropdownMenuLabel>{OCId}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/dashboard'>
                      <PanelRight className='mr-2 h-4 w-4' />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                      <span className=''>Theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          <Sun className='mr-2 h-4 w-4' />
                          <span>Light</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          <Moon className='mr-2 h-4 w-4' />
                          <span>Dark</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          <Laptop className='mr-2 h-4 w-4' />
                          <span>System</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy />
                  <span>Contribute</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button onClick={handleLogin} size='sm' variant='secondary'>
                Login with OCID
              </Button>
              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
