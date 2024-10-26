const cards = document.getElementsByClassName("card");
let allimages = document.getElementsByClassName("card-image");
let movesDisplay = document.querySelector(".move-counter");
const restart = document.getElementById("restart");

let toggleCardArray = [];
let move = 0;
let winCount = 0;

const imageLinkArray = [
    {
        id:1,
        image:'./img/Thor.png',
        newAlt: 'Thor Image'
    },
    {
        id:2,
        image:'./img/Blackpanther.jpg',
        newAlt: 'BlackPanther Image'
    },
    {
        id:3,
        image:'./img/Captian.png',
        newAlt: 'Captian Image'
    },
    {
        id:4,
        image:'./img/Thanos.png',
        newAlt: 'Thanos Image'
    },
    {
        id:5,
        image:'./img/Hulk.png',
        newAlt: 'Hulk Image'
    },
    {
        id:6,
        image:'./img/Captian.png',
        newAlt: 'Captian Image'
    },
    {
        id:7,
        image:'./img/Hulk.png',
        newAlt: 'Hulk Image'
    },
    {
        id:8,
        image:'./img/Thanos.png',
        newAlt: 'Thanos Image'
    },
    {
        id:9,
        image:'./img/Deadpool.png',
        newAlt: 'Deadpool Image'
    },
    {
        id:10,
        image:'./img/Thor.png',
        newAlt: 'Thor Image'
    },
    {
        id:11,
        image:'./img/Deadpool.png',
        newAlt: 'Deadpool Image'
    },
    {
        id:12,
        image:'./img/Thanos.png',
        newAlt: 'Thanos Image'
    },
];
//function to restart the game
const restartGame = () => {
    let toggleCard = document.getElementsByClassName("card toggled");
    imageLinkArray.sort(() => Math.random() - 0.5);
    Object.values(toggleCard).forEach(function(el){
        setTimeout(() =>{
            el.classList.remove("toggled");
        },1000);
    })
    toggleCardArray.length = 0;
    move = 0;
    winCount = 0;
    movesDisplay.innerHTML = `Moves:${move}`;
    let allimagesSrc = document.getElementsByClassName("card-image");
    Object.values(allimagesSrc).forEach((el,index) => {
        el.src = imageLinkArray[index].image;
        el.alt = imageLinkArray[index].newAlt;
        el.id = imageLinkArray[index].id;
    })
}
restart.addEventListener('click',restartGame);

for (i=0;i < cards.length; i++){
    cards[i].addEventListener('click',function (){
        this.classList.add("toggled");
        toggleCardArray.push(this);
        let thisImgSrc = this.querySelector('.card-image').src;
        let previousImgSrc = toggleCardArray[toggleCardArray.length - 2].querySelector('.card-image').src;
        if(thisImgSrc!==previousImgSrc){
            toggleCardArray.forEach(function(el){
                setTimeout(() => {
                    el.classList.remove("toggled");
                },500);
            })
            toggleCardArray.length = 0;
            move++;
        }
        else{
            toggleCardArray.length = 0;
            move++;
            winCount++;
        }
        movesDisplay.innerHTML = `Moves : ${move}`;
        if(winCount==6){
            setTimeout( () =>{
            alert(`Congratulations!!! You won the game in ${move} moves.`)
            },300)
            
        }
    })
}
