import React from 'react';

const Header = () => {
    return (
        <>
            <header className="py-4 lg:py-8 md:px-10">
                <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
                    <div className="flex items-center justify-center lg:justify-start">
                        <img src="./logo-adcash.svg" alt="Adcash Logo" className="w-36 lg:w-48" />
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="uppercase text-lg lg:text-2xl font-semibold">Blog Website</p>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
