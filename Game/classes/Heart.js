class Heart {
    constructor({ 
      x, 
      y, 
      width,
      height, 
      imageScr, 
      spriteCrobox={
      x:0,
      y:0,
      width:36,
      height:28,
      frames:6,
    }
  }) 
    {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.image=new Image()//provided by default by js
      this.image.onload = ()=>{
        this.isImageLoaded=true
      }
      this.image.src=imageScr
      this.currentFrame = 0
      this.currentSprite = spriteCrobox
      this.depleted = false
   }
  
    draw(c) {
      // Red square debug code
      // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      // c.fillRect(this.x, this.y, this.width, this.height)
  
      // c.fillStyle = 'rgba(14, 18, 237, 0.5)'
      // c.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
  
      
      if(this.isImageLoaded ===true){
      let xScale = 1
      let x = this.x

      if(this.depleted){
        this.currentFrame = 1
      }
  
      c.save()
      c.scale(xScale, 1)
      c.drawImage(
        this.image, 
        this.currentSprite.x + this.currentSprite.width * this.currentFrame, 
        this.currentSprite.y, 
        this.currentSprite.width, 
        this.currentSprite.height, 
        x, 
        this.y, 
        this.width, 
        this.height
      )
      c.restore()
  }
  
    }
  
}