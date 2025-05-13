const users = [
  {
    id: 1,
    email: "malik@gmail.com",
    password: "123456",
    isStudent: false,
  },
  {
    id: 2,
    email: "ahmad@gmail.com",
    password: "123456",
    isStudent: true,
    Inproject: 0,
  },
  {
    id: 3,
    email: "sameh@gmail.com",
    password: "123456",
    isStudent: true,
    Inproject: 1,
  },
];

const projects = [
  {
    id: 1,
    name: "mobile devlopment",
    status: "in progress",
    description: " this is the mobile devlopment description",
    start_date: "2025-01-15",
    end_date: "2025-3-17",
    category: "mobile Development",
    assigendStudentId: [3, 2],
  },
  {
    id: 2,
    name: "web devlopment",
    status: "finished",
    description: " this is the web devlopment description",
    start_date: "2025-01-15",
    end_date: "2025-3-8",
    category: "web Development",
    assigendStudentId: [2],
  },
  {
    id: 3,
    name: "flutter devlopment",
    status: "on hold",
    description: " this is the flutter devlopment description",
    start_date: "2025-01-15",
    end_date: "2025-3-8",
    category: "web Development",
    assigendStudentId: [3, 2],
  },
];

const tasks = [
  {
    id: 1,
    name: "first task",
    description: " this is the first task desc",
    projectId: 1,
    studentId: 3,
    due_date: "2025-3-13",
    status: "finished",
  },
  {
    id: 2,
    name: "second task",
    description: " this is the second task desc",
    projectId: 1,
    studentId: 2,
    due_date: "2025-3-13",
    status: "in progress",
  },
];

const chats = [
  {
    adminId: 1,
    studentId: 2,
    chats: [
      {
        senderId: 1,
        message: "Hello Ahmad",
      },
      {
        senderId: 1,
        message: "How are you?",
      },
      {
        senderId: 2,
        message: "I'm good, thanks!",
      },
    ],
  },
  {
    adminId: 1,
    studentId: 3,
    chats: [
      {
        senderId: 1,
        message: "Hello Sameh!",
      },
      {
        senderId: 1,
        message: "What's the progress?",
      },
      {
        senderId: 3,
        message: "I'm almost done with the task!",
      },
    ],
  },
  {
    adminId: 4,
    studentId: 5,
    chats: [
      {
        senderId: 4,
        message: "Good morning!",
      },
      {
        senderId: 5,
        message: "Morning! Any updates?",
      },
    ],
  },
];
localStorage.setItem("users", JSON.stringify(users));
localStorage.setItem("projects", JSON.stringify(projects));
localStorage.setItem("tasks", JSON.stringify(tasks));
localStorage.setItem("chats", JSON.stringify(chats));

// const u = localStorage.getItem("users");
// console.log(u);
