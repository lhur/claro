import React, { Component } from 'react';
import '../../assets/styles/styles.css'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { listPokemons, pokeCart, clearPokemon } from '../../store/ecommerce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pokeball from '../../assets/img/pokeball.png'
import Trash from '../../assets/img/tx.png'
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Dropdown }from 'react-bootstrap'

class Ecommerce extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pokelist: ''
      }
  };

  totalCart = () => {
    let carrinho = this.props.ecommerce.pokecart
    let totally = carrinho.reduce((total, currentValue) => total = total + currentValue.total,0);
    console.log(totally);
    this.setState({totally: totally})
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })    
  } 
  
  componentDidMount() {
    this.props.listPokemons()
    this.totalCart()

  }

  goToDetail = (values, id) => {
    this.props.history.push(`/detail-pokemon/${values}/${id}`)
  }

  goToHome = () => {
    this.props.history.push('/')
  }

  removePoke = (index) => {
    let carrinho = this.props.ecommerce.pokecart
    let targeted = index
    let pokeFilter = carrinho.splice(targeted, 1);

    this.props.pokeCart(carrinho,
      () => {
        toast.error('Pokémon removido do carrinho!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          this.totalCart()
        },
        (msg) => {
          toast.error(msg, {
            position: "top-right",                      
            closeOnClick: true,
            pauseOnHover: true,
          });
        },
      )
  }
  clearCarrinho = () => {
    this.props.clearPokemon()
    this.setState({totally: '0'})
  }
  
  render() {

    let pokemonList = this.props.ecommerce.pokeall.results
    let carrinho = this.props.ecommerce.pokecart

    return (
      <div>
        <Col className="header" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Col>
            <h2 style={{color: '#FFF', fontWeight: 'bold', marginTop: '0.5rem'}} onClick={this.goToHome}>PokéShop</h2>
          </Col>
          <Dropdown >
            <Dropdown.Toggle variant="hidden" id="dropdown-basic">
              <img src={Pokeball} style={{width: '2.5rem', height: '2.5rem', marginTop: '0.5rem'}} alt="pkmn"/>
            </Dropdown.Toggle>
           
            <Dropdown.Menu >
              <Col md={12} style={{display: 'flex', flexDirection: 'row', padding: '1rem'}}>
                <Col md={2}>
                  <h6>Imagem</h6>
                </Col>
                <Col  md={3}>
                  <h6>Nome</h6>
                </Col>
                <Col  md={1}>
                  <h6>Qtd</h6>
                </Col>
                <Col  md={2}>
                  <h6>Valor</h6>
                </Col>
                <Col  md={2}>
                  <h6>Total</h6>
                </Col>
                <Col  md={2}>
                  <h6>Excluir</h6>
                </Col>
              </Col>
              {carrinho.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} href="#">
                      <Col md={12} style={{display: 'flex', flexDirection: 'row'}}>
                        <Col md={2}>
                          <img style={{width: '2rem', height: '2rem'}} src={`https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`} alt="pkmn"/> 
                        </Col>
                        <Col  md={3}>
                          {item.name}
                        </Col>
                        <Col  md={1}>
                          {item.amount} 
                        </Col>
                        <Col  md={2}>
                          {item.order},00 
                        </Col>
                        <Col  md={2}>
                          {item.total},00 
                        </Col>
                        <Col  md={2}>
                          <img src={Trash} style={{width: '1rem', height: '1rem'}} onClick={() => this.removePoke(index)}  alt="excluir"/>
                        </Col>
                      </Col>
                    </Dropdown.Item>
                  )
                })
              }
              <Col md={12} style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
              <h5>Total: {this.state.totally},00</h5>
              </Col>
              <Col md={12} style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                <Button variant="outline-success" onClick={() => this.clearCarrinho()}>Limpar Carrinho</Button>
              </Col>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
          <Container>
          <ToastContainer />
            <Row> 
              {pokemonList.map((item, index) => {
                return (
                  <Col md={3} key={index}>         
                    <Col 
                      onClick={() => this.goToDetail(item.name, index)}
                      className="expand"
                      style={{
                        backgroundColor: '#660066', 
                        borderRadius: '1rem', 
                        marginTop: '2rem',
                        boxShadow: '3px 3px 12px 3px rgba(0,0,0,0.61)',
                        marginBottom: '0.5rem' 
                      }}  
                      >
                      <Col md={12} style={{display: 'flex', justifyContent: 'center', padding: '2rem'}}>
                        <img style={{width: '6rem', height: '6rem'}} src={`https://pokeres.bastionbot.org/images/pokemon/${index+1}.png`} alt="pkmn"/> 
                      </Col>
                      <Col style={{padding: '0.5rem', textAlign: 'center'}}>
                        <h4 style={{textTransform: 'capitalize', color: '#fff', fontWeight: 'bold'}}>{item.name}</h4>
                      </Col>
                    </Col>
                  </Col>
                )})
              }
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    ecommerce: state.ecommerce,
  }
}

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ 
    listPokemons, pokeCart, clearPokemon
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
