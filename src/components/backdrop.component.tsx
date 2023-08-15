import React from "react";
interface Props{
    children: React.ReactNode
}
function BackdropComponent({children}:Props) {
    return (
        <div style={{width:'100vw',
            height:'100vh',
            position:'fixed',
            zIndex:'100',
            left:'0',
            top:'0',
            backgroundColor:'rgba(0,0,0,0.5)'
        }}>
            {children}
        </div>
    );
}

export default BackdropComponent;