import React from "react";
import { Carousel } from "antd";

import img1 from "@/assets/Imgs_carousel/slider1.webp?url";
import img2 from "@/assets/Imgs_carousel/slider2.webp?url";
import img3 from "@/assets/Imgs_carousel/slider3.webp?url";
import img4 from "@/assets/Imgs_carousel/slider4.webp?url";



const Carrucel: React.FC = () => (
  <div className="w-full max-w-[1920px] mx-auto">
    <Carousel arrows autoplay={true} className="w-full">
      <div>
        <h3 className="w-full h-full">
          <img src={img1} alt="" className="w-full h-auto object-cover" />
        </h3>
      </div>
      <div>
        <h3 className="w-full h-full">
          <img src={img2} alt="" className="w-full h-auto object-cover" />
        </h3>
      </div>
      <div>
        <h3 className="w-full h-full">
          <img src={img3} alt="" className="w-full h-auto object-cover" />
        </h3>
      </div>
      <div>
        <h3 className="w-full h-full">
          <img src={img4} alt="" className="w-full h-auto object-cover" />
        </h3>
      </div>
    </Carousel>
    <br />
    {/* <Carousel arrows dotPosition="left" infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel> */}
  </div>
);

export default Carrucel;
