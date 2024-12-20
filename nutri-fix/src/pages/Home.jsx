import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "../components/ui/button"
import {
  User,
  Settings,
  Calendar,
  TrendingUp,
  PieChart,
  Users,
  Bell,
  MessageSquare,
  ShoppingCart,
  Smartphone,
  Lock,
  Star,
  ChevronDown,
  Apple,
  Carrot,
  Fish,
  Egg,
  Coffee,
  CheckCircle,

} from 'lucide-react'

const FeatureCard = ({ icon: Icon, title, description, onClick }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
    <Icon className="h-12 w-12 text-green-600 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
)

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

const FeatureModal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      {children}
    </div>
  </div>
)

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(null)

  const features = [

    {
      icon: User,
      title: "User Profile & Personalization",
      description: "Manage your personal information and customize your experience",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=100&width=100" alt="User Avatar" className="rounded-full" />
            <div>
              <h3 className="font-semibold">Parth Kairamkonda</h3>
              <p className="text-sm text-gray-600">parth122004@gmail.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="175 cm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="70 kg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Maintain Weight</option>
            </select>
          </div>
          <Button className="w-full">Save Changes</Button>
        </div>
      )
    },
    {
      icon: Calendar,
      title: "Meal Planning & Recommendations",
      description: "Plan your meals and get personalized recommendations",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center font-semibold">{day}</div>
            ))}
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="bg-green-100 p-2 rounded">
                <div className="text-xs text-green-800">Breakfast</div>
                <div className="text-sm">Oatmeal</div>
              </div>
            ))}
          </div>
          <Button className="w-full">Generate Meal Plan</Button>
        </div>
      )
    },
    {
      icon: PieChart,
      title: "Calorie & Nutrition Tracking",
      description: "Monitor your daily intake and nutritional balance",
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Today's Summary</h3>
            <span className="text-sm text-gray-600">1500 / 2000 kcal</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold">Protein</div>
              <div className="text-sm text-gray-600">75g / 100g</div>
            </div>
            <div>
              <div className="font-semibold">Carbs</div>
              <div className="text-sm text-gray-600">200g / 250g</div>
            </div>
            <div>
              <div className="font-semibold">Fat</div>
              <div className="text-sm text-gray-600">50g / 65g</div>
            </div>
          </div>
          <Button className="w-full">Log Food</Button>
        </div>
      )
    },
    {
      icon: Settings,
      title: "Dietary Restrictions & Preferences",
      description: "Set your dietary needs and food preferences",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
            <div className="mt-2 space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Lactose-Free', 'Nut Allergy'].map((diet) => (
                <label key={diet} className="inline-flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 shadow-sm" />
                  <span className="ml-2">{diet}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cuisine Preferences</label>
            <select multiple className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Italian</option>
              <option>Mexican</option>
              <option>Japanese</option>
              <option>Indian</option>
              <option>Mediterranean</option>
            </select>
          </div>
          <Button className="w-full">Save Preferences</Button>
        </div>
      )
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking & Analytics",
      description: "Monitor your health and fitness progress",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Weight Progress</h3>
            <div className="h-40 bg-white rounded-md"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Calories Burned</h3>
              <div className="text-2xl font-bold text-green-600">1,250 kcal</div>
              <div className="text-sm text-gray-600">This week</div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Workouts</h3>
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">This week</div>
            </div>
          </div>
          <Button className="w-full">View Detailed Analytics</Button>
        </div>
      )
    },
    {
      icon: Users,
      title: "Community & Social Features",
      description: "Connect with others and share your journey",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Community Challenge</h3>
            <p className="text-sm text-gray-600 mb-2">30-Day Healthy Eating Challenge</p>
            <div className="bg-green-200 h-4 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: '60%' }}></div>
            </div>
            <div className="text-right text-sm text-gray-600 mt-1">18 days left</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recent Posts</h3>
            <div className="space-y-2">
              {['Just completed my first 5K!', 'New healthy recipe to share', 'Looking for workout buddies'].map((post, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                  <p className="text-sm">{post}</p>
                  <div className="text-right text-xs text-gray-500 mt-1">2h ago</div>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full">Create Post</Button>
        </div>
      )
    },
    {
      icon: MessageSquare,
      title: "Expert Consultation & AI Chatbot",
      description: "Get advice from nutrition experts and our AI assistant",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">AI Nutrition Assistant</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded-md">
                <p className="text-sm">How can I increase my protein intake?</p>
              </div>
              <div className="bg-green-100 p-2 rounded-md">
                <p className="text-sm">To increase your protein intake, try incorporating more lean meats, fish, eggs, legumes, and dairy products into your diet. You can also consider protein supplements like whey or plant-based protein powders.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Expert Consultations</h3>
            <div className="space-y-2">
              {['Dr. Smith - Nutritionist', 'Coach Johnson - Fitness Trainer', 'Chef Lee - Healthy Cooking Expert'].map((expert, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                  <span>{expert}</span>
                  <Button variant="outline" size="sm">Book</Button>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full">Start Chat</Button>
        </div>
      )
    },
    {
      icon: ShoppingCart,
      title: "Shopping & Grocery List Management",
      description: "Create and manage your grocery lists",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">This Week's Grocery List</h3>
            <ul className="space-y-2">
              {['Chicken breast', 'Broccoli', 'Brown rice', 'Greek yogurt', 'Almonds'].map((item, index) => (
                <li key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-2">
            <input type="text" className="flex-grow rounded-md border-gray-300 shadow-sm" placeholder="Add item..." />
            <Button>Add</Button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recommended Items</h3>
            <ul className="space-y-1">
              {['Quinoa', 'Avocado', 'Spinach', 'Salmon'].map((item, index) => (
                <li key={index} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
          </div>
          <Button className="w-full">Generate Shopping List</Button>
        </div>
      )
    },
    {
      icon: Smartphone,
      title: "Integration & Connectivity",
      description: "Connect with fitness devices and other health apps",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Connected Devices</h3>
            <ul className="space-y-2">
              {['Fitbit Versa 3', 'Apple Watch Series 6', 'Withings Body+ Scale'].map((device, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                  <span>{device}</span>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Connected Apps</h3>
            <ul className="space-y-2">
              {['MyFitnessPal', 'Strava', 'Apple Health'].map((app, index) => (
                <li key={index} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm">
                  <span>{app}</span>
                  <Button variant="outline" size="sm">Disconnect</Button>
                </li>
              ))}
            </ul>
          </div>
          <Button className="w-full">Connect New Device/App</Button>
        </div>
      )
    },
    {
      icon: Bell,
      title: "Notifications & Reminders",
      description: "Set up alerts for meals, workouts, and more",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Notification Settings</h3>
            <ul className="space-y-2">
              {['Meal reminders', 'Water intake reminders', 'Workout reminders', 'Weekly progress summary'].map((setting, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{setting}</span>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Custom Reminders</h3>
            <div className="space-y-2">
              <input type="text" className="w-full rounded-md border-gray-300 shadow-sm" placeholder="Reminder text" />
              <input type="time" className="w-full rounded-md border-gray-300 shadow-sm" />
              <Button className="w-full">Add Reminder</Button>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Lock,
      title: "Data Security & Privacy",
      description: "Manage your data and privacy settings",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Privacy Settings</h3>
            <ul className="space-y-2">
              {['Share progress with friends', 'Allow data usage for personalization', 'Participate in anonymous research'].map((setting, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{setting}</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data Management</h3>
            <Button className="w-full mb-2">Download My Data</Button>
            <Button className="w-full" variant="destructive">Delete My Account</Button>
          </div>
          <p className="text-sm text-gray-600">We take your privacy seriously. Read our <a href="#" className="text-green-600 hover:underline">Privacy Policy</a> to learn more.</p>
        </div>
      )
    },
    {
      icon: Star,
      title: "Premium Features",
      description: "Unlock advanced features and personalized coaching",
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
            <p className="text-sm mb-4">Get access to all premium features and personalized coaching.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Advanced analytics</li>
              <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Personalized meal plans</li>
              <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> 1-on-1 expert consultations</li>
              <li className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Ad-free experience</li>
            </ul>
            <Button className="w-full bg-white text-yellow-600 hover:bg-gray-100">Upgrade Now</Button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Current Plan: Free</h3>
            <p className="text-sm text-gray-600">Upgrade to unlock all features and get personalized support on your health journey.</p>
          </div>
        </div>
      )
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-lime-200">
      {/* <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <NutritionIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-green-800">Nutri-fix</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="#" className="text-green-800 hover:text-green-600">Dashboard</Link>
            <Link to="#" className="text-green-800 hover:text-green-600">Meal Plans</Link>
            <Link to="#" className="text-green-800 hover:text-green-600">Community</Link>
            <Link to="#" className="text-green-800 hover:text-green-600">Analytics</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-green-800 cursor-pointer" />
            <User className="h-6 w-6 text-green-800 cursor-pointer" />
          </div>
        </div>
      </header> */
      }

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome back, User!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={() => setActiveFeature(feature)}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Today's Nutrition Summary</h2>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Calorie Intake</h3>
              <span className="text-2xl font-bold text-green-600">1,500 / 2,000 kcal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Apple className="h-8 w-8 mx-auto text-red-500 mb-2" />
                <div className="font-semibold">Carbs</div>
                <div className="text-sm text-gray-600">180g / 250g</div>
              </div>
              <div>
                <Fish className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="font-semibold">Protein</div>
                <div className="text-sm text-gray-600">90g / 120g</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Log Your Meal</h3>
              <p className="text-gray-600 mb-4">Quickly log your latest meal to stay on track.</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Log Meal</Button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Start a Workout</h3>
              <p className="text-gray-600 mb-4">Begin your daily exercise routine.</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Start Workout</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white/90 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">&copy; 2024 Nutri-fix. All rights reserved.</p>
            </div>
            <nav className="flex space-x-4">
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">Privacy Policy</Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">Terms of Service</Link>
              <Link to="#" className="text-sm text-gray-600 hover:text-green-600">Contact Us</Link>
            </nav>
          </div>
        </div>
      </footer>

      {activeFeature && (
        <FeatureModal
          title={activeFeature.title}
          onClose={() => setActiveFeature(null)}
        >
          {activeFeature.content}
        </FeatureModal>
      )}

      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3">
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3">
          <Bell className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}