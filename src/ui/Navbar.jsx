import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { label: "Home", path: "/main" },
    { label: "Projects", path: "/main/projects" },
    { label: "Tasks", path: "/main/tasks" },
    { label: "Chats", path: "/main/chats" },
  ];

  const isActive = (path) => {
    if (path === "/main") {
      return location.pathname === "/main" || location.pathname === "/main/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col gap-10 p-5 dark:bg-[#272727] bg-[#ffff] border-r-[#282828] dark:border-r-[#282828] border-r-[2px]">
      {buttons.map((btn) => (
        <button
          key={btn.path}
          onClick={() => navigate(btn.path)}
          className={`buttonStyle textcolre ${
            isActive(btn.path)
              ? "bg-blue-500  dark:bg-[#027bff] dark:text-white"
              : "bg-[#e0e0e0]  hover:bg-[#bebebe] dark:bg-[#444444] dark:hover:bg-[#1f1f1f]"
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
