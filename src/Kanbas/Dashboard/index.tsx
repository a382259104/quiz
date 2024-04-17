import { Link } from "react-router-dom";
import "./index.css"

import { IoMegaphoneOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RxPencil2 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }) {

  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <div> <label className="h2">Published Courses (6)</label>

        {/* These are the buttons */}
        <button onClick={addNewCourse} className="float-end dashboard-button">
          Add
        </button>
        <button onClick={updateCourse} className="float-end dashboard-button">
          Update
        </button>

      </div>
      <div className="input-container">
        <input value={course.name} className="form-control"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <input value={course.number} className="form-control"
          onChange={(e) => setCourse({ ...course, number: e.target.value })} />
        <input value={course.startDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
        <input value={course.endDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
      </div>


      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">

                {/* This is the image */}
                <img src={`/images/${course.image || 'surprise.gif'}`} className="card-img-top"
                  style={{ height: 150 }} />



                <div className="card-body" style={{ overflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {/* This is the card title/name */}
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{
                      textDecoration: "none", color: "navy", fontWeight: "bold"
                    }}>
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

                    <div onClick={(event) => { event.preventDefault(); setCourse(course); }} className="icons">
                      <RxPencil2 className="fs-5"/>
                    </div>
                    <div onClick={(e) => {e.preventDefault();deleteCourse(course._id);}} className="icons">
                      <RiDeleteBinLine className="fs-5"/>
                      </div>

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