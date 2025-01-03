import React, { useEffect, useState } from "react";
import axios from "axios";
import Clock from "react-clock";

const SelectClock = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [userSelectCountry, setUserSelectCountry] = useState("");
  const [countriesTime, setCountriesTime] = useState(undefined);
  const [newDate, setNewDate] = useState(new Date().toLocaleString("en-US"));
  const [clockList, setClockList] = useState([]);
  useEffect(async () => {
    const response = await axios("https://worldtimeapi.org/api/timezone");
    console.log("response2", response);
    const data = response.data;
    console.log("data", data);
    setCountriesList(data);
  }, []);

  const getCountry = (e) => {
    const newValue = e.target.value;
    console.log("newValue", e.target.value);
    setUserSelectCountry(newValue);
  };

  const renderOption = (list = []) => {
    return list.map((item, index) => {
      return (
        <option value={item} key={index}>
          {item}
        </option>
      );
    });
  };

  const renderClock = (date = []) => {
    return date.map((item, index) => {
      return (
        <div className="clockImg" key={index}>
          <div>
            <Clock value={item.dateInfo} />
          </div>
          <div className="country">{item.country}</div>
        </div>
      );
    });
  };

  const onWorldClock = () => {
    setCountriesTime(userSelectCountry);
  };

  useEffect(() => {
    if (countriesTime !== undefined) {
      const interval = setInterval(() => {
        const date = new Date().toLocaleString("en-US", {
          timeZone: countriesTime
        });

        // setNewDate(date);
        const getNewDate = new Date(date);

        clockList.map((item) => {
          console.log("item", item);
          return {
            ...item,
            dateInfo:new Date(new Date().toLocaleString("en-US",{timeZone:item.country}))
          }
        });

        const newClockList = [
          ...clockList,
          { dateInfo: getNewDate, country: userSelectCountry }
        ];

        setClockList(newClockList);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countriesTime]);

  return (
    <>
      <div>
        <label>country : </label>
        {/*  */}
        <select
          value={userSelectCountry}
          onChange={(e) => {
            getCountry(e);
          }}
        >
          <option value="">Please select a country</option>
          {renderOption(countriesList)}
        </select>
        {""}{" "}
        <button type="button" onClick={onWorldClock}>
          {" "}
          新增{" "}
        </button>
      </div>
      <div className="clockImgBorder">
        {countriesTime === undefined ? null : renderClock(clockList)}
      </div>
    </>
  );
};

export default SelectClock;
