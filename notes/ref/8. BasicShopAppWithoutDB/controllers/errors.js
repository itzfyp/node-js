exports.get404 = (req, res) => {

  res.statusCode = 404;
  res.render('404', {
    pageTitle: 'Page not found',
    path: '/404'
  });
};
