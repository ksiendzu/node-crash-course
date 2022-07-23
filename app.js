const express = require('express');
const { add } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://administr:24Tatsu.Mongo68@nodetuts.sfo4x.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) 
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs'); //by default looks for "views" folder - so just "ejs"
        //2 parameters - 2nd argument is path folder
    // app.set('views', 'myviews');

// listen for requests
//przeniosione do database method, zeby nasluchiwal requestow dopiero jak jest polaczenie z baza danych
// app.listen(3000);

//1szy sposob reczny
/* app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
    
});
 */

//2gi sposob przez npm morgan
//middleware & static files - nadawanie public dostepow do plikow statycznych np. css
app.use(express.static('public'));
//for accepting form data (POST) - takes url from form and enables to pass to object, then we can use on request object
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

    // //mongoose and mongo sandbox routes
    // //add blog to the database
    // app.get('/add-blog', (req, res) => {
    //     //use Blog model to create a new instance of a blog document
    //     const blog = new Blog({
    //         title: 'new blog',
    //         snippet: 'about my blog',
    //         body: 'and more things about my blog'
    //     });

    //     //use method .save to save new instance (blog) to the database
    //     //++ when saving, using .save() method on instance of model
    //     blog.save()
    //     //it's async task and take some time, so it's promise, so we can use .then and .catch
    //     .then((result) => {
    //         res.send(result)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // })

    // //get blogs from db
    // app.get('/all-blogs', (req,res) => {
    //     //++ when finding we use a method directly on Blog, not on instance (blog)
    //     Blog.find()
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    // //get find single blog
    // app.get('/single-blog', (req, res) => {
    //     Blog.findById('62d04f232a7274d85ef0e552')
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // })

    //routes
app.get('/', (req, res) => {
    res.redirect('blogs');
});

            //STARE
            // app.get('/', (req, res) => {
            //         //1szy sposob
            //     //res.send('<p>home page</p>'); //automatically adds content-type, .send is method specific for express

            //         //2gi sposob - add root i dirname bo zaciaga absolute path domyslnie, wiec dodajemy zeby bylo relative path
            //     // res.sendFile('./views/index.html', { root: __dirname}); 


            //     const blogs = [
            //         {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
            //         {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
            //         {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
            //     ];

            //         //3ci sposob - renderowanie view, param - filename w/o extension
            //         // kolejny argumentem jest to co przekazuje - tutaj tytul strony
            //     // res.render('index', { title: 'Home', blogs: blogs}); <- to samo co linijke nizej
            //     res.render('index', { title: 'Home', blogs});


            // });

            // app.get('/about', (req, res) => {
                
            //     //res.send('<p>about page</p>'); //automatically adds content-type, .send is method specific for express

            //     // res.sendFile('./views/about.html', { root: __dirname});

            //     res.render('about', { title: 'About'});
            // });

            //         //niepotrzebne juz - redirects
            //             // app.get('/about-us', (req, res) => {
            //             //     res.redirect('/about');
            //             // })

//blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        //renderujemy view index.ejs zeby przekazac array blogs, skoro w view index tego sie spodziewamy
        res.render('index', { title: 'All blogs', blogs: result})
      })
      .catch((err) => {
        console.log(err);
      })
});

//POST publish blog through form
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
        //po tym jak sie uda przyjac dane, chcemy przekierowac uzytkownika na strone glowna
        res.redirect('/blogs');
      })
      .catch((err) => {
        console.log(err);
      });
})

app.get('/blogs/:id', (req, res) => {4
    //extract ID
    const id = req.params.id;
    //use extracted ID to find blog post in database
    Blog.findById(id)
      .then(result => {
        //render details page using details view
        //after we got a blog, we send it into a view
        res.render('details', { blog: result, title: "Blog details"});
      })
      .catch(err => {
        console.log(err);
      })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then(result => {
        //send back JSON to the browser, and JSON has redirect property
        //cant use redirect directly
        res.json({ redirect: '/blogs' })
      })
      .catch(err => {
        console.log(err);
      })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog post'});
})

// 404 page
    //odpala ten kod na koncu, metoda .use nie wymaga konkretnego URL, tylko odpala na kazdym requescie jesli renderowanie kodu dojdzie do tego momentu
    // metoda .use cos a'la catchall, bo dziala na kazdy response bez specyfikowania URL
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname});

    res.status(404).render('404', { title: '404 Ups'});

})
