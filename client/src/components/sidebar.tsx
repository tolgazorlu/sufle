import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Store,
  PlusCircle,
  MessageSquare,
  Bell,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Dashboard
          </h2>
          <div className='space-y-1'>
            <Link to='/dashboard'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard") && "bg-secondary"
                )}
              >
                <LayoutDashboard className='h-4 w-4' />
                Overview
              </button>
            </Link>
            <Link to='/dashboard/prompts'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard/prompts") && "bg-secondary"
                )}
              >
                <Store className='h-4 w-4' />
                My Prompts
              </button>
            </Link>
            <Link to='/create-prompt'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/create-prompt") && "bg-secondary"
                )}
              >
                <PlusCircle className='h-4 w-4' />
                Create Prompt
              </button>
            </Link>
          </div>
        </div>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Settings
          </h2>
          <div className='space-y-1'>
            <Link to='/dashboard/messages'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard/messages") && "bg-secondary"
                )}
              >
                <MessageSquare className='h-4 w-4' />
                Messages
              </button>
            </Link>
            <Link to='/dashboard/notifications'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard/notifications") && "bg-secondary"
                )}
              >
                <Bell className='h-4 w-4' />
                Notifications
              </button>
            </Link>
            <Link to='/dashboard/billing'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard/billing") && "bg-secondary"
                )}
              >
                <Wallet className='h-4 w-4' />
                Billing
              </button>
            </Link>
            <Link to='/dashboard/settings'>
              <button
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary/80",
                  isActive("/dashboard/settings") && "bg-secondary"
                )}
              >
                <Settings className='h-4 w-4' />
                Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
