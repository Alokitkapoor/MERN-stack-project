import { useNavigate } from "react-router-dom";
import React from "react";

import hii from "./assets/hello.png";
import icon from "./assets/icon.png";
import balance from "./assets/balance.png";
import clock from "./assets/expired.png";
import flag from "./assets/report.png";
import rocket from "./assets/seperator.png";
import sicon from "./assets/sidebar.png";
import task from "./assets/task.png";
import uicon from "./assets/user.png";

// main logical fileee
import DynamicCards from './Taskinjection';
// remember the component name must be first capital 

const MainPage = () => {

    // 1. -----------------------> fetching the name from the local storage and 
    // this will also work but usig useeffest and usestate are better ways 
    // because if after rendering the data is the local storage chages react wont update it  
    // const lcname = JSON.parse(localStorage.getItem('user'));
    // but if you use above you lcname is an object REMEMBER this 
    // Welcome back, <span id="fetched"> {lcname?.username} </span>! ..(?.) is optional chaining 

    const [lcname , setlcname] = React.useState("");

    React.useEffect(() => {
        const curr = JSON.parse(localStorage.getItem('user'));
        if(curr) setlcname(curr.username);
    },[]);
    // array [] passed in the end in the dependency array the useEffect call back function will run every
    // time the things written in the dependency array changes  

    // 2. ------------------------> Sidebar pop-in-out logic

    const sideone = () => {
        const sb = document.getElementById("sidebar");
        const upper = document.getElementById("upup");

        const main = document.body; 
        const screenWidth = window.innerWidth;

        const rgrg = document.getElementById("riii");

        if (screenWidth >= 1475) {
            sb.style.transition = "transform 0.2s ease"; 
            sb.style.transform = "translateX(0)"; 

            main.style.transition = "margin-left 0.2s ease";
            main.style.marginLeft = "175px"; 

            upper.style.height = "24vh";

            rgrg.style.height = "115vh";
        }
        else{
            sb.style.transition = "transform 0.2s ease"; 
            sb.style.transform = "translateX(0)"; 
        }
    };


    const sidehide = () => {
        const sb = document.getElementById("sidebar");
        const upper = document.getElementById("upup");

        const rgrg = document.getElementById("riii");
        const screenWidth = window.innerWidth;

        const main = document.body;


        if (screenWidth >= 1475) {
            sb.style.transform = 'translateX(-100%)';
            const main = document.body;
            main.style.marginLeft = "0px";
            main.style.transition = "margin-left 0.2s ease";
            upper.style.height = "20vh";

            rgrg.style.height = "107vh";
        }
        else{
            sb.style.transition = "transform 0.2s ease"; 
            sb.style.transform = "translateX(-100%)"; 
            main.style.marginLeft = "0px";
        }

    }

    // 3. ------------------------> logging out to land page logic 

    const tgmenu = () => {
        const elem = document.getElementById("userMenu");
        if(elem){
            elem.classList.toggle("show-menu");
        }
    };

    // on clicking hte logout land back to the landing page
    const navto = useNavigate();
    const landagain = () => {
        navto("/");
        // these routes are defined in the App.jsx
    };

    // 4. ----------------------------> create card button functionality

    const detailSection = () => {
        const form = document.querySelector('.task-form');
        form.classList.toggle('show');        
    };

    const collapse = () => {
        const del = document.querySelector('.task-form');
        del.classList.remove('show');
    }

    // 5. ----------------------------> adding to the final one
    // refer the Taskinjection.jsx component
    const [tasks, setTasks] = React.useState([]);

    const fetchAndRenderTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/api/problems", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Failed to fetch");
            const tasks = await res.json();
            setTasks(tasks);
        } catch (err) {
            console.error(err);
            // Only alert once, not on every failed fetch
            // alert("Failed to fetch tasks");
        }
    };

    const handleAddTask = async () => {
        const title = document.getElementById("taskTitle").value.trim();
        const notes = document.getElementById("taskNotes").value.trim();
        const deadline = document.getElementById("taskDeadline").value;

        if (!title || !deadline) {
            alert("Please enter both title and deadline!");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5000/api/problems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, description: notes, scheduledTime: deadline })
            });

            const data = await res.json();
            if (!res.ok) return alert(data.message || "Task creation failed");

            alert("Task recorded successfully!");
            document.getElementById("taskTitle").value = "";
            document.getElementById("taskNotes").value = "";
            document.getElementById("taskDeadline").value = "";

            const del = document.querySelector('.task-form');
            del.classList.remove('show');

            // refresh the stack dynamically
            fetchAndRenderTasks();

        } catch (err) {
            console.error(err);
            alert("Server error while adding task");
        }
    };

    // polling every 10 sec
    // setInterval(fetchAndRenderTasks, 10000);

    React.useEffect(() => {
      fetchAndRenderTasks();

      const curr = JSON.parse(localStorage.getItem('user'));
      if(curr) setlcname(curr.username);

        // setInterval for polling
      const interval = setInterval(fetchAndRenderTasks, 10000);

        // cleanup on unmount
      return () => clearInterval(interval);

    }, []);

  return (
    <>
      {/* Head links are handled globally (e.g. index.html), but if needed: */}
      <link rel="stylesheet" href="/css/main.css" />
      {/* <script
        src="https://kit.fontawesome.com/a076d05399.js"
        crossOrigin="anonymous"
      ></script> */}

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark algocycle-navbar px-4">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={icon}
            alt="Algocycle Icon"
            className="algocycle-icon me-2"
            style={{
              height: "6vh",
              marginLeft: "3vh",
              padding: "0.5vh",
            }}
          />
          Algocycle
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Create
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Complete
              </a>
            </li>

            {/* Custom User Menu */}
            <li className="nav-item position-relative">
              <img
                src={uicon}
                alt="User Icon"
                className="algocycle-icon me-2 user-icon"
                style={{ height: "4vh", cursor: "pointer" }}
                onClick={tgmenu}
              />

              {/* Hidden menu */}
              <div className="user-menu position-absolute" id="userMenu">
                <p id="menuUsername">{lcname}</p>
                <a href="#" id="logoutBtn" onClick={landagain}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar Toggle Button */}
      <button className="btn btn-primary ms-3 mt-3" id="toggleSidebar" onClick={sideone} >
        <img src={sicon} alt="icon" className="tg-sbr" />
      </button>

      {/* Sidebar */}
      <div
        // the hidden nav bar is this 
        id="sidebar"
        className="bg-dark text-white p-4 position-fixed top-0 start-0 vh-100"
        style={{
          width: "175px",
          transform: "translateX(-100%)",
          transition: "transform 0.2s ease",
          borderRight: "1px solid rgba(255, 255, 255, 0.15)",
          zIndex: 2000,
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0">Menu</h5>
          <button className="btn btn-sm btn-light" id="closeSidebar" onClick = {sidehide}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              Profile
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              Settings
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div
        className="dash-container"
        style={{
          marginTop: "-6vh",
          marginLeft: "100px",
          marginRight: "100px",
          height: "150vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Left half dashboard */}
        <div
          className="left-dash"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            paddingRight: "3vw",
          }}
        >
          <div className="welcome" style={{ display: "flex", flexDirection: "row" }}>
            <img className="hello-icon" src={hii} alt="Hello Icon" />

            <div className="greet">
              <h3>
                Welcome back, <span id="fetched">{lcname}</span>!
              </h3>
              <p style={{ fontSize: "1.1vw" }}>
                A few tasks need your attention, get them done before time slips away.
              </p>
            </div>
          </div>

          {/* Seperator */}
          <div className="seperator" style={{ display: "flex", flexDirection: "row" }}>
            <img className="sep-icon" src={rocket} alt="Separator" />
            <p>
              Cycle through revisions, boost your <span id="ret">retention</span>
            </p>
          </div>

          <div className="c-head" style={{ backgroundColor: "#324059" }}>
            <p>Create task</p>
          </div>

          {/* Create section */}
          <div className="create-task-section">
            <div className="task-header">
              <img
                style={{ height: "3vw", width: "3vw" }}
                src={task}
                alt="Task Icon"
              />
              <p style={{ fontSize: "1vw" }}>
                Make the task that you want to revisit, add flexible spaces before visits.
                Build for long lasting memorization of concepts. Attach Notes related to
                task entry for quick summary
              </p>
              <button id="toggleTaskForm" onClick={detailSection}>Create Task</button>
            </div>

            <div className="task-form" id="taskForm">
              <input type="text" id="taskTitle" placeholder="Task Title" />
              <input type="text" id="taskNotes" placeholder="Notes (optional)" />
              <input type="datetime-local" id="taskDeadline" placeholder="YYYY-MM-DDTHH:MM"/>
              <button id="addTaskBtn" onClick={handleAddTask}>Add Task</button>
            </div>
          </div>

          <div className="seperator" style={{ display: "flex", flexDirection: "row" }}>
            <img className="sep-icon" src={flag} alt="Report Icon" />
            <p>
              Track your progress, achieve your{" "}
              <span id="ret" style={{ color: "#f97f61" }}>
                milestones
              </span>
            </p>
          </div>
        </div>

        {/* Right half dashboard */}
        <div className="right-dash"
         id="riii"
         style={{
            width: "30%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)", 
            }}
        >
          <div
            className="topped"
            id="upup"
            style={{ display: "flex", flexDirection: "column", height: "20vh" }}  
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2vh",
                paddingLeft: "2vh",
              }}
            >
              <img src={clock} style={{ width: "3vw", height: "3vw" }} alt="Expired Icon" />
              <h4
                style={{
                  fontSize: "1.3vw",
                  fontFamily: "'Segoe UI',sans-serif",
                  marginLeft: "1vh",
                  marginTop: "0.5vh",
                  color: "#d27c36",
                }}
              >
                You have task to complete
              </h4>
            </div>
            <div>
              <p
                style={{
                  color: "#cbcbcb",
                  marginTop: "2vh",
                  textAlign: "left",
                  marginLeft: "2vh",
                  marginRight: "1vh",
                  fontSize: "0.8vw",
                }}
              >
                The stack shows you the task those are still pending, the task are arranged from oldest to latest as you go down 
              </p>
            </div>
          </div>

          <div className="seperator" style={{ display: "flex", flexDirection: "row" }}>
            <img className="sep-icon" src={balance} alt="Balance Icon" />
            <p>
              Balance tasks, achieve more{" "}
              <span id="ret" style={{ color: "#92a6ca" }}>
                daily
              </span>
            </p>
          </div>

          <div className="stack" id="taskstack">
            {/* JS will inject cards here later */}
            <DynamicCards tasks={tasks} fetchAndRenderTasks={fetchAndRenderTasks} />
            {/* this above component is in other file */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
