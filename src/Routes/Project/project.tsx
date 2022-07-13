import React from "react";
import { useParams } from "react-router-dom";

const Project = () => {
    const { projectId } = useParams();
    return <section className='sections'>${projectId}</section>;
};

export default Project;
