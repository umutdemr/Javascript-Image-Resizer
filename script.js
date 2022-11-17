const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // ilk kullanıcı tarafından seçilen dosyayı alma
    if(!file) return; // kullanıcı herhangi bir dosya seçmediyse geri dön
    previewImg.src = URL.createObjectURL(file); // img src'yi önizlemek için seçilen dosya url'sini geçirme
    previewImg.addEventListener("load", () => { // img yüklendikten sonra
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

widthInput.addEventListener("keyup", () => {
    // orana göre yükseklik alma onay kutusu durumu
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
    // oran onay kutusu durumuna göre genişlik alma
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // kalite onay kutusu işaretliyse, imgQuality'ye 0,5'i geçin, aksi takdirde 1,0'ı geçin
    // 1.0, %100 kalitedir ve 0.5, toplamın %50'sidir. 0.1 - 1.0 arasında geçiş yapabilirsiniz
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // giriş değerlerine göre tuval yüksekliği ve genişliğinin ayarlanması
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // kullanıcı tarafından seçilen görüntüyü tuval üzerine çizmek
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    // tuval veri url'sini <a> öğesinin href değeri olarak geçirme
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = new Date().getTime(); // şimdiki zamanı indirme değeri olarak geçirmek
    a.click(); // <a> öğesine tıklayarak dosyanın indirilmesi
}

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());







