import React from "react";
import { FaFileImport } from "react-icons/fa6";
import { BiBell, BiSolidArrowToRight, BiTargetLock } from "react-icons/bi";
import { VscGraph } from "react-icons/vsc";
import { IoMegaphoneOutline } from "react-icons/io5";

function CourseStatus() {
    const thingsToRender =
    {
        "Import Existing Content": <FaFileImport />,
        "Import From Commons": <BiSolidArrowToRight />,
        "Choose Home Page": <BiTargetLock />,
        "View Course Stream": <VscGraph />,
        "New Announcements": <IoMegaphoneOutline />,
        "New Analytics": <VscGraph/>,
        "View Course Notifications" : <BiBell/>
    };

    return (

        <div>
            <h4> Course Status</h4>
            <button> Unpublish</button>
            <button >Published</button>
            <hr />

            <ul className="course-status">
                {Object.entries(thingsToRender).map(([key, value]) => (
                    <li key={key}>
                        <button>{value} {key}</button>
                    </li>
                ))}
            </ul>

            <h4> To Do</h4>
            <hr/>
            <a href="http://www.google.com"> View Calendar</a>

            <ul>
                <li><a href="http://www.google.com">Lecture 1/9 Morning</a></li>
                <li><a href="http://www.google.com">Lecture 1/9 Afternoon</a></li>
                <li><a href="http://www.google.com">Lecture 1/12 Morning</a></li>
                <li><a href="http://www.google.com">Lecture 1/12 Afternoon</a></li>
            </ul>
        </div>
    );

}

export default CourseStatus;