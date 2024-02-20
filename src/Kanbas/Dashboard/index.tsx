import React from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import "./index.css"

import { IoMegaphoneOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";

function Dashboard() {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h2>Published Courses (6)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">

                {/* This is the image */}
                <img src={`/images/${course.image}`} className="card-img-top"
                  style={{ height: 150 }} />



                <div className="card-body">
                  {/* This is the card title/name */}
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.number} {course.name} </Link>

                  {/* This is the class name thing */}
                  <div className="card-text">

                    <p>{course.number}.12345.2024{course._id.substring(course._id.length - 2)}</p>
                    <p className="description">202410_1 Spring 2024 Semester Full Term</p>
                  </div>


                  {/* This is the Go Button */}
                  <div className="flex-row">
                    <div className="half-row"><Link to={`/Kanbas/Courses/${course._id}/Home`} className="icons">
                      <IoMegaphoneOutline className="fs-5" />
                    </Link></div>
                    
                    <div className="half-row"><Link to={`/Kanbas/Courses/${course._id}/Home`} className="icons">
                      <LiaClipboardListSolid className="fs-5" />
                    </Link></div>
                    
                  </div>





                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;