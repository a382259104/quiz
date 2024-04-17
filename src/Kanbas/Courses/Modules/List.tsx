import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

import "./index.css";
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

    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };



    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));

    };






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

                        {/* THESE ARE THE BUTTONS  */}

                        <div className="addModules">
                            <div className="addModules">
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

                            </div>
                            <div>
                                <button type="button" className="btn btn-outline-primary goodButton float-end"
                                    onClick={handleAddModule}>
                                    Add
                                </button>
                                <button type="button" className="btn btn-outline-primary goodButton"
                                    onClick={handleUpdateModule}>
                                    Update
                                </button>

                            </div>



                        </div>

                    </li>




                    {moduleList
                        .filter((module) => module.course === courseId)

                        .map((module, index) => (
                            <li key={index}
                                className="list-group-item"
                                onClick={() => setSelectedModule(module)}>
                                <div>
                                    {selectedModule?._id === module._id ? (
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
                                    <button className="goodButton"
                                        onClick={() => dispatch(setModule(module))}>
                                        Edit
                                    </button>
                                    <button className="goodButton"
                                        onClick={() => handleDeleteModule(module._id)}>
                                        Delete
                                    </button>

                                </div>
                                {selectedModule?._id === module._id && (
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

