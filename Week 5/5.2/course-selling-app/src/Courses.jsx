import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
      console.log(data);
    }

    function callback1(res) {
      res.json().then(callback2);
    }

    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <>
      Courses
      <div
        className=""
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {courses.map((course) => {
          return <Course key={Math.random()} course={course} />;
        })}
      </div>
    </>
  );
}

export function Course(props) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="body2" textAlign={"center"}>
            {props.course.title}
            <br />
            {props.course.description}
            <br />
            <img src={props.course.imageLink} style={{ width: 300 }}></img>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Courses;
