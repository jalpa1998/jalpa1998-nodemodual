import "./styles.css";
import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import Timezone from "./timezone.js";
import moment from "moment";
import SelectClock from "./selectclock";
// const date = new Date().toLocaleString();

export default function App() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Clock value={value} />

      <div className="timezone">
        <Timezone />
      </div>
      {/* <div>{new Date(value).toString()}</div> */}
      {/* <div>{moment(value).format("YYYY-MM-DD 上午 h:mm:ss")}</div> */}
      <div>{value.toLocaleString()}</div>
      <div className="selectClock">
        <SelectClock />
      </div>
    </div>
  );
}
