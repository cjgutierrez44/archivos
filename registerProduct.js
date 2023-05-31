const css = document.getElementById("codigoean");
const previousStyle = css.style.cssText;

//VALIDATION OF EAN CODE
function eanCodeValidation() {
  const codigoean = document.getElementById("codigoean");
  var input = document.getElementById("codigoean").value;
  var pattern = /^[0-9]+$/;

  codigoean.addEventListener("input", () => {
    codigoean.value = codigoean.value.replace(/\D/g, "");
  });

  if (input.match(pattern)) {
    codigoean.style.border = "2px solid #2FC11D";
    setTimeout(() => {
      codigoean.style.cssText = previousStyle;
    }, 2000);
    mostrarError(codigoean, false);
    return true;
  } else {
    codigoean.style.border = "2px solid red";
    mostrarError(codigoean, true);
  }
}

codigoean.onkeyup = () => {
  eanCodeValidation();
};

//VALIDATION OF "NOMBRE"
function nameValidation() {
  const nombre = document.getElementById("nombre");
  var input = document.getElementById("nombre").value;
  var pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'0-9]+$/;

  if (input.match(pattern)) {
    nombre.style.border = "2px solid #2FC11D";
    setTimeout(() => {
      nombre.style.cssText = previousStyle;
    }, 2000);
    mostrarError(nombre, false);
    return true;
  } else {
    nombre.style.border = "2px solid red";
    mostrarError(nombre, true);
  }
}

nombre.onkeyup = () => {
  nameValidation();
};

//VALIDATION OF "MARCA"
function marcaValidation() {
  const marca = document.getElementById("marca");
  var input = document.getElementById("marca").value;
  var pattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'0-9]+$/;

  if (input.match(pattern)) {
    marca.style.border = "2px solid #2FC11D";
    setTimeout(() => {
      marca.style.cssText = previousStyle;
    }, 2000);
    mostrarError(marca, false);
    return true;
  } else {
    marca.style.border = "2px solid red";
    mostrarError(marca, true);
  }
}

marca.onkeyup = () => {
  marcaValidation();
};

//VALIDATION OF "PRECIO"
function precioValidation() {
  const precio = document.getElementById("precio");
  var input = document.getElementById("precio").value;

  if (input > 0) {
    precio.style.border = "2px solid #2FC11D";
    setTimeout(() => {
      precio.style.cssText = previousStyle;
    }, 2000);
    mostrarError(precio, false);
    return true;
  } else {
    precio.style.border = "2px solid red";
    mostrarError(precio, true);
  }
}

precio.onkeyup = () => {
  validate();
};

//VALIDATION OF "CANTIDAD"
function cantidadValidation() {
  const cantidad = document.getElementById("cantidad");
  var input = document.getElementById("cantidad").value;

  if (input > 0) {
    cantidad.style.border = "2px solid #2FC11D";
    setTimeout(() => {
      cantidad.style.cssText = previousStyle;
    }, 2000);
    mostrarError(cantidad, false);
    return true;
  } else {
    cantidad.style.border = "2px solid red";
    mostrarError(cantidad, true);
  }
}

cantidad.onkeyup = () => {
  validate();
};

function mostrarError(input, accion) {
  let container = input.parentElement;
  for (hijo of container.children) {
    if (hijo.classList.contains("error-message")) {
      if (accion) hijo.classList.add("d-block");
      else hijo.classList.remove("d-block");
    }
  }
}

const button = document.getElementById("publicar");

function validate() {
  if (
    eanCodeValidation() &&
    nameValidation() &&
    marcaValidation() &&
    precioValidation() &&
    cantidadValidation()
  ) {
    button.classList.remove("disabled");
  }
}

button.addEventListener("click", (event) => {
  const eanCode = document.getElementById("codigoean").value;
  const name = document.getElementById("nombre").value;
  const description = document.getElementById("descripcion").value;
  const brand = document.getElementById("marca").value;
  const quantity = document.getElementById("cantidad").value;
  const price = document.getElementById("precio").value;
  
  const imageInput = document.getElementById('imageInput');
  


  const picture = imageInput.files[0].name;

  const cedula = getCookie("userBaihan");

  

  const product = {
    eanCode: eanCode,
    name: name,
    description: description,
    brand: brand,
    quantity: quantity,
    price: price,
    picture: picture,
    customer: { cedula: cedula },
  };
  console.log(product)
  
  sendData("http://3.128.182.247/api/products/save", product);

 
  //
});

function getCookie(nombre) {
  var nombreCookie = nombre + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nombreCookie) == 0) {
      return cookie.substring(nombreCookie.length, cookie.length);
    }
  }
  return null;
}

function sendData(url, object) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  }).then(function (response) {
    if (response.ok) {
      // Procesar la respuesta de la API
      response.json().then(function (data) {
        uploadImage();
        return true;
      });
    } else {
      // Manejar los errores de la API
      //console.log("Error en la solicitud");
      return false;
    }
  });
}

function uploadImage() {
  // Obtener el elemento de entrada de archivo
  var input = document.getElementById("imageInput");

  // Verificar si se seleccionó un archivo
  if (input.files.length > 0) {
    var file = input.files[0];

    // Crear un objeto FormData para enviar el archivo al servidor
    var formData = new FormData();
    formData.append("file", file);

    // Realizar una solicitud POST al servidor Flask
    fetch("http://3.128.182.247:5000/upload", {
      //Cambiar la IP local al del servicio
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Manejar la respuesta del servidor
        console.log('SI SE SUBIO')
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error("Error al enviar la imagen:", error);
      });
  } else {
    console.log("No se seleccionó ningún archivo.");
  }
}

function subirImagen() {
  var fileInput = document.getElementById("formFileLg");
  var file = fileInput.files[0];

  var params = {
    Bucket: "s3-imag",
    Key: "photokey",
    Body: file,
    ACL: "public-read",
  };

  s3.upload(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log("Imagen cargada exitosamente en S3.");
      console.log("URL de acceso público: " + data.Location);
    }
  });
}

function mostrarUbicacionUsuario(map, marker, direccion) {
  var geocoder = new google.maps.Geocoder();
  // Realizar la geocodificación de la dirección
  geocoder.geocode({ address: direccion }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        var coordenadas = results[0].geometry.location;
        map.setCenter(coordenadas);
        map.setZoom(10);
        marker.setPosition(coordenadas);
      } else {
        alert("No se encontraron resultados para la dirección.");
      }
    } else {
      alert("Geocodificación fallida debido a: " + status);
    }
  });

  //CURRENT LOCATION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        var coord = {
          lat: latitude,
          lng: longitude,
        };
        map.setCenter(coord);
        map.setZoom(10);
        marker.setPosition(coord);
      },
      () => {
        alert(
          "Tu navegador tiene soporte de geolocalización, pero ocurrió un error."
        );
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}
