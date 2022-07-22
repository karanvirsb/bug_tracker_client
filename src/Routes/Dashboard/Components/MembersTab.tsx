import React from "react";

const MembersTab = () => {
    return (
        <>
            <h1 className='text-2xl font-semibold'>Members</h1>
            <table className='w-full outline outline-[1px] outline-gray-300 rounded-md'>
                <thead className='text-sm text-gray-500 font-normal'>
                    <tr>
                        <th scope='col' className='px-6 py-3 sm:hidden'>
                            {/* Avatar */}
                        </th>
                        <th scope='col' className='px-6 py-3 md:hidden'>
                            USERNAME
                        </th>
                        <th scope='col' className='px-6 py-3 sm:text-center'>
                            FULL NAME
                        </th>
                        <th scope='col' className='px-6 py-3 md:hidden'>
                            EMAIL
                        </th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    );
};

export default MembersTab;
