import axios from 'axios';
import qs from 'querystring'

import { urlProdutos } from '../../services';

export const getNovidades = (quantidade) =>
    axios.get(`${urlProdutos}/novidades/${quantidade}`);

export const getMaisVendidos = () =>
    axios.get(`${urlProdutos}/maisVendidos`);
