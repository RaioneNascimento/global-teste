import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import usersService from '../../services/users.service';
import './user-detail.page.css';
import Swal from "sweetalert2";

class UserDetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            redirectTo: null
        }
    }

    componentDidMount() {
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }else{
            let userId = this.props.match.params.id            
            this.loadUser(userId)
        }
    }

    async loadUser(userId) {
        try {
            let res = await usersService.getOne(userId)
            this.setState({ user: res.data.data[0] })
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível carregar usuários',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }

    async deleteUser(userId) {
        try {
            await usersService.delete(userId)
            Swal.fire({
              position: 'top-end',
              text: 'Usuário excluído com sucesso',
              showConfirmButton: false,
              timerProgressBar: true,
              background: '#28a745',
              color: '#FFF',
              timer: 4000
            })
            this.props.history.replace('/user-list')
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi excluir o usuário',
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

                <PageTop title={"User"} desc={"Detalhes do user"}>
                    <button className="btn btn-light" onClick={() => this.props.history.goBack()}>
                        Voltar
                    </button>
                </PageTop>

                <div className="row">
                    <div className="col-6">
                        <div className="user-info">
                            <h4>ID</h4>
                            <p>{this.state.user?.id}</p>
                        </div>
                        <div className="user-info">
                            <h4>Nome</h4>
                            <p>{this.state.user?.name}</p>
                        </div>
                        <div className="user-info">
                            <h4>Email</h4>
                            <p>{this.state.user?.email}</p>
                        </div>
                        <div className="user-info">
                            <h4>Acesso</h4>
                            <p>{this.state.user?.auth}</p>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.deleteUser(this.state.user.id)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.history.push('/user-edit/' + this.state.user.id)}>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default UserDetailPage