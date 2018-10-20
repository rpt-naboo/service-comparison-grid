import React from 'react';

const StandardData = (props) => {
  console.log(props)
  return (
    <div>
      {props.products.map(function(product) {
        return <span>test</span>
      })}
    </div>
  )
}

export default StandardData;