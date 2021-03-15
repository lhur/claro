import React, { Component } from 'react';
import '../../assets/styles/styles.css'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { detailPokemon, pokeCart, clearPokemon } from '../../store/ecommerce';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Pokeball from '../../assets/img/pokeball.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from 'react-bootstrap'
import Trash from '../../assets/img/tx.png'

class DetailPokemon extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pokeCart: [],
        amount: '1',
        totally: ''
      }
  };
  
  componentDidMount() {

    this.totalCart()
    let obj = this.props.history.location.pathname.split('/')[2]

    this.props.detailPokemon(obj,
      () => {
        toast.success('Pokémon encontrado(a) com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        },
        (msg) => {
          toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        },
    );
  }


  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })    
  } 

  goToHome = () => {
    this.props.history.push('/')
  }
  
  addToCart = (pokemon) => {

    let attrib = pokemon

    let amount = this.state.amount
    let price = attrib.order
    let total = parseInt(amount) * price

    let pokeArray = {
      name: attrib.name,    
      weight: attrib.weight,
      base_experience: attrib.base_experience,
      height: attrib.height,
      order: attrib.order,
      id: attrib.id,
      amount: this.state.amount,
      total: total
    }

    let arrPokeCart = this.props.ecommerce.pokecart

    if (!arrPokeCart) {
      this.props.pokeCart(pokeArray,
        () => {
          toast.success('Pokémon enviado para o carrinho!', {    
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
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          },
        )
      }
      else {
        const list = [...arrPokeCart, pokeArray]
        this.props.pokeCart(list,
        () => {
          toast.success('Pokémon enviado para o carrinho!', {
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
  } 

  totalCart = () => {
    let carrinho = this.props.ecommerce.pokecart
    let totally = carrinho.reduce((total, currentValue) => total = total + currentValue.total,0);
    console.log(totally);
    this.setState({totally: totally})
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
  }

 
  render() {

    let pokemon = this.props.ecommerce.pokedetail
    let pokePhoto = this.props.history.location.pathname.split('/')[3]
    let pokeRight = parseInt(pokePhoto) + 1
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
        <ToastContainer />
          <Container>
              <Col md={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2rem'}}>
                <Col md={4}>         
                  <Col 
                    className="expand"
                    style={{
                      backgroundColor: '#660066', 
                      borderRadius: '1rem', 
                      marginTop: '2rem',
                      boxShadow: '3px 3px 12px 3px rgba(0,0,0,0.61)',
                    }}  
                    >
                    <Col md={12} style={{display: 'flex', justifyContent: 'center', padding: '3rem'}}>
                      <img style={{width: '16.4rem', height: '16.4rem'}} src={`https://pokeres.bastionbot.org/images/pokemon/${pokeRight}.png`} alt="pkmn"/> 
                    </Col>
                    
                  </Col>
                </Col>
                <Col md={4}>         
                  <Col 
                    style={{
                      backgroundColor: '#660066', 
                      borderRadius: '1rem', 
                      marginTop: '2rem',
                      boxShadow: '3px 3px 12px 3px rgba(0,0,0,0.61)',
                    }}  
                    >
                    <Col style={{padding: '0.9rem', textAlign: 'center'}}>
                      <h3 style={{textTransform: 'capitalize', color: '#FFF', fontWeight: 'bold'}}>{pokemon.name}</h3>
                    </Col>
                    <Col md={12} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0.5rem'}}>
                      <Col md={6} style={{padding: '0.9rem', textAlign: 'center'}}>
                        <h4 style={{color: '#FFF'}}>Peso:</h4>
                        <h4 style={{color: '#FFF'}}>Experiência:</h4>
                        <h4 style={{color: '#FFF'}}>Tamanho:</h4>
                        <h4 style={{color: '#FFF'}}>Preço:</h4>
                        <h4 style={{color: '#FFF'}}>Quantidade:</h4>


                      </Col>
                      <Col md={6} style={{padding: '0.9rem', textAlign: 'center'}}>
                        <h4 style={{color: '#FFF', fontWeight: 'bold'}}>{pokemon.weight} lbs</h4>
                        <h4 style={{color: '#FFF', fontWeight: 'bold'}}>{pokemon.base_experience} xp</h4>
                        <h4 style={{color: '#FFF', fontWeight: 'bold'}}>{pokemon.height} cm</h4>
                        <h4 style={{color: '#FFF', fontWeight: 'bold'}}>{pokemon.order},00</h4>
                        <input 
                          type="number" 
                          id="amount" 
                          name="amount"
                          min="1"
                          max="10"
                          value={this.state.amount}
                          onChange={this.handleChange.bind(this)}
                        >
                        </input>
                      </Col>
                    </Col>
                    <Col md={12} style={{display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem'}}>
                      <Button variant="outline-success" onClick={() => this.addToCart(pokemon)}>Adicionar ao carrinho!</Button>
                    </Col>
                  </Col>
                </Col>
              </Col>
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
    detailPokemon, pokeCart, clearPokemon
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPokemon);
