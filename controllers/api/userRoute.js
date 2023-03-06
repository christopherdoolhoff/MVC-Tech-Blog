const router = require('express').Router();
const { User, Submissions } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  const userData = await User.findAll()
  return res.json(userData);
  });

  router.get('/user/:email', async (req, res) => {
    // const userEmail = document.cookie
    const userData = await User.findOne({ where: { email: req.params.email  } })
    return res.json(userData);
    });

  // get all submissions
  router.get('/submissions', async (req, res) => {
    const submissionData = await Submissions.findAll()
    return res.json(submissionData);
    });

    // create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// create new submission
router.post('/submissions/user/:id', async (req, res) => {
  try {
    const submissionData = await Submissions.create({
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      user_id: req.params.id,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(submissionData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


    // login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
