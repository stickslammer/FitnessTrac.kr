import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Activities,
    Home,
    Login,
    MyRoutines,
    Routines,
    Users,
    Register,
    SingleActivity,
    SingleRoutine
} from './'

import { callApi } from '../util';

const App = () => {
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [token, setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [userRoutines, setUserRoutines] = useState([]);
    const [userId, setUserId] = useState(Number)
    const [currentUser, setCurrentUser] = useState({});
    const history = useHistory();
    
    const fetchPublicRoutines = async () => {
        try {
            const fetchRoutines = await callApi ({ url: `routines` });
            if (fetchRoutines) {
                setRoutines(fetchRoutines);
            };
            return;            
        } catch (error) {
            console.error(error);
        };        
    };

    const fetchUserRoutines = async () => {
        const localToken = localStorage.getItem('token');
        const localUsername = localStorage.getItem('username');
        try {
            if (localUsername) {
                const fetchRoutines = await callApi ({ url: `users/${localUsername}/routines`, token: `${localToken}` });
                if (fetchRoutines) {
                    setUserRoutines(fetchRoutines);
                };
            };
            return;            
        } catch (error) {
            console.error(error);
        };        
    };     

    const fetchActivities = async () => {
        try {
            const fetchActivities = await callApi ({ url: `activities` });
            if (fetchActivities) {
                setActivities(fetchActivities);
            };
            return;
        } catch (error) {
            console.error (error);
        };        
    };

    const props = {
        activities,
        setActivities,
        routines,
        setRoutines,
        token,
        setToken,
        Login,
        userId,
        setUserId,
        userName,
        setUserName,
        userRoutines,
        setUserRoutines,
        fetchActivities,
        fetchPublicRoutines,
        fetchUserRoutines,
        setCurrentUser
    };

    useEffect(() => {
        try {
            fetchActivities();
            fetchPublicRoutines();
            if (token) {
                fetchUserRoutines();
            };
        } catch (error) {
            console.error(error);
        };
    }, [token])

    useEffect(() => {
        const foundToken = localStorage.getItem('token');
        const foundUserName = localStorage.getItem('username');
        const foundUserId = localStorage.getItem('userId');
        if (foundToken) {
            setToken(foundToken);
        };
        if (foundUserName) {
            setUserName(foundUserName);
        };
        if (foundUserId) {
            setUserName(foundUserId);
        }
    });

    return <>
        <header className='site-header'>
            <div className='logo'>Fitness Trac.kr</div>
            <div className='link-bar'>
                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/routines' className='nav-link'>Routines</Link>
                {
                 token ? <Link to='/user/routines' className='nav-link'>My Routines</Link> : null  
                }
                <Link to='/activities' className='nav-link'>Activities</Link>
                {
                 token 
                    ? <button className='logout' onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        localStorage.removeItem('userId');
                        setUserName('');
                        setToken('');
                        setUserRoutines([]);
                        history.push('/');
                    }}>Log out</button>
                    : <Link to='/login' className='nav-link'>Login</Link>
                }
            </div>
        </header>

        <main>
            <Route exact path='/'>
                <Home {...props} />
            </Route>

            <Route exact path='/routines'>
                <Routines {...props} />
            </Route>

            <Route exact path='/activities'>
                <Activities {...props} />
            </Route>
              <Route exact path='/login'>
                <Login {...props} />
            </Route>

            <Route exact path='/user/routines'>
                <MyRoutines {...props} />
            </Route>
        </main>
    </>;
};

export default App;