import { User } from '../pages/UsersPage';
interface Props extends User{
    // open: boolean;
    // setOpen: (open: boolean) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    onSubmitEdited: (id: number)=>void
    handleCloseModal: ()=> void
}
// const InputStyle=({name}:{name: string})=>(
//     <input style={{outline: 'none',color: 'black', padding: '10px', backgroundColor:'#f5f5f5', border: '1px solid black'}} type="text" name="name" id="name" defaultValue={name}/>
// )
function ModaleditComponent({email,onSubmitEdited,handleCloseModal, onChange, id, name,phone}: Props) {
    return (
        <div style={{width: '400px',alignItems: 'center', position: 'absolute', left: '30%', top:30, height: '500px', paddingTop: '20px', backgroundColor: '#fff'}}>
           <form onSubmit={()=>onSubmitEdited(id)}>   
           <h1>Edit user</h1>
                <div style={{margin: '10px'}}>
                    <label style={{color: 'black', display: 'block'}} htmlFor="name">Id: </label>
                    <input readOnly style={{outline: 'none',color: 'black', padding: '10px', backgroundColor:'#f5f5f5', border: '1px solid black'}} type="text" name="id" id="id" defaultValue={id} />
                </div>
                <div style={{margin: '10px'}}>
                    <label style={{color: 'black', display: 'block'}} htmlFor="name">Name</label>
                    <input value={name} onChange={onChange} style={{outline: 'none',color: 'black', padding: '10px', backgroundColor:'#f5f5f5', border: '1px solid black'}} type="text" name="name" id="name" />
                </div>
                <div style={{margin: '10px'}}>
                    <label style={{color: 'black', display: 'block'}} htmlFor="email">Email</label>
                    <input value={email} style={{outline: 'none',color: 'black', padding: '10px', backgroundColor:'#f5f5f5', border: '1px solid black'}} type="email" name="email" id="email" />
                </div>
                <div style={{margin: '10px'}}>
                    <label style={{color: 'black', display: 'block'}} htmlFor="phone">Phone</label>
                    <input value={phone} style={{outline: 'none',color: 'black', padding: '10px', backgroundColor:'#f5f5f5', border: '1px solid black'}} type="text" name="phone" id="phone" />
                </div>
                <div style={{margin: '10px', display: 'flex', alignItems: 'center'}}>

                    <button style={{backgroundColor: 'blue', marginRight:'10px'}} type='submit'>Submit</button>
                    <button onClick={handleCloseModal} style={{backgroundColor: 'red'}} type='button'>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default ModaleditComponent;