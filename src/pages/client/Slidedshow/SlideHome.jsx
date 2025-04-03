import React from 'react';
import "./SlideHome.css" ;
function SlideHome({data}) {
  
    
    return (
        <div className="rent">
            <div className="box">
                {data.map((image, index) => (
                    <span key={index} style={{ "--i": index + 1 }}>
                        <img src={image.imgUrl} alt={`Slide ${index + 1}`} />
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SlideHome;