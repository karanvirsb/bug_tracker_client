import React from "react";

type props = {
    classname?: string;
};

const Spinner = ({ classname }: props) => {
    return <div className={`donut ${classname}`}></div>;
};

export default Spinner;
