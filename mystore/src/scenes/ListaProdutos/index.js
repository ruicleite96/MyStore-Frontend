import React, { Component } from 'react';
import { Container, Row, Col, CardColumns } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroller';
import ScrollUpButton from "react-scroll-up-button";

import * as services from '../../services/produtos';
import Produto from '../../components/Produto';

class ListaProdutos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoria: this.props.match.params.categoria,
            produtos: [],
            nPaginas: 0,
            paginaAtual: 1,
            moreProdutos: true,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.categoria !== prevProps.match.params.categoria) {
            this.setState({
                categoria: this.props.match.params.categoria,
                produtos: [],
                nPaginas: 0,
                paginaAtual: 1,
                moreProdutos: true,
            });
        }

    }

    makeProdutos = (rows) => {
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

    loadMoreProdutos = () => {
        let self = this;
        services.getProdutos(this.state.categoria, this.state.paginaAtual, 10)
            .then(response => {
                if (response.data.length === 0) {
                    this.setState({ moreProdutos: false });
                    return;
                }

                let produtos = self.state.produtos;
                response.data.forEach((produto) => {
                    produtos.push(produto);
                })

                self.setState({ produtos: produtos, paginaAtual: self.state.paginaAtual + 1 });
            })
            .catch(error => {
                console.error(error);
            })
    }


    render() {
        let rows = [];
        this.makeProdutos(rows);
        const loader = <div className="loader">Loading ...</div>;
        return (
            <div>
                <Container style={{ minHeight: '75vh' }} >
                    <Row className="mt-5">
                        <Col className="pl-0">
                            <h4>Lista de Produtos</h4>
                            <h6>Categoria: {this.state.categoria}</h6>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <ScrollUpButton />
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMoreProdutos}
                            hasMore={this.state.moreProdutos}
                            loader={loader}>
                            {(this.state.produtos.length === 0)
                                ? <h4>Não há produtos a apresentar!</h4>
                                :
                                <CardColumns>
                                    {rows}
                                </CardColumns>}
                        </InfiniteScroll>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ListaProdutos;
