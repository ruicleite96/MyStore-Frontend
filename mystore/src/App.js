import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import withAuthentication from './high-order_components/withAuthentication';
import Home from './scenes/Home';
import NavBar from './components/NavBar';
import Login from './scenes/Login';
import Registar from './scenes/Registar';
import DetalhesProduto from './scenes/DetalhesProduto';
import Conta from './scenes/Conta';
import Novidades from './scenes/ListaNovidades';
import Promocoes from './scenes/ListaPromocoes';
import Encomendas from './scenes/Encomendas';
import Footer from './components/Footer'
import * as routes from './constants/routes';
import './App.css';
import ListaProdutos from './scenes/ListaProdutos';
import Procura from './scenes/Procura';
import DetalhesEncomenda from './scenes/DetalhesEncomenda';

class App extends Component {

	render() {
		return (
			<div className="App">
				<BrowserRouter >
					<div>
						<NavBar />
						<Switch>
							<Route exact path={routes.HOME} component={Home} />
							<Route exact path={routes.LOGIN} component={Login} />
							<Route exact path={routes.REGISTAR} component={Registar} />
							<Route path={routes.PRODUTO + ':id'} component={DetalhesProduto} />
							<Route path={routes.LISTA_PRODUTOS + ':categoria'} component={ListaProdutos} />
							<Route exact path={routes.CONTA} component={Conta}/>
							<Route exact path={routes.NOVIDADES} component={Novidades}/>
							<Route exact path={routes.PROMOCOES} component={Promocoes}/>
							<Route exact path={routes.ENCOMENDAS} component={Encomendas}/>
							<Route exact path={routes.ENCOMENDA+ ':numero'} component={DetalhesEncomenda}/>
							<Route path={routes.PROCURA + ':categoria/:string'} component={Procura}/>
							<Route path={routes.PROCURA + ':string'} component={Procura}/>
						</Switch>
						<Footer />
					</div>
				</BrowserRouter >
			</div>
		);
	}

}

export default withAuthentication(App);
