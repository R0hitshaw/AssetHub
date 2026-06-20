import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between gradient-brand p-12 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20 backdrop-blur">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="2 0 30 32"
              class="h-5 w-5"
            >
              <path d="M16 0 L32 6 L32 20 Q32 29 16 32 Q0 29 0 20 L0 6 Z" fill="#1E3A8A"/>
              <path d="M16 2.5 L29.5 7.5 L29.5 20 Q29.5 27.5 16 30.5 Q2.5 27.5 2.5 20 L2.5 7.5 Z" fill="#2563EB"/>
              <line x1="7"  y1="13" x2="25" y2="13" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
              <line x1="7"  y1="20" x2="25" y2="20" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
              <line x1="10.5" y1="10" x2="10.5" y2="23" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
              <line x1="16"   y1="9"  x2="16"   y2="24" stroke="#BFDBFE" stroke-width="1.2" stroke-linecap="round"/>
              <line x1="21.5" y1="10" x2="21.5" y2="23" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
              <circle cx="10.5" cy="13" r="2.2" fill="#FFFFFF" stroke="none"/>
              <circle cx="10.5" cy="13" r="1.1" fill="#2563EB" stroke="none"/>
              <circle cx="16"   cy="13" r="2.2" fill="#60A5FA" stroke="none"/>
              <circle cx="16"   cy="13" r="1.1" fill="#1E3A8A" stroke="none"/>
              <circle cx="21.5" cy="13" r="2.2" fill="#FFFFFF" stroke="none"/>
              <circle cx="21.5" cy="13" r="1.1" fill="#2563EB" stroke="none"/>
              <circle cx="10.5" cy="20" r="2.2" fill="#60A5FA" stroke="none"/>
              <circle cx="10.5" cy="20" r="1.1" fill="#1E3A8A" stroke="none"/>
              <circle cx="16"   cy="20" r="3"   fill="#FFFFFF" stroke="none"/>
              <circle cx="16"   cy="20" r="1.5" fill="#2563EB" stroke="none"/>
              <circle cx="21.5" cy="20" r="2.2" fill="#60A5FA" stroke="none"/>
              <circle cx="21.5" cy="20" r="1.1" fill="#1E3A8A" stroke="none"/>
            </svg>
          </div>
          <span className="text-xl font-bold">AssetHub</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight mb-4">
            IT Asset Management<br />System
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Track, manage, and optimize your organization's IT assets with intelligent insights and streamlined workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-lg bg-primary-foreground/10 p-4 backdrop-blur">
            <p className="text-2xl font-bold">2,847</p>
            <p className="text-primary-foreground/70">Assets Tracked</p>
          </div>
          <div className="rounded-lg bg-primary-foreground/10 p-4 backdrop-blur">
            <p className="text-2xl font-bold">98.5%</p>
            <p className="text-primary-foreground/70">Uptime</p>
          </div>
          <div className="rounded-lg bg-primary-foreground/10 p-4 backdrop-blur">
            <p className="text-2xl font-bold">$1.2M</p>
            <p className="text-primary-foreground/70">Assets Value</p>
          </div>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-md gradient-brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="2 0 28 32"
                  class="h-5 w-5"
                >
                  <path d="M16 0 L32 6 L32 20 Q32 29 16 32 Q0 29 0 20 L0 6 Z" fill="#1E3A8A"/>
                  <path d="M16 2.5 L29.5 7.5 L29.5 20 Q29.5 27.5 16 30.5 Q2.5 27.5 2.5 20 L2.5 7.5 Z" fill="#2563EB"/>
                  <line x1="7"  y1="13" x2="25" y2="13" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
                  <line x1="7"  y1="20" x2="25" y2="20" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
                  <line x1="10.5" y1="10" x2="10.5" y2="23" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
                  <line x1="16"   y1="9"  x2="16"   y2="24" stroke="#BFDBFE" stroke-width="1.2" stroke-linecap="round"/>
                  <line x1="21.5" y1="10" x2="21.5" y2="23" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
                  <circle cx="10.5" cy="13" r="2.2" fill="#FFFFFF" stroke="none"/>
                  <circle cx="10.5" cy="13" r="1.1" fill="#2563EB" stroke="none"/>
                  <circle cx="16"   cy="13" r="2.2" fill="#60A5FA" stroke="none"/>
                  <circle cx="16"   cy="13" r="1.1" fill="#1E3A8A" stroke="none"/>
                  <circle cx="21.5" cy="13" r="2.2" fill="#FFFFFF" stroke="none"/>
                  <circle cx="21.5" cy="13" r="1.1" fill="#2563EB" stroke="none"/>
                  <circle cx="10.5" cy="20" r="2.2" fill="#60A5FA" stroke="none"/>
                  <circle cx="10.5" cy="20" r="1.1" fill="#1E3A8A" stroke="none"/>
                  <circle cx="16"   cy="20" r="3"   fill="#FFFFFF" stroke="none"/>
                  <circle cx="16"   cy="20" r="1.5" fill="#2563EB" stroke="none"/>
                  <circle cx="21.5" cy="20" r="2.2" fill="#60A5FA" stroke="none"/>
                  <circle cx="21.5" cy="20" r="1.1" fill="#1E3A8A" stroke="none"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-foreground">AssetHub</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>

              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign in
            </Button>
          </form>


        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
