import React, { useState, lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppSelector } from "../../Hooks/hooks";
import ErrorFallbackWithoutRetry from "../ErrorFallback/ErrorFallbackWithoutRetry";
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
            <nav className='flex gap-4 justify-between items-center mb-2 pr-4'>
                <ul className='list-none flex gap-4 min-w-[25px] sm:w-[75%] overflow-auto'>
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
                <ErrorBoundary
                    fallback={
                        <div className='text-red-500 flex flex-col justify-center items-center'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                                />
                            </svg>{" "}
                            Account Error
                        </div>
                    }
                >
                    <Suspense fallback={<Spinner></Spinner>}>
                        <Account user={user}></Account>
                    </Suspense>
                </ErrorBoundary>
            </nav>
            <ErrorBoundary
                fallback={
                    <ErrorFallbackWithoutRetry
                        text={`Error: Could not load ${tabName}`}
                    ></ErrorFallbackWithoutRetry>
                }
            >
                <section className='md:mr-1 p-1'>
                    {mappedComponents.get(tabName)}
                </section>
            </ErrorBoundary>
        </>
    );
};

export default Tab;
