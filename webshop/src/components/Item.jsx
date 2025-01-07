import React from 'react'

const Item = () => {
  return (
    <div className = 'item'>
        <div className='item-image-wrapper'>
            <img className = "item-image" src="https://preview.redd.it/zfohxnf8t3pa1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=0f660e0a56476991ee3b97f2885d8c010fec5b97" alt="" />
        </div>
        <div className='item-info'>
            <h3>Item Name</h3>
        </div>
        <div className='item-price'>
            <h2>9999</h2>
        </div>
    </div>
  )
}

export default Item