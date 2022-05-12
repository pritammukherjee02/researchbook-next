import React from 'react'
import Link from 'next/link';

function AppBar({ currentPage, accentColor={ name: 'Blue', color: 'bg-blue-500 text-white', primary: 'bg-blue-500', hover: 'hover:bg-blue-600', hoverIcon: 'hover:text-blue-500 focus:text-blue-500', secondary: 'bg-blue-100', secondaryHover: 'hover:bg-blue-200', text: 'text-white', contentText: 'text-black', icon: 'text-blue-500' }, bgColor='bg-white' }) {

    return (
        <div className=''>
            <footer id="bottom-navigation" className={"block fixed inset-x-0 h-auto bottom-0 z-10  shadow lg:hidden border-t-2 " + bgColor}>
                <div id="tabs" className="flex justify-between">
                    <Link href='/'>

                        <div className={`w-full justify-center ${accentColor.hoverIcon} inline-block text-center pt-2 pb-1 ` + (currentPage == 'home' ? accentColor.icon : '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={ "h-6 w-6 inline-block mb-1" } viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <span className="tab tab-home block text-xs">Home</span>
                        </div>

                    </Link>
                    <Link href='/search'>

                        <div className={`w-full justify-center ${accentColor.hoverIcon} inline-block text-center pt-2 pb-1 ` + (currentPage == 'search' ? accentColor.icon : '')}>
                            <svg className={ "h-6 w-6 inline-block mb-1" } xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" fill="currentColor">
                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
                            </svg>
                            <span className="tab tab-kategori block text-xs">Search</span>
                        </div>

                    </Link>
                    <Link href='/create'>

                        <div className={`w-full justify-center ${accentColor.hoverIcon} inline-block text-center pt-2 pb-1 ` + (currentPage == 'create' ? accentColor.icon : '')}>
                            <svg className={ "h-6 w-6 inline-block mb-1" } fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 52 52" xmlSpace="preserve">
                                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2
                                    s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2
                                    S39.604,28,38.5,28z"/>
                                <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                            </svg>
                            <span className="tab tab-explore block text-xs">Create</span>
                        </div>

                    </Link>
                    <Link href='/readlist'>

                        <div className={`w-full justify-center ${accentColor.hoverIcon} inline-block text-center pt-2 pb-1 ` + (currentPage == 'readlist' ? accentColor.icon : '')}>
                            <svg className={ "h-6 w-6 inline-block mb-1" } fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve">
                                <path id="Bookmark_1_" d="M55.5311928,13.5146999c-1.2568016-1.2578001-2.9980011-1.9794998-4.7783012-1.9794998H16.0770931
                                    c-1.0039005,0-1.8213005-0.8174-1.8213005-1.8389006c0-0.5145998,0.2011995-1,0.5634995-1.3632994
                                    c0.3653002-0.3642001,0.8506002-0.5654001,1.3653011-0.5654001h33.1181145c0.552784,0,1-0.4473,1-1s-0.447216-1-1-1H16.1845932
                                    c-1.0488853,0-2.0352011,0.4081998-2.7793007,1.1514001c-0.7413006,0.7420998-1.1494999,1.7284999-1.1494999,2.7939
                                    c0,2.1073999,1.7139149,3.8223,3.8213005,3.8223h1.9228992v23.654501c0,0.6026993,0.4930992,1.0018997,1.0072002,1.0018997
                                    c0.2456989,0,0.4962006-0.0912018,0.6998997-0.294899l5.5858002-5.5858002
                                    c0.1952-0.1952019,0.4512005-0.2929001,0.7070999-0.2929001s0.5117989,0.0976982,0.7070999,0.2929001l5.5858002,5.5858002
                                    c0.203701,0.2037964,0.4542007,0.294899,0.6998978,0.294899c0.5139999,0,1.0072021-0.3992004,1.0072021-1.0018997v-23.654501
                                    h16.7528992c1.2528992,0,2.4794998,0.5078001,3.3642998,1.3935003c0.8993988,0.8993998,1.394516,2.0948,1.394516,3.3653002
                                    v39.0262985c0,1.25-0.4873161,2.4247971-1.3711166,3.3085976S52.0819931,62,50.8319931,62H13.329092
                                    c-1.2929993,0-2.5087996-0.5028992-3.4228992-1.4160004c-0.9140005-0.9160004-1.4179001-2.1328011-1.4179001-3.4248009V8.1602001
                                    C8.4882927,4.7637,11.2518921,2,14.6483927,2h38.9794998c0.5527,0,1-0.4471999,1-1c0-0.5527-0.4473-1-1-1H14.6483927
                                    c-4.5,0-8.1601,3.6602001-8.1601,8.1602001v48.9990005c0,1.8262024,0.7108998,3.5438995,2.0029001,4.8379021
                                    C9.7841921,63.2891006,11.5018921,64,13.329092,64h37.5028992c1.7851982,0,3.4618988-0.6953011,4.7227135-1.9570007
                                    c1.2616844-1.2607994,1.9570007-2.9375,1.9570007-4.7226982V18.2940006
                                    C57.5117073,16.4892998,56.8085899,14.7919998,55.5311928,13.5146999z M31.9999924,34.7753983l-3.8787003-3.8786983
                                    c-0.5665855-0.5666008-1.3199005-0.8785992-2.1212997-0.8785992c-0.8012848,0-1.5547009,0.3119984-2.1212845,0.8785992
                                    l-3.8787155,3.8786983V13.6037998h12V34.7753983z"/>
                                <g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                            </svg>
                            <span className="tab tab-whishlist block text-xs">Readlist</span>
                        </div>

                    </Link>
                    <Link href='/myprofile'>

                        <div className={`w-full justify-center ${accentColor.hoverIcon} inline-block text-center pt-2 pb-1 ` + (currentPage == 'account' ? accentColor.icon : '')}>
                            <svg className={ "h-6 w-6 inline-block mb-1" } fill="currentColor" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.88"><title>person-profile-image</title>
                                <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0ZM49.28,71.35c.26-2.18-6.23-10.54-7.41-14.54-2.54-4-3.44-10.46-.68-14.73,1.11-1.69.63-3.16.63-5.51,0-23.24,40.7-23.24,40.7,0,0,2.94-.67,3.63.92,6,2.66,3.86,1.29,10.72-1,14.3C81,61,74.24,69,74.71,71.37c.42,11.92-25.5,11.53-25.43,0v0Zm-31,20.07c3.25-3.6,9.09-3.76,16.17-7.36a74.7,74.7,0,0,0,7.75-4.53c8.22,10.08,15,21.16,12.78,34.05a52.65,52.65,0,0,0,6.44.4c.55,0,1.09,0,1.64,0-.5-15.14,8.38-26.21,17.79-35.63A68.55,68.55,0,0,0,96.33,86c4.62,1.54,7.39,2.53,9,4.3a52.54,52.54,0,1,0-87,1.08Z"/>
                            </svg>
                            <span className="tab tab-account block text-xs">Account</span>
                        </div>

                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default AppBar