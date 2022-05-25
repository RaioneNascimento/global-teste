import React from 'react';
import { Redirect } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import authService from '../../services/auth.service';
import usersService from '../../services/users.service';
import './user-edit.page.css'
import Swal from "sweetalert2";

class UserEditPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id: null,
            name : '',
            email : '',
            auth : '',
            redirectTo: null
        }

    }

    componentDidMount(){
        let userData = authService.getLoggedUser();
        if(!userData){
            this.setState({redirectTo : "/login"})
        }else{
            if(this.props?.match?.params?.id){
                let userId = this.props.match.params.id
                this.loadUser(userId)
            }
        }
    }

    async loadUser(userId){
        try {
            let res = await usersService.getOne(userId)
            let user = res.data.data[0]
            this.setState(user)
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'Não foi possível carregar o usuário',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
        }
    }

    async sendUser(){
        
        let data = {
            name : this.state.name,
            email : this.state.email,
            auth : this.state.auth,
        }

        if(!data.name || data.name === ''){
            Swal.fire({
                position: 'top-end',
                text: 'Nome é obrigatório!',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
            return;
        }
        if(!data.email || data.email === ''){
            Swal.fire({
                position: 'top-end',
                text: 'E-mail é obrigatório!',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
            return;
        }
        if(!data.auth || data.auth === ''){
            Swal.fire({
                position: 'top-end',
                text: 'Autorização é obrigatório!',
                showConfirmButton: false,
                timerProgressBar: true,
                background: '#dc3545',
                color: '#FFF',
                timer: 4000
            })
            return;
        }

        try {
            if(this.state.id){
                await usersService.edit(data, this.state.id)
                Swal.fire({
                    position: 'top-end',
                    text: 'Usuário editado com sucesso!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    background: '#28a745',
                    color: '#FFF',
                    timer: 4000
                })
            }
            else{
                await usersService.create(data)
                Swal.fire({
                    position: 'top-end',
                    text: 'Usuário criado com sucesso!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    background: '#28a745',
                    color: '#FFF',
                    timer: 4000
                })
            }
            this.props.history.push('/user-list')
        } catch (error) {
            Swal.fire({
                position: 'top-end',
                text: 'erro ao criar usuário',
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
        let title = this.state.id ? 'Editar Usuário' : 'Novo Usuário';
        let desc = this.state.id ? 'Editar informações de um usuário' : 'Formulário de criação de usuário';

        return (
            <div className="container">

                <PageTop title={title} desc={desc}>
                    <button className="btn btn-light" onClick={() => this.props.history.replace('/user-list')}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => this.sendUser()}>
                        Salvar
                    </button>
                </PageTop>

                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="form-group container-checkbox">
                        <label htmlFor="auth">Usuário admin?</label>
                        <input
                            type="checkbox"
                            id="auth"
                            style={{ marginLeft: '12px' }}
                            value={this.state.auth}
                            checked={this.state.auth === "admin"}
                            onChange={e => this.setState({ auth: e.target.checked ? 'admin' : 'user'})} />
                    </div>
                </form>
            </div>
        )
    }

}

export default UserEditPage;