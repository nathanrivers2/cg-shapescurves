class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }
 
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) { //rectangle slide
        let color = [250, 0, 0, 250];
        let left_bot = {x:200, y:200}; //x:sets then x elem of the object to the following, same for y:
        let right_top = {x:600, y:400};
        this.drawRectangle(left_bot, right_top, color, ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {

        //lets make an octagon first 
        let center = {x:300, y:300}; 
        let radius = 200; 
        let color = [250, 0, 0, 250];
        this.drawCircle(center, radius, color, ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {

    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //name slide; 
        let color = [250, 0, 0, 250];
        //N
        this.drawLine({x:50,y:100},{x:50,y:500},color,ctx);
        this.drawLine({x:50,y:500},{x:125,y:100},color,ctx);
        this.drawLine({x:125,y:100},{x:125,y:500},color,ctx);
        //a use circle 
        let center = {x:240, y:175}; 
        let radius = 75;
        this.drawCircleConstantPoints(center,radius,color,ctx,36);

        let edgeX = center.x+radius*(Math.cos(0.0174533*20));
        let edgeY = center.y+radius*(Math.sin(0.0174533*20));
        let edgePoint = {x:edgeX,y:edgeY};

        this.drawLine(edgePoint,{x:340,y:110},color,ctx);
        //t

        this.drawLine({x:375,y:100},{x:375,y:400}, color,ctx); 
        this.drawLine({x:325,y:300},{x:425,y:300}, color,ctx);

        //e use curve

    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {

        let leftTop = {x:left_bottom.x, y:right_top.y}; 
        let rightBottom = {x:right_top.x, y:left_bottom.y}; // these lines get the opposite of the inputs to create all 4 point we need

        //drawing the lines in the rectangle, should probably edit to have a standard way left to right for example
        this.drawLine(leftTop, left_bottom, color, ctx); 
        this.drawLine(rightBottom, right_top, color, ctx);
        this.drawLine(rightBottom,left_bottom, color, ctx); 
        this.drawLine(right_top, leftTop, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        //x=center(x)+radius*cos(angle) 
        //y=center(y)+radius*sin(angle) 
          //need to add show point ability;

        let numPoints = this.num_curve_sections;
        let angle = 360/numPoints; 
        let angleCons = angle;

        let first = {x:center.x+radius, y:center.y}; 

        let nextX = center.x+radius*(Math.cos(0.0174533*angle));
        let nextY = center.y+radius*(Math.sin(0.0174533*angle));
        let next = {x:nextX,y:nextY}; 

        for(let i=0; i<numPoints; i++){ 
            this.drawLine(first,next,color,ctx); 
            first=next;
            
            angle=angle+angleCons;

            nextX = center.x+radius*(Math.cos(0.0174533*angle));
            nextY = center.y+radius*(Math.sin(0.0174533*angle));
            next = {x:nextX,y:nextY};
        } 
    }


    drawCircleConstantPoints(center, radius, color, ctx, constantPoints) {
        //x=center(x)+radius*cos(angle) 
        //y=center(y)+radius*sin(angle) 
        //need to add show point ability;

        let numPoints = constantPoints;
        let angle = 360/numPoints; 
        let angleCons = angle;

        let first = {x:center.x+radius, y:center.y}; 

        let nextX = center.x+radius*(Math.cos(0.0174533*angle));
        let nextY = center.y+radius*(Math.sin(0.0174533*angle));
        let next = {x:nextX,y:nextY}; 

        for(let i=0; i<numPoints; i++){ 
            this.drawLine(first,next,color,ctx); 
            first=next;
            
            angle=angle+angleCons;

            nextX = center.x+radius*(Math.cos(0.0174533*angle));
            nextY = center.y+radius*(Math.sin(0.0174533*angle));
            next = {x:nextX,y:nextY};
        } 
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
