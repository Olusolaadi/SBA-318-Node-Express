import express from "express";
import morgan from 'morgan';

const app = express();
const PORT = 3000;

const todos = [
    { 
        id: 1, 
        title: 'Start Learning React', 
        completed: true 
    },

    { 
        id: 2, 
        title: 'Start Learning Node.js', 
        completed: true 
    },
    {
        id: 3, 
        title: 'Start Learning Express.js', 
        completed: true 
    },
    {
        id: 4, 
        title: 'Start Learning C#', 
        completed: false 
    },
    {
        id: 5, 
        title: 'Start Learning Java', 
        completed: false 
    },
  ];


// view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Todo App', todos });
    res.json({ message: 'Welcome to My Todo App!' });
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.filter((todo) => todo.id === parseInt(req.params.id));
    res.json({ message: 'Todo found!', todo });
});

app.post('/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.json({ message: 'Todo created!', todo });
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found!' });
    } else {
        todo.title = req.body.title;
        todo.completed = req.body.completed;
        res.json({ message: 'Todo updated!', todo });
    }
});

app.delete('/todos/:id', (req, res) => {
    const deltodo = todos.findIndex((todo) => todo.id === parseInt(req.params.id));
    res.json({ message: 'Todo deleted!', deltodo });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});