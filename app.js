const express = require("express");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});
//custom error handlers

// error handler to lif errors
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
  } else {
    console.error(err);
  }
  next(err)
});
// error for 404
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
})
// generic error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});





module.exports = app;
