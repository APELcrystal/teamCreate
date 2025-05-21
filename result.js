  // データ取得
  const result = JSON.parse(sessionStorage.getItem('result') || '[]');
  const leftCount = parseInt(sessionStorage.getItem('left') || '0');
  const middleCount = parseInt(sessionStorage.getItem('middle') || '0');
  const rightCount = parseInt(sessionStorage.getItem('right') || '0');
  const position = JSON.parse(sessionStorage.getItem('position') || '[]');

  // ポジションごとの配列に分ける
  const left = result.slice(0, leftCount);
  const left_posi = position.slice(0,leftCount);
  const middle = result.slice(leftCount, leftCount + middleCount);
  const middle_posi = position.slice(leftCount, leftCount + middleCount);
  const right = result.slice(leftCount + middleCount, leftCount + middleCount + rightCount);
  const right_posi = position.slice(leftCount + middleCount, leftCount + middleCount + rightCount);

  let A = [];
  let B = [];

  // チーム分け関数：配列をシャッフルし、半分ずつ分ける
  function splitTeam(positionNameArray,positionArray) {
    const a =[]
    const b =[]
    for (let i = positionNameArray.length ; i > 0; i--) {
      const j = Math.floor(Math.random() * 2);
      if(j === 0){
        a.push(positionNameArray[i-1]+":"+positionArray[i-1]);
      }else{
        b.push(positionNameArray[i-1]+":"+positionArray[i-1]);
      }
    }
    if(Math.abs(a.length - b.length) <= 1){
      A.push(...a);
      B.push(...b);
    }else{
      splitTeam(positionNameArray,positionArray);
    }

  }
  

  function decide(){
  // 各ポジションを分ける
  splitTeam(left,left_posi);
  splitTeam(middle,middle_posi);
  splitTeam(right,right_posi);

  if(Math.abs(A.length-B.length) <=1){
      
    }else{
      A = [];
      B = [];
      decide();
    }

  }

  decide();
  
  // チームA表示
  const teamADiv = document.getElementById("teamA");
  A.forEach(member => {
    const p = document.createElement("p");
    p.textContent = member;
    teamADiv.appendChild(p);
  });

  // チームB表示
  const teamBDiv = document.getElementById("teamB");
  B.forEach(member => {
    const p = document.createElement("p");
    p.textContent = member;
    teamBDiv.appendChild(p);
  });
