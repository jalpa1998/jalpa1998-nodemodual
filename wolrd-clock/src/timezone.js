import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Timezone() {
  const [timezone1, setTimezone1] = useState("");
  // const [newTime, setNewTime] = useState("");
  useEffect(async () => {
    const response = await axios("https://worldtimeapi.org/api/ip");
    // console.log("response", response);
    const timezone = response.data.timezone;
    // console.log(timezone);
    setTimezone1(timezone);
  }, []);
  return (
    <>
      <div>{timezone1}</div>
    </>
  );
}
