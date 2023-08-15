import { useQuery, useQueryClient, useMutation, } from '@tanstack/react-query';
import axios from 'axios';
export interface Post{
    id: number;
    title: string;
    body: string;
}
export interface Error {
    message: string;
}
function PostsPage() {
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            return response.data;
            // fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())})
        }
    });

    const newPost = useMutation({
        mutationKey: ['newpost'],
        mutationFn: async (user: Post) => {
            const response = await axios.post('https://jsonplaceholder.typicode.com/post', user);
            return response.data;
        },
        onSuccess: () => {
            console.log('New user created');
            queryClient.invalidateQueries(['users']);
        }
    });
    function handleNewPostCreate(){
        newPost.mutate({
            id: 11,
            body: 'lorem ipsum dolor sit amet consectetur adipisicing elit.',
            title: 'Lorem ipsum dolor sit amet.'
        });
    }
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{(error as Error).message}</div>
    return (
        <div>
            <div>
            <a style={{cursor:'pointer'}} href="/">Users</a>

                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', alignItems: 'center'}}>
                    <h1>Posts</h1>
                    <button onClick={handleNewPostCreate} style={{backgroundColor: 'blue'}}>Add new Post</button>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                {
                    data.map((post: Post) => (
                        <div style={{padding: '10px', margin:'10px',width: '400px', border:'1px solid white'}} key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PostsPage;