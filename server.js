const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || '0.0.0.0';

const site = {
  oldDomain: 'hoccovua.edu.vn',
  newDomain: 'hoccovua.online',
  newUrl: 'https://hoccovua.online',
  teacher: 'Thầy Toàn'
};

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  express.static(path.join(__dirname, 'public'), {
    maxAge: '7d',
    etag: true
  })
);

app.get('/', (req, res) => {
  res.render('index', {
    title: `${site.teacher} đã chuyển sang ${site.newDomain}`,
    site
  });
});

app.get(['/di-den-trang-moi', '/sang-trang-moi', '/go'], (req, res) => {
  res.redirect(302, site.newUrl);
});

app.use((req, res) => {
  res.status(404).render('index', {
    title: `${site.teacher} đã chuyển sang ${site.newDomain}`,
    site
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Website dang chay tai http://${HOST}:${PORT}`);
});
