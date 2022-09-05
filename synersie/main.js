const getData = () => {
  const save = (data) => {
    localStorage.setItem(data.id, JSON.stringify(data));
  };
  // const divOne = document.createElement("div");
  //   divOne.innerHTML = `${name}`;
  //   document.body.append(divOne);
  const main = async () => {
    const currentHost = window.location.host.toLowerCase();
    let data;

    switch (currentHost) {
      case "mediaexpert.pl":
      case "www.mediaexpert.pl":
        data = await fetchForMediaExpert();
        break;
      case "mediamarkt.pl":
      case "www.mediamarkt.pl":
        data = await fetchForMediaMarkt();
        break;
      case "euro.com.pl":
      case "www.euro.com.pl":
        data = await fetchForEuro();
        break;
      default:
        throw new Error("Page unknown");
    }

    save(data);
  };

  async function fetchForMediaExpert() {
    const name = document.querySelector(
      ".name.is-title[data-v-16fb7132]"
    ).innerText;
    const divOne = document.createElement("div");
    divOne.innerHTML = `${name}`;
    document.body.append(divOne);
    const id = document.querySelector(
      ".id.is-regular[data-v-16fb7132]"
    ).innerText;
    const price = document.querySelector(".whole").innerText;
    const url = window.location.href;
    const rating =
      document
        .querySelector("div.product-rating[data-v-16fb7132] .star.icon")
        .style.width.slice(0, -1) / 100;
    const foto = await getB64Image(
      document.querySelector(".spark-image img[data-v-43312c86]").src
    );

    return { name, id, price, url, rating, foto };
  }

  async function fetchForMediaMarkt() {
    const name = document.querySelector(
      ".info .title[data-v-0d4f25e9]"
    ).innerText;
    const id = document.querySelector(".catalog").innerText;
    const price = document.querySelector(".whole").innerText;
    const url = window.location.href;
    const rating =
      document
        .querySelector(".star.is-filled[data-v-62d0d4e6]")
        .style.width.slice(0, -1) / 100;
    const foto = await getB64Image(
      document.querySelector(".spark-image img").src
    );

    return { name, id, price, url, rating, foto };
  }

  async function fetchForEuro() {
    const name = document.querySelector("h1.product-name").innerText;
    const id = document.querySelector(".selenium-product-code").innerText;
    const price = document.querySelector(
      ".price-tabs .product-price"
    ).innerText;
    const url = window.location.href;
    const rating =
      document.querySelector(".stars-rating>a>span").style.width.slice(0, -1) /
      100;
    const foto = await getB64Image(
      document.querySelector("#big-photo img").src
    );

    return { name, id, price, url, rating, foto };
  }

  async function getB64Image(imgUrl) {
    try {
      const blobImg = await imgUrl.then((resp) => resp.blob());

      return await new Promise((resolve, reject) => {
        const read = new FileReader();
        read.onloadend = () => resolve(read.result);
        read.readAsDataUrl(blobImg);
      });
    } catch (src) {
      return null;
    }
  }

  main();
};

getData();

// ;
// div.innerText = `${name} ${id} ${price} ${url} ${rating} ${foto}`;
// document.body.append(div);
//https://mediamarkt.pl/rtv-i-telewizory/sluchawki-przewodowe-douszne-apple-earpods-ze-zlaczem-lightning-mmtn2zm-a-bialy
(function showProduct( productId){
  function appear() {
  const product = JSON.parse(localStorage(productId));
  console.log(product);
  document.body.innerHTML = "";
  const div = document.createElement("div");

  for (let k in product) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    ul.innerText = getLabelfor(k);
    if (k === "foto") {
      const img = document.createElement("img", { src: product.foto });
      img.src = product.foto;
      li.appendChild(img);
    } else if (k === "price") {
      li.innerText = `${product[key] * 100}%`;
    } else {
      li.innerText = `${product[key]}`;
    }
    div.appendChild(ul).appendChild(li);
  }
  document.body.appendChild(div);
}
function getLabelfor(k) {
  switch (k) {
    case "name":
      return "nazwa";
    case "id":
      return "Id produktu";
    case "url":
      return "url produktu";
    case "price":
      return "cena produktu";
    case "foto":
      return "Zdjęcie";
    case "rating":
      return "Ocena";
  }
  getLabelfor(k)
}
appear();

},(1320809))

