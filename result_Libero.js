  // データ取得
  
  const total = Number(sessionStorage.getItem('total') || '0');
  const result = JSON.parse(sessionStorage.getItem('result') || '[]');
  const resultGender = JSON.parse(sessionStorage.getItem('resultGender') || '[]');
  const leftCount = parseInt(sessionStorage.getItem('left') || '0');
  const middleCount = parseInt(sessionStorage.getItem('middle') || '0');
  const rightCount = parseInt(sessionStorage.getItem('right') || '0'); 
  const ribeloCount = parseInt(sessionStorage.getItem('ribelo') || '0');
  const position = JSON.parse(sessionStorage.getItem('position') || '[]');

  // ポジションごとの配列に分ける
  const left = result.slice(0, leftCount);
  const left_gen = resultGender.slice(0, leftCount);
  const left_posi = position.slice(0,leftCount);
  const middle = result.slice(leftCount, leftCount + middleCount);
  const middle_gen = resultGender.slice(leftCount, leftCount + middleCount);
  const middle_posi = position.slice(leftCount, leftCount + middleCount);
  const right = result.slice(leftCount + middleCount, leftCount + middleCount + rightCount-2);
  const right_gen = resultGender.slice(leftCount + middleCount, leftCount + middleCount + rightCount-2);
  const right_posi = position.slice(leftCount + middleCount, leftCount + middleCount + rightCount-2);
  const setter = result.slice(leftCount + middleCount + rightCount-2,leftCount + middleCount + rightCount);
  const setter_gen = resultGender.slice(leftCount + middleCount + rightCount-2,leftCount + middleCount + rightCount);
  const setter_posi = position.slice(leftCount + middleCount + rightCount-2,leftCount + middleCount + rightCount);
  const ribelo = result.slice(leftCount + middleCount + rightCount,leftCount + middleCount + rightCount + ribeloCount);
  const ribelo_gen = resultGender.slice(leftCount + middleCount + rightCount,leftCount + middleCount + rightCount + ribeloCount);
  const ribelo_posi = position.slice(leftCount + middleCount + rightCount,leftCount + middleCount + rightCount + ribeloCount);

  let A = [];
  let B = [];
  let index_option = 0;
  let Liberocount = [];
  let posi_index = 1;//リベロポジの順番　０→１→２→0

  //リベロ割り当て　０を代入  
  for(let i = 0; i < total; i++){
    Liberocount.push('0');
  }

function splitTeam(positionNameArray, genderArray, positionArray,posi_index_check) {
  const a = [];
  const aa = [];
  const a_index = [];
  const b = [];
  const bb = [];
  const b_index = [];

  for (let i = positionNameArray.length; i > 0; i--) {
    const name = positionNameArray[i - 1];
    const gender = genderArray[i - 1];
    const position = positionArray[i - 1];

    // 性別が女性なら赤文字に
    const displayName = gender === '2'
      ? `<span style="color:red">${name}</span>`
      : name;

    const j = Math.floor(Math.random() * 2);
    if(posi_index_check === 0){
      if(j === 0){
               a.push(`${displayName}:${position}`);
               aa.push(Liberocount[posi_index*3 + i-1 +index_option]);
               a_index.push(posi_index*3 + i-1 + index_option);
      }else if(j === 1){
               b.push(`${displayName}:${position}`);
               bb.push(Liberocount[posi_index*3 + i-1 +index_option]);
               b_index.push(posi_index*3 + i-1 +index_option);
      }
    }else{
      if(j === 0){
               a.push(`${displayName}:${position}`);
               aa.push(Liberocount[posi_index*3 + i +index_option]);
               a_index.push(posi_index*3 + i + index_option);
      }else if(j === 1){
               b.push(`${displayName}:${position}`);
               bb.push(Liberocount[posi_index*3 + i +index_option]);
               b_index.push(posi_index*3 + i +index_option);
      }
    }
    
   }

   let k;
  if (Math.abs(a.length - b.length) <= 1) {
    
     if(posi_index === posi_index_check){
      k = Math.floor(Math.random() * 2);
        if(k === 0){
          if(!(aa[0] != '1' && aa[1] != '1')){
          splitTeam(positionNameArray, genderArray, positionArray,posi_index_check);
          }
        }else if(k === 1){
          if(!(bb[0] != '1' && bb[1] != '1')){
          splitTeam(positionNameArray, genderArray, positionArray,posi_index_check);
          }
        }  
       
      }
    
    A.push(...a);
    B.push(...b);
    if(k === 0){
      Liberocount[a_index[0]] = '1';
      Liberocount[a_index[1]] = '1';
    }else if(k === 1){
      Liberocount[b_index[0]] = '1';
      Liberocount[b_index[1]] = '1';
    }
  
  } else {
    splitTeam(positionNameArray, genderArray, positionArray,posi_index_check); // 再帰呼び出し時も genderArray を渡す必要あり
  }
}
  

  function decide(){
  // 各ポジションを分ける
  splitTeam(left,left_gen,left_posi,0);
  splitTeam(middle,middle_gen,middle_posi,1);
  splitTeam(right,right_gen,right_posi,2);
  splitTeam(setter,setter_gen,setter_posi,3);
  splitTeam(ribelo,ribelo,ribelo_posi,3);
  


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
    p.innerHTML = member;
    teamADiv.appendChild(p);
  });

  // チームB表示
  const teamBDiv = document.getElementById("teamB");
  B.forEach(member => {
    const p = document.createElement("p");
    p.innerHTML = member;
    teamBDiv.appendChild(p);
  });

  if(posi_index > 2){
    posi_index = 0 ;
  }else{
     posi_index ++;
  }
 



//
 