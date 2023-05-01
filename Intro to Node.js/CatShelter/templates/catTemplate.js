module.exports = (cat) => `
<li>
                    <img src="${cat.imageUrl}" alt="Black Cat">
                    <h3>${cat.name}</h3>
                    <p><span>Price: </span>${cat.price}$</p>
                    <p><span>Breed: </span>${cat.breed}</p>
                    <p><span>Description: </span>${cat.description}</p>
                    <ul class="buttons">
                        <li class="btn edit"><a href="">Change Info</a></li>
                        <li class="btn delete"><a href="">Delete</a></li>
                    </ul>
                </li>`;