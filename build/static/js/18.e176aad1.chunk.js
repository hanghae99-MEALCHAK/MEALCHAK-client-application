(this.webpackJsonpmealchak=this.webpackJsonpmealchak||[]).push([[18],{413:function(e,n,i){"use strict";i.r(n);var r,t,o,a,l=i(12),c=i(9),d=i(156),s=i(0),b=i.n(s),g=i(11),m=i(25),u=i(21),h=i(49),j=i(186),p=i(2),v=i(7),f=i(151),O=i(57),x=i(3),w=i(26),_=i(1),k=function(e){var n=w.a.color,i=w.a.border,r=w.a.radius,t=w.a.fontSize,o=w.a.btn_border,a=Object(m.d)(),l=Object(m.e)((function(e){return e.user.is_login})),g=Object(m.e)((function(e){return e.user.user})),k=Object(m.e)((function(e){var n;return null===(n=e.image)||void 0===n?void 0:n.preview})),W=[{value:"10~19",label:"10\ub300"},{value:"20~29",label:"20\ub300"},{value:"30~39",label:"30\ub300"},{value:"40~49",label:"40\ub300"},{value:"50~59",label:"50\ub300"}],P=Object(s.useState)(!0),F=Object(d.a)(P,2),R=F[0],S=F[1],D=Object(s.useState)({nickname:null===g||void 0===g?void 0:g.user_nickname,comment:(null===g||void 0===g?void 0:g.user_comment)?null===g||void 0===g?void 0:g.user_comment:"",image:null===g||void 0===g?void 0:g.user_profile,gender:(null===g||void 0===g?void 0:g.user_gender)?null===g||void 0===g?void 0:g.user_gender:null,age:(null===g||void 0===g?void 0:g.user_age)?null===g||void 0===g?void 0:g.user_age:null}),U=Object(d.a)(D,2),V=U[0],H=U[1],L=b.a.useRef();return b.a.useEffect((function(){a(u.a.loginCheck("/profile"))}),[]),b.a.useEffect((function(){V.comment&&V.nickname?V.age&&V.gender?(V.comment||V.nickname)&&S(!1):(null===g||void 0===g?void 0:g.user_age)&&(null===g||void 0===g?void 0:g.user_gender)?H(Object(c.a)(Object(c.a)({},V),{},{gender:null===g||void 0===g?void 0:g.user_gender,age:null===g||void 0===g?void 0:g.user_age})):S(!0):S(!0)}),[V.comment,V.nickname,V.age,V.gender]),l?Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(f.n,Object(c.a)({},e)),Object(_.jsxs)(p.b,{minWidth:"32rem",minHeight:"100vh",margin:"0 auto",children:[Object(_.jsxs)(p.b,{shape:"container",minWidth:"32rem",children:[Object(_.jsx)(f.h,Object(c.a)(Object(c.a)({},e),{},{shape:"\ud504\ub85c\ud544\uc218\uc815"})),Object(_.jsxs)(p.b,{is_flex2:!0,margin:"3.6rem auto 2rem",children:[Object(_.jsx)(C,{user_profile:k||(null===g||void 0===g?void 0:g.user_profile)}),Object(_.jsxs)(z,{children:[Object(_.jsx)("input",{type:"file",accept:"image/jpg,image/png,image/jpeg,image/bmp",id:"input-file",ref:L,onChange:function(e){var n=new FileReader,i=L.current.files[0];H(Object(c.a)(Object(c.a)({},V),{},{image:i})),n.readAsDataURL(i),n.onloadend=function(){a(h.a.setPreview(n.result))}},style:{display:"none"}}),Object(_.jsx)("label",{htmlFor:"input-file",value:V.image||"",style:{cursor:"pointer"},children:Object(_.jsxs)("svg",{width:"2.5rem",height:"2.5rem",viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{margin:"3.6rem 0 0 3.8rem"},children:[Object(_.jsx)("path",{d:"M5 12.5558C5 11.4204 5.9204 10.5 7.05576 10.5V10.5C7.83809 10.5 8.55262 10.056 8.89902 9.35449L9.81482 7.5C9.99871 7.12761 10.0907 6.94142 10.2076 6.78792C10.5048 6.39791 10.9348 6.13064 11.4161 6.03689C11.6055 6 11.8132 6 12.2285 6H17.7715C18.1868 6 18.3945 6 18.5839 6.03689C19.0652 6.13064 19.4952 6.39791 19.7924 6.78792C19.9093 6.94142 20.0013 7.12761 20.1852 7.5L21.101 9.35449C21.4474 10.056 22.1619 10.5 22.9442 10.5V10.5C24.0796 10.5 25 11.4204 25 12.5558V18.2143C25 20.8349 25 22.1452 24.2369 22.999C24.1621 23.0827 24.0827 23.1621 23.999 23.2369C23.1452 24 21.8349 24 19.2143 24H10.7857C8.16513 24 6.85484 24 6.00096 23.2369C5.91728 23.1621 5.83786 23.0827 5.76307 22.999C5 22.1452 5 20.8349 5 18.2143V12.5558Z",stroke:"white",strokeWidth:"2"}),Object(_.jsx)("circle",{cx:"15",cy:"16",r:"4",stroke:"white",strokeWidth:"2"})]})})]})]}),Object(_.jsx)(y,{children:Object(_.jsxs)(p.b,{width:"32rem",minWidth:"32rem",heigh:"8.2rem",margin:"0 auto 2.4rem auto",children:[Object(_.jsx)(p.e,{width:"32rem",margin:"0 0 0.9rem 0",height:"2.4rem",bold2:"500",size:t.base,color:n.bg100,line_height:"150%",children:"\ub2c9\ub124\uc784"}),Object(_.jsx)(p.d,{type:"text",border:o.bg40,padding:"1.5rem 1.3rem",size:t.base,color:n.bg80,length:10,placeholder:null===g||void 0===g?void 0:g.user_nickname,value:null===V||void 0===V?void 0:V.nickname,_onChange:function(e){H(Object(c.a)(Object(c.a)({},V),{},{nickname:e.target.value})),S(!1)}})]})}),Object(_.jsx)(y,{children:Object(_.jsxs)(p.b,{width:"32rem",minWidth:"32rem",height:"8.2rem",shape:"container",align_items:"center",children:[Object(_.jsx)(p.e,{width:"32rem",margin:"0 0 0.9rem 0",height:"2.4rem",bold2:"500",size:t.base,color:n.bg100,line_height:"150%",children:"\uc18c\uac1c\uae00"}),Object(_.jsx)(A,{onChange:function(e){H(Object(c.a)(Object(c.a)({},V),{},{comment:e.target.value})),S(!1)},value:null===V||void 0===V?void 0:V.comment,placeholder:"\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?\r\n\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?\r\n\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!"})]})}),Object(_.jsx)(p.e,{width:"32rem",height:"2.2rem",margin:"0.4rem auto 0",color:"#9A9896",size:t.small,line_height:"150%",children:"20\uae00\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694."})]}),Object(_.jsxs)(p.b,{margin:"0 auto 1rem",shape:"container",align_items:"center",children:[Object(_.jsx)(p.e,{width:"32rem",margin:"2.4rem 0 0 0",height:"2.4rem",bold2:"500",size:t.base,color:n.bg100,line_height:"150%",children:"\uc131\ubcc4"}),Object(_.jsx)(p.b,{width:"32rem",minWidth:"32rem",border:i.bg40,radius:"1.2rem",height:"auto",bg:(null===g||void 0===g?void 0:g.user_gender)?"#eee":"",children:(null===g||void 0===g?void 0:g.user_gender)?Object(_.jsx)(p.e,{size:t.base,color:n.bg80,padding:"1.4rem 0 1.4rem 1.6rem",children:"male"===g.user_gender?"\ub0a8\uc131":"\uc5ec\uc131"}):Object(_.jsx)(j.c,{options:[{value:"female",label:"\uc5ec\uc131"},{value:"male",label:"\ub0a8\uc131"}],value:V.gender,setProfile:H,setDisabled:S,editProfile:V,onChange:e.onChange,gender:V.gender})})]}),Object(_.jsxs)(p.b,{margin:"0 auto 1rem",shape:"container",align_items:"center",children:[Object(_.jsx)(p.e,{width:"32rem",margin:"2.4rem 0 0 0",height:"2.4rem",bold2:"500",size:t.base,color:n.bg100,line_height:"150%",children:"\uc5f0\ub839"}),Object(_.jsx)(p.b,{width:"32rem",minWidth:"32rem",border:i.bg40,radius:"1.2rem",height:"auto",bg:(null===g||void 0===g?void 0:g.user_age)?"#eee":"",children:(null===g||void 0===g?void 0:g.user_age)?Object(_.jsx)(p.e,{size:t.base,color:n.bg80,padding:"1.4rem 0 1.4rem 1.6rem",children:W.map((function(e){return e.value===g.user_age?e.label:null}))}):Object(_.jsx)(j.a,{options:W,value:V.age,setProfile:H,setDisabled:S,editProfile:V,onChange:e.onChange,age:V.age})})]}),Object(_.jsx)(p.b,{width:"32rem",height:"auto",maxWidth:"35.5rem",margin:"0 auto 0.1rem",padding:"2.8rem 0 2.7rem",children:Object(_.jsx)(p.a,{bg:R?n.bg40:n.brand100,height:"5rem",border:"none",radius:r.button,cursor:"t",disabled:R,_onClick:function(){Object(x.a)("\uc218\uc815\ud560 \uc774\ub984",V.nickname),Object(x.a)("\uc218\uc815\ud560 \uc774\ub984",V.comment),Object(x.a)("\uc218\uc815 \ub0b4\uc6a9",V),(null===g||void 0===g?void 0:g.user_age)||(null===g||void 0===g?void 0:g.user_gender)?V.gender&&V.age?(a(u.a.editUserProfileAX(Object(c.a)({},V))),v.a.sweetConfirmReload("\ud504\ub85c\ud544 \uc218\uc815 \uc644\ub8cc",["\uba4b\uc9c4 \ud504\ub85c\ud544\uc774\uc2dc\ub124\uc694!"],"/mypage")):v.a.sweetConfirmReload("\uc557 \ube48\uce78\uc774 \uc788\uc5b4\uc694",["\uc131\ubcc4\uacfc \uc5f0\ub839\uc744 \ubaa8\ub450 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."],""):V.gender&&V.age?v.a.sweetUserInfo(V.age,V.gender).then((function(e){e&&(a(u.a.editUserProfileAX(Object(c.a)({},V))),v.a.sweetConfirmReload("\ud504\ub85c\ud544 \uc218\uc815 \uc644\ub8cc",["\uba4b\uc9c4 \ud504\ub85c\ud544\uc774\uc2dc\ub124\uc694!"],"/mypage"))})):v.a.sweetConfirmReload("\uc557 \ube48\uce78\uc774 \uc788\uc5b4\uc694",["\uc131\ubcc4\uacfc \uc5f0\ub839\uc744 \ubaa8\ub450 \uc120\ud0dd\ud574\uc8fc\uc138\uc694."],"")},children:Object(_.jsx)(p.e,{color:R?n.bg60:n.bg0,bold2:"700",size:t.base,children:"\uc800\uc7a5\ud558\uae30"})})})]})]}):Object(_.jsx)(O.a,{})};k.defaultProps={};var C=g.c.div(r||(r=Object(l.a)(["\n  margin: 1rem auto;\n  width: 10rem;\n  height: 10rem;\n  border-radius: 5rem;\n  ","\n  background-size: cover;\n  background-position: center;\n  /* padding: 10rem 0 0 0; */\n"])),(function(e){return e.user_profile?"background-image: url(".concat(null===e||void 0===e?void 0:e.user_profile,");"):"background-image: url(http://115.85.182.57:8080/image/profileDefaultImg.jpg);"})),z=g.c.div(t||(t=Object(l.a)(["\n  position: absolute;\n  top: 4.7rem;\n  width: 10rem;\n  height: 10rem;\n  border-radius: 5rem;\n  background: rgba(54, 55, 60, 0.4);\n  background-size: cover;\n  background-position: center;\n  opacity: 0.7;\n  border: none;\n"]))),A=g.c.textarea(o||(o=Object(l.a)(["\n  width: 32rem;\n  height: 16.8rem;\n  color: ",";\n  font-size: ",";\n  font-weight: 400;\n  line-height: 150%;\n  letter-spacing: -0.01rem;\n  background-color: ",";\n  border: ",";\n  border-radius: ",";\n  padding: 1.6rem;\n  resize: none;\n  &::placeholder {\n    color: ",";\n    font-size: ",';\n    font-weight: 400;\n    line-height: 150%;\n    letter-spacing: -0.01rem;\n  }\n  &::-webkit-input-placeholder::after {\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n  &::-moz-placeholder {\n    /* Firefox 19+ */\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n\n  &:-ms-input-placeholder {\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n\n  &:-moz-placeholder {\n    /* Firefox 18- */\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n'],["\n  width: 32rem;\n  height: 16.8rem;\n  color: ",";\n  font-size: ",";\n  font-weight: 400;\n  line-height: 150%;\n  letter-spacing: -0.01rem;\n  background-color: ",";\n  border: ",";\n  border-radius: ",";\n  padding: 1.6rem;\n  resize: none;\n  &::placeholder {\n    color: ",";\n    font-size: ",';\n    font-weight: 400;\n    line-height: 150%;\n    letter-spacing: -0.01rem;\n  }\n  &::-webkit-input-placeholder::after {\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?\\A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?\\A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n  &::-moz-placeholder {\n    /* Firefox 19+ */\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?\\A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?\\A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n\n  &:-ms-input-placeholder {\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?\\A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?\\A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n\n  &:-moz-placeholder {\n    /* Firefox 18- */\n    display: block;\n    content: "\uc5b4\ub290 \uc9c0\uc5ed\uc5d0\uc11c \uc8fc\ub85c \uc2dc\ucf1c\uba39\ub098\uc694?\\A\uc81c\uc77c \uc88b\uc544\ud558\ub294 \uc74c\uc2dd\uc740 \ubb34\uc5c7\uc778\uac00\uc694?\\A\ub098\ub97c \ub098\ud0c0\ub0bc \uc218 \uc788\ub294 \ubb38\uad6c\ub85c \uc18c\uac1c\ud574\ubcf4\uc138\uc694!";\n  }\n'])),w.a.color.bg100,w.a.fontSize.base,w.a.color.bg0,w.a.btn_border.bg40,w.a.radius.button,w.a.color.bg80,w.a.fontSize.base),y=g.c.div(a||(a=Object(l.a)(["\n  &:focus-within p {\n    color: #ff9425;\n  }\n  &:focus-within input {\n    border: 1px solid #ff9425;\n    outline: none;\n  }\n  &:focus-within textarea {\n    border: 1px solid #ff9425;\n    outline: none;\n    resize: none;\n  }\n"])));n.default=k}}]);
//# sourceMappingURL=18.e176aad1.chunk.js.map