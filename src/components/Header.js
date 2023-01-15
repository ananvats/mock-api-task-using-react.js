import React from 'react';
import "./table.css";

const Header = () => {
  return (
    <div style={{fontSize: 14, fontWeight:'600'}}>
        <p><span><a href="/">Home</a></span> {'>'} <span><a href="/">Administrator</a></span> {'>'}<span style={{color:'#c4c4c4'}}>Logger Search</span></p>
    </div>
  )
}

export default Header;