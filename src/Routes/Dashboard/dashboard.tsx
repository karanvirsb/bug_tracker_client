import React from "react";

const Dashboard = () => {
    return (
        <section className='ml-[193px] mt-[22px] md:mt-[14px] md:ml-[68px]'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
            <div className='my-6 mx-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                        Projects
                    </h2>
                    <button className='bg-secondary-color text-white py-2 px-4 rounded-md font-semibold hover:bg-transparent hover:text-black hover:outline hover:outline-secondary-color hover:outline-2'>
                        New Project
                    </button>
                </div>
                <div className='outline-[#D4D4D4] outline-1 outline w-full px-4 text-left rounded-md'>
                    <table className=' w-full'>
                        <thead className='text-sm text-gray-500 font-normal'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    PROJECT
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    DESCRIPTION
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    DATE CREATED
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    MEMBERS
                                </th>
                                <th scope='col' className='px-6 py-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-gray-200 border-b-2'>
                                <th
                                    scope='row'
                                    className='px-6 py-3 text-gray-800 font-semibold'
                                >
                                    Bug Tracker
                                </th>
                                <td className='truncate max-w-[15ch] px-6 py-3'>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Reprehenderit iste beatae
                                    recusandae et accusamus, rem iure, iusto
                                    alias consectetur odit dicta repellat
                                    corporis, tenetur quasi enim aspernatur
                                    molestias impedit consequuntur! Obcaecati
                                    maiores magnam odio voluptates, beatae
                                    dolores nihil deserunt nesciunt cumque.
                                    Voluptate cupiditate quo aspernatur iste
                                    amet blanditiis ipsa architecto placeat,
                                    beatae recusandae excepturi odit dolor
                                    exercitationem ipsam, quisquam accusantium.
                                </td>
                                <td className='px-6 py-3'>2022-01-20</td>
                                <td className='px-6 py-3'>
                                    Marin Kar, Lar Far
                                </td>
                                <td className='px-6 py-3'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                                        />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='w-full flex justify-center items-center py-4 gap-4'>
                        <button className='pagination-btn'>Prev</button>
                        <span className='bg-secondary-color w-10 h-10 text-2xl flex justify-center items-center text-center rounded-full'>
                            1
                        </span>
                        <button className='bg-btn-color text-white py-1 px-2 rounded-md hover:bg-transparent hover:text-black hover:font-semibold hover:outline hover:outline-btn-color hover:outline-2'>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div></div>
        </section>
    );
};

export default Dashboard;
