
document.addEventListener("DOMContentLoaded", () => {

  const inputText = document.getElementById("inputText");
  const encryptBtn = document.getElementById("encryptBtn");
  const decryptBtn = document.getElementById("decryptBtn");
  const outputText = document.getElementById("outputText");
  const copyBtn = document.getElementById("copyBtn");

  inputText.addEventListener('input', toggleMuneco);
  toggleMuneco();
  


  
  

  
  let encryptionKeys = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
  };

  
  const decryptionKeys = Object.fromEntries(
    Object.entries(encryptionKeys).map(([key, value]) => [value, key])
  );

  
  function encrypt(text) {
    return text
      .split("") 
      .map((char) => {
        return encryptionKeys[char] || char; 
      })
      .join("");
  }

  
  function decrypt(text) {
    const regex = new RegExp(Object.keys(decryptionKeys).join("|"), "gi"); 
    return text.replace(regex, (matched) => { 
      return decryptionKeys[matched] || matched;
    });
  }

encryptBtn.addEventListener("click", () => {
  const text = inputText.value.toLowerCase().replace(/[^a-z\s]/g, ""); 
  outputText.value = encrypt(text);
  toggleMuneco(); 
});


decryptBtn.addEventListener("click", () => {
  const text = inputText.value.toLowerCase().replace(/[^a-z\s]/g, ""); 
  outputText.value = decrypt(text);
  toggleMuneco(); 
});




function toggleMuneco() {
  const outputText = document.getElementById('outputText');
  const muneco = document.getElementById('muneco');
  const vacio = document.querySelector('.vacio');
  
  if (outputText.value.trim() === '') {
    muneco.style.display = 'block';
    vacio.style.display = 'block'; 
  } else {
    muneco.style.display = 'none';
    vacio.style.display = 'none'; 
  }
}




  
  copyBtn.addEventListener("click", async () => {
    try {
      
      await navigator.clipboard.writeText(outputText.value);
      console.log('Texto copiado al portapapeles');
    } catch (err) {
      
      console.error('Error al copiar el texto: ', err);
    }
  });
});

