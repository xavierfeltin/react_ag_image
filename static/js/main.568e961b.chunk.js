(this.webpackJsonpreact_ag_image=this.webpackJsonpreact_ag_image||[]).push([[0],{79:function(e,t,i){},80:function(e,t,i){},86:function(e,t,i){},87:function(e,t,i){},88:function(e,t,i){},89:function(e,t,i){"use strict";i.r(t);var n=i(113),a=i(65),r=i(3),c=(i(79),i(0));function s(){return new Worker(i.p+"static/js/test.worker.da4125aa.js")}i(12);var o=i(4);function l(e){return 3===e.length?"rgb(".concat(e[0],",").concat(e[1],",").concat(e[2],")"):"rgba(".concat(e[0],",").concat(e[1],",").concat(e[2],",").concat(e[3],")")}function b(e,t){if(e&&0!==t.vertices.length){e.fillStyle=l(t.color),e.beginPath();var i=t.vertices[0];e.moveTo(i.x,i.y);for(var n=1;n<t.vertices.length;n++)i=t.vertices[n],e.lineTo(i.x,i.y);e.closePath(),e.fill()}}function j(e,t,i){var n=t/e;return i&&(e>=i||t>=i)?n>1?{width:Math.round(i/n),height:i,ratio:n}:{width:i,height:Math.round(i*n),ratio:n}:{width:e,height:t,ratio:n}}i(80);var d=i(114),u=i(115),f=i(116),h=i(1);function g(e){var t=e.start,i=e.stop,n=e.links,a=e.isStopped,s=e.className,o=Object(c.useState)("https://my-image-url"),l=Object(r.a)(o,2),b=l[0],j=l[1];return Object(h.jsxs)("div",{className:s,children:[Object(h.jsx)("div",{children:Object(h.jsx)("form",{onSubmit:function(e){e.preventDefault(),t&&t(b)},children:Object(h.jsxs)(u.a,{direction:"row",spacing:4,align:"center",children:[Object(h.jsx)(f.a,{type:"text",name:"image-url",value:b,onChange:function(e){return j(e.target.value)}}),Object(h.jsx)(d.a,{disabled:!a,type:"submit",id:"start-button",children:"Start"}),Object(h.jsx)(d.a,{disabled:a,type:"button",id:"stop-button",onClick:function(){i&&i()},children:"Stop"})]})})}),Object(h.jsx)("div",{children:Object(h.jsx)(u.a,{direction:"row",spacing:4,align:"center",children:function(){var e=[];return n.forEach((function(t){var i=Object(h.jsxs)(d.a,{variant:"link",value:t.link,onClick:function(e){j(e.currentTarget.value)},children:[" ",t.name," "]},t.name);e.push(i)})),e}()})})]})}i(86);var m=i(117),x=i(108);function O(e){var t=e.name,i=e.url,n=e.label,a=e.limit,s=e.onImageDrawn,o=e.onLoadingError,l=e.className,b=e.classNameOnError,d=Object(c.useRef)(null),f=Object(c.useState)(!1),g=Object(r.a)(f,2),O=g[0],p=g[1],v=Object(c.useState)(""),S=Object(r.a)(v,2),y=S[0],C=S[1];return Object(c.useEffect)((function(){if(i!==y){C(i),p(!1);var e=d.current;if(e){var t=e.getContext("2d"),n=new Image;n.crossOrigin="Anonymous",n.onload=function(){var i=j(n.width,n.height,a),r=i.width,c=i.height;0!==r&&0!==c||console.error("Fail to load the image"),e.width=r,e.height=c,t?(t.drawImage(n,0,0,r,c),null===s||void 0===s||s(n,r,c)):console.error("ctx is null the image can not be loaded")},n.src=i,n.onerror=function(){p(!0),o()}}}}),[i,a,s,o,y]),Object(h.jsxs)("div",{className:O?b:l,children:[O&&Object(h.jsxs)(m.a,{status:"error",children:[Object(h.jsx)(m.c,{}),Object(h.jsx)(m.d,{mr:2,children:"Loading error!"}),Object(h.jsxs)(m.b,{children:["The image ",i," could not be loaded. Try with another URL."]})]}),!O&&Object(h.jsxs)(u.b,{children:[Object(h.jsx)("canvas",{id:t,ref:d}),Object(h.jsx)(x.a,{fontSize:"sm",children:n})]})]})}function p(e){var t=e.name,i=e.label,n=e.width,a=e.height,r=e.ratioW,s=e.ratioH,o=e.drawingSteps,l=e.className,j=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e=j.current,t=e.getContext("2d");0!==n&&0!==a||console.error("Fail to create the drawing"),e.width=n,e.height=a,t?function(e,t,i,n,a){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];e.clearRect(0,0,t,i),e.fillStyle="#000000",e.fillRect(0,0,t,i),e.scale(n,a),r.forEach((function(t){b(e,t)}))}(t,n,a,r,s,o):console.error("ctx is null the drawing can not be done")}),[n,a,r,s,o]),Object(h.jsx)("div",{children:Object(h.jsxs)(u.b,{children:[Object(h.jsx)("canvas",{className:l,id:t,ref:j}),Object(h.jsx)(x.a,{fontSize:"sm",children:i})]})})}function v(e){var t=e.name,i=e.label,n=e.width,a=e.height,r=e.ratioW,s=e.ratioH,o=e.data,l=e.className,b=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e=b.current,t=e.getContext("2d");0!==n&&0!==a||console.error("Fail to create the drawing"),e.width=n,e.height=a,t?function(e,t,i,n,a,r,c){e.clearRect(0,0,t,i),e.putImageData(r,0,0),e.scale(n,a),e.drawImage(c,0,0)}(t,n,a,r,s,o,e):console.error("ctx is null the drawing can not be done")}),[n,a,r,s,o]),Object(h.jsx)("div",{children:Object(h.jsxs)(u.b,{children:[Object(h.jsx)("canvas",{className:l,id:t,ref:b}),Object(h.jsx)(x.a,{fontSize:"sm",children:i})]})})}var S=i(109);function y(e){var t=e.generation,i=e.fitness,n=e.ssim,a=e.pixelDiff,r=e.subPixel,c=e.idBest,s=e.elapsedTimeForGeneration,o=e.notImprovingSince,l=e.className;return Object(h.jsx)("div",{className:l,children:Object(h.jsxs)(S.a,{variant:"striped",children:[Object(h.jsx)(S.e,{children:Object(h.jsx)(S.f,{children:Object(h.jsx)(S.d,{children:" Simulation "})})}),Object(h.jsxs)(S.b,{children:[Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Generation:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:t})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Not improving since:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:o})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Time by generation:"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[s," seconds"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Global fitness:"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[(100*i).toFixed(2),"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Ssim fitness:"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[(100*n).toFixed(2),"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Pixel Diff fitness:"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[(100*a).toFixed(2),"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Sub Pixel fitness:"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[(100*r).toFixed(2),"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Best indivudial:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:c})]})]})]})})}i(87),i(88);function C(e){var t=e.defaultVal,i=e.min,n=e.max,a=e.step,s=e.label,o=e.id,l=e.name,b=e.onChange,j=Object(c.useState)(t),d=Object(r.a)(j,2),u=d[0],f=d[1];return Object(h.jsxs)("div",{className:"inputrange-wrapper",children:[Object(h.jsx)("label",{className:"inputrange-one",children:s}),Object(h.jsx)("input",{className:"inputrange-two",type:"range",id:o,name:l,min:i,max:n,step:a,value:u,onChange:function(e){var t=e.target.valueAsNumber;f(t),b(t)}}),Object(h.jsx)("span",{className:"inputrange-three",children:u})]})}var N=i(110),R=i(118);function P(e){var t=e.population,i=e.parentSelectionStrategy,n=e.selectCutoff,a=e.tournamentSize,s=e.keepPreviousRatio,l=e.newIndividualRatio,b=e.crossoverParentRatio,j=e.mutationRate,d=e.crossoverStrategy,f=e.vertexMovement,g=e.colorModificationRate,m=e.copyColorNeighborRate,x=e.enableSsim,O=e.enablePixelDiff,p=e.enableSubDiff,v=e.ratioSsim,S=e.ratioPixelDiff,y=e.ratioSubDiff,P=e.enableTransparency,w=e.nbVertex,k=e.nbPolygons,D=e.resolution,M=e.onValuesChange,V=e.className,I=Object(c.useState)({population:t,parentSelectionStrategy:i,selectCutoff:n,tournamentSize:a,keepPreviousRatio:s,newIndividualRatio:l,crossoverParentRatio:b,mutationRate:j,crossoverStrategy:d,vertexMovement:f,colorModificationRate:g,copyColorNeighborRate:m,enableSsim:x,enablePixelDiff:O,enableSubDiff:p,ratioSsim:v,ratioPixelDiff:S,ratioSubDiff:y,enableTransparency:P,nbVertex:w,nbPolygons:k,resolution:D}),T=Object(r.a)(I,2),W=T[0],z=T[1];return Object(c.useEffect)((function(){M(W)}),[W,M]),Object(h.jsx)("div",{className:V,children:Object(h.jsxs)(u.b,{spacing:6,children:[Object(h.jsxs)("div",{children:[Object(h.jsx)(N.a,{as:"h4",size:"sm",children:"General"}),Object(h.jsx)(C,{id:"ga-population",name:"ga-population",label:"Population",min:10,max:300,defaultVal:W.population,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{population:e}))}}),Object(h.jsx)(C,{id:"ga-keep-previous",name:"ga-keep-previous",label:"Keep previous individual",min:0,max:1,defaultVal:W.keepPreviousRatio,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{keepPreviousRatio:e}))}}),Object(h.jsx)(C,{id:"ga-new-individual",name:"ga-new-individual",label:"Generate new individual",min:0,max:1,defaultVal:W.newIndividualRatio,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{newIndividualRatio:e}))}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)(N.a,{as:"h4",size:"sm",children:"Crossover"}),Object(h.jsxs)("div",{className:"gaconfiguration-wrapper",children:[Object(h.jsx)("label",{className:"gaconfiguration-one",children:"Type: "})," ",Object(h.jsx)("br",{}),Object(h.jsxs)("div",{className:"gaconfiguration-two",children:[Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-tournament",children:["Tournament ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-tournament",name:"parentstrategy",value:"tournament",checked:"tournament"===W.parentSelectionStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{parentSelectionStrategy:e.target.value}))}})]}),Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-fortunewheel",children:["Fortune Wheel ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-fortunewheel",name:"parentstrategy",value:"fortunewheel",checked:"fortunewheel"===W.parentSelectionStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{parentSelectionStrategy:e.target.value}))}})]})]})]}),"tournament"===W.parentSelectionStrategy&&Object(h.jsx)(C,{id:"ga-selection-cutoff",name:"ga-selection-cutoff",label:"Selection cutoff",min:0,max:1,defaultVal:W.selectCutoff,step:.05,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{selectCutoff:e}))}}),"tournament"===W.parentSelectionStrategy&&Object(h.jsx)(C,{id:"ga-tournament-size",name:"ga-tournament-size",label:"Tournament size",min:1,max:Math.round(W.selectCutoff*W.population),defaultVal:W.tournamentSize,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{tournamentSize:e}))}}),Object(h.jsx)(C,{id:"ga-crossover-parent",name:"ga-crossover-parent",label:"Main parent ratio",min:0,max:1,defaultVal:W.crossoverParentRatio,step:.05,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{crossoverParentRatio:e}))}}),Object(h.jsxs)("div",{className:"gaconfiguration-wrapper",children:[Object(h.jsx)("label",{className:"gaconfiguration-one",children:"Granularity: "})," ",Object(h.jsx)("br",{}),Object(h.jsxs)("div",{className:"gaconfiguration-two",children:[Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-polygon",children:["Polygons ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-polygon",name:"strategy",value:"polygon",checked:"polygon"===W.crossoverStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{crossoverStrategy:e.target.value}))}})]}),Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-vertex",children:["Vertex ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-vertex",name:"strategy",value:"vertex",checked:"vertex"===W.crossoverStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{crossoverStrategy:e.target.value}))}})]}),Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-data",children:["Data ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-data",name:"strategy",value:"data",checked:"data"===W.crossoverStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{crossoverStrategy:e.target.value}))}})]}),Object(h.jsxs)("label",{className:"ga-strategy-label",htmlFor:"strategy-singlePoint",children:["Single point ",Object(h.jsx)("br",{}),Object(h.jsx)("input",{type:"radio",id:"strategy-singlePoint",name:"strategy",value:"singlePoint",checked:"singlePoint"===W.crossoverStrategy,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{crossoverStrategy:e.target.value}))}})]})]})]})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)(N.a,{as:"h4",size:"sm",children:"Mutation"}),Object(h.jsx)(C,{id:"ga-mutation",name:"ga-mutation",label:"Mutation rate",min:0,max:1,defaultVal:W.mutationRate,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{mutationRate:e}))}}),Object(h.jsx)(C,{id:"ga-vertex-movement",name:"ga-vertex-movement",label:"Vertex movement",min:0,max:.5,defaultVal:W.vertexMovement,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{vertexMovement:e}))}}),Object(h.jsx)(C,{id:"ga-color-modification",name:"ga-color-modification",label:"Color modification",min:0,max:1,defaultVal:W.colorModificationRate,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{colorModificationRate:e}))}}),Object(h.jsx)(C,{id:"ga-color-copy",name:"ga-color-copy",label:"Copy neighbor color",min:0,max:1,defaultVal:W.copyColorNeighborRate,step:.01,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{copyColorNeighborRate:e}))}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)(N.a,{as:"h4",size:"sm",children:"Image rendering"}),Object(h.jsx)(C,{id:"ga-resolution",name:"ga-resolution",label:"resolution",min:32,max:256,defaultVal:W.resolution,step:32,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{resolution:e}))}}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{htmlFor:"ga-ssim",children:"SSIM:"}),Object(h.jsx)(R.a,{className:"ga-chakra-switch",id:"ga-ssim",value:"ssim",isChecked:W.enableSsim,onChange:function(e){z(Object(o.a)(Object(o.a)({},W),{},{enableSsim:e.target.checked}))}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{htmlFor:"ga-pixeldiff",children:"Pixel differenciation:"}),Object(h.jsx)(R.a,{className:"ga-chakra-switch",id:"ga-pixeldiff",value:"pixeldiff",isChecked:W.enablePixelDiff,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{enablePixelDiff:e.target.checked}))}})]}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{htmlFor:"ga-subdiff",children:"Pixel substraction:"}),Object(h.jsx)(R.a,{className:"ga-chakra-switch",id:"ga-subdiff",value:"subdiff",isChecked:W.enableSubDiff,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{enableSubDiff:e.target.checked}))}})]}),W.enableSsim&&Object(h.jsx)(C,{id:"ga-ssim-ratio",name:"ga-ssim-ratio",label:"Ratio Ssim",min:0,max:10,defaultVal:W.ratioSsim,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{ratioSsim:e}))}}),W.enablePixelDiff&&Object(h.jsx)(C,{id:"ga-pixldiff-ratio",name:"ga-pixldiff-ration",label:"Ratio Pixel diff",min:0,max:10,defaultVal:W.ratioPixelDiff,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{ratioPixelDiff:e}))}}),W.enableSubDiff&&Object(h.jsx)(C,{id:"ga-subdiff-ratio",name:"ga-subdiff-ration",label:"Ratio Sub diff",min:0,max:10,defaultVal:W.ratioSubDiff,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{ratioSubDiff:e}))}}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{htmlFor:"ga-transparency",children:"Transparency:"}),Object(h.jsx)(R.a,{className:"ga-chakra-switch",id:"ga-transparency",value:"transparency",isChecked:W.enableTransparency,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{enableTransparency:e.target.checked}))}})]}),Object(h.jsx)(C,{id:"ga-vertex",name:"ga-vertex",label:"Vertex",min:3,max:10,defaultVal:W.nbVertex,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{nbVertex:e}))}}),Object(h.jsx)(C,{id:"ga-vertices",name:"ga-vertices",label:"Vertices",min:50,max:500,defaultVal:W.nbPolygons,step:1,onChange:function(e){return z(Object(o.a)(Object(o.a)({},W),{},{nbPolygons:e}))}})]})]})})}function w(e){var t=e.population,i=e.parentSelectionStrategy,n=e.selectCutoff,a=e.tournamentSize,r=e.keepPreviousRatio,c=e.newIndividualRatio,s=e.crossoverParentRatio,o=e.mutationRate,l=e.crossoverStrategy,b=e.vertexMovement,j=e.colorModificationRate,d=e.copyColorNeighborRate,f=e.enableSsim,g=e.enablePixelDiff,m=e.enableSubDiff,x=e.ratioSsim,O=e.ratioPixelDiff,p=e.ratioSubDiff,v=e.enableTransparency,y=e.nbVertex,C=e.nbPolygons,N=e.resolution,R=e.className;return Object(h.jsx)("div",{className:R,children:Object(h.jsxs)(u.b,{spacing:6,children:[Object(h.jsxs)(S.a,{variant:"striped",children:[Object(h.jsx)(S.e,{children:Object(h.jsx)(S.f,{children:Object(h.jsx)(S.d,{children:"General"})})}),Object(h.jsxs)(S.b,{children:[Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Population size: "}),Object(h.jsx)(S.c,{isNumeric:!0,children:t})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Keep from previous generation: "}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*r,"% "]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Insert new individual in generation: "}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*c,"% "]})]})]})]}),Object(h.jsxs)(S.a,{variant:"striped",children:[Object(h.jsx)(S.e,{children:Object(h.jsx)(S.f,{children:Object(h.jsx)(S.d,{children:"Crossover"})})}),Object(h.jsxs)(S.b,{children:[Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Parent selection strategy:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:i})]}),function(){var e=[];return e.push(Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:" Selection cutoff:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:n})]},"tr-1")),e.push(Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:" Tournament size::"}),Object(h.jsx)(S.c,{isNumeric:!0,children:a})]},"tr-2")),e}(),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Main parent ratio during crossover :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*s,"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Crossover strategy :"}),Object(h.jsx)(S.c,{isNumeric:!0,children:l})]})]})]}),Object(h.jsxs)(S.a,{variant:"striped",children:[Object(h.jsx)(S.e,{children:Object(h.jsx)(S.f,{children:Object(h.jsx)(S.d,{children:"Mutation"})})}),Object(h.jsxs)(S.b,{children:[Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Mutation rate :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*o,"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Copy neighbor color rate :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*d,"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Vertex movement during mutation :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*b,"%"]})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Color movement during mutation :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[100*j,"%"]})]})]})]}),Object(h.jsxs)(S.a,{variant:"striped",children:[Object(h.jsx)(S.e,{children:Object(h.jsx)(S.f,{children:Object(h.jsx)(S.d,{children:"Image rendering"})})}),Object(h.jsxs)(S.b,{children:[Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Resolution :"}),Object(h.jsxs)(S.c,{isNumeric:!0,children:[N,"px"]})]}),function(){var e=[];f&&e.push("Ssim ("+x+")"),g&&e.push("Pixel diff ("+O+")"),m&&e.push("Sub diff ("+p+")");var t=[];return t.push(Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:" Fitness functions:"}),Object(h.jsx)(S.c,{isNumeric:!0,children:e.join(",")})]},"tr-3")),t}(),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Transparency enabled :"}),Object(h.jsx)(S.c,{isNumeric:!0,children:v})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Vertex by polygon :"}),Object(h.jsx)(S.c,{isNumeric:!0,children:y})]}),Object(h.jsxs)(S.f,{children:[Object(h.jsx)(S.c,{children:"Generated polygons :"}),Object(h.jsx)(S.c,{isNumeric:!0,children:C})]})]})]})]})})}var k=i(112);var D=function(){var e=Object(c.useState)({population:50,parentSelectionStrategy:"tournament",selectCutoff:.2,tournamentSize:3,keepPreviousRatio:.01,newIndividualRatio:.01,crossoverParentRatio:.6,mutationRate:.01,crossoverStrategy:"polygon",vertexMovement:.15,colorModificationRate:.1,copyColorNeighborRate:.01,enableSsim:!0,enablePixelDiff:!1,enableSubDiff:!1,ratioSsim:1,ratioPixelDiff:1,ratioSubDiff:1,enableTransparency:!0,nbVertex:3,nbPolygons:125,resolution:64}),t=Object(r.a)(e,2),i=t[0],n=t[1],a=Object(c.useState)({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,subPixel:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}),o=Object(r.a)(a,2),l=o[0],b=o[1],d=Object(c.useState)(void 0),u=Object(r.a)(d,2),f=u[0],m=u[1],x=Object(c.useState)(""),S=Object(r.a)(x,2),C=S[0],N=S[1],R=Object(c.useState)({image:null,renderedWidth:0,renderedHeight:0,ratioOffscreenWidth:0,ratioOffscreenHeight:0,offscreenWidth:0,offscreenHeight:0,limitOffscreen:0}),D=Object(r.a)(R,2),M=D[0],V=D[1],I=Object(c.useState)(null),T=Object(r.a)(I,2),W=T[0],z=T[1],F=Object(c.useState)(!0),_=Object(r.a)(F,2),H=_[0],E=_[1],G=Object(c.useCallback)((function(e){var t=e.data;m(t)}),[]),L=Object(c.useCallback)((function(e){var t=new s;z(t),E(!1),N(e)}),[]);Object(c.useEffect)((function(){W&&(console.log("Add listener to worker"),W.addEventListener("message",G))}),[W,G]),Object(c.useEffect)((function(){if(W&&M.image&&f&&!H){b(f);var e={isRunning:f.isRunning,image:M.image,configuration:i,notImprovingSince:f.notImprovingSince,best:f.best,population:f.population,generation:f.generation,renderingHeight:M.offscreenHeight,renderingWidth:M.offscreenWidth};W.postMessage(e)}}),[W,f,M,i,H]);var A=Object(c.useCallback)((function(){W&&(W.terminate(),b({isRunning:!1,best:{genes:[],fitness:0,ssim:0,pixelDiff:0,subPixel:0,diff:void 0,id:0,probability:0,phenotype:[]},population:[],generation:0,elapsedTime:0,notImprovingSince:0}),N(""),E(!0),m(void 0))}),[W]),J=Object(c.useCallback)((function(e,t,n){var a=j(e.width,e.height,i.resolution),r=a.width/t,c=a.height/n,s=new OffscreenCanvas(a.width,a.height).getContext("2d");if(s){s.scale(r,c),s.drawImage(e,0,0,t,n);var o=s.getImageData(0,0,a.width,a.height);if(V({image:o,renderedWidth:t,renderedHeight:n,offscreenWidth:a.width,offscreenHeight:a.height,ratioOffscreenWidth:r,ratioOffscreenHeight:c,limitOffscreen:i.resolution}),W&&o){var b={isRunning:l.isRunning,image:o,configuration:i,notImprovingSince:l.notImprovingSince,best:l.best,population:l.population,generation:l.generation,renderingHeight:a.height,renderingWidth:a.width};console.log("post message for first generation"),W.postMessage(b)}}else console.error("ctx from url image for resizing could not be created")}),[l,W,i]),B=Object(c.useCallback)((function(){E(!0)}),[]),U=Object(c.useCallback)((function(e){n(e)}),[]);return Object(h.jsxs)("div",{className:"wrapper",children:[Object(h.jsx)(g,{className:"one",links:[{name:"Einstein",link:"https://raw.githubusercontent.com/obartra/ssim/master/spec/samples/einstein/Q1.gif"},{name:"Joconde",link:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/390px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"},{name:"Photographer",link:"https://i.picsum.photos/id/823/420/560.jpg?hmac=H6lJE4fRi96MxgWYyd3_79WbmObu-jJj7Zo40p5I-nU"},{name:"Landscape",link:"https://i.picsum.photos/id/1015/420/560.jpg?hmac=JcSYiOeUMQYq_XstyekCWyhAlg_e8UiPWxp66v-ki6Q"},{name:"Random",link:"https://picsum.photos/420/560"}],start:L,stop:A,isStopped:H}),C&&Object(h.jsx)(O,{className:"two",classNameOnError:"twoExpanded",name:"original-image",label:"Original",onImageDrawn:J,onLoadingError:B,limit:256,url:C}),M.image&&!H&&Object(h.jsx)(v,{className:"three",name:"simu-image",label:"In memory",width:M.renderedWidth,height:M.renderedHeight,ratioW:1/M.ratioOffscreenWidth,ratioH:1/M.ratioOffscreenHeight,data:M.image}),M.image&&!H&&Object(h.jsx)(p,{className:"four",name:"generated-image",label:"Maestro painting",width:M.renderedWidth,height:M.renderedHeight,ratioW:1/M.ratioOffscreenWidth,ratioH:1/M.ratioOffscreenHeight,drawingSteps:l.best.phenotype}),l.best.diff&&!H&&Object(h.jsx)(v,{className:"five",name:"diff-image",label:"Memory VS Painting",width:M.renderedWidth,height:M.renderedHeight,ratioW:1/M.ratioOffscreenWidth,ratioH:1/M.ratioOffscreenHeight,data:l.best.diff}),!H&&Object(h.jsx)("div",{className:"six",children:Object(h.jsxs)(k.e,{children:[Object(h.jsxs)(k.b,{children:[Object(h.jsx)(k.a,{children:"Painting Art"}),Object(h.jsx)(k.a,{children:"Genetic Algorithm parameters"})]}),Object(h.jsxs)(k.d,{children:[Object(h.jsx)(k.c,{children:Object(h.jsx)(y,{className:"",generation:l.generation,fitness:l.best.fitness,ssim:l.best.ssim,pixelDiff:l.best.pixelDiff,subPixel:l.best.subPixel,idBest:l.best.id,elapsedTimeForGeneration:l.elapsedTime,notImprovingSince:l.notImprovingSince})}),Object(h.jsx)(k.c,{children:Object(h.jsx)(w,{population:i.population,parentSelectionStrategy:i.parentSelectionStrategy,selectCutoff:i.selectCutoff,tournamentSize:i.tournamentSize,keepPreviousRatio:i.keepPreviousRatio,newIndividualRatio:i.newIndividualRatio,crossoverParentRatio:i.crossoverParentRatio,mutationRate:i.mutationRate,crossoverStrategy:i.crossoverStrategy,vertexMovement:i.vertexMovement,colorModificationRate:i.colorModificationRate,copyColorNeighborRate:i.copyColorNeighborRate,enableSsim:i.enableSsim,enablePixelDiff:i.enablePixelDiff,enableSubDiff:i.enableSubDiff,ratioSsim:i.ratioSsim,ratioPixelDiff:i.ratioPixelDiff,ratioSubDiff:i.ratioSubDiff,enableTransparency:i.enableTransparency,nbVertex:i.nbVertex,nbPolygons:i.nbPolygons,resolution:i.resolution,className:""})})]})]})}),H&&Object(h.jsx)(P,{population:i.population,parentSelectionStrategy:i.parentSelectionStrategy,selectCutoff:i.selectCutoff,tournamentSize:i.tournamentSize,keepPreviousRatio:i.keepPreviousRatio,newIndividualRatio:i.newIndividualRatio,crossoverParentRatio:i.crossoverParentRatio,mutationRate:i.mutationRate,crossoverStrategy:i.crossoverStrategy,vertexMovement:i.vertexMovement,colorModificationRate:i.colorModificationRate,copyColorNeighborRate:i.copyColorNeighborRate,enableSsim:i.enableSsim,enablePixelDiff:i.enablePixelDiff,enableSubDiff:i.enableSubDiff,ratioSsim:i.ratioSsim,ratioPixelDiff:i.ratioPixelDiff,ratioSubDiff:i.ratioSubDiff,enableTransparency:i.enableTransparency,nbVertex:i.nbVertex,nbPolygons:i.nbPolygons,resolution:i.resolution,className:"six",onValuesChange:U})]})},M=document.getElementById("root");Object(a.render)(Object(h.jsx)(n.a,{children:Object(h.jsx)(D,{})}),M)}},[[89,1,2]]]);
//# sourceMappingURL=main.568e961b.chunk.js.map