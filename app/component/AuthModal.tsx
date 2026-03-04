"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Login from "./Login";
import { useState, ReactNode } from "react";
import { signIn } from "next-auth/react";
import { Git } from "griddy-icons";

const AuthModal = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? children : <Button variant="outline">Login</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-700">
        <DialogHeader className="text-center">
          <DialogTitle>Welcome to TaskFlow</DialogTitle>
          <DialogDescription>Manage your tasks with ease</DialogDescription>
        </DialogHeader>
        <Button
          variant="default"
          className="bg-[#131316] text-white p-2"
          onClick={() => {
            signIn("github");
          }}
        >
          <Github className="mr-2 h-4 w-4" /> Continue with Github
        </Button>
        <DialogFooter className="justify-between"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
