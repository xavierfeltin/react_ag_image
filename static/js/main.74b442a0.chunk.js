(this.webpackJsonpreact_ag_image=this.webpackJsonpreact_ag_image||[]).push([[0],[,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(2),i=a.n(n),r=a(7),o=a.n(r),c=(a(13),a(3));a(14);function s(){return new Worker(a.p+"static/js/test.worker.e311e25b.js")}a(8);var l=a(1);function u(e){return 3===e.length?"rgb(".concat(e[0],",").concat(e[1],",").concat(e[2],")"):"rgba(".concat(e[0],",").concat(e[1],",").concat(e[2],",").concat(e[3],")")}function b(e,t){if(e&&0!==t.vertices.length){e.fillStyle=u(t.color),e.beginPath();var a=t.vertices[0];e.moveTo(a.x,a.y);for(var n=1;n<t.vertices.length;n++)a=t.vertices[n],e.lineTo(a.x,a.y);e.closePath(),e.fill()}}function d(e,t,a){var n=t/e;return a&&(e>=a||t>=a)?n>1?{width:Math.round(a/n),height:a,ratio:n}:{width:a,height:Math.round(a*n),ratio:n}:{width:e,height:t,ratio:n}}a(15);var f=a(0);function g(e){var t=e.start,a=e.stop,i=e.links,r=e.isStopped,o=e.className,s=Object(n.useState)("https://my-image-url"),l=Object(c.a)(s,2),u=l[0],b=l[1];return Object(f.jsxs)("div",{className:o,children:[Object(f.jsx)("div",{children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t&&t(u)},children:[Object(f.jsx)("input",{type:"text",name:"image-url",value:u,onChange:function(e){return b(e.target.value)}}),Object(f.jsx)("button",{disabled:!r,type:"submit",id:"start-button",children:"Start"}),Object(f.jsx)("button",{disabled:r,type:"button",id:"stop-button",onClick:function(){a&&a()},children:"Stop"})]})}),Object(f.jsx)("div",{children:function(){var e=[];return i.forEach((function(t){var a=Object(f.jsxs)("button",{className:"link",value:t.link,onClick:function(e){b(e.currentTarget.value)},children:[" ",t.name," "]},t.name);e.push(a)})),e}()})]})}a(17);function j(e){var t=e.name,a=e.url,i=e.limit,r=e.onImageDrawn,o=e.onLoadingError,s=e.className,l=e.classNameOnError,u=Object(n.useRef)(null),b=Object(n.useState)(!1),g=Object(c.a)(b,2),j=g[0],m=g[1],h=Object(n.useState)(""),p=Object(c.a)(h,2),O=p[0],x=p[1];return Object(n.useEffect)((function(){if(a!==O){x(a),m(!1);var e=u.current;if(e){var t=e.getContext("2d"),n=new Image;n.crossOrigin="Anonymous",n.onload=function(){var a=d(n.width,n.height,i),o=a.width,c=a.height;0!==o&&0!==c||console.error("Fail to load the image"),e.width=o,e.height=c,t?(t.drawImage(n,0,0,o,c),null===r||void 0===r||r(n,o,c)):console.error("ctx is null the image can not be loaded")},n.src=a,n.onerror=function(){m(!0),o()}}}}),[a,i,r,o,O]),Object(f.jsxs)("div",{children:[j&&Object(f.jsx)("div",{className:l,children:Object(f.jsxs)("p",{className:"error",children:["The image ",a," could not be loaded. Try with another URL."]})}),Object(f.jsx)("div",{className:s,children:Object(f.jsx)("canvas",{id:t,ref:u})})]})}function m(e){var t=e.name,a=e.width,i=e.height,r=e.ratioW,o=e.ratioH,c=e.drawingSteps,s=e.className,l=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=l.current,t=e.getContext("2d");0!==a&&0!==i||console.error("Fail to create the drawing"),e.width=a,e.height=i,t?function(e,t,a,n,i){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];e.clearRect(0,0,t,a),e.fillStyle="#000000",e.fillRect(0,0,t,a),e.scale(n,i),r.forEach((function(t){b(e,t)}))}(t,a,i,r,o,c):console.error("ctx is null the drawing can not be done")}),[a,i,r,o,c]),Object(f.jsx)("div",{children:Object(f.jsx)("canvas",{className:s,id:t,ref:l})})}function h(e){var t=e.name,a=e.width,i=e.height,r=e.ratioW,o=e.ratioH,c=e.data,s=e.className,l=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=l.current,t=e.getContext("2d");0!==a&&0!==i||console.error("Fail to create the drawing"),e.width=a,e.height=i,t?function(e,t,a,n,i,r,o){e.clearRect(0,0,t,a),e.putImageData(r,0,0),e.scale(n,i),e.drawImage(o,0,0)}(t,a,i,r,o,c,e):console.error("ctx is null the drawing can not be done")}),[a,i,r,o,c]),Object(f.jsx)("div",{children:Object(f.jsx)("canvas",{className:s,id:t,ref:l})})}function p(e){var t=e.generation,a=e.fitness,n=e.ssim,i=e.pixelDiff,r=e.subPixel,o=e.idBest,c=e.elapsedTimeForGeneration,s=e.notImprovingSince,l=e.className;return Object(f.jsxs)("div",{className:l,children:[Object(f.jsxs)("p",{children:[" Generation: ",t,s>0&&Object(f.jsxs)("span",{children:[" (not improving since ",s,") "]})]}),Object(f.jsxs)("p",{children:[" Simulation time: ",c," seconds "]}),Object(f.jsxs)("p",{children:[" Fitness: ",a," "]}),Object(f.jsxs)("p",{children:[" - SSIM: ",n," "]}),Object(f.jsxs)("p",{children:[" - Pixel Diff: ",i," "]}),Object(f.jsxs)("p",{children:[" - Sub Pixel: ",r," "]}),Object(f.jsxs)("p",{children:[" idBest: ",o," "]})]})}a(18),a(19);function O(e){var t=e.defaultVal,a=e.min,i=e.max,r=e.step,o=e.label,s=e.id,l=e.name,u=e.onChange,b=Object(n.useState)(t),d=Object(c.a)(b,2),g=d[0],j=d[1];return Object(f.jsxs)("div",{className:"inputrange-wrapper",children:[Object(f.jsx)("label",{className:"inputrange-one",children:o}),Object(f.jsx)("input",{className:"inputrange-two",type:"range",id:s,name:l,min:a,max:i,step:r,value:g,onChange:function(e){var t=e.target.valueAsNumber;j(t),u(t)}}),Object(f.jsx)("span",{className:"inputrange-three",children:g})]})}function x(e){var t=e.population,a=e.parentSelectionStrategy,i=e.selectCutoff,r=e.tournamentSize,o=e.keepPreviousRatio,s=e.newIndividualRatio,u=e.crossoverParentRatio,b=e.mutationRate,d=e.crossoverStrategy,g=e.vertexMovement,j=e.colorModificationRate,m=e.enableSsim,h=e.enablePixelDiff,p=e.enableSubDiff,x=e.ratioSsim,v=e.ratioPixelDiff,S=e.ratioSubDiff,y=e.enableTransparency,C=e.nbVertex,w=e.nbPolygons,P=e.onValuesChange,R=e.className,k=Object(n.useState)({population:t,parentSelectionStrategy:a,selectCutoff:i,tournamentSize:r,keepPreviousRatio:o,newIndividualRatio:s,crossoverParentRatio:u,mutationRate:b,crossoverStrategy:d,vertexMovement:g,colorModificationRate:j,enableSsim:m,enablePixelDiff:h,enableSubDiff:p,ratioSsim:x,ratioPixelDiff:v,ratioSubDiff:S,enableTransparency:y,nbVertex:C,nbPolygons:w}),N=Object(c.a)(k,2),D=N[0],I=N[1];return Object(n.useEffect)((function(){P(D)}),[D,P]),Object(f.jsxs)("div",{className:R,children:[Object(f.jsx)("h3",{children:" Genetic Algorithm "}),Object(f.jsx)(O,{id:"ga-population",name:"ga-population",label:"Population",min:10,max:300,defaultVal:D.population,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{population:e}))}}),Object(f.jsx)(O,{id:"ga-keep-previous",name:"ga-keep-previous",label:"Keep previous individual",min:0,max:1,defaultVal:D.keepPreviousRatio,step:.01,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{keepPreviousRatio:e}))}}),Object(f.jsx)(O,{id:"ga-new-individual",name:"ga-new-individual",label:"Generate new individual",min:0,max:1,defaultVal:D.newIndividualRatio,step:.01,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{newIndividualRatio:e}))}}),Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:Object(f.jsx)("b",{children:"Parent selection strategy"})}),Object(f.jsxs)("div",{className:"ga-strategy-div",children:[Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-tournament",children:["Tournament ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-tournament",name:"parentstrategy",value:"tournament",checked:"tournament"===D.parentSelectionStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{parentSelectionStrategy:e.target.value}))}})]}),Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-fortunewheel",children:["Fortune Wheel ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-fortunewheel",name:"parentstrategy",value:"fortunewheel",checked:"fortunewheel"===D.parentSelectionStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{parentSelectionStrategy:e.target.value}))}})]})]})]}),"tournament"===D.parentSelectionStrategy&&Object(f.jsx)(O,{id:"ga-selection-cutoff",name:"ga-selection-cutoff",label:"Selection cutoff",min:0,max:1,defaultVal:D.selectCutoff,step:.05,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{selectCutoff:e}))}}),"tournament"===D.parentSelectionStrategy&&Object(f.jsx)(O,{id:"ga-tournament-size",name:"ga-tournament-size",label:"Tournament size",min:1,max:Math.round(D.selectCutoff*D.population),defaultVal:D.tournamentSize,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{tournamentSize:e}))}}),Object(f.jsx)(O,{id:"ga-crossover-parent",name:"ga-crossover-parent",label:"Cross over main parent ratio",min:0,max:1,defaultVal:D.crossoverParentRatio,step:.05,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{crossoverParentRatio:e}))}}),Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:Object(f.jsx)("b",{children:"Crossover strategy"})}),Object(f.jsxs)("div",{className:"ga-strategy-div",children:[Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-polygon",children:["Polygons ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-polygon",name:"strategy",value:"polygon",checked:"polygon"===D.crossoverStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{crossoverStrategy:e.target.value}))}})]}),Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-vertex",children:["Vertex ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-vertex",name:"strategy",value:"vertex",checked:"vertex"===D.crossoverStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{crossoverStrategy:e.target.value}))}})]}),Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-data",children:["Data ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-data",name:"strategy",value:"data",checked:"data"===D.crossoverStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{crossoverStrategy:e.target.value}))}})]}),Object(f.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-singlePoint",children:["Single point ",Object(f.jsx)("br",{}),Object(f.jsx)("input",{type:"radio",id:"strategy-singlePoint",name:"strategy",value:"singlePoint",checked:"singlePoint"===D.crossoverStrategy,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{crossoverStrategy:e.target.value}))}})]})]})]}),Object(f.jsx)(O,{id:"ga-mutation",name:"ga-mutation",label:"Mutation rate",min:0,max:1,defaultVal:D.mutationRate,step:.01,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{mutationRate:e}))}}),Object(f.jsx)(O,{id:"ga-vertex-movement",name:"ga-vertex-movement",label:"Vertex movement",min:0,max:.5,defaultVal:D.vertexMovement,step:.01,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{vertexMovement:e}))}}),Object(f.jsx)(O,{id:"ga-color-modification",name:"ga-color-modification",label:"Color modification",min:0,max:1,defaultVal:D.colorModificationRate,step:.01,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{colorModificationRate:e}))}}),Object(f.jsx)("h3",{children:" Image rendering "}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-ssim",children:"SSIM:"}),Object(f.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-ssim",value:"ssim",checked:D.enableSsim,onChange:function(e){I(Object(l.a)(Object(l.a)({},D),{},{enableSsim:e.target.checked}))}})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-pixeldiff",children:"Pixel differenciation:"}),Object(f.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-pixeldiff",value:"pixeldiff",checked:D.enablePixelDiff,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{enablePixelDiff:e.target.checked}))}})]}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-subdiff",children:"Pixel substraction:"}),Object(f.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-subdiff",value:"subdiff",checked:D.enableSubDiff,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{enableSubDiff:e.target.checked}))}})]}),D.enableSsim&&Object(f.jsx)(O,{id:"ga-ssim-ratio",name:"ga-ssim-ratio",label:"Ratio Ssim",min:0,max:10,defaultVal:D.ratioSsim,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{ratioSsim:e}))}}),D.enablePixelDiff&&Object(f.jsx)(O,{id:"ga-pixldiff-ratio",name:"ga-pixldiff-ration",label:"Ratio Pixel diff",min:0,max:10,defaultVal:D.ratioPixelDiff,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{ratioPixelDiff:e}))}}),D.enableSubDiff&&Object(f.jsx)(O,{id:"ga-subdiff-ratio",name:"ga-subdiff-ration",label:"Ratio Sub diff",min:0,max:10,defaultVal:D.ratioSubDiff,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{ratioSubDiff:e}))}}),Object(f.jsxs)("div",{children:[Object(f.jsx)("label",{className:"gaconfiguration-one",htmlFor:"ga-transparency",children:"Transparency:"}),Object(f.jsx)("input",{className:"gaconfiguration-three",type:"checkbox",id:"ga-transparency",value:"transparency",checked:D.enableTransparency,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{enableTransparency:e.target.checked}))}})]}),Object(f.jsx)(O,{id:"ga-vertex",name:"ga-vertex",label:"Vertex",min:3,max:10,defaultVal:D.nbVertex,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{nbVertex:e}))}}),Object(f.jsx)(O,{id:"ga-vertices",name:"ga-vertices",label:"Vertices",min:50,max:500,defaultVal:D.nbPolygons,step:1,onChange:function(e){return I(Object(l.a)(Object(l.a)({},D),{},{nbPolygons:e}))}})]})}var v=function(){var e=Object(n.useState)({population:50,parentSelectionStrategy:"tournament",selectCutoff:.2,tournamentSize:3,keepPreviousRatio:.01,newIndividualRatio:.01,crossoverParentRatio:.6,mutationRate:.01,crossoverStrategy:"polygon",vertexMovement:.15,colorModificationRate:.1,enableSsim:!0,enablePixelDiff:!1,enableSubDiff:!1,ratioSsim:1,ratioPixelDiff:1,ratioSubDiff:1,enableTransparency:!0,nbVertex:3,nbPolygons:125}),t=Object(c.a)(e,2),a=t[0],i=t[1],r=Object(n.useState)({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,subPixel:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}),o=Object(c.a)(r,2),l=o[0],u=o[1],b=Object(n.useState)(void 0),O=Object(c.a)(b,2),v=O[0],S=O[1],y=Object(n.useState)(""),C=Object(c.a)(y,2),w=C[0],P=C[1],R=Object(n.useState)({image:null,renderedWidth:0,renderedHeight:0,ratioOffscreenWidth:0,ratioOffscreenHeight:0,offscreenWidth:0,offscreenHeight:0,limitOffscreen:0}),k=Object(c.a)(R,2),N=k[0],D=k[1],I=Object(n.useState)(null),V=Object(c.a)(I,2),M=V[0],F=V[1],T=Object(n.useState)(!0),W=Object(c.a)(T,2),_=W[0],H=W[1],E=Object(n.useCallback)((function(e){var t=e.data;S(t)}),[]),z=Object(n.useCallback)((function(e){var t=new s;F(t),H(!1),P(e)}),[]);Object(n.useEffect)((function(){M&&(console.log("Add listener to worker"),M.addEventListener("message",E))}),[M,E]),Object(n.useEffect)((function(){if(M&&N.image&&v&&!_){u(v);var e={isRunning:v.isRunning,image:N.image,configuration:a,notImprovingSince:v.notImprovingSince,best:v.best,population:v.population,generation:v.generation,renderingHeight:N.offscreenHeight,renderingWidth:N.offscreenWidth};M.postMessage(e)}}),[M,v,N,a,_]);var L=Object(n.useCallback)((function(){M&&(M.terminate(),u({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,subPixel:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}),P(""),H(!0),S(void 0))}),[M]),B=Object(n.useCallback)((function(e,t,n){var i=d(e.width,e.height,64),r=i.width/t,o=i.height/n,c=new OffscreenCanvas(i.width,i.height).getContext("2d");if(c){c.scale(r,o),c.drawImage(e,0,0,t,n);var s=c.getImageData(0,0,i.width,i.height);if(D({image:s,renderedWidth:t,renderedHeight:n,offscreenWidth:i.width,offscreenHeight:i.height,ratioOffscreenWidth:r,ratioOffscreenHeight:o,limitOffscreen:64}),M&&s){var u={isRunning:l.isRunning,image:s,configuration:a,notImprovingSince:l.notImprovingSince,best:l.best,population:l.population,generation:l.generation,renderingHeight:i.height,renderingWidth:i.width};console.log("post message for first generation"),M.postMessage(u)}}else console.error("ctx from url image for resizing could not be created")}),[l,M,a]),G=Object(n.useCallback)((function(){H(!0)}),[]),J=Object(n.useCallback)((function(e){i(e)}),[]);return Object(f.jsxs)("div",{className:"wrapper",children:[Object(f.jsx)(g,{className:"one",links:[{name:"Einstein",link:"https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"},{name:"Joconde",link:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/390px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"},{name:"Photographe",link:"https://i.picsum.photos/id/823/420/560.jpg?hmac=H6lJE4fRi96MxgWYyd3_79WbmObu-jJj7Zo40p5I-nU"},{name:"Random",link:"https://picsum.photos/420/560"}],start:z,stop:L,isStopped:_}),w&&Object(f.jsx)(j,{className:"two",classNameOnError:"twoExpanded",name:"original-image",onImageDrawn:B,onLoadingError:G,limit:256,url:w}),N.image&&!_&&Object(f.jsx)(m,{className:"three",name:"generated-image",width:N.renderedWidth,height:N.renderedHeight,ratioW:1/N.ratioOffscreenWidth,ratioH:1/N.ratioOffscreenHeight,drawingSteps:l.best.phenotype}),l.best.diff&&!_&&Object(f.jsx)(h,{className:"four",name:"diff-image",width:N.renderedWidth,height:N.renderedHeight,ratioW:1/N.ratioOffscreenWidth,ratioH:1/N.ratioOffscreenHeight,data:l.best.diff}),!_&&Object(f.jsx)(p,{className:"five",generation:l.generation,fitness:l.best.fitness,ssim:l.best.ssim,pixelDiff:l.best.pixelDiff,subPixel:l.best.subPixel,idBest:l.best.id,elapsedTimeForGeneration:l.elapsedTime,notImprovingSince:l.notImprovingSince}),_&&Object(f.jsx)(x,{population:a.population,parentSelectionStrategy:a.parentSelectionStrategy,selectCutoff:a.selectCutoff,tournamentSize:a.tournamentSize,keepPreviousRatio:a.keepPreviousRatio,newIndividualRatio:a.newIndividualRatio,crossoverParentRatio:a.crossoverParentRatio,mutationRate:a.mutationRate,crossoverStrategy:a.crossoverStrategy,vertexMovement:a.vertexMovement,colorModificationRate:a.colorModificationRate,enableSsim:a.enableSsim,enablePixelDiff:a.enablePixelDiff,enableSubDiff:a.enableSubDiff,ratioSsim:a.ratioSsim,ratioPixelDiff:a.ratioPixelDiff,ratioSubDiff:a.ratioSubDiff,enableTransparency:a.enableTransparency,nbVertex:a.nbVertex,nbPolygons:a.nbPolygons,className:"five",onValuesChange:J})]})},S=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,21)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),i(e),r(e),o(e)}))};o.a.render(Object(f.jsx)(i.a.StrictMode,{children:Object(f.jsx)(v,{})}),document.getElementById("root")),S()}],[[20,1,2]]]);
//# sourceMappingURL=main.74b442a0.chunk.js.map