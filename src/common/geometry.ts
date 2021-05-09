import { Context } from "vm";

export interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    color: number[];
}

export interface Vertex {
    x: number;
    y: number;
}

export interface Polygon {
    vertices: Vertex[];
    color: number[];
}

export function getRGBAFromColor(c: number[]): string {
    switch (c.length) {
        case 3:
            return `rgb(${c[0]},${c[1]},${c[2]}})`;
        case 4:        
            return `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`
        default:
            return "rgb(0, 0, 0)";
    }
}

export function drawRectangle(ctx: Context, rect: Rect) {
    if (!ctx ) {
        return;
    }

    ctx.fillStyle =  getRGBAFromColor(rect.color);;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}

export function drawPolygon(ctx: Context, polygon: Polygon) {
    if (!ctx || polygon.vertices.length === 0) {
        return;
    }

    ctx.fillStyle = getRGBAFromColor(polygon.color);
    ctx.beginPath();

    let vertex = polygon.vertices[0];
    ctx.moveTo(vertex.x, vertex.y);
    for(let i = 1; i < polygon.vertices.length; i++) {
        vertex = polygon.vertices[i];
        ctx.lineTo(vertex.x, vertex.y);
    }

    ctx.closePath();
    ctx.fill();
}

export function moveVertex(v: Vertex, range: number, width: number, height: number): Vertex {
    const direction = Math.random() * 2 * Math.PI;
    const distance = Math.random() * range;

    let x = v.x + Math.floor(Math.cos(direction) * distance);
    x = Math.max(0, Math.min(x, width));

    let y = v.y + Math.floor(Math.sin(direction) * distance);
    y = Math.max(0, Math.min(y, height));

    const movedVertex: Vertex = {
        x: x,
        y: y
    };

    return movedVertex; 
  };

  export function copyPolygon(p: Polygon): Polygon {
      const vertices: Vertex[] = [];
      p.vertices.forEach((vertex: Vertex) => {
          let v = {...vertex};
          vertices.push(v);
      });

      const polygon = {
          vertices: vertices,
          color: [...p.color]
      };

      return polygon;
  }