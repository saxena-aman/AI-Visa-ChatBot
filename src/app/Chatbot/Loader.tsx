import React from "react";

const Loader = () => {
  return (
    /* From Uiverse.io by Javierrocadev */
    <div className="flex flex-row gap-[2px]">
      <div className="w-[5px] h-[5px] rounded-full bg-black animate-bounceHigher [animation-delay:.1s]"></div>
      <div className="w-[5px] h-[5px] rounded-full bg-black animate-bounceHigher [animation-delay:.2s]"></div>
      <div className="w-[5px] h-[5px] rounded-full bg-black animate-bounceHigher [animation-delay:.3s]"></div>
      <div className="w-[5px] h-[5px] rounded-full bg-black animate-bounceHigher [animation-delay:.4s]"></div>
    </div>
  );
};

export default Loader;
