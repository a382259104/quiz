import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";

import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { LuFileText } from "react-icons/lu";
import { useParams } from "react-router";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";


function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();

    const [selectedModule, setSelectedModule] = useState(moduleList[0]);




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
                    <li className="list-group-item">
                        <button
                            onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                            Add
                        </button>
                        <button
                            onClick={() => dispatch(updateModule(module))}>
                            Update
                        </button>
                        <input
                            value={module.name}
                            onChange={(e) =>
                                dispatch(setModule({ ...module, name: e.target.value }))
                            } />
                        <textarea
                            value={module.description}
                            onChange={(e) =>
                                dispatch(setModule({ ...module, description: e.target.value }))
                            } />
                    </li>




                    {moduleList
                        .filter((module) => module.course === courseId)

                        .map((module, index) => (
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
                                    <button
                                        onClick={() => dispatch(setModule(module))}>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteModule(module._id))}>
                                        Delete
                                    </button>

                                </div>
                                {selectedModule._id === module._id && (
                                    <ul className="list-group">
                                        {module.lessons?.map((lesson: any) => (
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

