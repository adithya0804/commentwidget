import { useState } from "react";
import CommentWidget from "./components/CommentWidget";
import Dropdown from "./components/Dropdown";
import { initialComments, userInfo } from "./utils/sampleData";
import styles from "./app.module.css";
const userOptions = [
  {
    value: "2f19a5d9-0d0d-4bf3-9f9c-c51eb439af6f",
    label: "John Doe",
  },
  {
    value: "45c30818-6485-4ec6-9ef7-11c7b08391d0",
    label: "Charlie123",
  },
  {
    value: "6fb0b23c-6139-437b-bc61-d41875d7e36e",
    label: "Jane Doe",
  },
];
function App() {
  const [user, setUser] = useState(userInfo[0].id);
  const handleSelect = (value) => {
    setUser(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <span>Select User </span>{" "}
        <Dropdown onSelect={handleSelect} options={userOptions} />
      </div>
      <CommentWidget initiaComments={initialComments} userId={user} />
    </div>
  );
}

export default App;
