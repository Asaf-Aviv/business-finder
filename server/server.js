require('dotenv').config();
const app = require('../app');

// const fn = async (query) => {
//   const res = await axios({
//     method: 'POST',
//     url: 'https://api.yelp.com/v3/graphql',
//     headers: {
//       Authorization: `Bearer ${process.env.YELP_API_KEY}`,
//     },
//     data: {
//       query,
//     },
//   });

app.listen(5000, () => {
  console.log('listening on port 5000');
});
