// 비동기연결에서 axios.post('/post/img', formData) 추가

/* 서버에서
const query = req.query.hashtag;
const query = decodeURIComponent(req.query.hashtag);
*/

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag; 
    if (!query) { 
      return res.redirect('/'); 
    }

    try {
      const hashtag = await Hashtag.findOne({
        where: {title: query}
      }); 
      let posts = [];
      if (hashtag){
        posts = await hashtag.getPosts({include: [{model: User}]}); 
      }
      return res.render('main', { 
        title: `${query}|sns`,
        twits: posts, 
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

  module.exports = router;

/*
router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
      return res.redirect('/');
    }
    try {
      const hashtag = await Hashtag.findOne({ where: { title: query } }); 
      let posts = [];
      if (hashtag) {
        posts = await hashtag.getPosts({ include: [{ model: User, attributes: ['id', 'nick'] }] }); 
      }
      //해시태그 찾고 없으면 DB에 추가하는 코드 삽입 필요
   
      return res.render('main', {
        title: `${query} | NodeBird`,
        twits: posts,
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });
  */