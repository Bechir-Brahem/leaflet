(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{63:function(t,e,n){},68:function(t,e,n){"use strict";n.r(e);var s=n(0),i=n.n(s),r=n(19),o=n.n(r),a=n(24),c=n(6),h=n(9),p=n(12),l=n(11),f=n(36),u=n.n(f),b=n(70),d=n(71),j=n(72),g=n(73),v=n(76),O=n(7),m=n.n(O);n(62),n(63);function x(t){return'<p style="text-align:center;">'+t.NA+"<br>("+t.LT+" , "+t.LG+")<br>"+function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e?1===e?t.substring(0,4)+"-"+t.substring(4,6)+"-"+t.substring(6,8):void 0:t.substring(6,8)+"/"+t.substring(4,6)+"/"+t.substring(0,4)}(t.DA)+" at "+((e=t.TI).substr(0,2)+":"+e.substr(2,2)+"</p>");var e}var y=function(){function t(){Object(c.a)(this,t),this.current=0,this.names=["#00ffff","#ff00ff","#ffff00","#ffffff","#00008b","#008b8b","#a9a9a9","#006400","#9932cc","#e9967a","#add8e6","#e0ffff","#90ee90","#d3d3d3","#808000","#ffa500","#ffc0cb","#800080","#00ff00","#0000ff","#f0ffff","#f5f5dc","#bdb76b","#8b008b","#556b2f","#ff8c00","#ffd700","#008000","#4b0082","#f0e68c","#ffb6c1","#ffffe0","#00ff00","#000080","#800080","#c0c0c0"]}return Object(h.a)(t,[{key:"getNext",value:function(){var t=this.names[this.current];return this.current++,this.current%=this.names.length,t}},{key:"shadeHexColor",value:function(t,e){var n=parseInt(t.slice(1),16),s=e<0?0:255,i=e<0?-1*e:e,r=n>>16,o=n>>8&255,a=255&n;return"#"+(16777216+65536*(Math.round((s-r)*i)+r)+256*(Math.round((s-o)*i)+o)+(Math.round((s-a)*i)+a)).toString(16).slice(1)}}]),t}(),k=n(1);delete m.a.Icon.Default.prototype._getIconUrl,m.a.Icon.Default.mergeOptions({iconUrl:"/static/images/marker-icon.png",iconRetinaUrl:"/static/images/marker-icon-2x.png",shadowUrl:"/static/images/marker-shadow.png"});var w=[36,10.5],D=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"checkProblem",value:function(t,e){if(e.DA===t.DA){if(t.TI-e.TI>200)return!0}else if("2400"-e.TI+parseInt(t.TI)>200)return!0}},{key:"render",value:function(){var t=this,e=[],n=[];return this.props.people.forEach((function(s,i){if(s.isShown){var r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"black",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"black";return m.a.divIcon({html:'<svg \n height="24"\n  viewBox="0 0 512 512"\n   width="24"\n   preserveAspectRatio="none"\n    xmlns="http://www.w3.org/2000/svg">\n    <g>\n    <path d="m90.997 364.003h119.998v-216.821l-132.375 193.347c-6.805 9.94.33 23.474 12.377 23.474z" fill="'+t+'"> </path>\n    <path d="m488.49 391.572h-224.999v-27.569h149.997c8.28 0 15-6.72 15-15 0-45.429-9.19-87.148-27.32-124.008-29.039-59.049-81.459-104.268-137.677-127.378v-82.608c0-10.61-10.75-17.85-20.55-13.93-.05.02-.09.04-.14.05-4.03 1.66-89.908 36.969-90.008 37.009-12.31 5.06-12.39 22.51-.13 27.69l80.829 34.129v291.615h-209.994c-9.217 0-16.388 8.233-14.803 17.86 16.103 105.627 13.38 87.765 13.693 89.818 1.112 7.331 7.414 12.75 14.83 12.75h335.291c51.636 0 97.805-29.107 120.101-73.312.075.006.152.007.227.013 4.44-8.93 7.89-18.39 10.24-28.21 2.365-9.88-4.925-18.919-14.587-18.919zm-224.999-248.235c40.059 49.959 40.119 120.338 0 170.367z" fill="'+e+'" ></path>\n    </g></svg>',className:"dummy",iconSize:[0,0],iconAnchor:[12,12]})}(s.color),o="",a=[];s.positions.forEach((function(c){var h=!1,p=parseInt(c.DA);if(p>=s.startDate&&p<=s.endDate){var l=[c.LT,c.LG];e.push(Object(k.jsx)(b.a,{position:l,icon:r,children:Object(k.jsx)(d.a,{children:Object(k.jsx)("p",{dangerouslySetInnerHTML:{__html:x(c)}})})},c.ID)),0!==i&&(h=t.checkProblem(c,o)),h&&(n.push(Object(k.jsx)(j.a,{pathOptions:{color:s.color},positions:a},c.ID)),a=[[o.LT,o.LG],l],n.push(Object(k.jsx)(j.a,{pathOptions:{color:"red",dashArray:"20,20"},positions:a},c.ID+"a")),a=[]),a.push(l),o=c}})),a.length>1&&n.push(Object(k.jsx)(j.a,{pathOptions:{color:s.color},positions:a},i+"b"))}})),Object(k.jsxs)(g.a,{center:w,zoom:8,children:[Object(k.jsx)(v.a,{url:"https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"}),e,n]})}}]),n}(s.Component),I=D,A=function t(){Object(c.a)(this,t),this.name="",this.positions=[],this.isShown=!0,this.startDate=0,this.endDate=Number.MAX_SAFE_INTEGER,this.didChange=!1,this.color=""},P=n(74),S=n(37),C=(n(65),n(75)),T=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var t=this;return Object(k.jsx)(C.a.Check,{type:"switch",id:"custom-switch",checked:this.props.isChecked,onChange:function(){t.props.togglePerson(t.props.index)}})}}]),n}(s.Component),E=T,N=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(k.jsxs)("div",{style:{display:"flex"},children:[Object(k.jsx)(E,{isChecked:this.props.checked,index:this.props.index,togglePerson:this.props.togglePerson}),Object(k.jsx)("span",{children:this.props.name})]})}}]),n}(s.Component),L=N,M=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){return Object(c.a)(this,n),e.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var t=this,e=this.props.peeps.map((function(e,n){return Object(k.jsx)(L,{index:n,name:e.name,checked:e.isShown,togglePerson:t.props.togglePerson},e.name)}));return Object(k.jsx)("div",{children:e})}}]),n}(s.Component),z=M,_=function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"";Object(c.a)(this,t),this.name=e,this.infractions=[],this.sos=[],this.isShown=n,this.startDate=s,this.endDate=i},G=function(t){Object(p.a)(n,t);var e=Object(l.a)(n);function n(){var t;Object(c.a)(this,n);for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))).state={people:[],rightPanel:[]},t}return Object(h.a)(n,[{key:"togglePerson",value:function(t){var e=Object(a.a)(this.state.people),n=Object(a.a)(this.state.rightPanel);e[t].isShown=!e[t].isShown,n[t].isShown=!n[t].isShown,this.setState({people:e,rightPanel:n})}},{key:"componentDidMount",value:function(){var t=this;u.a.get("/api").then((function(e){var n=new y,s="",i=[],r=-1;e.data.forEach((function(t,e){if(s!==t.NA){var o=new A;o.color=n.getNext(),o.name=t.NA,r++,s=o.name,i.push(o)}i[r].positions.push(t)}));var o=[];i.forEach((function(t,e){var n=new _(t.name,!0,t.positions[0].DA,t.positions[t.positions.length-1].DA);o.push(n)})),t.setState({people:i,rightPanel:o})}))}},{key:"render",value:function(){return Object(k.jsx)("div",{children:Object(k.jsxs)(P.a,{children:[Object(k.jsx)(S.a,{lg:8,md:12,children:Object(k.jsx)(I,{people:this.state.people})}),Object(k.jsx)(S.a,{lg:4,md:12,children:Object(k.jsx)(z,{peeps:this.state.rightPanel,togglePerson:this.togglePerson.bind(this)})})]})})}}]),n}(s.Component),U=G;o.a.render(Object(k.jsx)(i.a.StrictMode,{children:Object(k.jsx)(U,{})}),document.getElementById("root"))}},[[68,1,2]]]);
//# sourceMappingURL=main.2b082e8d.chunk.js.map