import React, { useState } from "react";

type tabs = {
    value: string;
    label: string;
};

type props = {
    tabs: tabs[];
    components: {
        [key: string]: JSX.Element;
    };
    children: any;
};

const Tab = ({ tabs, components, children }: props) => {
    const [tabName, setTabName] = useState(tabs[0].value);
    const [activeIndex, setActiveIndex] = useState(0);
    const mappedComponents = new Map(Object.entries(components));

    const setTab = (value: string, index: number) => {
        setTabName(value);
        setActiveIndex(index);
    };

    return (
        <>
            <div className='flex justify-between'>
                <ul className='list-none flex gap-4'>
                    {tabs?.map((tab, index) => {
                        if (index === activeIndex) {
                            return (
                                <li
                                    className='px-4 py-1 cursor-pointer border-b border-b-red-400'
                                    onClick={() => setTab(tab?.value, index)}
                                >
                                    {tab?.label}
                                </li>
                            );
                        }
                        return (
                            <li
                                className='px-4 py-1 cursor-pointer'
                                onClick={() => setTab(tab?.value, index)}
                            >
                                {tab?.label}
                            </li>
                        );
                    })}
                </ul>
                {children}
            </div>
            <section>{mappedComponents.get(tabName)}</section>
        </>
    );
};

export default Tab;
