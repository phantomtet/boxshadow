import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { setAttribute, setLayerFocus } from './action'
import {v4} from 'uuid'
export default function App () {
  const dispatch = useDispatch()
  const [shiftRight, setShiftRight] = useState(0)
  const [shiftDown, setShiftDown] = useState(0)
  const [spread, setSpread] = useState(0)
  const [blur, setBlur] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [inset, setInset] = useState(false)
  const [layerArray, setLayerArray] = useState([v4()])
  const attribute = useSelector(state => state.attribute)

  




  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div>
        <div className='test' style={{width: '457px', padding: '20px'}}>
          <div>
            Box-Shadow CSS Generator
          </div>
          {/* shift right */}
          <div>
            <p>Shift right</p>
            <input type='range' min='-50' max='50' value={attribute.shiftRight} onChange={({target}) => dispatch(setAttribute('shiftRight', target.value))} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Shift down</p>
            <input type='range' min='-50' max='50' value={attribute.shiftDown} onChange={({target}) => dispatch(setAttribute('shiftDown', target.value))} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Spread</p>
            <input type='range' min='0' max='100' value={attribute.spread} onChange={({target}) => dispatch(setAttribute('spread', target.value))} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Blur</p>
            <input type='range' min='0' max='100' value={attribute.blur} onChange={({target}) => dispatch(setAttribute('blur', target.value))} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Opacity</p>
            <input type='range' min='-50' max='50' value={attribute.opacity} onChange={({target}) => dispatch(setAttribute('opacity', target.value))} style={{width: '100%'}}/>
          </div>
          <div style={{display: 'flex'}}>
            <input checked={attribute.inset} onChange={({target}) => dispatch(setAttribute('inset', target.checked))} type='checkbox' style={{margin: 'auto 7px auto 0'}}/><div>Inset</div>
          </div>
        </div>
        <div className='test' style={{padding: '20px'}}>
          <div className='canclick' style={{marginBottom: '20px'}} onClick={() => setLayerArray(prevState => [...prevState, v4()])}>
            Add Layer
          </div>
          {layerArray.map(id => <SingleLayer key={id} id={id}/>)}
        </div>
      </div>
      <div className='test' style={{width: '457px', padding: '20px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>Preview</div>
          <div>asdasd</div>
        </div>
        <div style={{width: '200px', height: '200px', margin: '60px 20px', backgroundColor: 'rgb(61, 157, 246)', boxShadow: `rgba(0,0,0,${opacity}) ${shiftRight}px ${shiftDown}px ${blur}px ${spread}px ${inset ? 'inset' : ''}`}}>
        </div>
      </div>
    </div>
  )
}

function SingleLayer ({id}) {
  const dispatch = useDispatch()
  return (
    <div onMouseUp={() => dispatch(setLayerFocus(id))}>
      {id}
    </div>
  )
}