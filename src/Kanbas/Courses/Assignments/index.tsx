import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css"
import { RxDragHandleDots2 } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { GrNotes } from "react-icons/gr";
import { GoPlus } from "react-icons/go";




function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <>
            {/* Buttons */}
            <div className="top-buttons">

                <button> <FaEllipsisV /></button>
                <button className="assignment"> <GoPlus /> Assignment</button>
                <button> <GoPlus /> Group</button>
                <input className="search" placeholder="Search for Assignment" />


            </div>
            <ul className="list-group wd-modules">
                <li className="list-group-item">

                    {/* This is the header of the assignments */}
                    <div>
                        <RxDragHandleDots2 className="me-2" />
                        <GoTriangleDown className="me-2" />
                        ASSIGNMENTS
                        <span className="float-end">
                            <span className="oval">
                                40% of Total
                            </span>
                            <GoPlus className="ms-2" />
                            <FaEllipsisV className="ms-2" />
                        </span>
                    </div>


                    {/* These are the items */}
                    <ul className="list-group ">

                        {assignmentList.map((assignment) => (
                            <li className="list-group-item" >
                                <RxDragHandleDots2 className="me-2 align-center" />
                                <GrNotes className="me-2 completed" />

                                <div className="assignment-description">
                                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="no-margin">
                                        {assignment.title}
                                    </Link>
                                    hi
                                </div>




                                <span className="float-end">
                                    <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default Assignments;

