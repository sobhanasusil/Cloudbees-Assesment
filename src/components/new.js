import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Grid, Button } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched from GitHub API:', data);
        const userIds = data.map(user => user.id);
        fetchUserDetails(userIds);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const fetchUserDetails = (userIds) => {
    Promise.all(userIds.map(userId =>
      fetch(`https://api.github.com/user/${userId}`)
        .then(response => response.json())
    ))
      .then(userData => {
        console.log('Detailed user data:', userData);
        
        const updatedUsers = userData.map(user => ({
          id: user.id,
          firstName: user.name ? user.name.split(' ')[0] : '',
          lastName: user.name ? user.name.split(' ')[1] : '',
          username: user.login,
          avatarUrl: user.avatar_url
        }));
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error fetching user details:', error));
  };

  return (
    <div>
      <Typography variant='h2' sx={{ textAlign:'center'}}>User List</Typography>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={4} key={user.id}>
            <Card style={{ width: '100%', textAlign: 'center' }}>
              <CardContent>
                <Avatar src={user.avatarUrl} alt={user.username} style={{ width: '100px', height: '100px', margin: 'auto', marginBottom: '10px' }} />
                <Typography variant="h5" component="h2">
                  First Name: {`${user.firstName}`}
                </Typography>
                <Typography variant="h5" component="h2">
                  Last Name: {`${user.lastName}`}
                </Typography>
                <Typography variant="body1" component="p">
                  Username: {user.username}
                </Typography>
                <Button component={Link} to={`/user/${user.username}`} variant="contained" color="primary" style={{ marginTop: 20 }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserList;
