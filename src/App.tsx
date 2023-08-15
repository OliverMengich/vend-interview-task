import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path:'/',
      element: <UsersPage/>,
      children:[]
    },
    {
      path:'/posts',
      element: <PostsPage/>,
    }
   ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
