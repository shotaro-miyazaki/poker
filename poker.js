let suits=["&spades;","&hearts;","&diams;","&clubs;"];
let nums=["A","2","3","4","5","6","7","8","9","0","J","Q","K"];
let cards=[];
for(var i=0;i<=3;i++){
for(var j=0;j<=12;j++){
  cards.push([i,j]);
}
}
function view(num){
  document.querySelector('#view').innerHTML="";
  for(let i=0;i<num;i++){
    cards.sort(function(x,y){return Math.random()>Math.random();});
    let mycards=cards.filter(function(x,y){return y<5;});
    mycards.sort(function(x,y){return x[1]==y[1]?x[0]>y[0]:x[1]>y[1];});
    let str="";
    for(let j=0;j<5;j++){
      str+=suits[mycards[j][0]]+nums[mycards[j][1]];
    }
    document.querySelector('#view').innerHTML+=str+":"+judge(mycards)+"<br>";
  }
}
function judge(cards){
  let pair={};
  let suit=[];
  for(let j=0;j<5;j++){
    pair[cards[j][1]]=(typeof pair[cards[j][1]]=="undefined"?0:pair[cards[j][1]])+1;
    suit[cards[j][0]]=(typeof suit[cards[j][0]]=="undefined"?0:suit[cards[j][0]])+1;
  }
  let flg1=Math.max.apply(null,Object.values(pair));
  let flg2=Object.keys(pair).length;
  let flg3=Math.max.apply(null,Object.values(suit));
  let flg4=(flg1==1) && (cards[4][1]-cards[0][1]==4);
  let flg5=(flg1==1) && (cards[0][1]==0 && cards[1][1]==9 && cards[4][1]==12);
  if(flg1==2 && flg2==4) return "One Pair";
  if(flg1==2 && flg2==3) return "Two Pair";
  if(flg1==3 && flg2==3) return "Tree of a kind";
  if((flg4 || flg5) &&flg3!=5) return "Straight";
  if(!flg4 && !flg5 && flg3==5) return "Flush";
  if(flg1==3 && flg2==2) return "Full House";
  if(flg1==4) return "Four of a Kind";
  if(flg4 && flg3==5) return "Straight Flush";
  if(flg5 && flg3==5) return "Royal Flush";
  return "*";
}
function challenge(num){
  let hand={};
  for(let i=0;i<num;i++){
    cards.sort(function(x,y){return Math.random()>Math.random();});
    let mycards=cards.filter(function(x,y){return y<5;});
    mycards.sort(function(x,y){return x[1]==y[1]?x[0]>y[0]:x[1]>y[1];});
    let j=judge(mycards);
    hand[j]=typeof hand[j]=="undefined"?1:(hand[j]+1);
  }
  document.querySelector('#view').innerHTML="";
  for(let i in hand){
    document.querySelector('#view').innerHTML+=i+":"+hand[i]+"<br>";
  }
}

function getHand(str){
  document.querySelector('#view').innerHTML="";
  let i=1;
  while(i<=500000){
    cards.sort(function(x,y){return Math.random()>Math.random();});
    let mycards=cards.filter(function(x,y){return y<5;});
    mycards.sort(function(x,y){return x[1]==y[1]?x[0]>y[0]:x[1]>y[1];});
    if(judge(mycards)==str){
      document.querySelector('#view').innerHTML=str+":"+i;
      return true;
    }
    i++;
  }
  document.querySelector('#view').innerHTML=str+":over 500,000";
  return false;


}
