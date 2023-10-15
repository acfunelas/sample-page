import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import LoadingContext from '../../../context/LoadingContext';
import API from '../../../helpers/API';
import { TableCellStyled } from './MainPageContent.styles';
import Modal from 'react-bootstrap/Modal';

const MainPageContent = () => {
  const [,setIsLoading] = useContext(LoadingContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (info) => {
    setSelected(info)
    setShow(true)
  };
  // useEffects and functions
           
  const getProducts = async() => {
    setLoading(true)
    const response = await API.request("/products");
    if(response) {
      setProducts(response.products);
    }
    // So it wouldn't blink like glitching
    setTimeout(() => {
      setLoading(false)
      setIsLoading(false)
    }, 1000)
  };
  
  const searchProducts = async(searchString) => {

    const response = await API.request("/products?" + new URLSearchParams({q: searchString}));
    if(response) {
      setProducts(response.products);
    }
    setTimeout(
      setLoading(false)
    , 3000)
  };

  const clearSearch = () => {
    setSearchValue('')
    getProducts()
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if(searchValue.length > 0) {
      setLoading(true)
      searchProducts(searchValue)
    }
  }, [searchValue])

  return (
    <div style={{padding: '0 2%'}}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search Product"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <InputGroup.Text style={{position: 'absolute', right: 0, backgroundColor: 'transparent', zIndex: 99, border: 'none', cursor: 'pointer'}} onClick={clearSearch}>x</InputGroup.Text>
          )}
        </InputGroup>
      </Form>
      { !loading? (
          products.length > 0 ? (
            <table style={{color: 'black', textAlign: 'left', margin: '2% 0', border: '3px solid #eff0f3'}}>
              <thead>
                <tr style={{backgroundColor: '#f3f4f6', border: '3px solid #eff0f3'}}>
                  <th style={{padding: 10}}>Thumbnail</th>
                  <th style={{padding: 10}}>Name</th>
                  <th style={{padding: 10}}>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((info)=> {
                  return (
                    <tr key={info.id} onClick={() => handleShow(info)} style={{cursor: 'pointer'}}>
                      <TableCellStyled><img style={{width: 200}} src={info.thumbnail} alt={`${info.title}-thumbnail`}/></TableCellStyled>
                      <TableCellStyled>
                        <p style={{fontWeight: 'bold'}}>{info.title}</p>
                        <p>{info.description}</p>
                      </TableCellStyled>
                      <TableCellStyled><span>&#8369;</span>{info.price}</TableCellStyled>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <p style={{color: 'black'}}>No products matched your search keyword.</p>
          )
        ) : (
          <p style={{color: 'black'}}>Searching ...</p>
        )
      }
      {selected &&(
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton style={{border: 'none'}}>
            <p style={{color: '#6c6c6c'}}>{selected.category?.toUpperCase()}</p>
          </Modal.Header>
          <Modal.Body>
            <h2 style={{marginTop: -40, fontWeight: 'bold'}}>{selected.title}</h2>
            <p style={{color: '#6c6c6c'}}>{selected.description}</p>
            <p><span>&#8369;</span>{selected.price}</p>
            <div style={{backgroundColor: '#f3f4f6', padding: 20}}>
              <p>MORE IMAGES</p>
              <div style={{display: 'flex', gap: '1%'}}>
                {
                  selected.images?.map((src, index) => {
                    if(index < 4) {
                      return (
                        <img src={src} style={{width: '24%'}} key={`img-${selected.title}-${index}`}/>
                      )
                    }
                  })
                }
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

    </div>
  );
}

export default MainPageContent;