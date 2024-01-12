/* eslint-disable */
import '../Auth.scss';
import iconStar from 'assets/images/icons/star.svg';
import iconArrow from 'assets/images/icons/arrow.svg';
import { Button, Form, FormGroup, Input, Label, NavLink } from 'reactstrap';
import { useState } from 'react';
import logo from 'assets/logo/logo-2.svg';
import { Link, useNavigate } from 'react-router-dom';

import bgOne from 'assets/images/bgs/login-1.svg';
import bgTwo from 'assets/images/bgs/login-2.svg';
import axios from 'axios';
// import { SERVER_API } from 'host';
import Swal from 'sweetalert2';
import { authService, setUser } from 'service';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginAdmin = async () => {
        try {
            const rs = await authService.login(username, password);
            console.log(rs);
            if (rs.data.statusCode == 200) {
                setUser(rs.data.data);
                navigate('/');
            }
        } catch (err) {
            console.log(err.message);
            await Swal.fire(`Username or password incorrect`, ``, 'error');
        }
    };
    return (
        <div
            className="bg"
            style={{
                backgroundImage: `url(${bgOne}),url(${bgTwo})`,
                backgroundSize: 'cover, cover',
                backgroundPosition: 'center, center',
                backgroundRepeat: 'no-repeat, no-repeat'
            }}
        >
            <div className="box-container">
                <div className="box-content">
                    <div className="img-logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="form-content">
                        <Form onSubmit={(e) => e.preventDefault()}>
                            <FormGroup>
                                <Label for="userName">Username</Label>
                                <Input
                                    id="userName"
                                    placeholder="Username"
                                    value={username}
                                    className="format-input"
                                    type="text"
                                    onChange={handleChangeUsername}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    className="format-input"
                                    value={password}
                                    onChange={handleChangePassword}
                                    onKeyUp={e => {
                                        if (e.key === "Enter")
                                            handleLoginAdmin()
                                    }}
                                />
                            </FormGroup>
                            <FormGroup className="container-btn"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                <Button onClick={handleLoginAdmin} className="format-btn btn-submit" style={{ width: "100%", height: '48px' }}>
                                    Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
