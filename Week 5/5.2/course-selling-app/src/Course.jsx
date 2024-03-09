import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { course } from " ./Courses";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Course() {
  let { courseId } = useParams();

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

  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading....</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CourseCard course={course} />
      <UpdateCard courses={courses} course={course} setCourses={setCourses} />
    </div>
  );
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const course = props.course;

  //   props.setCourses();

  return (
    <center>
      <div>Add your desired course below....</div>
      <div>
        Title -{" "}
        <input
          type={"text"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <br />
        Description -{" "}
        <input
          type={"text"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <br />
        Image Link -{" "}
        <input
          type={"text"}
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        ></input>
        <br />
        <Button
          variant="contained"
          onClick={() => {
            function callback2(data) {
              alert("course updated!");
              // localStorage.setItem("token", data.token);
              let updatedCourses = [];
              for (let i = 0; i < props.courses.length; i++) {
                if (props.courses[i].id == course.id) {
                  updatedCourses.push({
                    id: course.id,
                    title: title,
                    description: description,
                    imageLink: imageLink,
                  });
                } else {
                  updatedCourses.push(props.courses[i]);
                }
              }
              props.setCourses(updatedCourses);
              console.log(data);
            }
            function callback1(res) {
              res.json().then(callback2);
            }

            fetch("http://localhost:3000/admin/courses/" + course.id, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: imageLink,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }).then(callback1);
          }}
        >
          Update Course
        </Button>
        ;
      </div>
    </center>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="body2" textAlign={"center"}>
          {course.title}
          <br />
          {course.description}
          <br />
          <img src={course.imageLink} style={{ width: 300 }}></img>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Course;
