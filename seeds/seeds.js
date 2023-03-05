const sequelize = require('../config/connection');
const { User, posts } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require ('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await posts.bulkCreate(postData);

  process.exit(0);
};

seedDatabase();