import React from 'react'

function Header() {
  return (
    <div>
      

    <header id="main-header" class="bg-gray-800 text-white fixed w-full top-0 z-50 transition-all duration-300">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between py-4">
                <div class="flex items-center">
                  
                    <h1 class="text-xl font-bold">MyCompany</h1>
                </div>
                <button id="menu-toggle" class="md:hidden focus:outline-none z-50">
                    <svg id="menu-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                    <svg id="close-icon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <nav id="main-nav" class="fixed inset-y-0 right-0 transform translate-x-full md:relative md:translate-x-0 bg-gray-800 md:bg-transparent w-64 md:w-auto h-full md:h-auto overflow-y-auto md:overflow-visible transition-transform duration-300 ease-in-out md:transition-none">
                    <ul class="pt-16 md:pt-0 px-4 md:px-0 md:flex space-y-2 md:space-y-0 md:space-x-4">
                        <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 transition duration-200">Home</a></li>
                        <li class="relative group">
                            <a href="#" class="block py-2 md:py-0 hover:text-gray-300 transition duration-200 flex items-center justify-between">
                                Products
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </a>
                            <ul class="hidden mt-2 space-y-2 bg-gray-700 md:bg-white text-white md:text-gray-800 rounded shadow-lg md:absolute md:left-0 w-full md:w-48">
                                <li><a href="#" class="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200">Electronics</a></li>
                                <li><a href="#" class="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200">Clothing</a></li>
                                <li><a href="#" class="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200">Home & Garden</a></li>
                                <li><a href="#" class="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200">Sports & Outdoors</a></li>
                            </ul>
                        </li>
                        <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 transition duration-200">About</a></li>
                        <li><a href="#" class="block py-2 md:py-0 hover:text-gray-300 transition duration-200">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    

    

     

    </div>
  )
}

export default Header
