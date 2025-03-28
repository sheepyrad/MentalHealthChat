import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import { Github, Mail, Laptop, LogIn } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Signup form schema
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Signup form
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle login form submission
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate authentication (would connect to backend in a real app)
    setTimeout(() => {
      setIsLoading(false);
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      // Show success message
      toast({
        title: "Login successful",
        description: "Welcome back to MentalHealthChat",
      });
      // Redirect to dashboard page
      navigate("/dashboard");
    }, 1500);
  };

  // Handle signup form submission
  const onSignupSubmit = (values: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    
    // Simulate account creation (would connect to backend in a real app)
    setTimeout(() => {
      setIsLoading(false);
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      // Show success message
      toast({
        title: "Account created",
        description: "Welcome to MentalHealthChat",
      });
      // Redirect to dashboard page
      navigate("/dashboard");
    }, 1500);
  };

  // Handle OAuth login
  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate OAuth authentication (would connect to an OAuth provider in a real app)
    setTimeout(() => {
      setIsLoading(false);
      // Store authentication state
      localStorage.setItem("isAuthenticated", "true");
      // Show success message
      toast({
        title: "Login successful",
        description: `Logged in with ${provider}`,
      });
      // Redirect to dashboard page
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-mental-50">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to MentalHealthChat</h1>
            <p className="text-calm-600">Your personal mental wellness companion</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Form */}
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="youremail@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-mental-500 hover:bg-mental-600" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login with Email"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('Google')}
                    disabled={isLoading}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('Microsoft')}
                    disabled={isLoading}
                  >
                    <Laptop className="h-4 w-4 mr-2" />
                    MS
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('GitHub')}
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Sign Up Form */}
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="youremail@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-mental-500 hover:bg-mental-600" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up with Email"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('Google')}
                    disabled={isLoading}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('Microsoft')}
                    disabled={isLoading}
                  >
                    <Laptop className="h-4 w-4 mr-2" />
                    MS
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleOAuthLogin('GitHub')}
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
