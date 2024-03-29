import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import ReactLoading from 'react-loading';
import ScrollUpButton from "react-scroll-up-button";

import * as services from '../../services/produtos';
import Produto from '../../components/Produto';

class ListaNovidades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: undefined,
        };
    }

    componentWillMount() {
        services.getNovidades(20)
            .then(response => {
                this.setState({ produtos: response.data });
            })
            .catch(error => {
                console.error(error);
            })
    }

    makeNovidades = (rows) => {
        for (let i = 0; i < this.state.produtos.length; i++) {
            rows.push(
                <Produto key={this.state.produtos[i].codigo} produto={this.state.produtos[i]} />
            )

            if ((i + 1) % 2 === 0) {
                rows.push(<div className="w-100 d-none d-md-block d-lg-none"></div>);
                rows.push(<div className="w-100 d-none d-sm-block d-md-none"></div>);
            }
            if ((i + 1) % 3 === 0) {
                rows.push(<div className="w-100 d-none d-lg-block d-xl-none"></div>);
            }
            if ((i + 1) % 4 === 0) {
                rows.push(<div className="w-100 d-none d-xl-block"></div>);
            }
        }
    }

    render() {
        let rows = [];
        let text = <h6>Não existem novidades a mostrar.</h6>
        if (this.state.produtos === undefined) {
            text = <ReactLoading type={"bars"} color={"#232f3e"} delay={5} />
        } else if (this.state.produtos.length !== 0) {
            this.makeNovidades(rows);
            text =
                <CardDeck>
                    {rows}
                </CardDeck>
        }

        return (
            <div>
                <Container style={{ minHeight: "60vh" }} >
                    <Row className="mt-5">
                        <h4>Novidades</h4>
                    </Row>
                    <Row className="mt-4">
                        <ScrollUpButton />
                        {text}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ListaNovidades;
