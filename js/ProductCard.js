function ProductCard({
  id,
  title,
  price,
  image,
  image2,
  category,
  description,
}) {
  return `<div class="swiper-slide product-card" data-id="${id}" data-category="${category}" data-image1="${image}" data-image2="${image2}">
                <div class="product-card__image">
                    <img src="${image}" alt="${title}" />
                </div>
                <div class="product-card__description">
                    <div class="row">
                        <div class="product-card__title">${title}</div>
                        <button class="product-card__btn btn">
                            <span class=""></span>
                        </button>
                    </div>
                    <div class="row">
                        <div class="product-card__price">${price}</div>
                        <button class="explore-more btn">
                            belanja <span class="material-symbols-rounded">trending_flat</span>
                        </button>
                    </div>
                    <span class="border-animation"></span>
                    <span class="border-animation"></span>
                    <span class="border-animation"></span>
                    <p class="product-card__description hidden">${description}</p>
                </div>
            </div>`;
}

export default ProductCard;
