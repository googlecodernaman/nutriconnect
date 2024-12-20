import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { User, Bell } from 'lucide-react'

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

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <NutritionIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">Nutri-fix</h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/home" className="text-green-800 hover:text-green-600">Dashboard</Link>
              <Link to="/meal-plans" className="text-green-800 hover:text-green-600">Meal Plans</Link>
              <Link to="/community" className="text-green-800 hover:text-green-600">Community</Link>
              <Link to="/analytics" className="text-green-800 hover:text-green-600">Analytics</Link>
            </>
          ) : (
            <Link to="/auth" className="text-green-800 hover:text-green-600">Login / Register</Link>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <Bell className="h-6 w-6 text-green-800 cursor-pointer" />
              <User className="h-6 w-6 text-green-800 cursor-pointer" />
              <Button onClick={onLogout} variant="outline" size="sm">Logout</Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}