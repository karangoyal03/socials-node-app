const { getAllContent, getUserContent } = require('../homePage/dao');

const getLatestContent = async (req, res) => {
  try {
    const content = await getAllContent();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
};

const getUserLatestContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await getUserContent(id);
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user content' });
  }
};

module.exports = { getLatestContent, getUserLatestContent };
