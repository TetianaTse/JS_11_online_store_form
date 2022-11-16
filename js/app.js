function showCategories() {
  const container = document.querySelector('.categories');

  for (let i = 0; i < data.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = data[i].name;
    elem.setAttribute('data-category', i);
    elem.addEventListener('click', showProducts);
    container.appendChild(elem);
  }
}

// handler of click on categories
function showProducts(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const products = data[categoryIndex].products;
  const container = document.querySelector('.products');
  container.innerHTML = '';
  
  for(let i = 0; i < products.length; i++) {
    const elem = document.createElement('div');
    elem.textContent = products[i].name;
    elem.setAttribute('data-product', i);
    elem.setAttribute('data-category', categoryIndex);
    elem.addEventListener('click', showDetails, false);
    container.appendChild(elem);
  }
}

function showDetails(event) {
  const categoryIndex = event.target.getAttribute('data-category');
  const productIndex = event.target.getAttribute('data-product');
  const details = data[categoryIndex].products[productIndex];
  const container = document.querySelector('.details');
  container.innerHTML = '';

  const elem = document.createElement('div');
  elem.classList.add('details-text');
  elem.innerHTML= `<p><b>name:</b> ${details.name}</p><p><b>price:</b> ${details.price}</p><p><b>description:</b> ${details.description}</p> `;
  container.appendChild(elem);
  buyProduct();
  sendform();
}

function buyProduct() {
  const container = document.querySelector('.details');
  const btn = document.createElement('button');
  btn.textContent = 'Buy now';
  container.appendChild(btn);
  btn.addEventListener('click', function() {
    const container = document.querySelector('.form');
    container.classList.add('show_form');
  });
}

function sendform() {
  const form = document.querySelector('.order_form');
  const message = document.querySelector('.message');

  document.querySelector('#btn-form').addEventListener('click', function() {

    let error = formValidate(form);

    if (error === 0) {
      let formData = getDataFotm();
    } else {
      return false;
    }
    
    function formValidate(form) {
      let error = 0;
      let fielError = document.querySelectorAll('.field');

      for(i=0; i < fielError.length; i++) {
        const input = fielError[i];
        formAddRemove(input);

        if(input.classList.contains('number') && input.value <= 0) {
            formAddError(input);
            error++;
        } else if (input.value === "") {
          formAddError(input);
          error++;
        }
      }

      let city = document.forms[0].city.value;
      if (city === '0') {
        document.forms[0].city.classList.add('error');
        error++;
      }
      return error;
    }  

    function formAddError(input) {
        input.classList.add('error');
        message.classList.add('show_message');
    }
    function formAddRemove(input) {
      input.classList.remove('error');
      message.classList.remove('show_message');
    }
    function getDataFotm() {
      const surname = document.forms[0].elements.surname.value;
      const firstName = document.forms[0].elements.name.value;
      const patronymic = document.forms[0].patronymic.value;
      const city = document.forms[0].city.value;
      const department = document.forms[0].city.value;
      const payment = document.forms[0].payment.value;
      const amount = document.forms[0].amount.value;
      const comment = document.forms[0].comment.value;
      const details = document.querySelector('.details-text').innerHTML;
      const container = document.querySelector('.result');
      const message= document.createElement('div');
      const divForm = document.querySelector('.form');
      divForm.innerHTML = '';
      message.classList.add('thanks');
      message.textContent = 'Thank you for your purchase! Product purchased!';
      container.appendChild(message);
      const purchaseInfo = document.createElement('div');
      container.appendChild(purchaseInfo);
      purchaseInfo.innerHTML = `<p><b>Information about order:</b> ${details}</p><p>Surname: ${surname}</p><p>First Name: ${firstName}</p><p>Patronymic: ${patronymic}</p><p>City: ${city}</p><p>Branch №: ${department}</p><p>Payment: ${payment}</p><p>Amount: ${amount}</p><p>Comment: ${comment}</p>`;
      const blockDiv = document.querySelector('.container');
      blockDiv.classList.add('block');

      const btn = document.createElement('button');
      btn.textContent = 'Back to main page';
      container.appendChild(btn);
      btn.addEventListener('click', function() {
        document.location.reload();
      });
    }
  });
};

showCategories();



