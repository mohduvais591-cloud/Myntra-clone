let bagItemOblects;
onLoad();
function onLoad(){
  bagLoadItems();
  displayOnHomePage();
  displayBagSummary();
}
function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemOblects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  bagItemOblects.forEach(bagItem=>{
    totalMRP+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
  })
  let finalAmount = totalMRP-totalDiscount+99;
  bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}
function bagLoadItems(){
  bagItemOblects=bagItems.map(itemId=>{
    for(let i=0; i<items.length; i++){
      if(itemId==items[i].id)
        return items[i];
    }
  })
}
function displayOnHomePage(){
  let containerElement = document.querySelector('.bag-items-container')
  let innerHtml='';
  bagItemOblects.forEach(bagItem=>{
    innerHtml+=generateItemHTML(bagItem)
  })
  containerElement.innerHTML = innerHtml;
}
function removeFromBag(itemId){
  bagItems = bagItems.filter(bagItemId=>bagItemId!=itemId)
  localStorage.setItem('bagItems', JSON.stringify(bagItems))
  bagLoadItems();
  addToIcon();
  displayOnHomePage();
}
function generateItemHTML(item){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.item_image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company_name}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">${item.discount}% OFF</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onClick="removeFromBag(${item.id})">X</div>
          </div>`;
}
