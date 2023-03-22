import React from 'react'

export default function Card({id, Level, funcOnClick, value}) {

  function Clikado(){
    document.querySelector("#mineCard_P"+id).classList.remove("hidden")
    if(value == 9){
      document.querySelector("#mineCard_Div"+id).classList.add("BoxRed")
      funcOnClick(true)
    }else{
      funcOnClick(false)
    }
  }  

  if(Level == 1){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card1Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>{value}</p>}
    </div>
  )}
  if(Level ==2){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card2Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>{value}</p>}
    </div>
  )}
  if(Level == 3){return (
    <div id={"mineCard_Div"+id} onClick={Clikado} className='card3Mines'>
        {value == 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>*</p>}
        {value !== 9 &&
        <p id={"mineCard_P"+id} className={"w-full h-full flexAllCenter hidden"}>{value}</p>}
    </div>
  )}
}
