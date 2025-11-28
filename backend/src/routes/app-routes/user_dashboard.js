import express from 'express';

const dash_routes = express.Router();
dash_routes.get('/', (req, res) => {
  res.send('User base route is working');
});

dash_routes.post('/about', about);
dash_routes.post('/contact', contact);

dash_routes.post('/chats', chatting);
dash_routes.post('/user_profile', profile);
dash_routes.post('/setting', setting);

export const UserRoute = router;
export default UserRoute;