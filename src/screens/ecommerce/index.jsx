import React, { Component } from 'react';
import '../../assets/styles/styles.css'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { listPokemons } from '../../store/ecommerce';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Pokeball from '../../assets/img/pokeball.png'
import Trash from '../../assets/img/tx.png'

import { Dropdown }from 'react-bootstrap'

class Ecommerce extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pokelist: ''
      }
  };

  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })    
  } 
  
  componentDidMount() {
    this.props.listPokemons()
  }

  goToDetail = (values, id) => {
    this.props.history.push(`/detail-pokemon/${values}/${id}`)
  }

  goToHome = () => {
    this.props.history.push('/')
  }
  
  render() {

    let pokemonList = this.props.ecommerce.pokeall.results

    return (
      <div>
        <Col className="header" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Col>
            <h2 style={{color: '#FFF', fontWeight: 'bold', marginTop: '0.5rem'}} onClick={this.goToHome}>PokéShop</h2>
          </Col>
          <Dropdown>
            <Dropdown.Toggle variant="hidden" id="dropdown-basic">
              <img src={Pokeball} style={{width: '2.5rem', height: '2.5rem', marginTop: '0.5rem'}} alt="pkmn"/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
          <Container>
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
    listPokemons
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
