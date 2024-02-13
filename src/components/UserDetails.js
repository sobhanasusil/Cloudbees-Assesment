import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: 'auto',
    textAlign: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 200,
    height: 200,
    margin: 'auto',
    marginBottom: 20,
    marginTop:20
  },
});

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [username]);
  

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          User Details
        </Typography>
        <Divider />
        {user && (
          <>
            <Avatar src={user.avatar_url} alt={user.login} className={classes.avatar} />
            <Typography variant="h6" component="p">
              Name: {user.name}
            </Typography>
            <Typography variant="body1" component="p">
              Username: {user.login}
            </Typography>
            <Typography variant="body1" component="p">
              Company: {user.company || 'N/A'}
            </Typography>
            <Typography variant="body1" component="p">
              Followers: {user.followers}
            </Typography>
            <Typography variant="body1" component="p">
              Following: {user.following}
            </Typography>
            <Typography variant="body1" component="p">
              Public Repositories: {user.public_repos}
            </Typography>
          
            <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: 20 }}>
              Back to User List
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
