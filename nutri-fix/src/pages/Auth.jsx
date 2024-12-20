import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, Carrot, Salad, Dumbbell, Bike, Leaf, Fish } from 'lucide-react'

const NutritionIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 9.5V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v5.5" />
    <path d="M2.5 9.5C2.5 10.3 3.7 11 5 11s2.5-.7 2.5-1.5" />
    <path d="M10 9.5c0 .8 1.2 1.5 2.5 1.5s2.5-.7 2.5-1.5" />
    <path d="M17.5 9.5c0 .8 1.2 1.5 2.5 1.5s2.5-.7 2.5-1.5" />
    <path d="M20 14c.7 0 1.4.1 2 .3V11l-2 .6-2-.6v3.3c.6-.2 1.3-.3 2-.3Z" />
    <path d="M12 14c.7 0 1.4.1 2 .3V11l-2 .6-2-.6v3.3c.6-.2 1.3-.3 2-.3Z" />
    <path d="M4 14c.7 0 1.4.1 2 .3V11l-2 .6-2-.6v3.3c.6-.2 1.3-.3 2-.3Z" />
    <path d="M4 18a2 2 0 0 1-2-2v-1.2A4 4 0 0 1 4 22a4 4 0 0 1 2-7.2V16a2 2 0 0 1-2 2Z" />
    <path d="M12 18a2 2 0 0 1-2-2v-1.2A4 4 0 0 1 12 22a4 4 0 0 1 2-7.2V16a2 2 0 0 1-2 2Z" />
    <path d="M20 18a2 2 0 0 1-2-2v-1.2A4 4 0 0 1 20 22a4 4 0 0 1 2-7.2V16a2 2 0 0 1-2 2Z" />
  </svg>
)

export default function Auth({ onLogin }) {
  const [activeTab, setActiveTab] = useState("login")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      onLogin()
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setRegisterError("")
    setRegisterSuccess(false)

    if (!registerName || !registerEmail || !registerPassword) {
      setRegisterError("All fields are required")
      return
    }

    if (registerPassword.length < 6) {
      setRegisterError("Password must be at least 6 characters long")
      return
    }

    setRegisterSuccess(true)
    setRegisterName("")
    setRegisterEmail("")
    setRegisterPassword("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-lime-200 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <Apple className="absolute top-10 left-10 h-12 w-12 text-green-600 opacity-20" />
        <Carrot className="absolute top-20 right-20 h-16 w-16 text-orange-400 opacity-20" />
        <Salad className="absolute bottom-10 left-20 h-20 w-20 text-green-500 opacity-20" />
        <Dumbbell className="absolute top-1/3 left-1/4 h-16 w-16 text-gray-600 opacity-20" />
        <Bike className="absolute bottom-1/4 right-1/4 h-20 w-20 text-blue-500 opacity-20" />
        <Leaf className="absolute top-1/2 right-10 h-14 w-14 text-green-700 opacity-20" />
        <Fish className="absolute bottom-20 right-20 h-16 w-16 text-blue-400 opacity-20" />
      </div>
      <div className="w-full max-w-md z-10">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <NutritionIcon className="h-10 w-10 text-green-600" />
            <h1 className="text-3xl font-bold text-green-800">Nutri-fix</h1>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    className="bg-white/50"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-white/50"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-white/50"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="hello@example.com"
                    className="bg-white/50"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"

                    className="bg-white/50"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                {registerError && (
                  <p className="text-red-500 text-sm">{registerError}</p>
                )}
                {registerSuccess && (
                  <p className="text-green-500 text-sm">Registration successful! You can now log in.</p>
                )}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 transition-colors">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-green-800 font-medium">Start your journey to better nutrition and fitness today!</p>
        </div>
      </div>
    </div>
  )
}