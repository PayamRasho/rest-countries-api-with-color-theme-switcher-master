import React from "react";

const Header = () => {
const changeTheme =()=>{
  const moon = document.querySelector('.fa-moon')
  const header = document.querySelector('.header')
  moon.addEventListener('click', ()=>{
    document.body.classList.toggle('light-theme')
    header.classList.toggle('light-theme')
  })
}
  return (
    <>
      <header className="header">
        <div>
          <h1>Where in the world?</h1>
        </div>
        <i className="fas fa-moon" onClick={changeTheme} ></i>
      
      </header>
    </>
  );
};

export default Header;
