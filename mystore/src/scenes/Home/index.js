import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Container, Row, CardDeck } from 'reactstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Produto from '../../components/Produto';
import * as services from '../../services/produtos';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            novidades : [],
            maisVendidos: [],
        }
    }

    componentWillMount() {
        services.getNovidades(5)
            .then(response => {
                this.setState({novidades : response.data});
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
        services.getMaisVendidos(5)
            .then(response => {
                this.setState({maisVendidos: response.data});
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    this.setState({ error: error.response.data.message });
                } else {
                    console.error(error);
                }
            });
    }

    makeNovidades = (rows) => {
        this.state.novidades
            .forEach(produto => {
                rows.push(
                    <Produto key={produto.codigo} produto={produto} />
                );
            });
    }

    makeMaisVendidos = (rows) => {
        this.state.maisVendidos
            .forEach(produto => {
                rows.push(
                    <Produto key={produto.codigo} produto={produto} />
                );
            });
    }

    render() {
        let novidades = [], maisVendidos = [];
        this.makeNovidades(novidades);
        this.makeMaisVendidos(maisVendidos);
        return (
            <div>
                <Carousel transitionTime={1000} emulateTouch useKeyboardArrows infiniteLoop autoPlay showThumbs={false} showStatus={false} dynamicHeight>
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/kindle/email/2018w22/RecomendadoLeitores/desktophero3000x600._CB478047443_.jpg" alt="Imagem" />
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/HomeandKitchen/2018/esp_decoracao/desktophero3000x600._CB495950061_.jpg" alt="Imagem" />
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/br-books/2018/Junho/edsem_record/desktophero3000x600._CB475746997_.jpg" alt="Imagem" />
                </Carousel>
                <Container fluid className="custom-container">
                    <Row className="mt-5">
                        <h4>Novidades</h4>
                    </Row>
                    <Row>
                        <CardDeck>
                            {novidades}
                        </CardDeck>
                    </Row>
                    <Row className="mt-5">
                        <h4>Mais vendidos</h4>
                    </Row>
                    <Row>
                        <CardDeck>
                            {maisVendidos}
                        </CardDeck>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;
