import closeSvg from './svgs/close-circle.svg'
export class OcrBox {
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w ? w : 100;
        this.h = h ? h : 50;
        this.color = 'black';
        this.closeImgSrc = closeSvg;
    }
    draw() {
        let img = new Image();
        img.src = this.closeImgSrc;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 3;
        this.ctx.font = "10px Verdana";
        this.ctx.fillText(`${Math.round(this.x)},${Math.round(this.y)}`, this.x, this.y);
        this.ctx.strokeRect(this.x, this.y, this.w, this.h);
        this.ctx.drawImage(img, this.x+this.w-15, this.y-15, 30,30);
    }
}