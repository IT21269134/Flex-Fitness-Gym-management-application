import React from 'react'

function Header() {
  return (
    <nav className='navbar has-background-dark' role='navigation' aria-label='main navigation'>
    <div className='navbar-brand'>
      <a href='/' className='navbar-item'>
        <img
          src='https://bulma.io/images/bulma-logo.png'
          alt='Logo'
          width='112'
          height='28'
        />
      </a>

      <a
        role='button'
        className={'navbar-burger burger'}
        aria-label='menu'
        aria-expanded='false'
        data-target='navbarBasicExample'
      >
        <span aria-hidden='true'></span>
        <span aria-hidden='true'></span>
        <span aria-hidden='true'></span>
      </a>
    </div>
    <div className="navbar-item field mt-2">
              <p className="control has-icons-right">
                <input className="input" type="search" placeholder="Search..."/>
                <span className="icon is-small is-right">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ddd" d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
                </span>
              </p>
            </div>
    <div id='navbarBasicExample' className='navbar-menu'>
      <div className='navbar-end'>
        <div className='navbar-item'>
          <a href='/' className='navbar-item has-text-white'>
            Home
          </a>
          <a href='/' className='navbar-item has-text-white'>
            Documentation
          </a>
          <a href='/' className='navbar-item has-text-white'>
            Documentation
          </a>
          <a href='/' className='navbar-item has-text-white'>
            Documentation
          </a>
          <a href='/' className='navbar-item has-text-white'>
            Documentation
          </a>
        </div>
      </div>
    </div>
  </nav>
  )
}


export default Header
