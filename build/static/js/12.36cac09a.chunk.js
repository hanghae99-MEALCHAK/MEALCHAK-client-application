(this.webpackJsonpmealchak=this.webpackJsonpmealchak||[]).push([[12],{230:function(e,t,n){"use strict";n.r(t),n.d(t,"TapGrid",(function(){return C}));var i,o,r=n(12),a=n(8),c=n(1),s=n.n(c),b=n(22),d=n(46),l=n(23),h=n(14),m=n(15),j=n(154),u=n(2),p=n(20),g=n(10),O=n(156),f=n(157),x=n(155),v=(n(4),n(0)),_=function(e){var t=Object(b.d)();s.a.useEffect((function(){document.querySelector("body").scrollTo({top:0,left:0,behavior:"instant"}),t(l.a.loginCheck("/chatlist")),m.b&&(t(d.a.setChatListAX()),t(d.a.awaitChatListAX()),t(d.a.clearChat()))}),[]);var n=p.a.color,i=p.a.border,o=(p.a.radius,p.a.fontSize),r=Object(b.e)((function(e){return e.chat.chatListInfo})),c=Object(b.e)((function(e){return e.chat.awaitList})),g=Object(b.e)((function(e){var t;return null===(t=e.user.user)||void 0===t?void 0:t.new_join_request}));return Object(v.jsxs)(s.a.Fragment,{children:[Object(v.jsx)(j.o,Object(a.a)({},e)),Object(v.jsxs)(u.b,{minWidth:"36rem",minHeight:"100vh",margin:"0 auto",padding:"0 0 5.2rem 0",children:[Object(v.jsxs)(u.b,{shape:"container",children:[Object(v.jsx)(j.h,Object(a.a)(Object(a.a)({},e),{},{shape:"\ucc44\ud305\ub9ac\uc2a4\ud2b8"})),Object(v.jsx)(u.b,{height:"4.4rem"}),Object(v.jsx)(j.g,Object(a.a)({},e))]}),Object(v.jsxs)(C,{children:[Object(v.jsx)(u.b,{borderBottom:i.line3,width:"100%",padding:"0 2rem",margin:"0",_onClick:function(){h.b.push("/chatlist")},cursor:"pointer",children:Object(v.jsx)(u.e,{size:o.base,bold2:"700",margin:"0 0 0.8rem",children:"\ucc38\uc5ec\uc911\uc778 \ucc44\ud305\ubc29"})}),Object(v.jsxs)(u.b,{width:"100%",padding:"0 2rem",margin:"0",position:"relative",children:[Object(v.jsx)(u.b,{width:"fit-content",height:"fit-content",position:"absolute",top:"-0.6rem",right:"1.2rem",children:g&&Object(v.jsx)(u.c,{size:"0.9",src:Object(x.isWebpSupported)()?f.a.alarmWebp:O.a.alarm})}),Object(v.jsx)(u.e,{bold2:"700",size:o.base,margin:"0 0 0.8rem",color:n.bg60,_onClick:function(){h.b.push("/allowchat")},cursor:"pointer",children:"\ub4e4\uc5b4\uc628 \uc2b9\uc778 \uc694\uccad"})]})]}),null===r||void 0===r?void 0:r.map((function(e,n){return Object(v.jsx)(j.d,{new_msg:e.new_msg,live_chat:e.live_chat,room_id:e.room_id,roomName:e.roomName,post_id:e.postId,headCountChat:e.headCountChat,_onClick:function(n){var i,o,r,a,c;i=e.room_id,o=e.roomName,r=e.postId,a=e.own_user_id,c=e.order_time,t(d.a.moveChatRoom(i,o,r,a,c)),h.b.push({pathname:"/chatting",state:{room_id:i,roomName:o,post_id:r,own_user_id:a,order_time:c}})}},n)})),null===c||void 0===c?void 0:c.map((function(e,t){return Object(v.jsx)(j.c,{roomName:e.title,join_id:e.join_id},t)})),0===(null===c||void 0===c?void 0:c.length)&&0===(null===r||void 0===r?void 0:r.length)&&Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(u.b,{shape:"empty",src:Object(x.isWebpSupported)()?f.a.emptyBubblesWebp:O.a.emptyBubbles,children:Object(v.jsx)(w,{theme:p.a,children:"\uc544\uc9c1 \ucc44\ud305 \ub0b4\uc6a9\uc774 \uc5c6\uc5b4\uc694."})}),Object(v.jsx)(u.b,{height:"20rem"})]})]})]})};_.defaultProps={};var w=g.c.p(i||(i=Object(r.a)(["\n  position: relative;\n  text-align: center;\n  top: 15rem;\n  font-size: ",";\n  color: ",";\n"])),(function(e){return e.theme.fontSize.base}),(function(e){return e.theme.color.bg80})),C=g.c.div(o||(o=Object(r.a)(["\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  border-bottom: 1px solid rgb(207, 207, 207);\n  display: grid;\n  -webkit-box-align: center;\n  align-items: center;\n  text-align: center;\n  grid-template-columns: 1fr 1fr;\n  padding: 0 2rem;\n"])));t.default=_}}]);
//# sourceMappingURL=12.36cac09a.chunk.js.map