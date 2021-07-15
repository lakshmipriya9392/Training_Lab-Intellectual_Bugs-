import React, { useState, useEffect } from "react";
import Navbar from "./../navbar/navbar";
import "./../../App.css";
import NavIcon from "./../navbar icons/navbarIcon";
import Accordion from "./../courses page/Course components/Accordion";
import SideImage from "./../../assets/animation_640_kr4k95pb.gif";
import Footer from "./../footer/footer";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { courseSelector, difficultySetting } from "./../redux/NameDisplay";
import axios from "axios";

function TestSelectionPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [course, setCourse] = useState("Select Course");
    const [difficulty, setDifficulty] = useState("Select Difficulty");
    const [levelsetting, setLevelSetting] = useState([]);

    const [subArr, setSubArr] = useState([]);
    const subject = () => {
        axios
            .get("https://localhost:5001/course")
            .then((res) => {
                setSubArr(res.data);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };
    const levels = () => {
        axios
            .get("https://localhost:5001/test/getlevels")
            .then((res) => {
                setLevelSetting(res.data);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };
    useEffect(() => {
        subject();
        levels();
    }, []);

    const [checker, setChecker] = useState("");

    const testProceed = () => {
        if (course !== "Select Course" && difficulty !== "Select Difficulty") {
            setChecker("");
            history.push("/test");
        } else {
            setChecker("Please select a course and difficulty level");
        }
    };
    return (
        <div className="">
            <Navbar>
                <NavIcon colorB="text-black" colorSecB="text-black font-semibold" />
            </Navbar>
            <div className="flex justify-center">
                <div className="flex md:justify-around justify-center md:items-stretch items-center md:flex-row flex-col mb-20 w-11/12 md:mt-16 mt-0">
                    <div className="w-full flex flex-col justify-center md:w-1/2 order-2 md:order-1">
                        <div className="my-6 text-center text-2xl">Test your skills</div>
                        <div className="relative my-6 mx-10">
                            <Accordion heading={course}>
                                {subArr.map((prop) => {
                                    const click = () => {
                                        setCourse(prop.courseName);
                                        dispatch(courseSelector(prop.courseId));
                                    };
                                    return (
                                        <div
                                            key={prop.courseId}
                                            className="px-8 py-2 cursor-pointer"
                                            onClick={click}
                                        >
                                            {prop.courseName}
                                        </div>
                                    );
                                })}
                            </Accordion>
                        </div>

                        <div className="relative my-6 mx-10">
                            <Accordion heading={difficulty}>
                                {levelsetting.map((prom) => {
                                    const difficultySelecting = () => {
                                        setDifficulty(prom.levelName);
                                        dispatch(difficultySetting(prom.levelName));
                                    };
                                    return (
                                        <div
                                            key={prom.levelId}
                                            className="px-8 py-2 cursor-pointer"
                                            onClick={difficultySelecting}
                                        >
                                            {prom.levelName}
                                        </div>
                                    );
                                })}
                            </Accordion>
                        </div>
                        <div className="text-center my-2 font-semibold">{checker}</div>
                        <div className="flex justify-around text-center font-semibold my-6">
                            <div
                                className="md:w-1/3 w-40 py-2 rounded-lg border-2 border-red-500 duration-200 bg-white hover:bg-red-100 cursor-pointer"
                                onClick={() => history.push("/selection")}
                            >
                                Back
                            </div>
                            <div
                                className="md:w-1/3 w-40 py-2 rounded-lg border-2 border-blue-500 duration-200 bg-white hover:bg-blue-100 cursor-pointer"
                                onClick={testProceed}
                            >
                                Start test
                            </div>
                        </div>
                    </div>
                    <img
                        src={SideImage}
                        alt=""
                        className=" h-96 w-96  order-1 md:order-2"
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TestSelectionPage;
