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
    defaultTicketType?: {};
    defaultTicketStatus?: {};
    defaultTicketSeverity?: {};
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
    defaultTicketType,
    defaultTicketStatus,
    defaultTicketSeverity,
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
                    value={ticketInput.title}
                />
            </div>
            <div className='input-container'>
                <label htmlFor='projectName' className='input-label'>
                    Description
                </label>
                <textarea
                    className='modal-input resize-y'
                    onChange={handleTextAreaChange}
                    value={ticketInput.description}
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
                        className='modal-selects input-label'
                        closeMenuOnSelect={false}
                        maxMenuHeight={150}
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
                        value={ticketInput.time}
                    />
                </div>
            </div>
            <div className='grid grid-cols-1 gap-4'>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Status
                    </label>
                    <Select
                        options={ticketStatusOptions}
                        className='modal-selects input-label'
                        placeholder='Select Status'
                        maxMenuHeight={100}
                        ref={ticketStatusRef}
                        defaultValue={type && defaultTicketStatus}
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Severity
                    </label>
                    <Select
                        options={ticketSeverityOptions}
                        className='modal-selects input-label'
                        placeholder='Select Severity'
                        maxMenuHeight={100}
                        ref={ticketSeverityRef}
                        defaultValue={type && defaultTicketSeverity}
                    ></Select>
                </div>
                <div className='input-container'>
                    <label htmlFor='projectName' className='input-label'>
                        Type
                    </label>
                    <Select
                        options={ticketTypeOptions}
                        className='modal-selects input-label'
                        placeholder='Select Type'
                        maxMenuHeight={100}
                        ref={ticketTypeRef}
                        defaultValue={type && defaultTicketType}
                    ></Select>
                </div>
            </div>
        </>
    );
};

export default TicketModal;
