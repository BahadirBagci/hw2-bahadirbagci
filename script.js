/* javascript kodunuzu buraya yazınız*/
const content = document.querySelector("#content");
/* set up XMLHttpRequest */
const requestURL = "hw2.xlsx";
/* GET request JSON data for onload function */
const oReq = new XMLHttpRequest();
oReq.open("GET", requestURL, true);
oReq.responseType = "arraybuffer";

oReq.onload = function (e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, { type: "binary" });

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
  const jsonObj = XLSX.utils.sheet_to_json(worksheet, { raw: true });
  let sUsers = sortUser(jsonObj);/*objeyi arreye atıyoruz*/
  console.log(sUsers)
  sUsers.forEach(isim => {
    let card = document.createElement('div');
    let profileİmg = isim['Profil Fotoğrafı'].replace("open","uc")
    console.log(profileİmg)
    let instagram = isim['Instagram Hesabı'] ? `<a href=${isim['Instagram Hesabı']}><i class="fa-brands fa-instagram"></i></a>` : '';
    let ozgecmis = isim['Özgeçmiş Dosyası'] ? `<a href=${isim['Özgeçmiş Dosyası']}><i class="fa-solid fa-file"></i></a>` : '';
    let website = isim['Web Sayfası'] ? `<a href=${isim['Web Sayfası']}><i class="fa-solid fa-globe"></i></a>` : '';
    let github = isim['Github Hesabı'] ? `<a href=${isim['Github Hesabı']}><i class="fa-brands fa-github"></i></a>` : '';
    let linkedin = isim['Linkedin Hesabı'] ? `<a href=${isim['Linkedin Hesabı']}><i class="fa-brands fa-linkedin"></i></a>` : '';
    let facebook = isim['Facebook Hesabı'] ? `<a href=${isim['Facebook Hesabı']}><i class="fa-brands fa-facebook"></i></a>` : '';
    let twitter = isim['Twitter Hesabı'] ? `<a href=${isim['Twitter Hesabı']}><i class="fa-brands fa-twitter"></i></a>` : '';

    if (isim.IsShow === 1) {
      card.classList.add('card');
      card.innerHTML = `
        <div class='img-wrapper'>
          <img src='${profileİmg}'/>
        </div>
        <h2 class='name'>${isim['Ad Soyad']}</h2>
        <small class='yil'>${isim['Mezuniyet Yılı']}</small>
        <div class=${isim['Pozisyon/Unvan'] ? 'work' : 'notWork'}>${isWork(isim)}</div>
        <div class='social-link'>
          ${ozgecmis}
          ${website}
          ${linkedin}
          ${github}
          ${twitter}
          ${instagram}
          ${facebook}
        </div>
      `
      content.appendChild(card);
    }
  });
}

function sortUser(kullanici) {
  return kullanici.sort((a, b) => b['Mezuniyet Yılı'] - a['Mezuniyet Yılı']) || null
}

function isWork(isim) {
  if (isim['Çalıştığınız Kurum']) {
    return isim['Pozisyon/Unvan'] + ' @' + isim['Çalıştığınız Kurum']
  }
  return isim['Çalıştığınız Kurum'] || 'Çalışmıyor'
}


oReq.send();

