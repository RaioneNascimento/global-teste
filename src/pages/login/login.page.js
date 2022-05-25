import React from "react";
import authService from "../../services/auth.service";
import './login.page.css';
import Swal from "sweetalert2";
import Logo from '../../assets/logo/global_logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  async sendLogin(event) {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    if (!data.email || data.email == "") {
      Swal.fire({
        position: 'top-end',
        text: 'E-mail é obrigatório',
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#dc3545',
        color: '#FFF',
        timer: 4000
      })
      return;
    }

    if (!data.password || data.password == "") {
      Swal.fire({
        position: 'top-end',
        text: 'Senha é obrigatória',
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#dc3545',
        color: '#FFF',
        timer: 4000
      })
      return;
    }

    try {
      let res = await authService.sendLogin(data);
      authService.setLoggedUser(res.data.data);
      this.props.onLogin();
      this.props.history.replace("/");
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        text: 'Não foi possível efetuar o login.',
        showConfirmButton: false,
        timerProgressBar: true,
        background: '#dc3545',
        color: '#FFF',
        timer: 4000
      })
    }
  }

  render() {
    return (
      <div className="container conteiner-login">
        <div className="card">
          <div className="card-body">
            <div className="card-logo">
              <img src={Logo} alt="Logo da global tecnologia" />
            </div>
            <form onSubmit={(e) => this.sendLogin(e)}>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Insira seu email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Insira sua senha"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
