// const fetchData = callback => {
//     setTimeout( () => {
//         callback();
//     }, 10000);
// };

// setTimeout( () => {
//     console.log("Timer is done!");
//     fetchData( text => {
//         console.log("Text");
//     });
// }, 5000);

const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, 3000);
  });
  return promise;
};

setTimeout(() => {
  console.log("Output after 5 secs!");
  fetchData().then((text) => {
    console.log(text);
  });
}, 5000);
