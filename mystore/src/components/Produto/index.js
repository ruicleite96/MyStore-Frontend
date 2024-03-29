import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardBody, Badge, CardFooter, } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { formatterPrice } from '../../constants/formatters';

import * as services from '../../services/carrinho';
import * as routes from '../../constants/routes';

class Produto extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        }
    }

    comprar = () => {
        services.addCarrinho(this.props.produto.codigo, this.state.value)
            .then(response => {
                this.props.carrinhoStore.setCarrinho(response.data);
                this.setState({
                    value: 1,
                });
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

    onChange = (valueAsNumber, valueAsString, input) => {
        this.setState({
            value: valueAsNumber,
        })
    }


    render() {
        let produto = this.props.produto;
        //let descricao = produto.descricao.replace(/(([^\s]+\s\s*){15})(.*)/, "$1…");
        let descricao = produto.descricao.substring(0,60)+'...';

        let price;
        if (produto.precoPromocional !== 0) {
            price =
                <Badge pill color="success" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <small className="strikethrough">{formatterPrice.format(produto.precoBase)}</small><br />
                    {formatterPrice.format(produto.precoPromocional)}
                </Badge>
        } else {
            price =
                <Badge pill color="success" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    {formatterPrice.format(produto.precoBase)}
                </Badge>
        }
        return (
            <Card key={produto.codigo} className="mb-3">
                <div className="position-absolute" style={{ right: '5px', top: '5px' }} >
                    <h5>
                        {price}
                    </h5>
                </div>

                <CardImg top width="100%" src={produto.imageURL} alt="Card image cap" />
                <CardBody style={{ height: '180px'}}>
                    <CardTitle>{produto.nome}</CardTitle>
                    <CardText>{descricao}</CardText>
                </CardBody>
                {
                    (this.props.sessionStore.role === "FUNCIONARIO")
                        ?
                        <CardFooter>
                            <Button size="sm" tag={Link} block to={routes.PRODUTO + produto.codigo}>Ver</Button>
                        </CardFooter>
                        :
                        <CardFooter className="d-flex justify-content-between">
                            <Button size="sm" tag={Link} to={routes.PRODUTO + produto.codigo}>Ver</Button>
                            <NumericInput className="form-control"
                                min={0} max={this.props.produto.stock} precision={0}
                                value={this.state.value}
                                onChange={this.onChange}
                                size={7}
                                style={{
                                    input: {
                                        height: '30px',
                                        width: '70px'
                                    }
                                }} />
                            <Button size="sm" color="success" onClick={this.comprar}>Comprar</Button>
                        </CardFooter>
                }
            </Card >
        );
    }

}

export default compose(
    inject('carrinhoStore', 'sessionStore'),
    observer
)(Produto);
