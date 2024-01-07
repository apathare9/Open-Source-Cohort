const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// MONGODB Code :-


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ajinkyapathare123:ajinkya123@cluster0.kbda1qi.mongodb.net/courses?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);



// END of MongoDB code



// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: {type: String},
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);




let ADMINS = [];
let USERS = [];
let COURSES = [];

const SECRET = 'SECr3t';

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post('/admin/signup', async(req, res) => {
  try {
  // logic to sign up admin
  const { username, password } = req.body;

   // Validate input (e.g., check for empty fields, password complexity)
   if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check for existing user with the same username
  const existingUser = await Admin.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create the new admin object and push it to the array
  const newAdmin = new  Admin({ username, password});
  await newAdmin.save();
  const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'Admin created successfully', token});

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  try {
    const { username, password } = req.headers;

    // Validate input (e.g., check for empty fields)
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the admin with the matching username
    const admin = await Admin.findOne({ username, password })

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }



    // Successful login
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Admin logged in successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});
app.post('/admin/courses', authenticateJwt, async (req, res) => {
  try {
    
    const { title, description, price, imageLink, published } = req.body;

    // Validate input (e.g., check for empty fields, price format, image link validity)
    if (!title || !description || !price || !imageLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const nextCourseId = COURSES.length + 1;
    const newCourse =  new Course({
      id: nextCourseId,
      title,
      description,
      price,
      imageLink,
      published: published || false, // Default to unpublished if not provided
    });

    await newCourse.save();

    res.json({ message: 'Course created successfully', courseId: nextCourseId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});

app.put('/admin/courses/:courseId', authenticateJwt, async(req, res) => {
  // logic to edit a course
  try {

    const courseId = parseInt(req.params.courseId);
    // const courseIndex = await Course.findByIdAndUpdate(  parseInt(req.params.courseId), req.body, { new: true });
    // // const courseIndex = COURSES.findIndex(course => course.id === courseId);

    // if (courseIndex === -1) {
    //   return res.status(404).json({ message: 'Course not found' });
    // }

    const { title, description, price, imageLink, published } = req.body;

    // Validate input (e.g., check for empty fields, price format, image link validity)
    if (!title || !description || !price || !imageLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedCourse = new Course({
      id: courseId,
      title,
      description,
      price,
      imageLink,
      published: published || false, // Default to unpublished if not provided
    });

    // COURSES[courseIndex] = updatedCourse;
    await updatedCourse.save();

    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/admin/courses', authenticateJwt, async(req, res) => {
  // logic to get all courses
  try {
    // const courses = COURSES.filter(course => course.published); // Only return published courses

    const courses = await Course.find({});

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  try {
    // logic to sign up admin
    const { username, password } = req.body;
  
     // Validate input (e.g., check for empty fields, password complexity)
     if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    // Check for existing user with the same username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    // Create the new admin object and push it to the array
    const newUser =  new User({ username, password });
    await newUser.save();
    const token = generateJwt(newUser);
    // const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  
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
    const token = generateJwt(user);
    res.json({ message: 'User logged in successfully' ,token});

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
app.get('/users/courses', authenticateJwt, (req, res) => {
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

app.post('/users/courses/:courseId', authenticateJwt,  (req, res) => {

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

app.get('/users/purchasedCourses', authenticateJwt ,(req, res) => {

  const { username, password } = req.headers;

  const user = USERS.find(u => u.username === username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }


});


async function startServer() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();


// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
