import React from "react";
import Select from "react-select";

export interface ITicket {
    title: string;
    description: string;
    assignedDev: string[];
    time: number;
    ticketStatus: string;
    ticketSeverity: string;
    ticketType: string;
    reporterId: string;
    projectId: string;
}

type options = {
    value: string;
    label: string;
};

type props = {
    ticketInput: ITicket;
    setTicketInput: React.Dispatch<React.SetStateAction<ITicket>>;
    type?: "edit";
    options: options[] | any;
    defaultSelect?: options[];
    refs?: React.MutableRefObject<null | any>;
};

const TicketModal = ({
    ticketInput,
    setTicketInput,
    type,
    options,
    defaultSelect,
    refs,
}: props) => {
    return (
        <>
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Title
                </label>
                <input type='text' />
            </div>
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Description
                </label>
                <textarea></textarea>
            </div>
            <div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Assigned Members
                    </label>
                    <Select
                        options={options}
                        isMulti
                        ref={refs}
                        defaultValue={type && defaultSelect}
                        className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                        closeMenuOnSelect={false}
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Time (Est. Hours)
                    </label>
                </div>
            </div>
            <div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Status
                    </label>
                    <select>
                        <option value=''></option>
                        <option value=''>Open</option>
                        <option value=''>To Do</option>
                        <option value=''>In Progress</option>
                        <option value=''>To Be Tested</option>
                        <option value=''>Closed</option>
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Severity
                    </label>
                    <select>
                        <option value=''></option>
                        <option value=''>None</option>
                        <option value=''>Low</option>
                        <option value=''>Medium</option>
                        <option value=''>High</option>
                        <option value=''>Critical</option>
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Type
                    </label>
                    <select>
                        <option></option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default TicketModal;
