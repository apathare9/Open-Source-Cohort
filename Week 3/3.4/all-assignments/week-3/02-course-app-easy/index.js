const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  try {
  // logic to sign up admin
  const { username, password } = req.body;

   // Validate input (e.g., check for empty fields, password complexity)
   if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check for existing user with the same username
  const existingUser = ADMINS.find(admin => admin.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create the new admin object and push it to the array
  const newAdmin = { username, password};
  ADMINS.push(newAdmin);
  res.json({ message: 'Admin created successfully' });

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  try {
    const { username, password } = req.body;

    // Validate input (e.g., check for empty fields)
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the admin with the matching username
    const admin = ADMINS.find(admin => admin.username === username);

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Directly compare the provided password with the stored password (not hashed)
    if (password !== admin.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.json({ message: 'Admin logged in successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});


// Authentication middleware for admin
const adminauth = (req, res, next) => {
  const { username, password } = req.headers; // Assuming credentials are sent in headers body
  const authorizedAdmin = ADMINS.find(admin => admin.username === username && admin.password === password);

  if (authorizedAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Admin authentication failed' });
  }
};

app.post('/admin/courses', adminauth, (req, res) => {
  try {
    
    const { title, description, price, imageLink, published } = req.body;

    // Validate input (e.g., check for empty fields, price format, image link validity)
    if (!title || !description || !price || !imageLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const nextCourseId = COURSES.length + 1;
    const newCourse = {
      id: nextCourseId,
      title,
      description,
      price,
      imageLink,
      published: published || false, // Default to unpublished if not provided
    };

    COURSES.push(newCourse);

    res.json({ message: 'Course created successfully', courseId: nextCourseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

app.put('/admin/courses/:courseId', adminauth, (req, res) => {
  // logic to edit a course
  try {

    const courseId = parseInt(req.params.courseId);
    const courseIndex = COURSES.findIndex(course => course.id === courseId);

    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const { title, description, price, imageLink, published } = req.body;

    // Validate input (e.g., check for empty fields, price format, image link validity)
    if (!title || !description || !price || !imageLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedCourse = {
      id: courseId,
      title,
      description,
      price,
      imageLink,
      published: published || false, // Default to unpublished if not provided
    };

    COURSES[courseIndex] = updatedCourse;

    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/admin/courses', adminauth, (req, res) => {
  // logic to get all courses
  try {
    const courses = COURSES.filter(course => course.published); // Only return published courses

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  try {
    // logic to sign up admin
    const { username, password } = req.body;
  
     // Validate input (e.g., check for empty fields, password complexity)
     if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // Check for existing user with the same username
    const existingUser = USERS.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    // Create the new admin object and push it to the array
    const newUser = { username, password};
    USERS.push(newUser);
    res.json({ message: 'User created successfully' });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  try {
    const { username, password } = req.headers;

    // Validate input (e.g., check for empty fields)
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the admin with the matching username
    const user = USERS.find(user => user.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Directly compare the provided password with the stored password (not hashed)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.json({ message: 'User logged in successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Authentication middleware for users
const userauth = (req, res, next) => {
  const { username, password } = req.headers; // Assuming credentials are sent in headers body
  const authorizedUser = USERS.find(admin => admin.username === username && admin.password === password);

  if (authorizedUser) {
    next();
  } else {
    res.status(401).json({ message: 'User authentication failed' });
  }
};
app.get('/users/courses', userauth, (req, res) => {
  // logic to list all courses
  // logic to get all courses
  try {
    const courses = COURSES.filter(course => course.published); // Only return published courses

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/users/courses/:courseId', userauth,  (req, res) => {

  const { username, password } = req.headers;

  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);
  if (course) {
    const user = USERS.find(u => u.username === username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/users/purchasedCourses', userauth ,(req, res) => {

  const { username, password } = req.headers;

  const user = USERS.find(u => u.username === username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }


});



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
