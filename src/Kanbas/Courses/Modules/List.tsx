import { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";
import { useParams } from "react-router";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";


function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <div className="wd-modules">

            <div className="top-buttons">
                <button> <FaEllipsisV /></button>
                <button> + Modules</button>

                <button>
                    <CiCircleCheck color="green" />
                    Publish All
                    <GoTriangleDown />
                </button>
                <button> View Progress</button>
                <button> Collapse All</button>
            </div>

            <div>
                <ul className="list-group wd-modules">
                    {modulesList.map((module, index) => (
                        <li key={index}
                            className="list-group-item"
                            onClick={() => setSelectedModule(module)}>
                            <div>
                                {selectedModule._id === module._id ? (
                                    <GoTriangleDown className="me-2" />
                                ) : (
                                    <GoTriangleRight className="me-2" />
                                )}

                                {module.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </div>
                            {selectedModule._id === module._id && (
                                <ul className="list-group">
                                    {module.lessons?.map((lesson) => (
                                        <li className="list-group-item">
                                            <LuFileText className="me-2" />
                                            {lesson.name}
                                            <span className="float-end">
                                                <FaCheckCircle className="text-success" />
                                                <FaEllipsisV className="ms-2" />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );

}
export default ModuleList;

