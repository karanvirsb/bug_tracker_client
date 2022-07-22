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
    children?: any;
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
            <nav className='flex justify-between mb-2'>
                <ul className='list-none flex gap-4'>
                    {tabs?.map((tab, index) => {
                        if (index === activeIndex) {
                            return (
                                <li
                                    className='px-4 py-1 cursor-pointer border-b-2 border-b-secondary-color'
                                    onClick={() => setTab(tab?.value, index)}
                                    key={tab.value}
                                >
                                    {tab?.label}
                                </li>
                            );
                        }
                        return (
                            <li
                                className='px-4 py-1 cursor-pointer'
                                onClick={() => setTab(tab?.value, index)}
                                key={tab.value}
                            >
                                {tab?.label}
                            </li>
                        );
                    })}
                </ul>
                {children}
            </nav>
            <section className='md:mr-1 md:ml-[-50px]'>
                {mappedComponents.get(tabName)}
            </section>
        </>
    );
};

export default Tab;
