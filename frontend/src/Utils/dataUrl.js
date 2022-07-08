// File Reader API; Ne marche pas...
export const dataUrl = (url) =>
    fetch(url)
    .then((response) => response.blob())
    .then(
        (blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    )
    .catch((error) => {
        console.log(error)
    })
    .then((dataUrl) => {
        return dataUrl
    })

/* const getBase64Image = (img) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
};

const imageUrl = document.getElementById("imageUrl");
const imgData = getBase64Image(imageUrl);
localStorage.setItem("imageUrl", imgData); */