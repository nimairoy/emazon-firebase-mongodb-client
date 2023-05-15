import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Layout/Home'
import Shop from './components/Shop/Shop'
import Orders from './components/Orders/Orders'
import Inventory from './components/Inventory/Inventory'
import Login from './components/Login/Login'
import cartProductsLoaders from './Loaders/cartProductsLoader'
import CheckOut from './components/CheckOut/CheckOut'
import SignUp from './components/SignUp/SignUp'
import AuthProvider from './AuthProvider/AuthProvider'
import PrivateRoute from './Routes/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Shop />,
        loader: ()=> fetch('http://localhost:5000/totalProducts')
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: cartProductsLoaders
      },
      {
        path: '/inventory',
        element: <PrivateRoute><Inventory /></PrivateRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/checkout',
        element: <PrivateRoute><CheckOut /></PrivateRoute>
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
