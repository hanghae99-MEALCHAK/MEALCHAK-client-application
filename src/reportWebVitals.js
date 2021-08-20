const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);  // cumulative layout shift : 광고가 많아서 사용성이 불편하거나 뷰가 깨져서 사용자가 버튼하나 누르기 힘들거나 그런 상황이 있는지. 잘못된 클릭을 유도하는 클릭 미스율을 보는 지표
      getFID(onPerfEntry);  // first input delay : web page의 반응성에 관한 지표, 이벤트가 시작되는데 얼마의 시간이 걸리는지 (사용하지 않는 코드가 이벤트 전에 너무 많거나 연산이 너무 많이 일어나는 경우)
      getFCP(onPerfEntry);  // first contentful paint : 브라우저가 화면에 그려지기 시작한 시점부터의 지표. 새로고침 순간부터 텍스트나 이미지 등 진짜 컨텐츠가 처음으로 그려지는 순간까지의 지표 (흰 화면은 포함되지 않음)
      getLCP(onPerfEntry);  // larges contentful paint : web page 에서 가장 큰 덩어리를 로드하는데 걸리는 시간을 측정한 지표 (h1 > p 등 중요도가 높은 것)
      getTTFB(onPerfEntry);  // time to first byte : 브라우저가 페이지에 들어갈 내용의 가장 첫번째 바이트를 가지고 오는데 걸리는 시간 (네트워크에서도 볼수있음)
    });
  }
};

export default reportWebVitals;
