const sequelize = require('../config/connection');
const { User, Posts } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require ('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);

  await Posts.bulkCreate(postData);

  await Posts.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();