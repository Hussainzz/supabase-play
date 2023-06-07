import './App.css'
import MessageBoard from './MessageBoard';
import AllPosts from './AllPosts';
import {PostView} from './Post';
import { Welcome, welcomeLoader } from './Welcome';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { createContext } from 'react';
import { SupashipUserInfo, useSession } from './use-session';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />,
          },
          {
            path: "post/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
        loader: welcomeLoader,
      },
    ],
  },
]);

export const UserContext = createContext<SupashipUserInfo>({
  session: null,
  profile: null,
});

function App() {
    return <RouterProvider router={router} />
}

export default App

function Layout(){
  const supashipUserInfo = useSession();
  return (
    <UserContext.Provider value={supashipUserInfo}>
      <NavBar />
      <Outlet />
    </UserContext.Provider>
  );
}