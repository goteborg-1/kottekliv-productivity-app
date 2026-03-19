import { GoHome, GoCheckbox, GoClock, GoGraph } from "react-icons/go"

interface menuItem {
  title: string,
  path: string,
  icon: React.ReactNode
}

// Centralized list for easily adding or removing menu items
const menuItems: menuItem[] = [
  {title: "Home",
    path: "/",
    icon: <GoHome />,
  },

  {title: "Tasks",
    path: "/tasks",
    icon: <GoCheckbox />,
  },

  {title: "Timer",
    path: "/timer",
    icon: <GoClock />,
  },

  {title: "History",
    path: "/history",
    icon: <GoGraph />,
  },
]

export default menuItems