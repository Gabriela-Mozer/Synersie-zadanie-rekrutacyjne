const getData = () => {
  const save = (data) => {
    localStorage.setItem(data.id, JSON.stringify(data));
  };

  const main = () => {
    const currentHost = window.location.host.toLowerCase();
    let data;
    switch (currentHost) {
      case "mediaexpert.pl":
      case "www.mediaexpert.pl":
        data = fetchForMediaExpert();
        break;
      case "mediamarkt.pl":
      case "www.mediamarkt.pl":
        data = fetchForMediaMarkt();
        break;
      case "euro.com.pl":
      case "www.euro.com.pl":
        data = fetchForEuro();
        break;
      default:
        throw new Error("Page unknown");
    }
    save(data);
  };
async  function fetchForMediaExpert() {
    const name = document.querySelector(
      ".name.is-title[data-v-16fb7132]"
    ).innerText;
    const id = document.querySelector(
      ".id.is-regular[data-v-16fb7132]"
    ).innerText;
    const price = document.querySelector(".whole").innerText;
    const url = window.location.href;
    const rating =
      document
        .querySelector("div.product-rating[data-v-16fb7132] .star.icon")
        .style.width.slice(0, -1) / 100;
    const foto = await getB64Image( document.querySelector(
      ".spark-image img[data-v-43312c86]"
    ).src); //?
    return { name, id, price, url, rating, foto };
  //
  }
 async function fetchForMediaMarkt() {
    const name = document.querySelector(".info .title[data-v-0d4f25e9]").innerText;
    const id = document.querySelector(".catalog").innerText;
    const price = document.querySelector(".whole").innerText;
    const url = window.location.href;
    const rating =
      document
        .querySelector(".star.is-filled[data-v-62d0d4e6]")
        .style.width.slice(0, -1) / 100;
    const foto = await getB64Image(document.querySelector(".is-loaded").src); //?
    return { name, id, price, url, rating, foto };
   
  } //https://mediamarkt.pl/rtv-i-telewizory/sluchawki-przewodowe-douszne-apple-earpods-ze-zlaczem-lightning-mmtn2zm-a-bialy
 async function fetchForEuro() {
    // const img = await getB64Image()
    const name = document.querySelector("h1.product-name").innerText;
    const id = document.querySelector(".selenium-product-code").innerText;
    const price = document.querySelector(
      ".price-tabs .product-price"
    ).innerText;
    const url = window.location.href;
    const rating =
      document.querySelector(".stars-rating>a>span").style.width.slice(0, -1) /
      100;
    const foto =await getB64Image( document.querySelector("#big-photo img").src);
    return { name, id, price, url, rating, foto };
   
}
  main();
};
getData();

async function getB64Image(imgUrl) {
  const blobImg = await imgUrl.then((resp) => resp.blob());

 return await new Promise((resolve, reject) => {
    const read =  new  FileReader();
    read.onloadend = () => {
      resolve(read.result);
    };
    read.readAsDataUrl(blobImg);
    
  });
}

