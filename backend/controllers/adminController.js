const adminCollection = require('../models/adminModel')
const Keyword = require('../models/keywordModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const adminSignup = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (username === '' || password === '') {
      return res.status(400).json({ message: 'Empty field' });
    }
    const checkuser = await adminCollection.find({ username: username });
    if (checkuser.length > 0) {
      return res.status(400).json({ message: 'username already exists' });
    }
    else {
      password = password ? await bcrypt.hash(password, 10) : null;
      const newUser = adminCollection({ username, password });
      await newUser.save();
      res.status(201).json();

    }
  } catch (error) {
    return res.status(500).json({ error, message: "Internal server error" });
  }
}


const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, 'refresh_token_secret_key', { expiresIn: '7d' });
};


const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  const user = await adminCollection.findOne({ username });
  console.log(user)

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id}, 'jwt_secret_key', {
    expiresIn: '1h',
  });

  const refreshToken = generateRefreshToken(user._id);
  return res.json({ token, refreshToken });
};


const refreshToken = (req, res) => {
  const token = jwt.sign({ userId: req.userId }, 'jwt_secret_key', { expiresIn: '1h' });
  return res.json({ token });
};


const  analytics = async (req, res) => {
  try {
    const order = req.params.order === 'asc' ? 1 : -1;
    const keywords = await Keyword.aggregate([
      { $group: { _id: '$keyword', count: { $sum: 1 } } },
      { $sort: { count: order } },
    ]);

    res.json(keywords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = { adminSignup,login, refreshToken, analytics }
