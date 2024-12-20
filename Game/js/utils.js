const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

//to know if player and oposum is colliding
function checkCollisions(Object1, object2){
   const isColliding =
  Object1.hitbox.x + Object1.hitbox.width >= object2.hitbox.x &&
  Object1.hitbox.x  <= object2.hitbox.x + object2.hitbox.width &&
  Object1.hitbox.y <= object2.hitbox.y + object2.hitbox.height &&
  Object1.hitbox.y + Object1.hitbox.height >= object2.hitbox.y

  if(!isColliding) return null

  const xOverlap = Math.min(
    Object1.x + Object1.width - object2.x,
    object2.x + object2.width - Object1.x,

  )
  const yOverlap = Math.min(
    Object1.y + Object1.height - object2.y,
    object2.y + object2.height - Object1.y,
    
  )
  if(xOverlap < yOverlap){
    return Object1.x< object2.x ? 'right' :'left'
  }else{
    return Object1.y< object2.y ? 'bottom' :'top'
  }
}

