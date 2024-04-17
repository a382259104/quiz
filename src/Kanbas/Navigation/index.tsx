import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { GrCloudComputer } from "react-icons/gr";
import { VscArrowCircleRight } from "react-icons/vsc";
import { CiCircleQuestion } from "react-icons/ci";

function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" />, remainWhite : true},
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <FaInbox className="fs-2" /> },
    { label: "History", icon: <FaRegClock className="fs-2" /> },
    { label: "Studio", icon: <GrCloudComputer className="fs-2" /> },
    { label: "Commons", icon: <VscArrowCircleRight className="fs-2" /> },
    { label: "Help", icon: <CiCircleQuestion className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      <li>
        <Link to="/Kanbas/Dashboard"><img src="/images/logo.jpg" className="logo"></img></Link>
      </li>

      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" :
         link.remainWhite ? "remain-white" : ""}>
          <Link to={`/Kanbas/${link.label}`}>
            <span className={link.remainWhite ? "remain-white" : "icon"}>{link.icon}</span>
            <span className="label">{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;