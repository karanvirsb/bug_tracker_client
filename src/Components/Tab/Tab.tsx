import React, { useState, lazy, Suspense } from "react";
import { useAppSelector } from "../../Hooks/hooks";
import Spinner from "../Spinner";
const Account = lazy(() => import("../Account/Account"));

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

const Tab = ({ tabs, components }: props) => {
    const user = useAppSelector((state) => state.persistedReducer.user);
    const [tabName, setTabName] = useState(tabs[0]?.value);
    const [activeIndex, setActiveIndex] = useState(0);
    const mappedComponents = new Map(Object.entries(components));

    const setTab = (value: string, index: number) => {
        setTabName(value);
        setActiveIndex(index);
    };

    return (
        <>
            <nav className='flex justify-between items-center mb-2 overflow-auto mr-4'>
                <ul className='list-none flex gap-4'>
                    {tabs?.map((tab, index) => {
                        if (index === activeIndex) {
                            return (
                                <li
                                    className='px-4 py-1 cursor-pointer border-b-2 border-b-secondary-color text-lg font-semibold'
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
                                key={tab?.value}
                            >
                                {tab?.label}
                            </li>
                        );
                    })}
                </ul>
                <Suspense fallback={<Spinner></Spinner>}>
                    <Account user={user}></Account>
                </Suspense>
            </nav>
            <section className='md:mr-1 md:ml-[-50px] p-1'>
                {mappedComponents.get(tabName)}
            </section>
        </>
    );
};

export default Tab;
