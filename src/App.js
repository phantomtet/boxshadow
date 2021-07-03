import React, { useEffect, useState } from 'react'
import './App.css'
import {v4} from 'uuid'
import {BiDotsVertical, BiPencil, BiTrash} from 'react-icons/bi'
import axios from 'axios'
export default function App () {
  const [layerData, setLayerData] = useState([{
    id: v4(),
    shiftRight: 25,
    shiftDown: 25,
    spread: 0,
    blur: 50,
    opacity: 50,
    inset: false,
    backgroundColor: '#000000'
  }])
  const [boxColor, setBoxColor] = useState('#3D9DF6')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [layerFocus, setLayerFocus] = useState(layerData[0].id)
  const setValue = (field, value) => {
    setLayerData(layerData.map(layer => {
      if (layer.id === layerFocus) {
        return {
          ...layerData.find(layer => layer.id === layerFocus), [field]: value
        }
      }
      else return layer
    }))
  }
  const [saveID, setSaveID] = useState('')

  //change hex color to rgb color
  const hexToRGB = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  }
  const [boxShadow, setBoxShadow] = useState('')

  //set box shadow when layerdata change
  useEffect(() => {
    setBoxShadow(() => {
      let string = ''
      layerData.forEach((layer, index) => {      //right down blur spread opa
        if (index === 0) string+= `rgba(${hexToRGB(layer.backgroundColor)}, ${layer.opacity/100}) ${layer.shiftRight}px ${layer.shiftDown}px ${layer.blur}px ${layer.spread}px ${layer.inset ? 'inset' : ''}`
        else string+= `, ${layer.backgroundColor} ${layer.shiftRight}px ${layer.shiftDown}px ${layer.blur}px ${layer.spread}px ${layer.inset ? 'inset' : ''}`
      })
      return string
    })
  }, [layerData])

  // check if layerfocus is valid or not, if not set focus to other layer
  // useEffect(() => {
  //   if (!layerData.find(layer => layer.id === layerFocus)) {
  //     setLayerFocus(layerData[0].id)
  //   }
  // }, [layerData])


  //delete layer action
  const deleteLayer = (layerid) => {
    if (layerData.length === 1) return
    
    if (layerid === layerFocus) {
      setLayerFocus(layerData.find(layer => layer.id !== layerid).id)

    }
    setLayerData(prev => prev.filter(layer => layer.id !== layerid))
  }

  // save action
  const saveLayer = () => {
    axios.post('http://localhost:3001/save', {
      layerData: layerData
    })
    .then(res => setSaveID(res.data))
  }
  // on start drag a layer
  const drag = (ev) => {
    ev.dataTransfer.setData('fromlayer', ev.target.id)
  }
  //on drop a layer
  const dragover = (ev) => {
    if (ev.dataTransfer.getData('fromlayer') === ev.target.id) return
    ev.preventDefault()
    //phan tu trung gian
    const layertrunggian = layerData.find(layer => layer.id === ev.dataTransfer.getData('fromlayer'))
    if (!layertrunggian) return
    let newArray = layerData.map(layer => {
      if (layer.id === ev.dataTransfer.getData('fromlayer')) return layerData.find(layer => layer.id === ev.target.id)
      if (layer.id === ev.target.id) return layertrunggian
      return layer
    })
    setLayerData(newArray)
  }


  
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
            <input type='range' min='-50' max='50' value={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).shiftRight} onChange={({target}) => setValue('shiftRight', target.value)} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Shift down</p>
            <input type='range' min='-50' max='50' value={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).shiftDown} onChange={({target}) => setValue('shiftDown', target.value)} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Spread</p>
            <input type='range' min='0' max='100' value={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).spread} onChange={({target}) => setValue('spread', target.value)} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Blur</p>
            <input type='range' min='0' max='100' value={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).blur} onChange={({target}) => setValue('blur', target.value)} style={{width: '100%'}}/>
          </div>
          <div>
            <p>Opacity</p>
            <input type='range' min='0' max='100' value={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).opacity} onChange={({target}) => setValue('opacity', target.value)} style={{width: '100%'}}/>
          </div>
          <div style={{display: 'flex'}}>
            <input checked={layerData.find(layer => layer.id === layerFocus) && layerData.find(layer => layer.id === layerFocus).inset} onChange={({target}) => setValue('inset', target.checked)} type='checkbox' style={{margin: 'auto 7px auto 0'}}/><div>Inset</div>
          </div>
          {/* color */}
          <input type='color' value={layerData.find(layer => layer.id === layerFocus).backgroundColor} onChange={({target}) => setValue('backgroundColor', target.value)}/>
        </div>
        <div className='test' style={{padding: '20px'}}>
          <div className='canclick' style={{marginBottom: '20px'}} onClick={() => setLayerData(prevState => [...prevState, {id: v4(), shiftRight: 25, shiftDown: 25, spread: 0, blur: 50, opacity: 50, inset: false, backgroundColor: '#000000'}])}>
            Add Layer
          </div>
          {layerData.map((data, index) => <SingleLayer key={index} data={data} action={() => setLayerFocus(data.id)} deletee={() => deleteLayer(data.id)} drag={drag} dragover={dragover} bgColor={data.id === layerFocus ? 'lightblue' : ''}/>)}
        </div>
      </div>
      <div style={{width: '457px', padding: '20px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>Preview</div>
          {/* color picker */}
          <div>
            <input type='color' value={bgColor}  onChange={({target}) => setBgColor(target.value)}/>
            <input type='color' value={boxColor} onChange={({target}) => setBoxColor(target.value)}/>
          </div> 
        </div>
        <div style={{backgroundColor: bgColor, padding: '20px'}}>
          {/* preview box */}
          <div style={{width: '200px', height: '200px', margin: '60px 20px', backgroundColor: boxColor, boxShadow: boxShadow}}>      
          </div>
        </div>
        <div className='test'>
          CSS code:
          <p>
            {`box-shadow: ${boxShadow}`}
          </p>
        </div>
        <div className='canclick' onClick={saveLayer}>
          Save 
        </div>
        {
          saveID && <p>URL: https://boxshadow-ac98f.web.app/{saveID}</p>
        }
      </div>
    </div>
  )
}

function SingleLayer ({data, action, deletee, drag, dragover, bgColor}) {
  return (
    <div style={{height: '40px', width: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: bgColor, border: '1px solid blue'}}>
      <div onClick={action} style={{display: 'flex', margin: 'auto 0'}}>
        <BiDotsVertical size='25'/>
        <div className='candrag' draggable='true' onDragStart={drag} onDragOver={(ev) => ev.preventDefault()} onDrop={dragover} style={{width: '360px'}} id={data.id}>{`rgba(0,0,0,${data.opacity}) ${data.shiftRight}px ${data.shiftDown}px ${data.blur}px ${data.spread}px ${data.inset ? 'inset' : ''}`}</div>
      </div>
      <div style={{display: 'flex', margin: 'auto 0'}}>
        <BiTrash size='25' className='canclick' onClick={deletee}/>
      </div>
    </div>
  )
}