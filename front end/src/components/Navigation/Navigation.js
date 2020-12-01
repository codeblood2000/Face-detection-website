import React from 'react';
import tachyons from 'tachyons';

const Navigation = ({OnRouteChange, isSignedIn}) => {
    if(isSignedIn){
    return (
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=>OnRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    );
    }else{
        return(
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p onClick={()=>OnRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={()=>OnRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
    </nav>);
    }
}

export default Navigation;
