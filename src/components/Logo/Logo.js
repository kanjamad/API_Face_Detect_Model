import React from 'react';
import Tilt from 'react-tilt';
import spring from './spring.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'> {/*-tahyons; that's margin top to zero-*/}
      <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} alt='logo' src={spring}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;