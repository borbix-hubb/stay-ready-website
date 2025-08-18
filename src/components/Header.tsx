import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Stay Ready
        </Link>
        
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="space-x-1 sm:space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/" ? "bg-accent" : ""
                )}
                asChild
              >
                <Link to="/">หน้าแรก</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/courses" ? "bg-accent" : ""
                )}
                asChild
              >
                <Link to="/courses">คอร์สเรียน</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/portfolio" ? "bg-accent" : ""
                )}
                asChild
              >
                <Link to="/portfolio">ผลงาน</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/contact" ? "bg-accent" : ""
                )}
                asChild
              >
                <Link to="/contact">ติดต่อเรา</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/dashboard" ? "bg-accent" : ""
                  )}
                  asChild
                >
                  <Link to="/dashboard">แดชบอร์ด</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/" ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                หน้าแรก
              </Link>
              
              <Link 
                to="/courses" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/courses" ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                คอร์สเรียน
              </Link>
              
              <Link 
                to="/portfolio" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/portfolio" ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                ผลงาน
              </Link>
              
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                  location.pathname === "/contact" ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                ติดต่อเรา
              </Link>
              
              {user && (
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium px-4 py-2 rounded-md transition-colors",
                    location.pathname === "/dashboard" ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  แดชบอร์ด
                </Link>
              )}
              
              <div className="border-t border-border pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      สวัสดี, {user.email?.split('@')[0] || 'ผู้ใช้'}
                    </div>
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      variant="ghost" 
                      className="w-full justify-start px-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      ออกจากระบบ
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start px-4">
                        เข้าสู่ระบบ
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full justify-start px-4">
                        สมัครสมาชิก
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">สวัสดี, คุณ {user.email?.split('@')[0] || 'ผู้ใช้'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    แดชบอร์ด
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-sm" asChild>
                <Link to="/auth">เข้าสู่ระบบ</Link>
              </Button>
              <Button size="sm" className="text-sm" asChild>
                <Link to="/auth">สมัครสมาชิก</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;