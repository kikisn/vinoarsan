fetch("/posts.json")
  .then(res => res.json())
  .then(posts => {
    const grid = document.getElementById("instagram-grid");

    posts.forEach(post => {
      const card = document.createElement("a");
      card.href = post.link;
      card.target = "_blank";
      card.className = "ig-card";

      card.innerHTML = `
        <img src="${post.image}" alt="">
        <p>${post.caption}</p>
      `;

      grid.appendChild(card);
    });
  });
