import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import usersService from '../../services/users.service';
import './user-list.page.css';
import Swal from "sweetalert2";

class UserListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }else{
            this.loadUsers()
        }
    }

    async loadUsers() {
        try {
            let res = await usersService.list()
            this.setState({ users: res.data.data })
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível listar os usuarios.',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }

    render() {
        if(this.state.redirectTo){
            return(
                <Redirect to={this.state.redirectTo}/>
            )
        }

        return (
            <div className="container">

                <PageTop title={"Users"} desc={"Lista de usuários"}>
                    <button className="btn btn-primary"onClick={() => this.props.history.push('/user-add')}>
                        Adicionar
                    </button>
                </PageTop>

                {this.state.users.map(user => (
                    <Link to={"/user-detail/" + user.id} key={user.id}>
                        <div className="user-card">
                            <div className="user-card__text">
                                <p><b>Nome:</b> {user.name}</p>
                                <p><b>E-mail:</b> {user.email}</p>
                                <p><b>Nível de acesso:</b> {user.auth}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }

}

export default UserListPage;