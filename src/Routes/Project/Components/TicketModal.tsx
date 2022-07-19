import React from "react";
import Select from "react-select";

export interface ITicket {
    ticketId?: string;
    title: string;
    description: string;
    assignedDev: string[];
    dateCreated?: Date;
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
    userRef?: React.MutableRefObject<null | any>;
    ticketStatusRef: React.MutableRefObject<null | any>;
    ticketSeverityRef: React.MutableRefObject<null | any>;
    ticketTypeRef: React.MutableRefObject<null | any>;
};

const TicketModal = ({
    ticketInput,
    setTicketInput,
    type,
    options,
    defaultSelect,
    userRef,
    ticketStatusRef,
    ticketSeverityRef,
    ticketTypeRef,
}: props) => {
    const ticketStatusOptions = [
        { value: "Open", label: "Open" },
        { value: "Todo", label: "Todo" },
        { value: "In Progress", label: "In Progress" },
        { value: "To Be Tested", label: "To Be Tested" },
        { value: "Closed", label: "Closed" },
    ];
    const ticketSeverityOptions = [
        { value: "None", label: "None" },
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
        { value: "Critical", label: "Critical" },
    ];
    const ticketTypeOptions = [
        {
            value: "Bug",
            label: "Bug",
        },
        {
            value: "Feature",
            label: "Feature",
        },
        { value: "Error", label: "Error" },
        { value: "Issue", label: "Issue" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "time") {
            setTicketInput((prev: ITicket) => {
                return { ...prev, time: Number.parseFloat(e.target.value) };
            });
        } else {
            setTicketInput((prev: ITicket) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTicketInput((prev: ITicket) => {
            return { ...prev, description: e.target.value };
        });
    };

    return (
        <>
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Title
                </label>
                <input
                    type='text'
                    className='modal-input'
                    name='title'
                    onChange={handleChange}
                />
            </div>
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Description
                </label>
                <textarea
                    className='modal-input resize-y'
                    onChange={handleTextAreaChange}
                ></textarea>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-1'>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Assigned Members
                    </label>
                    <Select
                        options={options}
                        isMulti
                        ref={userRef}
                        defaultValue={type && defaultSelect}
                        className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                        closeMenuOnSelect={false}
                        placeholder='Select Users'
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Time (Est. Hours)
                    </label>
                    <input
                        type='number'
                        name='time'
                        className='modal-input'
                        min={0}
                        step='any'
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Status
                    </label>
                    <Select
                        options={ticketStatusOptions}
                        className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                        placeholder='Select Status'
                        maxMenuHeight={100}
                        ref={ticketStatusRef}
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Severity
                    </label>
                    <Select
                        options={ticketSeverityOptions}
                        className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                        placeholder='Select Severity'
                        maxMenuHeight={100}
                        ref={ticketSeverityRef}
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Type
                    </label>
                    <Select
                        options={ticketTypeOptions}
                        className='outline-gray-400 border-none rounded-lg ml-2 input-label'
                        placeholder='Select Type'
                        maxMenuHeight={100}
                        ref={ticketTypeRef}
                    ></Select>
                </div>
            </div>
        </>
    );
};

export default TicketModal;
