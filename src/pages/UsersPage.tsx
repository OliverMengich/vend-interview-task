import {  useMutation, useQueryClient, useQuery, } from "@tanstack/react-query";
import axios from 'axios';
import { Error } from "./PostsPage";
import BackdropComponent from "../components/backdrop.component";
import { useState } from "react";
import ModaleditComponent from "../components/modal-edit.component";
export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}
const defaultUser = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    website: ''
}
function UsersPage() {
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError, error } = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            return response.data;
        }
    });
    const [selectedUser, setSelectedUser] = useState<User>(defaultUser);
    const queryClient = useQueryClient();
    const newUser = useMutation({
        mutationKey: ['newUser'],
        mutationFn: async (user: User) => {
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
            return response.data;
        },
        onSuccess: () => {
            console.log('New user created');
            queryClient.invalidateQueries(['users']);
        },
        onError:()=>{
            console.log('Error Encountered')
        }
    });
    // const deleteUser = useMutation({
    //     mutationKey: ['deleteUser'],
    //     mutationFn: async (id: number) => {
    //         const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    //         return response.data;
    //     },
    //     onSuccess: () => {
    //         console.log('User deleted');
    //         queryClient.invalidateQueries(['users']);
    //     }
    // });
    const editUser = useMutation({
        mutationKey: ['editUser'],
        mutationFn: async (user: User) => {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
            return response.data;
        }
    })
    function handleTextInputOnchange(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.name, e.target.value);
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value
        });
        console.log(selectedUser);
    }
    function handleNewUserCreate(){
        newUser.mutate({
            id: 11,
            name: 'Leanne Graham',
            email: 'leannegraham@gmail.com',
            phone: '4454-454-2356',
            website: 'www.leanne.com'
        });
    }
    function handleEditUser(id: number){
        setOpen(!open);
        const user = data.find((user: User) => user.id === id);
        console.log(user);
        if(user){
            setSelectedUser(user);
            editUser.mutate(selectedUser? selectedUser:{name:'',email:'',id:3,phone:'',website:''})
        }
    }
    function handleSubmitUser(){
        setOpen(!open);
        if(selectedUser.name.length>0){
            editUser.mutate(selectedUser? selectedUser:{name:'',email:'',id:3,phone:'',website:''})
        }
    }
    function handleCloseModal(){
        setOpen(!open)
        setSelectedUser(defaultUser)
    }
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{(error as Error).message}</div>
    return (
        <div>
            <a style={{cursor:'pointer'}} href="/posts">Posts</a>
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', alignItems: 'center'}}>
                <h1>Users</h1>
                <button onClick={handleNewUserCreate} style={{backgroundColor: 'blue'}}>Add new user</button>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                {
                    data.map((user: User)=> (
                        <div style={{padding: '10px', margin:'10px',width: '300px', border:'1px solid white'}} key={user.id}>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                            <p>{user.website}</p>
                            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%', alignItems: 'center'}}>
                                <button onClick={()=>handleEditUser(user.id)} style={{backgroundColor: 'blue'}}>Edit</button>
                                <button style={{backgroundColor: 'red'}}>Delete</button>
                            </div>
                            {/* <button onClick={() => mutate(user.id)}>Delete</button> */}
                        </div>
                    ))
                }
                {
                    open ?(
                        <div>
                            <BackdropComponent >
                                <ModaleditComponent 
                                    email={selectedUser?.email??''}
                                    name={selectedUser?.name??""}
                                    phone={selectedUser?.phone??''}
                                    website={selectedUser?.website??''}
                                    id={selectedUser?.id??1}
                                    onSubmitEdited={handleSubmitUser}
                                    handleCloseModal={handleCloseModal}
                                    onChange={handleTextInputOnchange} 
                                />
                            </BackdropComponent>
                        </div>
                    ):''

                }
            </div>
        </div>
    );
}

export default UsersPage;