import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import SignUp from './pages/SignUp/SignUp.tsx';
import AllPosts from './pages/AllPosts/AllPosts.tsx';
import AddPost from './pages/AddPost/AddPost.tsx';
import EditPost from './pages/EditPost/EditPost.tsx';
import Post from './pages/Post/Post.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute isAuthRequired={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <ProtectedRoute isAuthRequired={false}>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <ProtectedRoute isAuthRequired={true}>
            <AllPosts />
          </ProtectedRoute>
        ),
      },
      {
        path: '/add-post',
        element: (
          <ProtectedRoute isAuthRequired={true}>
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit-post:slug',
        element: (
          <ProtectedRoute isAuthRequired={true}>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <ProtectedRoute isAuthRequired={true}>
            <Post />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
