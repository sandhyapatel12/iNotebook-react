import React from 'react';

const UpArrow = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-5 right-5 bg-blue-700 rounded-md ">
      <button onClick={scrollToTop} className=" text-white p-2 ">
        <i className="fa-solid fa-angle-up text-2xl w-6 h-6 text-white bg-blue-700"></i>
      </button>
    </div>
  );
};

export default UpArrow;
