(this.webpackJsonpreact_ag_image=this.webpackJsonpreact_ag_image||[]).push([[0],[,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(1),i=n.n(a),o=n(7),r=n.n(o),c=(n(13),n(3));n(14);function s(){return new Worker(n.p+"static/js/test.worker.8798f57e.js")}n(8);var l=n(2);function d(e){return 3===e.length?"rgb(".concat(e[0],",").concat(e[1],",").concat(e[2],")"):"rgba(".concat(e[0],",").concat(e[1],",").concat(e[2],",").concat(e[3],")")}function f(e,t){if(e&&0!==t.vertices.length){e.fillStyle=d(t.color),e.beginPath();var n=t.vertices[0];e.moveTo(n.x,n.y);for(var a=1;a<t.vertices.length;a++)n=t.vertices[a],e.lineTo(n.x,n.y);e.closePath(),e.fill()}}function u(e,t,n){var a=t/e;return n&&(e>=n||t>=n)?a>1?{width:Math.round(n/a),height:n,ratio:a}:{width:n,height:Math.round(n*a),ratio:a}:{width:e,height:t,ratio:a}}n(15);var b=n(0);function g(e){var t=e.start,n=e.stop,i=e.isStopped,o=e.className,r=Object(a.useState)("https://my-image-url"),s=Object(c.a)(r,2),l=s[0],d=s[1];return Object(b.jsxs)("div",{className:o,children:[Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t&&t(l)},children:[Object(b.jsx)("input",{type:"text",name:"image-url",value:l,onChange:function(e){return d(e.target.value)}}),Object(b.jsx)("button",{disabled:!i,type:"submit",id:"start-button",children:"Start"})]}),Object(b.jsx)("button",{disabled:i,type:"button",id:"stop-button",onClick:function(){n&&n()},children:"Stop"})]})}n(17);function m(e){var t=e.name,n=e.url,i=e.limit,o=e.onImageDrawn,r=e.onLoadingError,s=e.className,l=e.classNameOnError,d=Object(a.useRef)(null),f=Object(a.useState)(!1),g=Object(c.a)(f,2),m=g[0],j=g[1];return Object(a.useEffect)((function(){j(!1);var e=d.current;if(e){var t=e.getContext("2d"),a=new Image;a.crossOrigin="Anonymous",a.onload=function(){var n=u(a.width,a.height,i),r=n.width,c=n.height;0!==r&&0!==c||console.error("Fail to load the image"),e.width=r,e.height=c,t?(t.drawImage(a,0,0,r,c),null===o||void 0===o||o(a,r,c)):console.error("ctx is null the image can not be loaded")},a.src=n,a.onerror=function(){j(!0),r()}}}),[n,i,o,r]),Object(b.jsxs)("div",{children:[m&&Object(b.jsx)("div",{className:l,children:Object(b.jsxs)("p",{className:"error",children:["The image ",n," could not be loaded. Try with another URL."]})}),Object(b.jsx)("div",{className:s,children:Object(b.jsx)("canvas",{id:t,ref:d})})]})}function j(e){var t=e.name,n=e.width,i=e.height,o=e.ratioW,r=e.ratioH,c=e.drawingSteps,s=e.onImageDrawn,l=e.className,d=Object(a.useRef)(null);return Object(a.useEffect)((function(){var e=d.current,t=e.getContext("2d");if(0!==n&&0!==i||console.error("Fail to create the drawing"),e.width=n,e.height=i,t){!function(e,t,n,a,i){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];e.clearRect(0,0,t,n),e.fillStyle="#000000",e.fillRect(0,0,t,n),e.scale(a,i),o.forEach((function(t){f(e,t)}))}(t,n,i,o,r,c);var a=t.getImageData(0,0,n,i);null===s||void 0===s||s(a)}else console.error("ctx is null the drawing can not be done")}),[n,i,o,r,c,s]),Object(b.jsx)("div",{children:Object(b.jsx)("canvas",{className:l,id:t,ref:d})})}function h(e){var t=e.name,n=e.width,i=e.height,o=e.ratioW,r=e.ratioH,c=e.data,s=e.className,l=Object(a.useRef)(null);return Object(a.useEffect)((function(){var e=l.current,t=e.getContext("2d");0!==n&&0!==i||console.error("Fail to create the drawing"),e.width=n,e.height=i,t?function(e,t,n,a,i,o,r){e.clearRect(0,0,t,n),e.putImageData(o,0,0),e.scale(a,i),e.drawImage(r,0,0)}(t,n,i,o,r,c,e):console.error("ctx is null the drawing can not be done")}),[n,i,o,r,c]),Object(b.jsx)("div",{children:Object(b.jsx)("canvas",{className:s,id:t,ref:l})})}function p(e){var t=e.generation,n=e.fitness,a=e.ssim,i=e.pixelDiff,o=e.idBest,r=e.elapsedTimeForGeneration,c=e.notImprovingSince,s=e.className;return Object(b.jsxs)("div",{className:s,children:[Object(b.jsxs)("p",{children:[" Generation: ",t,c>0&&Object(b.jsxs)("span",{children:[" (not improving since ",c,") "]})]}),Object(b.jsxs)("p",{children:[" Simulation time: ",r," seconds "]}),Object(b.jsxs)("p",{children:[" Fitness: ",n," "]}),Object(b.jsxs)("p",{children:[" - SSIM: ",a," "]}),Object(b.jsxs)("p",{children:[" - Pixel Diff: ",i," "]}),Object(b.jsxs)("p",{children:[" idBest: ",o," "]})]})}n(18),n(19);function O(e){var t=e.defaultVal,n=e.min,i=e.max,o=e.step,r=e.label,s=e.id,l=e.name,d=e.onChange,f=Object(a.useState)(t),u=Object(c.a)(f,2),g=u[0],m=u[1];return Object(b.jsxs)("div",{className:"inputrange-wrapper",children:[Object(b.jsx)("label",{className:"inputrange-one",children:r}),Object(b.jsx)("input",{className:"inputrange-two",type:"range",id:s,name:l,min:n,max:i,step:o,value:g,onChange:function(e){var t=e.target.valueAsNumber;m(t),d(t)}}),Object(b.jsx)("span",{className:"inputrange-three",children:g})]})}function x(e){var t=e.population,n=e.selectCutoff,i=e.keepPreviousRatio,o=e.newIndividualRatio,r=e.crossoverParentRatio,s=e.mutationRate,d=e.vertexMovement,f=e.colorModificationRate,u=e.enableSsim,g=e.enablePixelDiff,m=e.ratioSsim,j=e.ratioPixelDiff,h=e.enableTransparency,p=e.nbVertex,x=e.nbPolygons,v=e.onValuesChange,w=e.className,S=Object(a.useState)({population:t,selectCutoff:n,keepPreviousRatio:i,newIndividualRatio:o,crossoverParentRatio:r,mutationRate:s,vertexMovement:d,colorModificationRate:f,enableSsim:u,enablePixelDiff:g,ratioSsim:m,ratioPixelDiff:j,enableTransparency:h,nbVertex:p,nbPolygons:x}),C=Object(c.a)(S,2),R=C[0],y=C[1];return Object(a.useEffect)((function(){console.log("use effect to update configuration "+JSON.stringify(R)),v(R)}),[R,v]),Object(b.jsxs)("div",{className:w,children:[Object(b.jsx)("h3",{children:" Genetic Algorithm "}),Object(b.jsx)(O,{id:"ga-population",name:"ga-population",label:"Population",min:10,max:300,defaultVal:R.population,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{population:e}))}}),Object(b.jsx)(O,{id:"ga-selection-cutoff",name:"ga-selection-cutoff",label:"Selection cutoff",min:0,max:1,defaultVal:R.selectCutoff,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{selectCutoff:e}))}}),Object(b.jsx)(O,{id:"ga-keep-previous",name:"ga-keep-previous",label:"Keep previous individual",min:0,max:1,defaultVal:R.keepPreviousRatio,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{keepPreviousRatio:e}))}}),Object(b.jsx)(O,{id:"ga-new-individual",name:"ga-new-individual",label:"Generate new individual",min:0,max:1,defaultVal:R.newIndividualRatio,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{newIndividualRatio:e}))}}),Object(b.jsx)(O,{id:"ga-crossover-parent",name:"ga-crossover-parent",label:"Cross over main parent ratio",min:0,max:1,defaultVal:R.crossoverParentRatio,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{crossoverParentRatio:e}))}}),Object(b.jsx)(O,{id:"ga-mutation",name:"ga-mutation",label:"Mutation rate",min:0,max:1,defaultVal:R.mutationRate,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{mutationRate:e}))}}),Object(b.jsx)(O,{id:"ga-vertex-movement",name:"ga-vertex-movement",label:"Vertex movement",min:0,max:32,defaultVal:R.vertexMovement,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{vertexMovement:e}))}}),Object(b.jsx)(O,{id:"ga-color-modification",name:"ga-color-modification",label:"Color modification",min:0,max:1,defaultVal:R.colorModificationRate,step:.1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{colorModificationRate:e}))}}),Object(b.jsx)("h3",{children:" Image rendering "}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-ssim",children:"SSIM:"}),Object(b.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-ssim",value:"ssim",checked:R.enableSsim,onChange:function(e){y(Object(l.a)(Object(l.a)({},R),{},{enableSsim:e.target.checked}))}})]}),Object(b.jsx)(O,{id:"ga-ssim-ratio",name:"ga-ssim-ratio",label:"Ratio",min:0,max:10,defaultVal:R.ratioSsim,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{ratioSsim:e}))}}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-pixeldiff",children:"Pixel differenciation:"}),Object(b.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-pixeldiff",value:"pixeldiff",checked:R.enablePixelDiff,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{enablePixelDiff:e.target.checked}))}})]}),Object(b.jsx)(O,{id:"ga-pixldiff-ratio",name:"ga-pixldiff-ration",label:"Ratio",min:0,max:10,defaultVal:R.ratioPixelDiff,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{ratioPixelDiff:e}))}}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-transparency",children:"Transparency:"}),Object(b.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-transparency",value:"transparency",checked:R.enableTransparency,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{enableTransparency:e.target.checked}))}})]}),Object(b.jsx)(O,{id:"ga-vertex",name:"ga-vertex",label:"Vertex",min:3,max:10,defaultVal:R.nbVertex,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{nbVertex:e}))}}),Object(b.jsx)(O,{id:"ga-vertices",name:"ga-vertices",label:"Vertices",min:50,max:500,defaultVal:R.nbPolygons,step:1,onChange:function(e){return y(Object(l.a)(Object(l.a)({},R),{},{nbPolygons:e}))}})]})}var v=function(){var e=Object(a.useState)({population:0,selectCutoff:0,keepPreviousRatio:0,newIndividualRatio:0,crossoverParentRatio:0,mutationRate:0,vertexMovement:0,colorModificationRate:0,enableSsim:!0,enablePixelDiff:!0,ratioSsim:0,ratioPixelDiff:0,enableTransparency:!0,nbVertex:0,nbPolygons:0}),t=Object(c.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}),r=Object(c.a)(o,2),l=r[0],d=r[1],f=Object(a.useState)(""),O=Object(c.a)(f,2),v=O[0],w=O[1],S=Object(a.useState)({image:null,renderedWidth:0,renderedHeight:0,ratioOffscreenWidth:0,ratioOffscreenHeight:0,offscreenWidth:0,offscreenHeight:0,limitOffscreen:0}),C=Object(c.a)(S,2),R=C[0],y=C[1],P=Object(a.useState)(null),N=Object(c.a)(P,2),I=N[0],k=N[1],D=Object(a.useState)(!0),V=Object(c.a)(D,2),M=V[0],T=V[1],W=Object(a.useCallback)((function(e){w(e)}),[]),H=Object(a.useCallback)((function(){T(!0),w(""),I&&(I.terminate(),d({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}))}),[I]),E=Object(a.useCallback)((function(e,t,n){var a=u(e.width,e.height,64),i=a.width/t,o=a.height/n,r=new OffscreenCanvas(a.width,a.height).getContext("2d");if(r){r.scale(i,o),r.drawImage(e,0,0,t,n);var c=r.getImageData(0,0,a.width,a.height);y({image:c,renderedWidth:t,renderedHeight:n,offscreenWidth:a.width,offscreenHeight:a.height,ratioOffscreenWidth:i,ratioOffscreenHeight:o,limitOffscreen:64}),k(new s),T(!1)}else console.error("ctx from url image for resizing could not be created")}),[]),F=Object(a.useCallback)((function(){T(!0)}),[]),G=Object(a.useCallback)((function(e){if(I&&R.image){console.log("[handleGeneratedImageDrawn] sent msg: "+l.best.id+" - "+l.best.fitness);var t={isRunning:l.isRunning,image:R.image,configuration:n,notImprovingSince:l.notImprovingSince,best:l.best,population:l.population,generation:l.generation,renderingHeight:R.offscreenHeight,renderingWidth:R.offscreenWidth};I.postMessage(t)}}),[l,R,I,n]),L=Object(a.useCallback)((function(e){i(e)}),[]);return Object(a.useEffect)((function(){I&&I.addEventListener("message",(function(e){var t=e.data;d(t)}))}),[I]),Object(b.jsxs)("div",{className:"wrapper",children:[Object(b.jsx)(g,{className:"one",start:W,stop:H,isStopped:M}),v&&Object(b.jsx)(m,{className:"two",classNameOnError:"twoExpanded",name:"original-image",onImageDrawn:E,onLoadingError:F,limit:256,url:v}),R.image&&!M&&Object(b.jsx)(j,{className:"three",onImageDrawn:G,name:"generated-image",width:R.renderedWidth,height:R.renderedHeight,ratioW:1/R.ratioOffscreenWidth,ratioH:1/R.ratioOffscreenHeight,drawingSteps:l.best.phenotype}),l.best.diff&&!M&&Object(b.jsx)(h,{className:"four",name:"diff-image",width:R.renderedWidth,height:R.renderedHeight,ratioW:1/R.ratioOffscreenWidth,ratioH:1/R.ratioOffscreenHeight,data:l.best.diff}),!M&&Object(b.jsx)(p,{className:"five",generation:l.generation,fitness:l.best.fitness,ssim:l.best.ssim,pixelDiff:l.best.pixelDiff,idBest:l.best.id,elapsedTimeForGeneration:l.elapsedTime,notImprovingSince:l.notImprovingSince}),M&&Object(b.jsx)(x,{population:50,selectCutoff:.2,keepPreviousRatio:.1,newIndividualRatio:.1,crossoverParentRatio:.6,mutationRate:.1,vertexMovement:5,colorModificationRate:.1,enableSsim:!0,enablePixelDiff:!0,ratioSsim:3,ratioPixelDiff:1,enableTransparency:!0,nbVertex:3,nbPolygons:125,className:"five",onValuesChange:L})]})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),o(e),r(e)}))};r.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root")),w()}],[[20,1,2]]]);
//# sourceMappingURL=main.432cedfc.chunk.js.map