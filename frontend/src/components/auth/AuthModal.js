import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthModal = ({ open, onOpenChange, onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful!');
      onAuthSuccess(response.data.user);
      onOpenChange(false);
      setLoginData({ email: '', password: '' });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/auth/register`, {
        email: registerData.email,
        password: registerData.password,
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Registration successful!');
      onAuthSuccess(response.data.user);
      onOpenChange(false);
      setRegisterData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle>Welcome to ZynLoft Solutions</DialogTitle>
          <DialogDescription>
            Login to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
            <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  data-testid="login-email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  data-testid="login-password-input"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              <Button
                data-testid="login-submit-button"
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  data-testid="register-email-input"
                  type="email"
                  placeholder="you@example.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  data-testid="register-password-input"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  data-testid="register-confirm-password-input"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button
                data-testid="register-submit-button"
                type="submit"
                className="w-full bg-secondary hover:bg-secondary-hover"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;